import React, { useState, useMemo } from "react";
import {
  Typography,
  TextField,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PaymentPopup from "../../components/popups/PaymentPopup";

/**
 * Payments page (Option A) with:
 * - search (service or mode)
 * - status filter (All / Pending / Paid / Failed)
 * - date filters (today / 7 days / 30 days / all)
 * - sorting controls (amount, date, status)
 * - table + Details popup
 *
 * In-memory payments list for demo — replace with API calls in real app.
 */

function getDateDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

export default function Payments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date_desc");
  const [selectedPayment, setSelectedPayment] = useState(null);

  // demo data
  const [payments, setPayments] = useState([
    {
      id: 1,
      service: "AC Repair",
      amount: 499,
      status: "Pending",
      paymentId: "PAY2910",
      txnId: null,
      mode: null,
      date: "2025-02-10",
    },
    {
      id: 2,
      service: "Electrician",
      amount: 799,
      status: "Paid",
      paymentId: "PAY9921",
      txnId: "TXN557799",
      mode: "UPI",
      date: "2025-01-29",
    },
    {
      id: 3,
      service: "Car Wash",
      amount: 299,
      status: "Failed",
      paymentId: "PAY8823",
      txnId: "TXN884422",
      mode: "Card",
      date: "2025-01-22",
    },
    {
      id: 4,
      service: "Home Cleaning",
      amount: 1200,
      status: "Paid",
      paymentId: "PAY1010",
      txnId: "TXN101010",
      mode: "Cash",
      date: new Date().toISOString().slice(0, 10), // today
    },
  ]);

  // Build filtered + sorted list
  const filtered = useMemo(() => {
    let list = payments.filter((p) => {
      // search by service or mode
      const q = search.trim().toLowerCase();
      if (q) {
        if (!p.service.toLowerCase().includes(q) && !(p.mode || "").toLowerCase().includes(q)) {
          return false;
        }
      }
      if (statusFilter !== "All" && p.status !== statusFilter) return false;

      // date filter
      if (dateFilter === "Today") {
        const today = new Date().toISOString().slice(0, 10);
        if (p.date !== today) return false;
      } else if (dateFilter === "7") {
        const from = getDateDaysAgo(7);
        if (new Date(p.date) < from) return false;
      } else if (dateFilter === "30") {
        const from = getDateDaysAgo(30);
        if (new Date(p.date) < from) return false;
      }

      return true;
    });

    // sorting
    if (sortBy === "amount_asc") list.sort((a, b) => a.amount - b.amount);
    else if (sortBy === "amount_desc") list.sort((a, b) => b.amount - a.amount);
    else if (sortBy === "date_asc") list.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sortBy === "date_desc") list.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sortBy === "status") list.sort((a, b) => a.status.localeCompare(b.status));

    return list;
  }, [payments, search, statusFilter, dateFilter, sortBy]);

  // called by PaymentPopup when payment completes
  const handleMarkPaid = (id, txnId, mode) => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Paid", txnId, mode } : p)));
    setSelectedPayment(null);
    alert("Payment success — status updated");
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Payments
      </Typography>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service or method..."
            InputProps={{
              endAdornment: <IconButton><SearchIcon /></IconButton>,
            }}
          />
        </div>

        <FormControl size="small">
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Dates</InputLabel>
          <Select value={dateFilter} label="Dates" onChange={(e) => setDateFilter(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Sort</InputLabel>
          <Select value={sortBy} label="Sort" onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="date_desc">Date (new→old)</MenuItem>
            <MenuItem value="date_asc">Date (old→new)</MenuItem>
            <MenuItem value="amount_desc">Amount (high→low)</MenuItem>
            <MenuItem value="amount_asc">Amount (low→high)</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Table (Option A style) */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>
            <th style={{ padding: 10 }}>Service</th>
            <th style={{ padding: 10 }}>Amount</th>
            <th style={{ padding: 10 }}>Status</th>
            <th style={{ padding: 10 }}>Mode</th>
            <th style={{ padding: 10 }}>Date</th>
            <th style={{ padding: 10 }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9", transition: "opacity .35s ease, transform .35s ease", opacity: 1 }}>
              <td style={{ padding: 10 }}>{p.service}</td>
              <td style={{ padding: 10 }}>₹{p.amount}</td>
              <td style={{ padding: 10, color: p.status === "Paid" ? "#16a34a" : p.status === "Pending" ? "#d97706" : "#dc2626", fontWeight: 600 }}>
                {p.status}
              </td>
              <td style={{ padding: 10 }}>{p.mode || "-"}</td>
              <td style={{ padding: 10 }}>{p.date}</td>
              <td style={{ padding: 10 }}>
                <button
                  onClick={() => setSelectedPayment(p)}
                  style={{ background: "#2563eb", color: "#fff", padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer" }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} style={{ padding: 20, textAlign: "center", color: "#6b7280" }}>
                No payments found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Details / Payment popup */}
      {selectedPayment && (
        <PaymentPopup
          data={selectedPayment}
          onClose={() => setSelectedPayment(null)}
          onPaid={(txnId, mode) => handleMarkPaid(selectedPayment.id, txnId, mode)}
        />
      )}
    </div>
  );
}
