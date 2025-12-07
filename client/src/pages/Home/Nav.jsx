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
        <Link to="/" className="text-2xl font-extrabold text-green-700">
          QuickServe
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <Link to="/services" className="hover:text-green-700">Services</Link>
          <Link to="/how-it-works" className="hover:text-green-700">How It Works</Link>
          <Link to="/about" className="hover:text-green-700">About</Link>
          <Link to="/support" className="hover:text-green-700">Support</Link>

          <Link
            to="/auth/login"
            className="px-4 py-2 rounded-full border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/auth/signup"
            className="px-5 py-2 rounded-full bg-green-700 text-white font-semibold hover:bg-green-800 transition"
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
          <Link to="/" className="block hover:text-green-700">Home</Link>
          <Link to="/services" className="block hover:text-green-700">Services</Link>
          <Link to="/how-it-works" className="block hover:text-green-700">How It Works</Link>
          <Link to="/about" className="block hover:text-green-700">About</Link>
          <Link to="/support" className="block hover:text-green-700">Support</Link>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/auth/login"
              className="px-4 py-2 rounded-full border border-green-700 text-green-700 text-center hover:bg-green-700 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/auth/signup"
              className="px-5 py-2 rounded-full bg-green-700 text-white text-center font-semibold hover:bg-green-800 transition"
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
