import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import Categories from "../../components/layout/Sidebar/Categories";

const dummyServices = [
  { id: 1, title: "Home Cleaning", desc: "Professional home deep cleaning", img: "https://source.unsplash.com/400x300/?cleaning" },
  { id: 2, title: "Plumbing Repair", desc: "Fix leaks & plumbing issues", img: "https://source.unsplash.com/400x300/?plumber" },
  { id: 3, title: "AC Service", desc: "Quick and reliable AC maintenance", img: "https://source.unsplash.com/400x300/?air-conditioner" }
];

export default function ServicesList() {
  return (
    <div>
      {/* <Typography variant="h5" fontWeight="bold" mb={3}>
        Available Services
      </Typography> */}

      <Categories/>

      {/* <Grid container spacing={3}>
        {dummyServices.map(service => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia component="img" image={service.img} height="160" />
              <CardContent>
                <Typography variant="h6">{service.title}</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {service.desc}
                </Typography>
                <Button variant="contained" fullWidth href={`/user/service/${service.id}`}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid> */}
    </div>
  );
}
