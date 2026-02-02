// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Nav from "../Home/Nav";
// import Footer from "../Home/Footer";

// const Signup = () => {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         role: "customer",
//     });

//     return (
//         <>
//             <Nav />

//             <div className="min-h-screen bg-[#f2fbf8] flex justify-center items-start pt-36 pb-20 px-4">
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
//                 >
//                     <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
//                         Create an Account
//                     </h2>

//                     <form className="space-y-5">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Full Name
//                             </label>
//                             <input
//                                 type="text"
//                                 value={form.name}
//                                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                                 className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Your full name"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 value={form.email}
//                                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                                 className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Your email address"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 value={form.password}
//                                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                                 className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Create a strong password"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Sign Up As
//                             </label>
//                             <select
//                                 value={form.role}
//                                 onChange={(e) => setForm({ ...form, role: e.target.value })}
//                                 className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none bg-white focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="customer">Customer</option>
//                                 <option value="provider">Service Provider</option>
//                             </select>
//                         </div>

//                         <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition">
//                             Sign Up
//                         </button>
//                     </form>

//                     <p className="text-sm text-center text-gray-600 mt-4">
//                         Already have an account?
//                         <Link to="/login" className="text-blue-700 font-semibold hover:underline ml-1">
//                             Login
//                         </Link>
//                     </p>
//                 </motion.div>
//             </div>

//             <Footer />
//         </>
//     );
// }

// export default Signup;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../Home/Nav";
import Footer from "../Home/Footer";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        role: "customer",
    });

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                password: form.password,
            };

            if (form.role === "customer") {
                await axios.post(
                    "http://13.60.193.121:8080/auth/register/customer",
                    payload
                );
            } else {
                await axios.post(
                    "http://13.60.193.121:8080/auth/register/provider",
                    payload
                );
            }

            alert("Registration successful. Please login.");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
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
                        Create Your QuickServe Account
                    </h2>

                    <form onSubmit={handleSignup} className="space-y-5">

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={form.firstName}
                                    onChange={(e) =>
                                        setForm({ ...form, firstName: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="First name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={form.lastName}
                                    onChange={(e) =>
                                        setForm({ ...form, lastName: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Last name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="10-digit phone number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="Create a password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sign Up As
                            </label>
                            <select
                                value={form.role}
                                onChange={(e) =>
                                    setForm({ ...form, role: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="customer">Customer</option>
                                <option value="provider">Service Provider</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account?
                        <Link
                            to="/login"
                            className="text-blue-700 font-semibold hover:underline ml-1"
                        >
                            Login
                        </Link>
                    </p>
                </motion.div>
            </div>

            <Footer />
        </>
    );
};

export default Signup;
