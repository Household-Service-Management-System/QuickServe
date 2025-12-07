import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", to: "/user", icon: <DashboardIcon /> },
    { name: "Services", to: "/user/services", icon: <HomeRepairServiceIcon /> },
    { name: "My Bookings", to: "/user/bookings", icon: <BookOnlineIcon /> },
    { name: "Payments", to: "/user/payments", icon: <PaymentIcon /> },
    { name: "Profile", to: "/user/profile", icon: <PersonIcon /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#111827",
          color: "white",
        },
      }}
    >
      <Toolbar />

      {/* PROJECT NAME */}
      <Box sx={{ textAlign: "center", py: 3, borderBottom: "1px solid #374151" }}>
        <Typography variant="h6" fontWeight="bold">
          QuickServe
        </Typography>
        <Typography variant="caption" color="gray">
          User Panel
        </Typography>
      </Box>

      {/* SECTION TITLE */}
      {/* <Box sx={{ px: 2, mt: 2, mb: 1 }}>
        <Typography variant="subtitle2" color="gray" sx={{ letterSpacing: 1 }}>
          DASHBOARD
        </Typography>
      </Box> */}

      <List>
        {menuItems.map((item, i) => (
          <NavLink
            to={item.to}
            key={i}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  backgroundColor: isActive ? "#1f2937" : "transparent",
                  "&:hover": { backgroundColor: "#374151" },
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>

      <Box sx={{ position: "absolute", bottom: 20, width: "100%" }}>
        <ListItemButton onClick={handleLogout} sx={{ color: "white" }}>
          <ListItemIcon sx={{ color: "white" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
