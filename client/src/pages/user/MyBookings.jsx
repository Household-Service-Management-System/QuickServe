import React, { useState } from "react";
import {
  Typography,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PaymentIcon from "@mui/icons-material/Payment";
import FeedbackIcon from "@mui/icons-material/Feedback";

import PaymentPopup from "../../components/popups/PaymentPopup";
import FeedbackPopup from "../../components/popups/FeedbackPopup";

/**
 * MyBookings (table) — uses in-memory bookings state.
 * Clicking Pay opens PaymentPopup which can mark booking as Paid.
 * PaymentPopup will call onPaid(id) to notify this component.
 */

export default function MyBookings() {
  const [search, setSearch] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // bookings state — in real app fetch from API and keep in top-level store
  const [bookings, setBookings] = useState([
    {
      id: 1,
      service: "AC Repair",
      provider: "John Doe",
      amount: 499,
      status: "Pending",
      paymentId: "PAY2910",
      txnId: null,
      mode: null,
      date: "2025-02-10",
    },
    {
      id: 2,
      service: "Home Cleaning",
      provider: "Alex Smith",
      amount: 899,
      status: "Completed",
      paymentId: "PAY5588",
      txnId: "TXN003344",
      mode: "Cash",
      date: "2025-02-08",
    },
    {
      id: 3,
      service: "Electrician",
      provider: "Maya Khan",
      amount: 750,
      status: "Pending",
      paymentId: "PAY7777",
      txnId: null,
      mode: null,
      date: "2025-02-15",
    },
  ]);

  // called by PaymentPopup when payment completes
  const handleMarkPaid = (id, txnId, mode) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "Paid", txnId, mode, date: b.date } : b
      )
    );
    setSelectedPayment(null);
    alert("Payment recorded ✅");
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        My Bookings
      </Typography>

      {/* Search */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <TextField
          variant="outlined"
          placeholder="Search by service or provider..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <IconButton aria-label="search"><SearchIcon /></IconButton>
      </div>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Service</strong></TableCell>
              <TableCell><strong>Provider</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Pay</strong></TableCell>
              <TableCell><strong>Feedback</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bookings
              .filter(
                (b) =>
                  b.service.toLowerCase().includes(search.toLowerCase()) ||
                  (b.provider || "").toLowerCase().includes(search.toLowerCase())
              )
              .map((b) => (
                <TableRow key={b.id} style={{ transition: "background .25s ease" }}>
                  <TableCell>{b.service}</TableCell>
                  <TableCell>{b.provider}</TableCell>
                  <TableCell style={{ color: b.status === "Paid" ? "#16a34a" : b.status === "Pending" ? "#d97706" : "#6b7280", fontWeight: 600 }}>
                    {b.status}
                  </TableCell>
                  <TableCell>₹ {b.amount}</TableCell>
                  <TableCell>{b.date}</TableCell>

                  <TableCell>
                    {b.status === "Pending" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<PaymentIcon />}
                        onClick={() => setSelectedPayment(b)}
                      >
                        Pay
                      </Button>
                    ) : (
                      <span style={{ color: "#6b7280" }}>—</span>
                    )}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => setSelectedFeedback(b)}
                    >
                      <FeedbackIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment popup */}
      {selectedPayment && (
        <PaymentPopup
          data={selectedPayment}
          onClose={() => setSelectedPayment(null)}
          onPaid={(txnId, mode) => handleMarkPaid(selectedPayment.id, txnId, mode)}
        />
      )}

      {/* Feedback popup */}
      {selectedFeedback && (
        <FeedbackPopup
          booking={selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
        />
      )}
    </div>
  );
}
