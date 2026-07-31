import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import AppHeader from "../components/layout/AppHeader";
import Footer from "../components/layout/Footer";
import Sidebar, { DRAWER_WIDTH } from "../components/layout/Sidebar";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100vw", bgcolor: "#fafaf9", overflowX: "hidden" }}>
      <AppHeader />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
          minHeight: "100vh",
          bgcolor: "#fafaf9",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <Toolbar />

        <Box sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1, width: "100%", boxSizing: "border-box" }}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}