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
  Typography,
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setUser({ ...user, profileImg: imgURL });
    }
  };

  return (
    <Box p={3}>
      {/* HEADER */}
      <Typography variant="h4" fontWeight={700} mb={3}>
        My Profile
      </Typography>

      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>

          {/* TOP SECTION */}
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              src={user.profileImg}
              sx={{
                width: 100,
                height: 100,
                border: "3px solid #1e40af",
              }}
            />

            <Box>
              <Typography variant="h6" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                component="label"
              >
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* FORM SECTION */}
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
            gap={3}
          >
            <TextField
              label="Full Name"
              fullWidth
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <TextField
              label="Email"
              fullWidth
              value={user.email}
              disabled
            />

            <TextField
              label="Phone Number"
              fullWidth
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />

            <TextField
              label="Address"
              fullWidth
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </Box>

          {/* BUTTONS */}
          <Box mt={4} display="flex" gap={2}>
            <Button variant="contained" color="primary" size="medium">
              Save Changes
            </Button>

            <Button
              variant="outlined"
              color="warning"
              size="medium"
              onClick={() => setOpenPassword(true)}
            >
              Change Password
            </Button>
          </Box>

        </CardContent>
      </Card>

      {/* PASSWORD CHANGE DIALOG */}
      <Dialog
        open={openPassword}
        onClose={() => setOpenPassword(false)}
        fullWidth
        maxWidth="xs"
      >
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
