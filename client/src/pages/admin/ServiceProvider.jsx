import "./ServiceProvider.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ServiceProvider() {

  const [providers, setProviders] = useState([
    { id: 1, name: "ABV", email: "Ab@gmail.com", status: "" }
  ]);

  // IGNORE → Show ❌ Cross
  const handleIgnore = (id) => {
    setProviders(
      providers.map(p =>
        p.id === id ? { ...p, status: "ignored" } : p
      )
    );
  };

  // BLOCK → Show ✅ Tick
  const handleBlock = (id) => {
    setProviders(
      providers.map(p =>
        p.id === id ? { ...p, status: "blocked" } : p
      )
    );
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin" className="menu-item">Dashboard</Link>
          <Link to="/admin/customer" className="menu-item">Customer</Link>
          <Link to="/admin/serviceProvider" className="menu-item active">Service Provider</Link>
          <Link to="/admin/pendingRequest" className="menu-item">Pending Request</Link>
          <Link to="/admin/paymentList" className="menu-item">Payment</Link>
          <Link to="/admin/setting" className="menu-item">Setting</Link>
        </nav>

     <Link to="/admin/logout">
  <button className="logout-btn">Logout</button>
</Link>

      </aside>

      {/* MAIN CONTENT */}
      <main className="content">

        <h1 className="page-title">Service Provider List</h1>

        <div className="card">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Service Provider ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>View Complaint</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {providers.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.email}</td>

                  {/* View Complaint */}
                  <td>
                    <Link to="/admin/viewComplaint">
                      <button className="view-btn">View</button>
                    </Link>
                  </td>

                  {/* ACTION BUTTONS / STATUS */}
                  <td>
                    {p.status === "" && (
                      <>
                        <button
                          className="ignore-btn"
                          onClick={() => handleIgnore(p.id)}
                        >
                          Ignore
                        </button>

                        <button
                          className="block-btn"
                          onClick={() => handleBlock(p.id)}
                        >
                          Block
                        </button>
                      </>
                    )}

                    {p.status === "ignored" && (
                      <span style={{ color: "red", fontSize: "20px" }}>
                        ❌ Ignored
                      </span>
                    )}

                    {p.status === "blocked" && (
                      <span style={{ color: "green", fontSize: "20px" }}>
                        ✅ Blocked
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BACK BUTTON */}
        <div className="back-container">
          <Link to="/admin">
            <button className="back-btn">Back</button>
          </Link>
        </div>

      </main>
    </div>
  );
}
