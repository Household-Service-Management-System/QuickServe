import { Outlet, useNavigate } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";

export default function CustomerLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar (fixed, no scroll) */}
      <div className="w-64 bg-white border-r">
        <CustomerSidebar />
      </div>

      {/* Main content (scrollable) */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
