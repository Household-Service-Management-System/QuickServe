import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  TextField,
  Button,
  Grid,
} from "@mui/material";

export default function Profile() {
  // Temporary user data (replace with API later)
  const [user, setUser] = useState({
    name: "Rupprashik",
    email: "user@gmail.com",
    phone: "9876543210",
    city: "Mumbai",
    state: "Maharashtra",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile updated (not connected to backend yet)");
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} md={6}>
        <Card elevation={4}>
          <CardHeader
            avatar={<Avatar sx={{ width: 60, height: 60 }}>{user.name[0]}</Avatar>}
            title="My Profile"
            subheader="Manage your personal information"
          />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={user.email}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={user.city}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={user.state}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                <Button variant="contained" onClick={handleSave}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
