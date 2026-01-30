// // import "./ServiceProvider.css";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import {
// //   getAllServiceProviders,
// //   deleteServiceProvider,
// // } from "../../api/adminService";

// // export default function ServiceProvider() {
// //   const navigate = useNavigate();

// //   const [providers, setProviders] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   // ✅ FETCH ALL SERVICE PROVIDERS
// //   useEffect(() => {
// //     getAllServiceProviders()
// //       .then((response) => {
// //         console.log("Service Providers:", response.data);
// //         setProviders(response.data);
// //       })
// //       .catch((error) => {
// //         console.error("Service Providers API error:", error);
// //         if (error.response?.status === 401) {
// //           localStorage.removeItem("token");
// //           navigate("/login");
// //         }
// //       })
// //       .finally(() => setLoading(false));
// //   }, [navigate]);

// //   // ✅ SEARCH FILTER (SAFE)
// //   const filteredProviders = providers.filter((p) =>
// //     `${p.firstName ?? ""} ${p.lastName ?? ""} ${p.email ?? ""}`
// //       .toLowerCase()
// //       .includes(search.toLowerCase())
// //   );

// //   // ✅ DELETE SERVICE PROVIDER
// //   const handleDelete = async (serviceProviderId) => {
// //     const confirmDelete = window.confirm(
// //       "Are you sure you want to delete this service provider?"
// //     );

// //     if (!confirmDelete) return;

// //     try {
// //       const response = await deleteServiceProvider(serviceProviderId);

// //       alert(response.data);

// //       // ✅ UPDATE UI
// //       setProviders((prev) =>
// //         prev.filter(
// //           (p) => p.serviceProviderId !== serviceProviderId
// //         )
// //       );
// //     } catch (error) {
// //       console.error("Delete error:", error);

// //       if (error.response?.status === 401) {
// //         localStorage.removeItem("token");
// //         navigate("/login");
// //       } else if (error.response?.status === 403) {
// //         alert("Access denied ❌");
// //       } else {
// //         alert("Delete failed ❌");
// //       }
// //     }
// //   };

// //   if (loading) {
// //     return <h2 style={{ padding: "20px" }}>Loading Service Providers...</h2>;
// //   }

// //   return (
// //     <div className="layout">
// //       {/* SIDEBAR */}
// //       <aside className="sidebar">
// //         <h2 className="logo">QuickServe</h2>
// //         <p className="panel-text">Admin Panel</p>

// //         <nav className="menu">
// //           <Link to="/admin/dashboard" className="menu-item">
// //             Dashboard
// //           </Link>
// //           <Link to="/admin/complaint" className="menu-item">
// //             Complaint
// //           </Link>
// //           <Link
// //             to="/admin/service-providers"
// //             className="menu-item active"
// //           >
// //             Service Provider
// //           </Link>
// //           <Link to="/admin/pending-requests" className="menu-item">
// //             Pending Request
// //           </Link>
// //           <Link to="/admin/payment-list" className="menu-item">
// //             Payment
// //           </Link>
// //           <Link to="/admin/settings" className="menu-item">
// //             Setting
// //           </Link>
// //         </nav>

// //         <button
// //           className="logout-btn"
// //           onClick={() => {
// //             localStorage.removeItem("token");
// //             navigate("/login");
// //           }}
// //         >
// //           Logout
// //         </button>
// //       </aside>

// //       {/* MAIN CONTENT */}
// //       <main className="content">
// //         <h1 className="page-title">Service Providers</h1>

// //         <input
// //           type="text"
// //           className="search-bar"
// //           placeholder="Search by name or email"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />

// //         <table className="custom-table">
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Name</th>
// //               <th>Email</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {filteredProviders.length === 0 ? (
// //               <tr>
// //                 <td colSpan="4" style={{ textAlign: "center" }}>
// //                   No Service Providers Found
// //                 </td>
// //               </tr>
// //             ) : (
// //               filteredProviders.map((sp) => (
// //                 <tr key={sp.serviceProviderId}>
// //                   <td>{sp.serviceProviderId}</td>
// //                   <td>
// //                     {sp.firstName} {sp.lastName}
// //                   </td>
// //                   <td>{sp.email}</td>
// //                   <td>
// //                     <button
// //                       className="view-btn"
// //                       onClick={() =>
// //                         navigate(
// //                           `/admin/service-providers/${sp.serviceProviderId}`
// //                         )
// //                       }
// //                     >
// //                       View
// //                     </button>

// //                     <button
// //                       className="delete-btn"
// //                       onClick={() =>
// //                         handleDelete(sp.serviceProviderId)
// //                       }
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </main>
// //     </div>
// //   );
// // }
// // VERIFIED SERVICE PROVIDERS
// // src/pages/admin/ServiceProvider.jsx

// import "./ServiceProvider.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   getAllServiceProviders,
//   deleteServiceProvider,
// } from "../../api/adminService";

// export default function ServiceProvider() {
//   const navigate = useNavigate();

//   const [providers, setProviders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAllServiceProviders()
//       .then((response) => setProviders(response.data))
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [navigate]);

//   const filteredProviders = providers.filter((p) =>
//     `${p.firstName ?? ""} ${p.lastName ?? ""} ${p.email ?? ""}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const handleDelete = async (serviceProviderId) => {
//     if (!window.confirm("Delete this service provider?")) return;
//     await deleteServiceProvider(serviceProviderId);
//     setProviders((prev) =>
//       prev.filter((p) => p.serviceProviderId !== serviceProviderId)
//     );
//   };

//   if (loading) return <h2>Loading Service Providers...</h2>;

//   return (
//     <div className="layout">
//       <main className="content">
//         <h1 className="page-title">Service Providers</h1>

//         <input
//           className="search-bar"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by name or email"
//         />

//         <table className="custom-table">
//           <thead>
//             <tr>
//               <th>ID</th><th>Name</th><th>Email</th><th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProviders.map((sp) => (
//               <tr key={sp.serviceProviderId}>
//                 <td>{sp.serviceProviderId}</td>
//                 <td>{sp.firstName} {sp.lastName}</td>
//                 <td>{sp.email}</td>
//                 <td>
//                   <button
//                     className="view-btn"
//                     onClick={() =>
//                       navigate(`/admin/service-providers/${sp.serviceProviderId}`)
//                     }
//                   >
//                     View
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => handleDelete(sp.serviceProviderId)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </main>
//     </div>
//   );
// }
import "./ServiceProvider.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllServiceProviders,
  deleteServiceProvider,
} from "../../api/adminService";

export default function ServiceProvider() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllServiceProviders()
      .then(res => setProviders(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = providers.filter(p =>
    `${p.firstName} ${p.lastName} ${p.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this provider?")) return;
    await deleteServiceProvider(id);
    setProviders(prev => prev.filter(p => p.serviceProviderId !== id));
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin/dashboard" className="menu-item">Dashboard</Link>
          <Link to="/admin/complaint" className="menu-item">Complaint</Link>
          <Link to="/admin/service-providers" className="menu-item active">
            Service Provider
          </Link>
          <Link to="/admin/pending-requests" className="menu-item">
            Pending Request
          </Link>
          <Link to="/admin/payment-list" className="menu-item">Payment</Link>
          <Link to="/admin/settings" className="menu-item">Setting</Link>
        </nav>

        <button className="logout-btn" onClick={() => navigate("/login")}>
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="content">
        <h1 className="page-title">Service Providers</h1>

        <input
          className="search-bar"
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(sp => (
              <tr key={sp.serviceProviderId}>
                <td>{sp.serviceProviderId}</td>
                <td>{sp.firstName} {sp.lastName}</td>
                <td>{sp.email}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate(`/admin/service-providers/${sp.serviceProviderId}`)
                    }
                  >
                    View
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(sp.serviceProviderId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
