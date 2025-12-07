import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import { Box } from "@mui/material";

export default function UserLayout() {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f6fa" }}>
      <Sidebar />

      {/* Content Area */}
      <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
