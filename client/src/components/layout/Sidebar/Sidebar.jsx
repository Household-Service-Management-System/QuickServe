// import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
// import BookOnlineIcon from "@mui/icons-material/BookOnline";
// import PaymentIcon from "@mui/icons-material/Payment";
// import PersonIcon from "@mui/icons-material/Person";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { NavLink } from "react-router-dom";

// const drawerWidth = 240;

// export default function Sidebar() {
//   const menuItems = [
//     { name: "Dashboard", to: "/user", icon: <DashboardIcon /> },
//     { name: "Services", to: "/user/services", icon: <HomeRepairServiceIcon /> },
//     { name: "My Bookings", to: "/user/bookings", icon: <BookOnlineIcon /> },
//     { name: "Payments", to: "/user/payments", icon: <PaymentIcon /> },
//     { name: "Profile", to: "/user/profile", icon: <PersonIcon /> },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           backgroundColor: "#111827",
//           color: "white",
//         },
//       }}
//     >
//       <Toolbar />

//       {/* PROJECT NAME */}
//       <Box sx={{ textAlign: "center", py: 3, borderBottom: "1px solid #374151" }}>
//         <Typography variant="h6" fontWeight="bold">
//           QuickServe
//         </Typography>
//         <Typography variant="caption" color="gray">
//           User Panel
//         </Typography>
//       </Box>

//       {/* SECTION TITLE */}
//       {/* <Box sx={{ px: 2, mt: 2, mb: 1 }}>
//         <Typography variant="subtitle2" color="gray" sx={{ letterSpacing: 1 }}>
//           DASHBOARD
//         </Typography>
//       </Box> */}

//       <List>
//         {menuItems.map((item, i) => (
//           <NavLink
//             to={item.to}
//             key={i}
//             style={{ textDecoration: "none", color: "inherit" }}
//           >
//             {({ isActive }) => (
//               <ListItemButton
//                 sx={{
//                   backgroundColor: isActive ? "#1f2937" : "transparent",
//                   "&:hover": { backgroundColor: "#374151" },
//                   borderRadius: 1,
//                   mx: 1,
//                   my: 0.5,
//                 }}
//               >
//                 <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.name} />
//               </ListItemButton>
//             )}
//           </NavLink>
//         ))}
//       </List>

//       <Box sx={{ position: "absolute", bottom: 20, width: "100%" }}>
//         <ListItemButton onClick={handleLogout} sx={{ color: "white" }}>
//           <ListItemIcon sx={{ color: "white" }}>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItemButton>
//       </Box>
//     </Drawer>
//   );
// }


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
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";

const drawerWidth = 250;

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
          background: "linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%)",
          color: "white",
          borderRight: "none",
          backdropFilter: "blur(12px)",
        },
      }}
    >
      <Toolbar />

      {/* Branding */}
      <Box
        sx={{
          textAlign: "center",
          py: 3,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, letterSpacing: 1, color: "#dbeafe" }}
        >
          QuickServe
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#a5cffd", letterSpacing: 1 }}
        >
          User Dashboard
        </Typography>
      </Box>

      {/* Menu */}
      <List sx={{ mt: 2 }}>
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.to}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
                  borderRadius: 2,
                  mx: 1.5,
                  my: 0.8,
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#bfdbfe" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#e2e8f0",
                  }}
                />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>

      {/* Logout */}
      <Box sx={{ position: "absolute", bottom: 22, width: "100%" }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            mx: 1.5,
            borderRadius: 2,
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.25)" },
          }}
        >


          
          <ListItemIcon sx={{ color: "#fecaca" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ color: "#fca5a5", fontWeight: 600 }}
            
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}

