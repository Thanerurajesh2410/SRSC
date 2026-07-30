import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import AppHeader from "../components/layout/AppHeader";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";

const drawerWidth = 260;

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fffef5" }}>
      <AppHeader />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          minHeight: "100vh",
          bgcolor: "#fafaf9",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />

        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}