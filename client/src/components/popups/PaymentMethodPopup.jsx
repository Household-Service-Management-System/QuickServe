import React, { useState } from "react";
import "./Popup.css";

/**
 * PaymentMethodPopup: choose UPI/Card/Netbanking, simulate payment result.
 * Props:
 *   - data
 *   - onClose
 *   - onPaid(txnId, mode)
 */

export default function PaymentMethodPopup({ data, onClose, onPaid }) {
  const [method, setMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  function simulatePayment() {
    setProcessing(true);
    setTimeout(() => {
      const txnId = `TXN${Math.floor(Math.random() * 900000) + 100000}`;
      // call parent callback
      if (onPaid) onPaid(txnId, method);
      setProcessing(false);
      if (onClose) onClose();
      alert(`Payment successful (Txn: ${txnId})`);
    }, 1200);
  }

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Choose Payment Method</h3>

        <div style={{ marginTop: 10 }}>
          <label style={{ display: "block", marginBottom: 8 }}>Method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6 }}>
            <option value="UPI">UPI / GPay / PhonePe</option>
            <option value="Card">Debit / Credit Card</option>
            <option value="Netbanking">Netbanking</option>
            <option value="Wallet">Wallet</option>
          </select>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button className="close-btn" onClick={onClose}>Cancel</button>
          <button className="pay-btn" onClick={simulatePayment} disabled={processing}>
            {processing ? "Processing..." : `Pay ₹${data.amount}`}
          </button>
        </div>
      </div>
    </div>
  );
}
