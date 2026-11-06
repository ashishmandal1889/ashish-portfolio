import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

const THEMES = ["cream", "mocha", "oled"];

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "cream";
    } catch {
      return "cream";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("portfolio-theme", theme);
      const metaTheme = document.querySelector('meta[name="color-scheme"]');
      if (metaTheme) {
        metaTheme.content = theme === "cream" ? "light" : "dark";
      }
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const cycleTheme = () => {
    const nextIdx = (THEMES.indexOf(theme) + 1) % THEMES.length;
    setTheme(THEMES[nextIdx]);
  };

  const getLabel = () => {
    if (theme === "cream") return "Switch to Dark (Mocha)";
    if (theme === "mocha") return "Switch to OLED (Black)";
    return "Switch to Light (Cream)";
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`themepick ${className}`}
      aria-label={getLabel()}
      title={getLabel()}
    >
      {theme === "cream" && <Sun size={17} aria-hidden="true" />}
      {theme === "mocha" && <Moon size={17} aria-hidden="true" />}
      {theme === "oled" && <Monitor size={17} aria-hidden="true" />}
    </button>
  );
}
