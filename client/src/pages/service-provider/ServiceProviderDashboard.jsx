import React from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import BuildIcon from "@mui/icons-material/Build";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import BoltIcon from "@mui/icons-material/Bolt";

export default function ServiceProviderDashboard() {
    const stats = [
        { label: "Total Services", value: 150 },
        { label: "Completed", value: 100 },
        { label: "Cancelled", value: 10 },
        { label: "Pending", value: 15 },
    ];

    const services = [
        { name: "Cleaning", Icon: CleaningServicesIcon },
        { name: "Plumbing", Icon: BuildIcon },
        { name: "Painting", Icon: FormatPaintIcon },
        { name: "Electrician", Icon: BoltIcon },
    ];

    const bookings = [
        { name: "John Doe", service: "Plumbing", date: "10 Apr", time: "10:00 — 11:00" },
        { name: "Jane Smith", service: "Cleaning", date: "12 Apr", time: "14:00 — 15:00" },
        { name: "Emily Johnson", service: "Painting", date: "14 Apr", time: "09:00 — 10:00" },
    ];

    return (
        <Box sx={{ p: 3, background: "linear-gradient(180deg,#f7f9fc, #f5f7fa)", minHeight: "100vh" }}>
            {/* Outlet / main content area */}
            <Box sx={{ background: "#fff", p: { xs: 2, md: 4 }, borderRadius: 3, boxShadow: "0 6px 30px rgba(20,24,40,0.06)" }}>
                {/* Search row */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 4 }}>
                    <Box sx={{ flex: 1, display: "flex", alignItems: "center", background: "#fafbfd", px: 2, py: 1.25, borderRadius: 2, border: "1px solid #eef3f6" }}>
                        <SearchIcon sx={{ color: "#9aa7b2", mr: 1 }} />
                        <TextField placeholder="Search customers, bookings or services" variant="standard" InputProps={{ disableUnderline: true }} fullWidth />
                    </Box>

                    {/* small contextual note instead of avatar */}
                    <Box sx={{ display: { xs: "none", md: "block" }, minWidth: 180, textAlign: "right" }}>
                        <Typography variant="caption" color="text.secondary">Overview • last 7 days</Typography>
                        <Typography fontWeight={700}>You have 3 upcoming bookings</Typography>
                    </Box>
                </Box>

                {/* Stats */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    {stats.map((s, i) => (
                        <Grid item xs={6} sm={3} key={i}>
                            <Card
                                sx={{
                                    borderRadius: 2,
                                    p: 2,
                                    boxShadow: "0 8px 20px rgba(20,24,40,0.04)",
                                    transition: "transform .18s ease, box-shadow .18s ease",
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 30px rgba(20,24,40,0.08)' },
                                }}
                            >
                                <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
                                    {s.value}
                                </Typography>
                                <Typography color="text.secondary">{s.label}</Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Popular services */}
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    Popular Services
                </Typography>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                    {services.map(({ name, Icon }, i) => (
                        <Grid item xs={12} sm={6} key={i}>
                            <Card
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 1.5,
                                    borderRadius: 2,
                                    border: "1px solid #f0f3f6",
                                    background: "linear-gradient(180deg,#fff,#fbfdff)",
                                    cursor: 'pointer',
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Box sx={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1.5, background: '#f3f7fb' }}>
                                        <Avatar sx={{ bgcolor: 'transparent', width: 36, height: 36 }}>
                                            <Icon sx={{ color: '#2b7be4' }} />
                                        </Avatar>
                                    </Box>

                                    <Box>
                                        <Typography fontWeight={700}>{name}</Typography>
                                        <Typography variant="caption" color="text.secondary">{Math.floor(20 + Math.random() * 40)} requests</Typography>
                                    </Box>
                                </Box>

                                <ArrowForwardIosIcon sx={{ color: "#c6d0da" }} />
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Upcoming bookings */}
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    Upcoming Bookings
                </Typography>

                <Card sx={{ borderRadius: 2, border: "1px solid #eef1f5" }}>
                    <List>
                        {bookings.map((b, i) => (
                            <React.Fragment key={i}>
                                <ListItem sx={{ py: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: '100%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                                            <Box sx={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1, background: "#eef8ff" }}>
                                                <CheckCircleIcon sx={{ color: "#2b7be4" }} />
                                            </Box>

                                            <Box>
                                                <Typography fontWeight={700}>{b.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">{b.service}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ minWidth: 140, textAlign: 'right' }}>
                                            <Typography color="text.secondary">{b.date}</Typography>
                                            <Typography fontWeight={700}>{b.time}</Typography>
                                        </Box>
                                    </Box>
                                </ListItem>

                                {i !== bookings.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Card>
            </Box>
        </Box>
    );
}



