import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PlumberIcon from "@mui/icons-material/Plumbing";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PaymentIcon from "@mui/icons-material/Payment";
import StarIcon from "@mui/icons-material/Star";

export default function UserDashboard() {
  const stats = [
    {
      label: "Total Bookings",
      value: 12,
      icon: <BookOnlineIcon fontSize="large" />,
      color: "#3b82f6",
    },
    {
      label: "Pending Payments",
      value: 2,
      icon: <PaymentIcon fontSize="large" />,
      color: "#ef4444",
    },
    {
      label: "Completed Services",
      value: 9,
      icon: <CleaningServicesIcon fontSize="large" />,
      color: "#22c55e",
    },
    {
      label: "Reviews Given",
      value: 5,
      icon: <StarIcon fontSize="large" />,
      color: "#eab308",
    },
  ];

  const quickServices = [
    { name: "Cleaning", icon: <CleaningServicesIcon /> },
    { name: "Electrician", icon: <ElectricalServicesIcon /> },
    { name: "Plumber", icon: <PlumberIcon /> },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <nav/>
      <Typography variant="h4" fontWeight={700}>
        Welcome Back 👋
      </Typography>
      <Typography variant="subtitle1" color="gray">
        Here’s your activity overview.
      </Typography>

      {/* STATS CARDS */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {stats.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: s.color,
                  width: 60,
                  height: 60,
                  margin: "0 auto 10px",
                }}
              >
                {s.icon}
              </Avatar>
              <Typography variant="h5" fontWeight={700}>
                {s.value}
              </Typography>
              <Typography color="gray">{s.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* QUICK SERVICES */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" fontWeight={700}>
          Quick Bookings
        </Typography>
        <Typography variant="body2" color="gray">
          Book instantly from most used categories
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {quickServices.map((s, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#111827",
                    width: 55,
                    height: 55,
                    margin: "0 auto 10px",
                  }}
                >
                  {s.icon}
                </Avatar>
                <Typography fontWeight={600}>{s.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* UPCOMING BOOKING */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" fontWeight={700}>
          Upcoming Booking
        </Typography>

        <Paper
          elevation={3}
          sx={{
            mt: 2,
            p: 3,
            borderRadius: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Electrician Service
            </Typography>
            <Typography color="gray">Scheduled for: 12 Feb, 2025</Typography>
            <Typography color="gray">Provider: John Doe</Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#3b82f6",
              px: 3,
              py: 1,
              borderRadius: 3,
              textTransform: "none",
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            View Details
          </Button>
        </Paper>
      </Box>

      {/* ADVERTISEMENT / EXTRA OFFER */}
      <Box sx={{ mt: 5 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            background:
              "linear-gradient(135deg, #4f46e5, #3b82f6)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Limited Time Offer ❤️
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Get 30% OFF on your next service booking!
          </Typography>

          <Button
            sx={{
              mt: 2,
              bgcolor: "white",
              color: "#111827",
              fontWeight: 700,
              px: 3,
              "&:hover": { bgcolor: "#f3f4f6" },
            }}
          >
            Claim Offer
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
