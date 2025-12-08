import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditService() {
    const navigate = useNavigate();
    const { id } = useParams();


    const mockServices = {
        s1: {
            name: "AC Repair",
            category: "Home Appliances",
            price: 500,
            duration: "1 hour",
            description: "AC cooling issue, cleaning, maintenance and repair.",
            active: true,
            image: null,
        },
        s2: {
            name: "Electrical Wiring",
            category: "Electrical",
            price: 350,
            duration: "45 mins",
            description: "Fix wiring faults, switches, and short-circuit issues.",
            active: true,
            image: null,
        },
        s3: {
            name: "Plumbing",
            category: "Plumbing",
            price: 700,
            duration: "1 hour",
            description: "Fix pipe leakage, taps, bathroom fittings and more.",
            active: false,
            image: null,
        },
    };

    const [service, setService] = useState(null);


    useEffect(() => {
        if (mockServices[id]) {
            setService(mockServices[id]);
        }
    }, [id]);

    if (!service) {
        return <div className="p-6 text-center text-gray-500">Loading service...</div>;
    }

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
        console.log("Updated Service:", service);
        alert("Service updated successfully (static example)");
        navigate("/service-provider/services");
    };

    return (
        <div className="p-4 md:p-6 min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md border">

                <h1 className="text-2xl font-semibold text-gray-800 mb-1">Edit Service</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Update details for: <span className="font-medium text-gray-700">{service.name}</span>
                </p>

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
                            <option value="Home Appliances">Home Appliances</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Plumbing">Plumbing</option>
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
                            Update Service
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
