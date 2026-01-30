// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function EditService() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [service, setService] = useState({
//         name: "",
//         basePrice: "",
//         duration: "",
//         categoryId: "",
//         isAvailable: ""
//     });
//     const [loading, setLoading] = useState(true);
//     const [categories, setCategories] = useState([]);


//     //to get basic initial details 
//     useEffect(() => {
//         axios.get(`http://localhost:8080/services/${id}`)
//             .then(res => {
//                 const s = res.data;
//                 setService({
//                     name: s.name,
//                     basePrice: s.basePrice,
//                     duration: s.duration,
//                     categoryId: "",
//                     isAvailable: s.status
//                 });
//             })
//             .catch(() => alert("Failed to load service"))
//             .finally(() => setLoading(false));
//     }, [id]);


//     //to get all available categories 
//     useEffect(() => {
//         axios.get("http://localhost:8080/service-categories")
//             .then(res => setCategories(res.data))
//             .catch(() => alert("Failed to load categories"));
//     }, []);



//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setService(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const payload = {
//             name: service.name,
//             basePrice: Number(service.basePrice),
//             duration: Number(service.duration),
//             categoryId: Number(service.categoryId),
//             isAvailable: service.isAvailable
//         };

//         try {
//             await axios.put(`http://localhost:8080/services/${id}`, payload);
//             alert("Service updated successfully");
//             navigate("/service-provider/services");
//         } catch {
//             alert("Update failed");
//         }
//     };

//     if (loading) return <div className="p-6 text-center">Loading service...</div>;

//     return (
//         <div className="p-4 bg-gray-50 min-h-screen">
//             <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
//                 <h1 className="text-xl font-bold mb-4">Edit Service</h1>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         name="name"
//                         value={service.name}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded"
//                         placeholder="Service Name"
//                     />

//                     <input
//                         type="number"
//                         name="basePrice"
//                         value={service.basePrice}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded"
//                         placeholder="Price"
//                     />

//                     <input
//                         type="number"
//                         name="duration"
//                         value={service.duration}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded"
//                         placeholder="Duration (minutes)"
//                     />

//                     <select
//                         name="categoryId"
//                         value={service.categoryId}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded"
//                         required
//                     >
//                         <option value="">-- Select Category --</option>
//                         {categories.map(c => (
//                             <option key={c.id} value={c.id}>
//                                 {c.name}
//                             </option>
//                         ))}
//                     </select>

//                     <select
//                         name="isAvailable"
//                         value={service.isAvailable}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded"
//                     >
//                         <option value="ACTIVE">Available</option>
//                         <option value="INACTIVE">Unavailable</option>
//                     </select>

//                     <div className="flex justify-end gap-3">
//                         <button
//                             type="button"
//                             onClick={() => navigate(-1)}
//                             className="px-4 py-2 border rounded"
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blue-600 text-white rounded"
//                         >
//                             Update
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getServiceById,
    getServiceCategories,
    updateService,
} from "../../api/serviceProviderService";

export default function EditService() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState({
        name: "",
        basePrice: "",
        duration: "",
        categoryId: "",
        isAvailable: "ACTIVE",
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load service details
    useEffect(() => {
        fetchService();
        fetchCategories();
    }, [id]);

    const fetchService = async () => {
        try {
            const res = await getServiceById(id);
            const s = res.data;

            setService({
                name: s.name,
                basePrice: s.basePrice,
                duration: s.duration,
                categoryId: s.category?.id || "",
                isAvailable: s.status || "ACTIVE",
            });
        } catch {
            alert("Failed to load service");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await getServiceCategories();
            setCategories(res.data);
        } catch {
            alert("Failed to load categories");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: service.name,
            basePrice: Number(service.basePrice),
            duration: Number(service.duration),
            categoryId: Number(service.categoryId),
            isAvailable: service.isAvailable,
        };

        try {
            await updateService(id, payload);
            alert("Service updated successfully");
            navigate("/service-provider/services");
        } catch {
            alert("Update failed");
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading service...</div>;
    }

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

                <h1 className="text-xl font-bold mb-4">Edit Service</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="name"
                        value={service.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Service Name"
                        required
                    />

                    <input
                        type="number"
                        name="basePrice"
                        value={service.basePrice}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Price"
                        required
                    />

                    <input
                        type="number"
                        name="duration"
                        value={service.duration}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Duration (minutes)"
                        required
                    />

                    <select
                        name="categoryId"
                        value={service.categoryId}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <select
                        name="isAvailable"
                        value={service.isAvailable}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="ACTIVE">Available</option>
                        <option value="INACTIVE">Unavailable</option>
                    </select>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Update
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
