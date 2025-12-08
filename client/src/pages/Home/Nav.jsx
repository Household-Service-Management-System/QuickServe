// Nav.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-700">
          QuickServe
        </Link>

        <div className="hidden md:flex items-center gap-3 bg-white px-3 py-2 rounded-2xl shadow border border-gray-200 max-w-md w-full">
          <span className="text-gray-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search services e.g. AC Repair, Cleaning"
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button className="px-4 py-1.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">
            Search
          </button>
        </div>

        {/* Menu Button */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-700">
            Home
          </Link>
          <Link to="/ServicesList" className="hover:text-blue-700">
            Services
          </Link>
          <Link to="/HowItWorks" className="hover:text-blue-700">
            How It Works
          </Link>
          {/* <Link to="/about" className="hover:text-green-700">About</Link>
          <Link to="/support" className="hover:text-green-700">Support</Link> */}

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
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-md px-6 pb-4 space-y-4 font-medium text-gray-700"
        >
          <Link to="/" className="block hover:text-blue-700">
            Home
          </Link>
          <Link to="/ServicesList" className="block hover:text-blue-700">
            Services
          </Link>
          <Link to="/Services" className="block hover:text-blue-700">
            How It Works
          </Link>
          {/* <Link to="/about" className="block hover:text-green-700">About</Link>
          <Link to="/support" className="block hover:text-green-700">Support</Link> */}

          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/login"
              className="px-4 py-2 rounded-full border border-blue-700 text-blue-700 text-center hover:bg-blue-700 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2 rounded-full bg-blue-700 text-white text-center font-semibold hover:bg-blue-800 transition"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Nav;
