import { useCallback, useEffect, useRef, useState } from "react";

// Copies text and flips `copied` back to false after a moment. Resolves to false when
// the clipboard isn't available (e.g. an insecure context) so callers can fall back.
export default function useCopy(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return false;
      }
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), resetAfter);
      return true;
    },
    [resetAfter]
  );

  return [copied, copy];
}
