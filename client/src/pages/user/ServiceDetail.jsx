import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Rating,
  Chip,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function ServiceDetail() {
  const { id } = useParams();

  // Fake dynamic data (replace with API later)
  const service = {
    name: "Premium Home Cleaning",
    category: "Home Services",
    rating: 4.5,
    reviews: 128,
    price: 1500,
    discount: 20,
    image:
      "https://images.pexels.com/photos/4239147/pexels-photo-4239147.jpeg",
    description:
      "A complete deep cleaning service for your home including bedroom, kitchen and bathroom.",
    includes: [
      "Deep floor cleaning",
      "Kitchen tile wash",
      "Bathroom sanitization",
      "Dusting & vacuuming",
      "Window cleaning",
    ],
    related: [
      { id: 21, name: "Bathroom Deep Cleaning" },
      { id: 22, name: "Sofa Shampoo Cleaning" },
      { id: 23, name: "Kitchen Deep Cleaning" },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Banner Image */}
      <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
        <img
          src={service.image}
          alt="service banner"
          style={{ width: "100%", height: "280px", objectFit: "cover" }}
        />
      </Card>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight={700}>
            {service.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Rating value={service.rating} precision={0.5} readOnly />
            <Typography variant="body2">
              {service.rating} ({service.reviews} reviews)
            </Typography>
            <Chip label={service.category} size="small" color="success" />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Includes */}
          <Typography variant="h6" mb={1}>
            What’s Included
          </Typography>
          <ul style={{ marginLeft: "20px" }}>
            {service.includes.map((item, i) => (
              <li key={i}>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  {item}
                </Typography>
              </li>
            ))}
          </ul>

          <Divider sx={{ my: 2 }} />

          {/* Description */}
          <Typography variant="h6" mb={1}>
            Description
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {service.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Related Services */}
          <Typography variant="h6" mb={2}>
            Related Services
          </Typography>
          <Grid container spacing={2}>
            {service.related.map((rs) => (
              <Grid item xs={12} sm={4} key={rs.id}>
                <Card sx={{ p: 2, textAlign: "center", cursor: "pointer" }}>
                  <Typography fontWeight={600}>{rs.name}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Section (Price Box) */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, boxShadow: 4, borderRadius: 3, position: "sticky", top: 20 }}>
            <Typography variant="h6">Price Details</Typography>

            <Typography variant="h4" fontWeight={700} mt={1}>
              ₹{service.price - (service.price * service.discount) / 100}
            </Typography>
            <Typography variant="body2" color="gray">
              MRP ₹{service.price} • {service.discount}% OFF
            </Typography>

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              href={`/user/book/${id}`}
            >
              Book Now
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
