import React, { useState } from "react";
import { Typography, TextField, Button, Rating } from "@mui/material";
import { useParams } from "react-router-dom";

export default function FeedbackPage() {
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <div style={{ padding: "30px" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Give Feedback
      </Typography>

      <Typography variant="h6">Booking ID: {id}</Typography>

      <Typography sx={{ mt: 3 }} fontWeight={600}>
        Rating
      </Typography>
      <Rating
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        size="large"
      />

      <Typography sx={{ mt: 3 }} fontWeight={600}>
        Your Feedback
      </Typography>

      <TextField
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        fullWidth
        multiline
        rows={4}
        placeholder="Share your experience..."
      />

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
        onClick={() => alert("Feedback Submitted")}
      >
        Submit
      </Button>
    </div>
  );
}
