
import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    ClipboardDocumentListIcon,
    WrenchScrewdriverIcon,
    CreditCardIcon,
    UserCircleIcon,
    ArrowLeftOnRectangleIcon,
    FolderOpenIcon,
    LifebuoyIcon,
    Cog6ToothIcon
} from "@heroicons/react/24/outline";


export default function ServiceProviderSidebar() {
    const menuItems = [
        { name: "Dashboard", to: "/service-provider", icon: HomeIcon },
        { name: "Service Requests", to: "/service-provider/requests", icon: ClipboardDocumentListIcon },
        { name: "Manage Services", to: "/service-provider/services", icon: WrenchScrewdriverIcon },
        { name: "Payments", to: "/service-provider/payments", icon: CreditCardIcon },
        { name: "Profile", to: "/service-provider/profile", icon: UserCircleIcon },

        { name: "Documents", to: "/service-provider/documents", icon: FolderOpenIcon },
        { name: "Support", to: "/service-provider/support", icon: LifebuoyIcon },
        { name: "Settings", to: "/service-provider/settings", icon: Cog6ToothIcon }
    ];


    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="w-64 bg-[#0f172a] text-white flex flex-col border-r border-gray-800">

            <div className="py-8 text-center border-b border-gray-700 bg-gradient-to-b from-[#0f172a] to-[#1e3a8a]">
                <h1 className="text-xl font-bold tracking-wide">QuickServe</h1>
                <p className="text-xs opacity-70">Service Provider Panel</p>
            </div>

            <nav className="flex-1 mt-4 space-y-1">
                {menuItems.map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center mx-3 px-4 py-2 rounded-lg transition-all ${isActive
                                ? "bg-gray-800 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="text-sm">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto mb-6 px-3">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 rounded-lg text-red-300 hover:bg-red-600 hover:text-white transition-all"
                >
                    <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                    <span className="text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
}
