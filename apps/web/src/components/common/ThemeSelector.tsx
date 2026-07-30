import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import CheckIcon from "@mui/icons-material/Check";
import { useAppTheme } from "../../context/ThemeContext";
import { THEME_PRESETS } from "../../theme/themeConfig";
import type { ThemeId } from "../../theme/themeConfig";

export default function ThemeSelector() {
  const { themeId, setThemeId, theme } = useAppTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (id: ThemeId) => {
    setThemeId(id);
    handleClose();
  };

  return (
    <>
      <Button
        size="small"
        startIcon={<PaletteIcon />}
        onClick={handleOpen}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.15)",
          color: "#fff",
          fontWeight: 800,
          px: 1.8,
          py: 0.7,
          borderRadius: 4,
          border: "1px solid rgba(255, 255, 255, 0.3)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        Theme: {theme.name.split(" ")[0]}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#0f172a",
              color: "#fff",
              border: "1px solid #b45309",
              borderRadius: 3,
              minWidth: 320,
              p: 1,
              boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: "1px solid rgba(255,255,255,0.1)", mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#f59e0b" }}>
            Select UI Theme & Aesthetic Mode
          </Typography>
          <Typography variant="caption" color="#cbd5e1">
            Test and preview different temple themes live
          </Typography>
        </Box>

        {(Object.keys(THEME_PRESETS) as ThemeId[]).map((id) => {
          const preset = THEME_PRESETS[id];
          const isSelected = themeId === id;

          return (
            <MenuItem
              key={id}
              onClick={() => handleSelect(id)}
              selected={isSelected}
              sx={{
                borderRadius: 2,
                my: 0.5,
                "&.Mui-selected": {
                  bgcolor: "rgba(245, 158, 11, 0.2)",
                  border: "1px solid #f59e0b",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: isSelected ? "#f59e0b" : "#94a3b8" }}>
                {isSelected ? <CheckIcon /> : <PaletteIcon />}
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 800, color: isSelected ? "#fef3c7" : "#fff" }}>
                    {preset.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="#94a3b8" sx={{ fontSize: "0.72rem", display: "block" }}>
                    {preset.description}
                  </Typography>
                }
              />

              {isSelected && <Chip label="ACTIVE" size="small" color="warning" sx={{ height: 18, fontSize: "0.6rem", fontWeight: 900 }} />}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
