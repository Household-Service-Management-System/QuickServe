import "./Customer.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Customer() {

  const [customers, setCustomers] = useState([
    { id: 101, name: "ABC", email: "abc@gmail.com", status: "" }
  ]);

  // IGNORE → Show Red Cross
  const handleIgnore = (id) => {
    setCustomers(customers.map(c => 
      c.id === id ? { ...c, status: "ignored" } : c
    ));
  };

  // BLOCK / ACTION DONE → Show Green Tick
  const handleBlock = (id) => {
    setCustomers(customers.map(c => 
      c.id === id ? { ...c, status: "done" } : c
    ));
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin" className="menu-item">Dashboard</Link>
          <Link to="/admin/customer" className="menu-item active">Customer</Link>
          <Link to="/admin/serviceProvider" className="menu-item">Service Provider</Link>
          <Link to="/admin/pendingRequest" className="menu-item">Pending Request</Link>
          <Link to="/admin/paymentList" className="menu-item">Payment</Link>
          <Link to="/admin/setting" className="menu-item">Setting</Link>
        </nav>

     <Link to="/admin/logout">
  <button className="logout-btn">Logout</button>
</Link>

      </aside>

      {/* Main Content */}
      <main className="content">

        <h1 className="page-title">Customer List</h1>
  <input
          type="text"
          className="search-bar"
          placeholder="Search..."
        />
        <div className="card">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>View Complaint</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((cust) => (
                <tr key={cust.id}>
                  <td>{cust.id}</td>
                  <td>{cust.name}</td>
                  <td>{cust.email}</td>

                  <td>
                    <Link to="/admin/viewComplaint">
                      <button className="view-btn">View</button>
                    </Link>
                  </td>

                  <td>
                    {/* STATUS LOGIC */}
                    {cust.status === "" && (
                      <>
                        <button
                          className="ignore-btn"
                          onClick={() => handleIgnore(cust.id)}
                        >
                          Ignore
                        </button>

                        <button
                          className="block-btn"
                          onClick={() => handleBlock(cust.id)}
                        >
                          Action
                        </button>
                      </>
                    )}

                    {cust.status === "ignored" && (
                      <span style={{ color: "red", fontSize: "20px" }}>❌ Ignored</span>
                    )}

                    {cust.status === "done" && (
                      <span style={{ color: "green", fontSize: "20px" }}>✅ Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        <div className="back-container">
          <Link to="/admin">
            <button className="back-btn">Back</button>
          </Link>
        </div>

      </main>
    </div>
  );
}
