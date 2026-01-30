// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//     PencilSquareIcon,
//     TrashIcon,
//     CheckCircleIcon,
//     XCircleIcon,
// } from "@heroicons/react/24/outline";
// import { getMyServices, removeService } from "../../api/serviceProviderService";


// export default function ManageServices() {
//     const navigate = useNavigate();


//     const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchServices();
//     }, []);

//     const fetchServices = async () => {
//         try {
//             const res = await axios.get(
//                 `http://localhost:8080/service-provider/${providerId}/services`
//             );
//             setServices(res.data);
//         } catch (err) {
//             console.error("Failed to load services", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (serviceId) => {
//         if (!window.confirm("Remove this service from your profile?")) return;

//         try {
//             await axios.delete(
//                 `http://localhost:8080/service-provider/${providerId}/services/${serviceId}`
//             );

//             // update UI
//             setServices(prev =>
//                 prev.filter(s => s.id !== serviceId)
//             );
//         } catch (err) {
//             alert("Failed to remove service");
//         }
//     };

//     if (loading) {
//         return <div className="p-6 text-center">Loading services...</div>;
//     }

//     return (
//         <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//             <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-sm border">

//                 <div className="flex justify-between items-center mb-5">
//                     <div>
//                         <h1 className="text-2xl font-semibold text-gray-800">
//                             Manage Services
//                         </h1>
//                         <p className="text-sm text-gray-500">
//                             Services you currently offer
//                         </p>
//                     </div>

//                     <button
//                         onClick={() => navigate("/service-provider/services/add")}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     >
//                         + Add Service
//                     </button>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="w-full border-collapse text-sm">
//                         <thead>
//                             <tr className="bg-gray-100 text-left text-gray-600">
//                                 <th className="p-3">Service</th>
//                                 <th className="p-3">Category</th>
//                                 <th className="p-3">Price</th>
//                                 <th className="p-3">Status</th>
//                                 <th className="p-3 text-right">Actions</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {services.length === 0 && (
//                                 <tr>
//                                     <td
//                                         colSpan="5"
//                                         className="p-4 text-center text-gray-500"
//                                     >
//                                         No services added yet
//                                     </td>
//                                 </tr>
//                             )}

//                             {services.map((s) => (
//                                 <tr key={s.id} className="border-b hover:bg-gray-50">

//                                     <td className="p-3 font-medium text-gray-800">
//                                         {s.name}
//                                     </td>

//                                     <td className="p-3 text-gray-700">
//                                         {s.category?.name}
//                                     </td>

//                                     <td className="p-3 font-medium">
//                                         ₹{s.basePrice}
//                                     </td>

//                                     <td className="p-3">
//                                         {s.isAvailable === "ACTIVE" || s.isAvailable === "AVAILABLE" ? (
//                                             <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 w-fit">
//                                                 <CheckCircleIcon className="w-4 h-4" />
//                                                 Active
//                                             </span>
//                                         ) : (
//                                             <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 w-fit">
//                                                 <XCircleIcon className="w-4 h-4" />
//                                                 Inactive
//                                             </span>
//                                         )}
//                                     </td>

//                                     <td className="p-3 flex justify-end gap-3">
//                                         <button
//                                             onClick={() =>
//                                                 navigate(
//                                                     `/service-provider/services/edit/${s.id}`
//                                                 )
//                                             }
//                                             className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
//                                         >
//                                             <PencilSquareIcon className="w-5 h-5 text-gray-700" />
//                                         </button>

//                                         <button
//                                             onClick={() => handleDelete(s.id)}
//                                             className="p-2 rounded-lg bg-red-50 hover:bg-red-100"
//                                         >
//                                             <TrashIcon className="w-5 h-5 text-red-600" />
//                                         </button>
//                                     </td>

//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//             </div>
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    PencilSquareIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

import {
    getProviderServices,
    removeServiceFromProvider,
} from "../../api/serviceProviderService";

export default function ManageServices() {
    const navigate = useNavigate();

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await getProviderServices();
            setServices(res.data);
        } catch (err) {
            console.error("Failed to load services", err);
            alert("Failed to load services");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (serviceId) => {
        if (!window.confirm("Remove this service from your profile?")) return;

        try {
            await removeServiceFromProvider(serviceId);

            // Update UI instantly
            setServices((prev) => prev.filter((s) => s.id !== serviceId));
        } catch (err) {
            console.error(err);
            alert("Failed to remove service");
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading services...</div>;
    }

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-sm border">

                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Manage Services
                        </h1>
                        <p className="text-sm text-gray-500">
                            Services you currently offer
                        </p>
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
                            {services.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500">
                                        No services added yet
                                    </td>
                                </tr>
                            )}

                            {services.map((s) => (
                                <tr key={s.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">
                                        {s.name}
                                    </td>

                                    <td className="p-3 text-gray-700">
                                        {s.category?.name}
                                    </td>

                                    <td className="p-3 font-medium">
                                        ₹{s.basePrice}
                                    </td>

                                    <td className="p-3">
                                        {s.isAvailable === "ACTIVE" ? (
                                            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 w-fit">
                                                <CheckCircleIcon className="w-4 h-4" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 w-fit">
                                                <XCircleIcon className="w-4 h-4" />
                                                Inactive
                                            </span>
                                        )}
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
