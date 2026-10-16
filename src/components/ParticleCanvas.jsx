import { useEffect, useRef } from "react";

// A field of dots laid out on a ground plane and viewed in perspective, with a slow
// swell rolling towards the viewer. Dots near the pointer lift and pick up the accent
// colour; clicking/tapping sends a ripple out from that point.
const VARIANTS = {
  hero: {
    horizon: 0.5,
    horizonCompact: 0.6,
    rows: 38,
    rowsCompact: 26,
    spacing: 28,
    spacingCompact: 22,
    zFar: 4.8,
    amplitude: 0.12,
    sizeNear: 2.4,
    sizeFar: 0.9,
    alphaNear: 0.55,
    alphaFar: 0.04,
    radius: 170,
    lift: 38,
    push: 12,
    speed: 0.42,
  },
  contact: {
    horizon: 0.3,
    horizonCompact: 0.38,
    rows: 28,
    rowsCompact: 20,
    spacing: 32,
    spacingCompact: 24,
    zFar: 4.2,
    amplitude: 0.09,
    sizeNear: 2.1,
    sizeFar: 0.9,
    alphaNear: 0.34,
    alphaFar: 0.03,
    radius: 160,
    lift: 30,
    push: 10,
    speed: 0.3,
  },
};

const RIPPLE_SPEED = 560; // px per second
const RIPPLE_WIDTH = 80;
const RIPPLE_LIFE = 1.8; // seconds
const MAX_RIPPLES = 4;

function readColor(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value ? `rgb(${value.split(/\s+/).join(",")})` : fallback;
}

export default function ParticleCanvas({ variant = "hero", className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const cfg = VARIANTS[variant] ?? VARIANTS.hero;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startTime = performance.now();

    let width = 0;
    let height = 0;
    let horizon = 0;
    let depthScale = 0;
    let amplitude = 0;
    let grid = new Float32Array(0); // [x at z = 1, z] pairs
    let out = new Float32Array(0); // [x, y, size, alpha, heat] per visible dot
    let colors = { fg: readColor("--fg", "rgb(237,235,230)"), accent: readColor("--accent", "rgb(255,107,61)") };
    let isVisible = false;
    let frameId = 0;

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, clientX: -1, clientY: -1, inside: false, strength: 0 };
    const ripples = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const compact = width < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      horizon = height * (compact ? cfg.horizonCompact : cfg.horizon);
      depthScale = (height - horizon) * 1.04;
      amplitude = (height - horizon) * cfg.amplitude;

      const rows = compact ? cfg.rowsCompact : cfg.rows;
      const spacing = compact ? cfg.spacingCompact : cfg.spacing;
      const points = [];
      for (let r = 0; r < rows; r++) {
        const z = 1 + (r / (rows - 1)) * (cfg.zFar - 1);
        const columns = Math.ceil(((width / 2 + spacing) * z) / spacing);
        for (let c = -columns; c <= columns; c++) points.push(c * spacing, z);
      }
      grid = Float32Array.from(points);
      out = new Float32Array((grid.length / 2) * 5);
    };

    const draw = (now) => {
      const seconds = now / 1000;
      const t = reducedMotion ? 0 : ((now - startTime) / 1000) * cfg.speed;

      pointer.x += (pointer.targetX - pointer.x) * 0.16;
      pointer.y += (pointer.targetY - pointer.y) * 0.16;
      pointer.strength += ((pointer.inside ? 1 : 0) - pointer.strength) * 0.06;

      while (ripples.length && seconds - ripples[0].start > RIPPLE_LIFE) ripples.shift();

      const cx = width / 2;
      const zRange = cfg.zFar - 1;
      const radius = cfg.radius;
      const radiusSq = radius * radius;
      const lensOn = pointer.strength > 0.01;
      let n = 0;

      for (let i = 0; i < grid.length; i += 2) {
        const x = grid[i];
        const z = grid[i + 1];
        const nx = x * 0.0042;
        const nz = z * 1.35 + t;
        const wave =
          Math.sin(nx + t * 0.6) * Math.cos(nz * 0.9) * 0.5 +
          Math.sin(nx * 0.55 - nz * 1.1 + t * 0.35) * 0.35 +
          Math.sin(nx * 2.1 + nz * 1.7 - t * 0.9) * 0.15;

        let sx = cx + x / z;
        if (sx < -24 || sx > width + 24) continue;
        let sy = horizon + (depthScale - wave * amplitude) / z;

        const depth = (z - 1) / zRange; // 0 = nearest row, 1 = horizon
        const near = 1 - depth;
        let alpha = cfg.alphaFar + (cfg.alphaNear - cfg.alphaFar) * near * near * (0.62 + 0.38 * (wave * 0.5 + 0.5));
        const edge = Math.abs(sx - cx) / cx;
        if (edge > 0.7) alpha *= 1 - Math.min(1, (edge - 0.7) / 0.35) * 0.7;

        let heat = 0;
        if (lensOn) {
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            let k = 1 - dist / radius;
            k = k * k * (3 - 2 * k) * pointer.strength;
            const reach = 1 - depth * 0.55;
            sy -= k * cfg.lift * reach;
            if (dist > 0.001) sx += (dx / dist) * k * cfg.push * reach;
            heat = k;
          }
        }

        for (let r = 0; r < ripples.length; r++) {
          const ripple = ripples[r];
          const age = seconds - ripple.start;
          const dx = sx - ripple.x;
          const dy = sy - ripple.y;
          const band = Math.sqrt(dx * dx + dy * dy) - age * RIPPLE_SPEED;
          if (band > -RIPPLE_WIDTH && band < RIPPLE_WIDTH) {
            const k = Math.cos((band / RIPPLE_WIDTH) * Math.PI * 0.5) * (1 - age / RIPPLE_LIFE);
            sy -= k * 16 * (1 - depth * 0.5);
            if (k > heat) heat = k;
          }
        }

        if (sy < -8 || sy > height + 8) continue;
        out[n++] = sx;
        out[n++] = sy;
        out[n++] = cfg.sizeFar + (cfg.sizeNear - cfg.sizeFar) * near + heat * 1.2;
        out[n++] = Math.min(1, alpha + heat * 0.6);
        out[n++] = heat;
      }

      ctx.clearRect(0, 0, width, height);

      // Two passes so colour only changes twice per frame. A heated dot is drawn in both,
      // cross-faded, which keeps the edge of the lens soft.
      ctx.fillStyle = colors.fg;
      for (let i = 0; i < n; i += 5) {
        const mix = Math.min(1, out[i + 4] * 2);
        if (mix >= 1) continue;
        const size = out[i + 2];
        ctx.globalAlpha = out[i + 3] * (1 - mix);
        ctx.fillRect(out[i] - size / 2, out[i + 1] - size / 2, size, size);
      }
      ctx.fillStyle = colors.accent;
      for (let i = 0; i < n; i += 5) {
        const mix = Math.min(1, out[i + 4] * 2);
        if (mix <= 0.01) continue;
        const size = out[i + 2];
        ctx.globalAlpha = out[i + 3] * mix;
        ctx.fillRect(out[i] - size / 2, out[i + 1] - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now) => {
      draw(now);
      frameId = isVisible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (reducedMotion || frameId) return;
      frameId = requestAnimationFrame(tick);
    };
    const redrawStatic = () => {
      if (reducedMotion || !frameId) draw(performance.now());
    };

    const syncPointer = () => {
      if (pointer.clientX < 0) return;
      const rect = canvas.getBoundingClientRect();
      const x = pointer.clientX - rect.left;
      const y = pointer.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (inside && !pointer.inside) {
        pointer.x = x;
        pointer.y = y;
      }
      pointer.targetX = x;
      pointer.targetY = y;
      pointer.inside = inside;
    };

    const onPointerMove = (event) => {
      if (event.pointerType === "touch") return;
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      syncPointer();
    };
    const onPointerOut = (event) => {
      if (!event.relatedTarget) pointer.inside = false;
    };
    const onPointerDown = (event) => {
      if (reducedMotion || event.target.closest?.("a, button, input, textarea, select, label")) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      ripples.push({ x, y, start: performance.now() / 1000 });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };
    const onVisibilityChange = () => {
      if (!document.hidden && isVisible) start();
    };

    build();
    redrawStatic();
    if (!reducedMotion) canvas.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: 1400, easing: "ease-out" });

    const resizeObserver = new ResizeObserver(() => {
      build();
      redrawStatic();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
      },
      { rootMargin: "120px 0px" }
    );
    intersectionObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      colors = { fg: readColor("--fg", colors.fg), accent: readColor("--accent", colors.accent) };
      redrawStatic();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("scroll", syncPointer, { passive: true });
      document.addEventListener("pointerout", onPointerOut);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", syncPointer);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [variant]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
