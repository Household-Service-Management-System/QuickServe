
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box,
    Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LogoutIcon from "@mui/icons-material/Logout";

import { NavLink } from "react-router-dom";

const drawerWidth = 250;

export default function ServiceProviderSidebar() {
    const menuItems = [
        { name: "Dashboard", to: "/service-provider", icon: <DashboardIcon /> },
        { name: "Service Requests", to: "/service-provider/requests", icon: <AssignmentTurnedInIcon /> },
        { name: "Manage Services", to: "/service-provider/services", icon: <HomeRepairServiceIcon /> },
        { name: "Payments", to: "/service-provider/payments", icon: <PaymentIcon /> },
        { name: "Profile", to: "/service-provider/profile", icon: <PersonIcon /> },
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
                    background: "#111827",
                    color: "white",
                    borderRight: "1px solid #1f2937",
                },
            }}
        >
            <Toolbar />

            {/* Header */}
            <Box sx={{ textAlign: "center", py: 4, borderBottom: "1px solid #1f2937" }}>
                <Typography variant="h6" fontWeight="bold">
                    QuickServe
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Service Provider Panel
                </Typography>
            </Box>

            {/* Sidebar Menu */}
            <List sx={{ mt: 1 }}>
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.to}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        {({ isActive }) => (
                            <ListItemButton
                                sx={{
                                    mx: 1.2,
                                    my: 0.5,
                                    borderRadius: 2,
                                    transition: "0.25s",
                                    background: isActive ? "#1f2937" : "transparent",
                                    "&:hover": { background: "#374151" },
                                }}
                            >
                                <ListItemIcon sx={{ color: "#cbd5e1" }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        )}
                    </NavLink>
                ))}
            </List>

            {/* Logout */}
            <Box sx={{ position: "absolute", bottom: 25, width: "100%" }}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        color: "#fca5a5",
                        mx: 1.2,
                        borderRadius: 2,
                        "&:hover": {
                            background: "#b91c1c",
                            color: "white",
                        },
                    }}
                >
                    <ListItemIcon sx={{ color: "inherit" }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </Box>
        </Drawer>
    );
}
