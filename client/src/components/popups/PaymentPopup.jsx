import React, { useState } from "react";
import PaymentMethodPopup from "./PaymentMethodPopup";
import "./Popup.css";

/**
 * PaymentPopup
 * props:
 *  - data: payment object { id, service, amount, status, paymentId, txnId, mode, date }
 *  - onClose: close callback
 *  - onPaid: (txnId, mode) => called when payment completes
 *
 * Contains "View Details" info and a "Proceed to Pay" button (if Pending)
 * "Proceed to Pay" opens PaymentMethodPopup where user picks a method.
 */

export default function PaymentPopup({ data, onClose, onPaid }) {
  const [showMethod, setShowMethod] = useState(false);

  const handleMethodPaid = (txnId, mode) => {
    // bubble up
    if (onPaid) onPaid(txnId, mode);
    setShowMethod(false);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Payment Details</h2>

        <div style={{ marginTop: 8 }}>
          <p><strong>Service:</strong> {data.service}</p>
          <p><strong>Provider:</strong> {data.provider || "-"}</p>
          <p><strong>Amount:</strong> ₹{data.amount}</p>
          <p><strong>Status:</strong> <span style={{ color: data.status === "Paid" ? "#16a34a" : "#d97706", fontWeight: 600 }}>{data.status}</span></p>
          <p><strong>Payment ID:</strong> {data.paymentId}</p>
          <p><strong>Txn ID:</strong> {data.txnId || "-"}</p>
          <p><strong>Mode:</strong> {data.mode || "-"}</p>
          <p><strong>Date:</strong> {data.date}</p>
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="close-btn" onClick={onClose}>Close</button>

          {data.status === "Pending" && (
            <button className="pay-btn" onClick={() => setShowMethod(true)}>Proceed to Pay</button>
          )}
        </div>
      </div>

      {/* inner method chooser */}
      {showMethod && <PaymentMethodPopup data={data} onClose={() => setShowMethod(false)} onPaid={handleMethodPaid} />}
    </div>
  );
}
