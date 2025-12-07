import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

import HomeCleaning from "../../assets/categories/cleaning.png";
import WM from "../../assets/categories/WashingMachine.png";
import AC from "../../assets/categories/ACRepair.png";
import Carpenter from "../../assets/categories/carpenter.png";
import Plumber from "../../assets/categories/plumber.png";
import PestControl from "../../assets/categories/PestControl.png";
import Refrigerator from "../../assets/categories/Refrigerator.png";
import TV from "../../assets/categories/TV.png";

const allServices = [
  { id: 1, category: "Home Cleaning", title: "Home Deep Cleaning", desc: "Professional home deep cleaning", img: HomeCleaning },
  { id: 2, category: "Plumber", title: "Plumbing Repair", desc: "Fix leaks & plumbing issues", img: Plumber },
  { id: 3, category: "AC Repair", title: "AC Service", desc: "Reliable AC maintenance", img: AC },
  { id: 4, category: "Refrigerator", title: "Refrigerator Checkup", desc: "Cooling issues repair", img: Refrigerator },
  { id: 5, category: "Carpenter", title: "Carpenter Work", desc: "Wood work & furniture repair", img: Carpenter },
  { id: 6, category: "Washing Machine", title: "Washing Machine Repair", desc: "Repair service", img: WM },
  { id: 7, category: "Television", title: "TV Repair", desc: "LED/LCD TV repair services", img: TV },
  { id: 8, category: "Pest Control", title: "Pest Control", desc: "Safe & effective pest control", img: PestControl },
];

export default function ServicesList() {

  const { search } = useLocation();
  const category = new URLSearchParams(search).get("category");

  const filtered = category
    ? allServices.filter(s => s.category === category)
    : allServices;

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {category ? `${category} Services` : "All Services"}
      </Typography>
      <Grid container spacing={3} >
        {filtered.map(service => (
          
          <Card sx={{ borderRadius: 3, boxShadow: 3, width: 330 }}>
              <CardMedia component="img" image={service.img} height="160" />
              <CardContent>
                <Typography variant="h6">{service.title}</Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  {service.desc}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  href={`/user/service/${service.id}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
         
        ))}
      </Grid>
      
    </div>
  );
}
