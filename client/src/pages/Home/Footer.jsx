// Footer.jsx
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">QuickServe</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted platform for professional home services — cleaning,
            repairs, maintenance & beauty services at your doorstep.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Press
              </Link>
            </li>
          </ul>
        </div>

        {/* For Customers */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            For Customers
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Help & Support
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Book a Service
              </Link>
            </li>
          </ul>
        </div>

        {/* For Partners */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            For Partners
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Join as Professional
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Partner Login
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Training
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Partner Policies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} QuickServe. Created for educational
            purposes.
          </p>

          {/* Socials */}
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
