
// import React, { useState, useRef } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   Avatar,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   IconButton,
//   Divider,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";

// export default function ServiceProviderProfile() {
//   // Mocked user data (static)
//   const initialUser = {
//     name: "Rupprashik",
//     email: "user@gmail.com",
//     phone: "9876543210",
//     city: "Mumbai",
//     state: "Maharashtra",
//   };

//   const [user, setUser] = useState(initialUser);
//   const [avatar, setAvatar] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [snack, setSnack] = useState({ open: false, severity: "success", msg: "" });
//   const inputRef = useRef(null);

//   const validate = () => {
//     const e = {};
//     if (!user.name || user.name.trim().length < 2) e.name = "Enter a valid name";
//     if (!/^[6-9]\d{9}$/.test(user.phone)) e.phone = "Enter a valid 10-digit phone starting 6-9";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const handleSave = () => {
//     if (!validate()) {
//       setSnack({ open: true, severity: "error", msg: "Please fix validation errors" });
//       return;
//     }

//     // Since this is static, we just show a snackbar.
//     setSnack({ open: true, severity: "success", msg: "Profile saved locally (static page)" });
//   };

//   const onAvatarClick = () => inputRef.current?.click();

//   const handleAvatar = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => setAvatar(ev.target.result);
//     reader.readAsDataURL(file);
//   };

//   const handleReset = () => {
//     setUser(initialUser);
//     setAvatar(null);
//     setErrors({});
//     setSnack({ open: true, severity: "info", msg: "Form reset to defaults" });
//   };

//   const handleCloseSnack = (_, reason) => {
//     if (reason === "clickaway") return;
//     setSnack((s) => ({ ...s, open: false }));
//   };

//   return (
//     <Grid container justifyContent="center" sx={{ mt: 4, px: 2 }}>
//       <Grid item xs={12} md={8} lg={6}>
//         <Card elevation={4}>
//           <CardHeader
//             title={
//               <Box>
//                 <Typography variant="h6">My Profile</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Manage your personal information
//                 </Typography>
//               </Box>
//             }
//             sx={{ pb: 0 }}
//           />

//           <CardContent>
//             <Grid container spacing={3} alignItems="center">
//               {/* Avatar column */}
//               <Grid item xs={12} sm={4} md={3}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: 1,
//                   }}
//                 >
//                   <Avatar alt={user.name} src={avatar ?? undefined} sx={{ width: 92, height: 92, fontSize: 36 }}>
//                     {!avatar && user.name?.[0]}
//                   </Avatar>

//                   <input
//                     ref={inputRef}
//                     type="file"
//                     accept="image/*"
//                     style={{ display: "none" }}
//                     onChange={handleAvatar}
//                   />

//                   <IconButton
//                     size="small"
//                     onClick={onAvatarClick}
//                     aria-label="upload avatar"
//                     sx={{ border: 1, borderColor: "divider", p: 0.8, mt: 0.5 }}
//                   >
//                     <CameraAltIcon fontSize="small" />
//                   </IconButton>

//                   <Typography variant="caption" color="text.secondary">
//                     Upload avatar
//                   </Typography>
//                 </Box>
//               </Grid>

//               {/* Form column */}
//               <Grid item xs={12} sm={8} md={9}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Full Name"
//                       name="name"
//                       value={user.name}
//                       onChange={handleChange}
//                       error={!!errors.name}
//                       helperText={errors.name}
//                       inputProps={{ maxLength: 60 }}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="Email" name="email" value={user.email} disabled helperText="Email cannot be changed here" />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Phone"
//                       name="phone"
//                       value={user.phone}
//                       onChange={handleChange}
//                       error={!!errors.phone}
//                       helperText={errors.phone ?? "10 digits"}
//                       inputProps={{ maxLength: 10 }}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="City" name="city" value={user.city} onChange={handleChange} />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="State" name="state" value={user.state} onChange={handleChange} />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Divider />
//                   </Grid>

//                   <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
//                     <Button variant="outlined" onClick={handleReset}>
//                       Reset
//                     </Button>

//                     <Button variant="contained" onClick={handleSave}>
//                       Save Changes
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={handleCloseSnack}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: "100%" }}>
//           {snack.msg}
//         </Alert>
//       </Snackbar>
//     </Grid>
//   );
// }
import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

/**
 * ServiceProviderProfile
 * - polished, handcrafted look
 * - keeps local avatar preview, validation and snackbar
 * - constrained width so it fits inside your layout's Outlet
 */

export default function ServiceProviderProfile() {
  const initialUser = {
    name: "Durgesh",
    email: "user@gmail.com",
    phone: "9876543210",
    city: "Indore",
    state: "Madhya Pradesh",
  };

  const [user, setUser] = useState(initialUser);
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({ open: false, severity: "success", msg: "" });
  const inputRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!user.name || user.name.trim().length < 2) e.name = "Enter a valid name";
    if (!/^[6-9]\d{9}$/.test(user.phone)) e.phone = "Enter a valid 10-digit phone starting 6-9";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSave = () => {
    if (!validate()) {
      setSnack({ open: true, severity: "error", msg: "Please fix validation errors" });
      return;
    }
    setSnack({ open: true, severity: "success", msg: "Profile saved locally (static)" });
  };

  const onAvatarClick = () => inputRef.current?.click();

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setUser(initialUser);
    setAvatar(null);
    setErrors({});
    setSnack({ open: true, severity: "info", msg: "Changes reset" });
  };

  const handleCloseSnack = (_, reason) => {
    if (reason === "clickaway") return;
    setSnack((s) => ({ ...s, open: false }));
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4, px: 2 }}>
      {/* Constrained container so it matches your dashboard width */}
      <Grid item xs={12} md={10} lg={8} sx={{ maxWidth: 1100, width: "100%" }}>
        <Card
          sx={{
            borderRadius: 3,
            overflow: "visible",
            boxShadow: "0 8px 30px rgba(20,24,40,0.06)",
          }}
        >
          {/* Slightly styled header for a handcrafted feel */}
          <CardHeader
            title={
              <Typography variant="h6" fontWeight={800}>
                My Profile
              </Typography>
            }
            subheader={
              <Typography variant="body2" color="text.secondary">
                Update your details — changes are stored locally here.
              </Typography>
            }
            sx={{
              pb: 0,
              px: { xs: 2, md: 3 },
              pt: { xs: 2, md: 3 },
              background: "linear-gradient(180deg, #ffffff, #fbfdff)",
            }}
          />

          <CardContent sx={{ px: { xs: 2, md: 3 }, pt: 2 }}>
            <Grid container spacing={3} alignItems="center">
              {/* Avatar column */}
              <Grid item xs={12} sm={4} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Avatar
                    alt={user.name}
                    src={avatar ?? undefined}
                    sx={{
                      width: 96,
                      height: 96,
                      fontSize: 36,
                      boxShadow: "0 6px 18px rgba(16,24,40,0.08)",
                    }}
                  >
                    {!avatar && user.name?.[0]}
                  </Avatar>

                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleAvatar}
                  />

                  <IconButton
                    size="small"
                    onClick={onAvatarClick}
                    aria-label="upload avatar"
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      p: 0.8,
                      mt: 0.5,
                      bgcolor: "transparent",
                    }}
                  >
                    <CameraAltIcon fontSize="small" />
                  </IconButton>

                  <Typography variant="caption" color="text.secondary">
                    Upload avatar
                  </Typography>
                </Box>
              </Grid>

              {/* Form column */}
              <Grid item xs={12} sm={8} md={9}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      inputProps={{ maxLength: 60 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={user.email}
                      disabled
                      helperText="Email cannot be changed here"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone ?? "10 digits"}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="City" name="city" value={user.city} onChange={handleChange} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="State" name="state" value={user.state} onChange={handleChange} />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1.5 }} />
                  </Grid>

                  <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button variant="outlined" onClick={handleReset}>
                      Reset
                    </Button>

                    <Button variant="contained" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
