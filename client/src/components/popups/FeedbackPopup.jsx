import React, { useState } from "react";
import "./Popup.css";

export default function FeedbackPopup({ booking, onClose }) {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Feedback — {booking.service}</h3>

        <div style={{ marginTop: 8 }}>
          <label>Rating (1-5)</label>
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} style={{ width: 80, marginLeft: 8 }} />
        </div>

        <div style={{ marginTop: 8 }}>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your feedback..." style={{ width: "100%", minHeight: 100, padding: 8, borderRadius: 6 }} />
        </div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="close-btn" onClick={onClose}>Cancel</button>
          <button className="pay-btn" onClick={() => { alert("Thanks for feedback!"); onClose(); }}>Submit</button>
        </div>
      </div>
    </div>
  );
}
