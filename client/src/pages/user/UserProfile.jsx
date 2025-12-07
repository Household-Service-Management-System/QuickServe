import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function UserProfile() {
  const [openPassword, setOpenPassword] = useState(false);

  const [user, setUser] = useState({
    name: "Rupprashik",
    email: "user@gmail.com",
    phone: "9876543210",
    address: "Nashik, Maharashtra",
    profileImg: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setUser({ ...user, profileImg: imgURL });
  };

  return (
    <Box p={3}>
      {/* HEADER */}
      <Typography variant="h4" fontWeight={700} mb={2}>
        My Profile
      </Typography>

      <Card sx={{ p: 2 }}>
        <CardContent>

          {/* TOP SECTION */}
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              src={user.profileImg}
              sx={{ width: 100, height: 100, border: "3px solid #1f2937" }}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body2" color="gray">
                {user.email}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                component="label"
              >
                Upload Photo
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* PROFILE FORM */}
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
            <TextField
              label="Full Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              fullWidth
            />
            <TextField label="Email" value={user.email} fullWidth disabled />

            <TextField
              label="Phone Number"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              fullWidth
            />

            <TextField
              label="Address"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              fullWidth
            />
          </Box>

          <Box mt={3} display="flex" gap={2}>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>

            <Button
              variant="outlined"
              color="warning"
              onClick={() => setOpenPassword(true)}
            >
              Change Password
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 🔒 PASSWORD POPUP */}
      <Dialog open={openPassword} onClose={() => setOpenPassword(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Current Password" type="password" fullWidth />
          <TextField label="New Password" type="password" fullWidth />
          <TextField label="Confirm New Password" type="password" fullWidth />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenPassword(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
