
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    PencilSquareIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

export default function ManageServices() {
    const navigate = useNavigate();

    const [services, setServices] = useState([
        { id: "s1", name: "AC Repair", category: "Home Appliances", price: 500, active: true },
        { id: "s2", name: "Electrical Wiring", category: "Electrical", price: 350, active: true },
        { id: "s3", name: "Plumbing", category: "Plumbing", price: 700, active: false },
    ]);

    const toggleActive = (id) => {
        setServices((prev) =>
            prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
        );
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this service?")) {
            setServices((prev) => prev.filter((s) => s.id !== id));
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-sm border">


                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Manage Services</h1>
                        <p className="text-sm text-gray-500">View, edit or disable your services</p>
                    </div>

                    <button
                        onClick={() => navigate("/service-provider/services/add")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Add Service
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-600">
                                <th className="p-3">Service</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {services.map((s) => (
                                <tr key={s.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{s.name}</td>
                                    <td className="p-3 text-gray-700">{s.category}</td>
                                    <td className="p-3 font-medium">₹{s.price}</td>

                                    <td className="p-3">
                                        <button
                                            onClick={() => toggleActive(s.id)}
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${s.active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {s.active ? (
                                                <CheckCircleIcon className="w-4 h-4" />
                                            ) : (
                                                <XCircleIcon className="w-4 h-4" />
                                            )}
                                            {s.active ? "Active" : "Inactive"}
                                        </button>
                                    </td>

                                    <td className="p-3 flex justify-end gap-3">
                                        <button
                                            onClick={() =>
                                                navigate(`/service-provider/services/edit/${s.id}`)
                                            }
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 text-gray-700" />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(s.id)}
                                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100"
                                        >
                                            <TrashIcon className="w-5 h-5 text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}
