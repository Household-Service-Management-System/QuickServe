import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddService() {
    const navigate = useNavigate();
    const providerId = 2; // TODO: replace with auth later

    const [services, setServices] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState("");

    // Load all available services
    useEffect(() => {
        axios.get("http://localhost:8080/services")
            .then(res => setServices(res.data))
            .catch(err => {
                console.error(err);
                alert("Failed to load services");
            });
    }, []);

    // Add service to provider
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedServiceId) {
            alert("Please select a service");
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/service-provider/${providerId}/services/${selectedServiceId}`
            );
            alert("Service added to your profile");
            navigate("/service-provider/services");
        } catch (err) {
            console.error(err);
            alert("Failed to add service");
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow border">

                <h1 className="text-xl font-semibold mb-4">Add Service</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium">Select Service</label>
                        <select
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                            className="mt-1 w-full border rounded px-3 py-2"
                        >
                            <option value="">-- Select --</option>

                            {services.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.name} ({s.categoryName}) — ₹{s.basePrice}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/service-provider/services")}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Add Service
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
