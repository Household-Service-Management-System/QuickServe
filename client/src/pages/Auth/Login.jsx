import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../Home/Nav";
import Footer from "../Home/Footer";
import { loginUser } from "../../api/authService";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // where user should go after login
  const redirectPath = location.state?.from || "/";

  // Yashraj

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        email: form.email,
        password: form.password,
      });

      //  Store auth data
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("user", JSON.stringify(res));

      // toast.dismiss(loadingToast);
      toast.success("Login successful 🎉"); // ✅

      //  Redirect logic
      if (res.role === "ROLE_ADMIN") {
        navigate("/admin", { replace: true });
      } else if (res.role === "ROLE_SERVICEPROVIDER") {
        navigate("/service-provider", { replace: true });
      } else {
        // USER → go back to where they came from (mobile + desktop safe)
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      // toast.dismiss(loadingToast);
      toast.error(
        err.response?.data?.message || "Invalid email or password ❌");
    }
  };

  return (
    <>
      <Nav />

      <div className="min-h-screen bg-[#f2fbf8] flex justify-center items-start pt-36 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
            Login to QuickServe
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div> */}

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-700 font-semibold hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
