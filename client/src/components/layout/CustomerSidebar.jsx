import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  UserIcon,
  LifebuoyIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/customer", icon: HomeIcon },
  { name: "Bookings", path: "/customer/bookings", icon: ClipboardDocumentListIcon },
  { name: "Payments", path: "/customer/payments", icon: CreditCardIcon },
  { name: "Profile", path: "/customer/profile", icon: UserIcon },
  { name: "Support", path: "/customer/support", icon: LifebuoyIcon },
  { name: "Settings", path: "/customer/settings", icon: Cog6ToothIcon },
];

export default function CustomerSidebar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-blue-700 text-white">

      {/* Header */}
      <div className="py-8 text-center border-b border-gray-700 bg-gradient-to-b from-[#0f172a] to-[#1e3a8a]">
        <h1 className="text-xl font-semibold">QuickServe</h1>
        <p className="text-xs text-blue-200">Customer Panel</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 mx-3 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Shop Again Button */}
      <div className="px-4 pb-3">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 px-4 py-2
          rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-500 transition"
        >
          <ShoppingBagIcon className="w-5 h-5" />
          Shop Again
        </button>
      </div>

      {/* Logout (optional) */}
      {/*
      <div className="p-4 border-t border-blue-600">
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center justify-center gap-2 px-4 py-2
          rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 transition"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
      */}
    </div>
  );
}
