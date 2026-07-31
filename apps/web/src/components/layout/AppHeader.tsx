import { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AppHeader() {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    api.get("/settings").then((res) => {
      if (res.data?.data?.logoUrl) {
        setLogoUrl(res.data.data.logoUrl);
      }
    }).catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "linear-gradient(135deg, #7c2d12 0%, #b45309 60%, #d97706 100%)",
        borderBottom: "2px solid #fde68a",
        color: "#ffffff",
        boxShadow: "0 4px 20px rgba(180, 83, 9, 0.2)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          {logoUrl ? (
            <Box
              component="img"
              src={logoUrl}
              alt="Temple Logo"
              sx={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fef3c7",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            />
          ) : (
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                bgcolor: "#fef3c7",
                color: "#7c2d12",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 22,
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              🛕
            </Box>
          )}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 0.5, color: "#fef3c7", fontSize: "1.15rem" }}>
              SRI RAMALAYAM TEMPLE ERP
            </Typography>
            <Typography variant="caption" sx={{ color: "#fde68a", fontSize: "0.7rem", display: "block" }}>
              Sri Rama Seva Committee Management System
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Tooltip title="View Public Website">
            <IconButton color="inherit" onClick={() => navigate("/")} sx={{ bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}>
              <LanguageIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton color="inherit" sx={{ bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center", bgcolor: "rgba(255,255,255,0.2)", py: 0.5, px: 1.5, borderRadius: 5 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "#fef3c7", color: "#7c2d12", fontWeight: 800, fontSize: "0.9rem" }}>
              A
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.1, color: "#fff", fontSize: "0.85rem" }}>
                Admin User
              </Typography>
              <Chip label="SUPER ADMIN" size="small" sx={{ height: 16, fontSize: "0.6rem", bgcolor: "#fef3c7", color: "#7c2d12", fontWeight: 900 }} />
            </Box>
          </Stack>

          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout} sx={{ bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "#ef4444" } }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}