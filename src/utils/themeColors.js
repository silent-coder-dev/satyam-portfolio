export const DARK_THEME_COLORS = [
  { name: "Cyan Glow", hex: "#22d3ee" },
  { name: "Sky Blue", hex: "#38bdf8" },
  { name: "Violet Pulse", hex: "#8b5cf6" },
  { name: "Rose Fire", hex: "#fb7185" },
  { name: "Emerald Tide", hex: "#34d399" },
  { name: "Amber Burst", hex: "#f59e0b" },
  { name: "Sunset Coral", hex: "#f97316" },
  { name: "Electric Lime", hex: "#a3e635" },
  { name: "Indigo Orbit", hex: "#6366f1" },
  { name: "Fuchsia Pop", hex: "#ec4899" },
  { name: "Azure Mist", hex: "#60a5fa" },
  { name: "Moonlit Teal", hex: "#2dd4bf" },
  { name: "Arctic Mint", hex: "#6ee7b7" },
  { name: "Soft Lavender", hex: "#a78bfa" },
  { name: "Glacier Blue", hex: "#7dd3fc" },
  { name: "Warm Champagne", hex: "#fcd34d" },
];

export const LIGHT_THEME_COLORS = [
  { name: "Cyan Glow", hex: "#06b6d4" },
  { name: "Sky Blue", hex: "#0ea5e9" },
  { name: "Violet Pulse", hex: "#7c3aed" },
  { name: "Rose Bloom", hex: "#f43f5e" },
  { name: "Emerald Tide", hex: "#10b981" },
  { name: "Amber Burst", hex: "#f59e0b" },
  { name: "Sunset Coral", hex: "#f97316" },
  { name: "Electric Lime", hex: "#84cc16" },
  { name: "Indigo Orbit", hex: "#4f46e5" },
  { name: "Fuchsia Pop", hex: "#d946ef" },
  { name: "Azure Mist", hex: "#3b82f6" },
  { name: "Moonlit Teal", hex: "#14b8a6" },
  { name: "Arctic Mint", hex: "#059669" },
  { name: "Soft Lavender", hex: "#8b5cf6" },
  { name: "Glacier Blue", hex: "#0284c7" },
  { name: "Warm Champagne", hex: "#b45309" },
];

export const initializeThemeColors = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("accent_dark_index");
    window.localStorage.removeItem("accent_light_index");
    window.localStorage.removeItem("accent_mode");
  }

  return {
    darkIndex: 0,
    lightIndex: 0,
    darkColor: DARK_THEME_COLORS[0],
    lightColor: LIGHT_THEME_COLORS[0],
    isShuffle: false,
  };
};

export const applyThemeColor = (isDark, themeColors) => {
  if (typeof document === "undefined") return;
  const selected = isDark ? themeColors?.darkColor : themeColors?.lightColor;
  const hex = selected?.hex || DARK_THEME_COLORS[0].hex;
  const root = document.documentElement;
  root.style.setProperty("--primary-color", hex);
  root.style.setProperty("--primary-rgb", hexToRgb(hex));
};

export const getRandomThemeColors = () => {
  const darkIndex = Math.floor(Math.random() * DARK_THEME_COLORS.length);
  const lightIndex = Math.floor(Math.random() * LIGHT_THEME_COLORS.length);

  return {
    darkIndex,
    lightIndex,
    darkColor: DARK_THEME_COLORS[darkIndex],
    lightColor: LIGHT_THEME_COLORS[lightIndex],
  };
};

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const value = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = Number.parseInt(value, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}`;
}
