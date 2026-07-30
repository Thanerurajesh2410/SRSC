export type ThemeId = "royal-saffron" | "glassmorphic-dark" | "ivory-marble" | "midnight-gold";

export interface ThemePreset {
  id: ThemeId;
  name: string;
  description: string;
  palette: {
    bgPage: string;
    bgHeader: string;
    bgCard: string;
    bgInput: string;
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
    textInput: string;
    border: string;
    btnGradient: string;
    btnText: string;
  };
}

export const THEME_PRESETS: Record<ThemeId, ThemePreset> = {
  "royal-saffron": {
    id: "royal-saffron",
    name: "Royal Saffron & Radiant Gold",
    description: "Authentic, high-contrast temple glow with crisp sandalwood cards & ultra-readable inputs",
    palette: {
      bgPage: "linear-gradient(180deg, #180a04 0%, #261106 35%, #150903 100%)",
      bgHeader: "linear-gradient(135deg, #7c2d12 0%, #b45309 100%)",
      bgCard: "#231107",
      bgInput: "#120803",
      textPrimary: "#ffffff",
      textSecondary: "#fde68a",
      textAccent: "#f59e0b",
      textInput: "#ffffff",
      border: "2px solid #b45309",
      btnGradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      btnText: "#451a03",
    },
  },
  "glassmorphic-dark": {
    id: "glassmorphic-dark",
    name: "Modern Glassmorphic Dark & Amber",
    description: "Sleek, futuristic dark mode with high-contrast cards and glowing neon amber",
    palette: {
      bgPage: "linear-gradient(180deg, #090d16 0%, #0f172a 50%, #020617 100%)",
      bgHeader: "rgba(15, 23, 42, 0.95)",
      bgCard: "#1e293b",
      bgInput: "#0f172a",
      textPrimary: "#ffffff",
      textSecondary: "#cbd5e1",
      textAccent: "#38bdf8",
      textInput: "#ffffff",
      border: "1.5px solid rgba(245, 158, 11, 0.4)",
      btnGradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
      btnText: "#ffffff",
    },
  },
  "ivory-marble": {
    id: "ivory-marble",
    name: "Ivory Marble & Saffron Accent",
    description: "Clean, high-readability executive ERP theme with marble white and saffron highlights",
    palette: {
      bgPage: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)",
      bgHeader: "linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)",
      bgCard: "#ffffff",
      bgInput: "#ffffff",
      textPrimary: "#1c1917",
      textSecondary: "#57534e",
      textAccent: "#c2410c",
      textInput: "#1c1917",
      border: "1.5px solid #d6d3d1",
      btnGradient: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
      btnText: "#ffffff",
    },
  },
  "midnight-gold": {
    id: "midnight-gold",
    name: "Deep Midnight Sky & Constellation",
    description: "Mystic night blue & constellation theme with sparkling gold borders and headers",
    palette: {
      bgPage: "linear-gradient(180deg, #050b14 0%, #0a1326 50%, #03060d 100%)",
      bgHeader: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
      bgCard: "#0f172a",
      bgInput: "#070a12",
      textPrimary: "#ffffff",
      textSecondary: "#e0e7ff",
      textAccent: "#fbbf24",
      textInput: "#ffffff",
      border: "2px solid #fbbf24",
      btnGradient: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
      btnText: "#ffffff",
    },
  },
};
