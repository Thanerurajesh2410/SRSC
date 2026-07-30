import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#b45309",
      light: "#f59e0b",
      dark: "#7c2d12",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#d97706",
      light: "#fef3c7",
      dark: "#451a03",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b",
      light: "#fef3c7",
      dark: "#b45309",
    },
    background: {
      default: "#fafaf9",
      paper: "#ffffff",
    },
    success: {
      main: "#047857",
    },
    error: {
      main: "#dc2626",
    },
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h4: {
      fontWeight: 800,
      color: "#7c2d12",
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 700,
      color: "#7c2d12",
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 700,
      color: "#7c2d12",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: "none",
          borderRadius: 10,
          boxShadow: "none",
          padding: "8px 18px",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(180, 83, 9, 0.2)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #b45309 0%, #7c2d12 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #d97706 0%, #9a3412 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(253, 230, 138, 0.8)",
          boxShadow: "0 4px 16px rgba(180, 83, 9, 0.06)",
          backgroundImage: "none",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(180, 83, 9, 0.12)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: "none",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: "#7c2d12",
          backgroundColor: "#fffbeb",
          borderBottom: "2px solid #fde68a",
        },
      },
    },
  },
});