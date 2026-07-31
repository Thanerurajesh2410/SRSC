import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CelebrationIcon from "@mui/icons-material/Celebration";
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DescriptionIcon from "@mui/icons-material/Description";
import PaymentsIcon from "@mui/icons-material/Payments";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { useLocation, useNavigate } from "react-router-dom";

export const DRAWER_WIDTH = 260;

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

interface MenuSection {
  header: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    header: "OVERVIEW",
    items: [
      { title: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
      { title: "Analytics & Reports", icon: <BarChartIcon />, path: "/reports" },
    ],
  },
  {
    header: "DONATIONS & FUNDS",
    items: [
      { title: "Donations", icon: <VolunteerActivismIcon />, path: "/donations" },
      { title: "Receipts", icon: <ReceiptIcon />, path: "/receipts" },
      { title: "Bank Statement Upload", icon: <AccountBalanceIcon />, path: "/admin/bank-statement" },
      { title: "Donors Directory", icon: <PersonIcon />, path: "/donors" },
      { title: "Material Donations", icon: <InventoryIcon />, path: "/materials" },
      { title: "Expenses", icon: <PaymentsIcon />, path: "/expenses" },
    ],
  },
  {
    header: "TEMPLE OPERATIONS",
    items: [
      { title: "Festival Calendar", icon: <CelebrationIcon />, path: "/festivals" },
      { title: "Construction ERP", icon: <EngineeringIcon />, path: "/construction" },
      { title: "Print Templates", icon: <DescriptionIcon />, path: "/templates" },
    ],
  },
  {
    header: "ADMINISTRATION",
    items: [
      { title: "Committee", icon: <GroupsIcon />, path: "/committee" },
      { title: "Volunteers", icon: <VolunteerActivismIcon />, path: "/volunteers" },
      { title: "User Control (RBAC)", icon: <AdminPanelSettingsIcon />, path: "/users" },
      { title: "Settings", icon: <SettingsIcon />, path: "/settings" },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          bgcolor: "#fffef5",
          borderRight: "1px solid #fde68a",
          color: "#7c2d12",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />

      <Box sx={{ py: 1.5, px: 2, overflowY: "auto" }}>
        {menuSections.map((section, idx) => (
          <Box key={section.header} sx={{ mb: idx === menuSections.length - 1 ? 2 : 2.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "#b45309",
                letterSpacing: 1.2,
                fontSize: "0.7rem",
                px: 1,
                mb: 1,
                display: "block",
                opacity: 0.85,
              }}
            >
              {section.header}
            </Typography>

            <List disablePadding>
              {section.items.map((menu) => {
                const isSelected = location.pathname === menu.path;
                return (
                  <ListItemButton
                    key={menu.path}
                    selected={isSelected}
                    onClick={() => navigate(menu.path)}
                    sx={{
                      mb: 0.8,
                      height: 42,
                      width: "100%",
                      px: 1.8,
                      borderRadius: "10px",
                      color: isSelected ? "#ffffff" : "#7c2d12",
                      background: isSelected
                        ? "linear-gradient(135deg, #b45309 0%, #7c2d12 100%)"
                        : "transparent",
                      boxShadow: isSelected ? "0 4px 12px rgba(180, 83, 9, 0.3)" : "none",
                      transition: "all 0.2s ease-in-out",
                      boxSizing: "border-box",
                      "&:hover": {
                        background: isSelected
                          ? "linear-gradient(135deg, #d97706 0%, #9a3412 100%)"
                          : "#fef3c7",
                        boxShadow: isSelected
                          ? "0 6px 16px rgba(180, 83, 9, 0.35)"
                          : "0 2px 8px rgba(180, 83, 9, 0.12)",
                        "& .MuiListItemIcon-root": {
                          color: isSelected ? "#ffffff" : "#d97706",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isSelected ? "#fef3c7" : "#b45309",
                        minWidth: 36,
                        "& .MuiSvgIcon-root": {
                          fontSize: "1.25rem",
                        },
                      }}
                    >
                      {menu.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: isSelected ? 800 : 600,
                            letterSpacing: 0.2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {menu.title}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                );
              })}
            </List>
            {idx < menuSections.length - 1 && (
              <Divider sx={{ borderColor: "rgba(253, 230, 138, 0.6)", mt: 1.5 }} />
            )}
          </Box>
        ))}
      </Box>
    </Drawer>
  );
}