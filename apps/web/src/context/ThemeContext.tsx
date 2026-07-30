import React, { createContext, useContext, useState } from "react";
import { THEME_PRESETS } from "../theme/themeConfig";
import type { ThemeId, ThemePreset } from "../theme/themeConfig";

interface ThemeContextType {
  themeId: ThemeId;
  theme: ThemePreset;
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeId: "royal-saffron",
  theme: THEME_PRESETS["royal-saffron"],
  setThemeId: () => {},
});

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem("srtmp_ui_theme") as ThemeId;
    return saved && THEME_PRESETS[saved] ? saved : "royal-saffron";
  });

  const setThemeId = (id: ThemeId) => {
    if (THEME_PRESETS[id]) {
      setThemeIdState(id);
      localStorage.setItem("srtmp_ui_theme", id);
    }
  };

  const theme = THEME_PRESETS[themeId] || THEME_PRESETS["royal-saffron"];

  return (
    <ThemeContext.Provider value={{ themeId, theme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
