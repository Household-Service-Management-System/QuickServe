import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../Home/Nav";
import Footer from "../Home/Footer";

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });

    return (
        <>
            <Nav />

            <div className="min-h-screen bg-[#f2fbf8] flex justify-center items-start pt-36 pb-20 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
                >
                    <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
                        Create an Account
                    </h2>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Your email address"
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
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Create a strong password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sign Up As
                            </label>
                            <select
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none bg-white focus:ring-2 focus:ring-green-500"
                            >
                                <option value="customer">Customer</option>
                                <option value="provider">Service Provider</option>
                            </select>
                        </div>

                        <button className="w-full bg-green-600 text-white py-2.5 rounded-xl font-semibold hover:bg-green-700 transition">
                            Sign Up
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account?
                        <Link to="/login" className="text-green-700 font-semibold hover:underline ml-1">
                            Login
                        </Link>
                    </p>
                </motion.div>
            </div>

            <Footer />
        </>
    );
}

export default Signup;
