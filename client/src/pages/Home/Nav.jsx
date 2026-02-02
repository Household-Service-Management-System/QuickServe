// Nav.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUserMenuOpen(false);

    navigate("/");
  };
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-700">
          QuickServe
        </Link>

        {/* <div className="hidden md:flex items-center gap-3 bg-white px-3 py-2 rounded-2xl shadow border border-gray-200 max-w-md w-full">
          <span className="text-gray-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search services e.g. AC Repair, Cleaning"
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button className="px-4 py-1.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">
            Search
          </button>
        </div> */}

        {/* Menu Button */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-700">
            Home
          </Link>
          <Link to="/ServicesList" className="hover:text-blue-700">
            Services
          </Link>
          <Link to="/HowItWorks" className="hover:text-blue-700">
            How It Works ?
          </Link>
          {/* {/* <Link to="/about" className="hover:text-green-700">About</Link>
          <Link to="/support" className="hover:text-green-700">Support</Link> */}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* 👤 Avatar */}
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center"
              >
                U
              </button>
              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2">
                  <button
                    onClick={() => {
                      if (role === "ROLE_USER") navigate("/customer");
                      else if (role === "ROLE_SERVICEPROVIDER")
                        navigate("/service-provider");
                      else navigate("/admin");
                      setUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
