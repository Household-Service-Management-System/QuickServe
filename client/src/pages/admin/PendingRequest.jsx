// // import { Link, useNavigate } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { getPendingRequests } from "../../api/adminService";
// // import "./PendingRequest.css";

// // export default function PendingRequest() {
// //   const navigate = useNavigate();

// //   const [requests, setRequests] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     getPendingRequests()
// //       .then((response) => {
// //         setRequests(response.data);
// //       })
// //       .catch((error) => {
// //         console.error("Pending Requests API error:", error);
// //         if (error.response?.status === 401) {
// //           localStorage.removeItem("token");
// //           navigate("/login");
// //         }
// //       })
// //       .finally(() => setLoading(false));
// //   }, [navigate]);

// //   // 🔍 Search filter
// //   const filteredRequests = requests.filter(
// //     (r) =>
// //       r.firstName.toLowerCase().includes(search.toLowerCase()) ||
// //       r.lastName.toLowerCase().includes(search.toLowerCase()) ||
// //       r.email.toLowerCase().includes(search.toLowerCase())
// //   );

// //   if (loading) {
// //     return <h2 style={{ padding: "20px" }}>Loading Pending Requests...</h2>;
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
// //           <Link to="/admin/service-providers" className="menu-item">
// //             Service Provider
// //           </Link>
// //           <Link
// //             to="/admin/pending-requests"
// //             className="menu-item active"
// //           >
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
// //         <h1 className="page-title">Pending Requests</h1>

// //         {/* SEARCH */}
// //         <input
// //           type="text"
// //           className="search-bar"
// //           placeholder="Search by name or email"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />

// //         {/* TABLE */}
// //         <div className="card">
// //           <div className="table-wrapper">
// //             <table className="custom-table">
// //               <thead>
// //                 <tr>
// //                   <th>ID</th>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                   <th>Action</th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {filteredRequests.length === 0 ? (
// //                   <tr>
// //                     <td colSpan="4" style={{ textAlign: "center" }}>
// //                       No Pending Requests
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   filteredRequests.map((req) => (
// //                     <tr key={req.serviceProviderId}>
// //                       <td>{req.serviceProviderId}</td>
// //                       <td>
// //                         {req.firstName} {req.lastName}
// //                       </td>
// //                       <td>{req.email}</td>
// //                       <td>
// //                        <Link
// //   to={`/admin/service-providers/${req.serviceProviderId}`}
// // >
// //   <button className="view-btn">View</button>
// // </Link>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// // UNVERIFIED SERVICE PROVIDERS
// // src/pages/admin/PendingRequest.jsx

// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getPendingRequests } from "../../api/adminService";
// import "./PendingRequest.css";

// export default function PendingRequest() {
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getPendingRequests()
//       .then((res) => setRequests(res.data))
//       .finally(() => setLoading(false));
//   }, []);

//   const filteredRequests = requests.filter(
//     (r) =>
//       r.firstName.toLowerCase().includes(search.toLowerCase()) ||
//       r.lastName.toLowerCase().includes(search.toLowerCase()) ||
//       r.email.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) return <h2>Loading Pending Requests...</h2>;

//   return (
//     <div className="layout">
//       <main className="content">
//         <h1 className="page-title">Pending Requests</h1>

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
//             {filteredRequests.map((req) => (
//               <tr key={req.serviceProviderId}>
//                 <td>{req.serviceProviderId}</td>
//                 <td>{req.firstName} {req.lastName}</td>
//                 <td>{req.email}</td>
//                 <td>
//                   <Link
//                     to={`/admin/service-providers/${req.serviceProviderId}`}
//                   >
//                     <button className="view-btn pending-view-btn">
//                       View
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </main>
//     </div>
//   );
// }
import "./PendingRequest.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPendingRequests } from "../../api/adminService";

export default function PendingRequest() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPendingRequests()
      .then(res => setRequests(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = requests.filter(r =>
    `${r.firstName} ${r.lastName} ${r.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="layout">
    

      {/* CONTENT */}
      <main className="content">
        <h1 className="page-title">Pending Requests</h1>

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
            {filtered.map(req => (
              <tr key={req.serviceProviderId}>
                <td>{req.serviceProviderId}</td>
                <td>{req.firstName} {req.lastName}</td>
                <td>{req.email}</td>
                <td>
                  <Link to={`/admin/service-providers/${req.serviceProviderId}`}>
                    <button className="view-btn pending-view-btn">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
