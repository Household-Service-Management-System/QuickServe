import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddService() {
    const navigate = useNavigate();

    const [service, setService] = useState({
        name: "",
        category: "",
        price: "",
        duration: "",
        description: "",
        active: true,
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggle = () => {
        setService((prev) => ({ ...prev, active: !prev.active }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setService((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Service Added:", service);
        alert("Service added successfully (static example)");
        navigate("/service-provider/services");
    };

    return (
        <div className="p-4 md:p-6 min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md border">

                <h1 className="text-2xl font-semibold text-gray-800 mb-1">Add New Service</h1>
                <p className="text-sm text-gray-500 mb-6">Create a new service listing for customers.</p>

                <form onSubmit={handleSubmit} className="space-y-6">


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Service Name</label>
                        <input
                            type="text"
                            name="name"
                            value={service.name}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800"
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={service.category}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="AC Repair">AC Repair</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="Painting">Painting</option>
                        </select>
                    </div>


                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={service.price}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estimated Duration</label>
                            <input
                                type="text"
                                name="duration"
                                placeholder="e.g., 1 hour, 30 mins"
                                value={service.duration}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800"
                                required
                            />
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            value={service.description}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800"
                            required
                        ></textarea>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Service Image</label>
                        <input type="file" onChange={handleImageUpload} accept="image/*" className="mt-1" />

                        {service.image && (
                            <img
                                src={service.image}
                                alt="Preview"
                                className="mt-3 w-32 h-32 object-cover rounded-lg border"
                            />
                        )}
                    </div>


                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-gray-700">Active Status</label>
                        <button
                            type="button"
                            onClick={handleToggle}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium ${service.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {service.active ? "Active" : "Inactive"}
                        </button>
                    </div>


                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/service-provider/services")}
                            className="px-4 py-2 border rounded-lg text-gray-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Save Service
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
