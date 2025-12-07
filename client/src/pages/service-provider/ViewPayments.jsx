import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewPayments() {
    const navigate = useNavigate();

    // Static dataset (updated with customer names)
    const payments = [
        { date: "2025-12-05", bookingId: 110, amount: "₹500", status: "Paid", customer: "Amit Verma" },
        { date: "2025-12-03", bookingId: 109, amount: "₹1200", status: "Paid", customer: "Riya Patel" },
        { date: "2025-11-28", bookingId: 105, amount: "₹700", status: "Pending", customer: "John Doe" },
        { date: "2025-11-22", bookingId: 102, amount: "₹900", status: "Paid", customer: "Meera Sharma" },
        { date: "2025-11-18", bookingId: 98, amount: "₹1200", status: "Paid", customer: "Arun Kumar" },
        { date: "2025-11-16", bookingId: 95, amount: "₹700", status: "Pending", customer: "Emily Johnson" },
    ];

    const [period, setPeriod] = useState("last7");
    const [query, setQuery] = useState("");

    const today = new Date();

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return payments.filter((p) => {
            const d = new Date(p.date + "T00:00:00");

            // Filter by period
            if (period === "last7") {
                const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24));
                if (diff < 0 || diff > 7) return false;
            } else if (period === "month") {
                if (d.getMonth() !== today.getMonth() || d.getFullYear() !== today.getFullYear()) return false;
            }

            // Search filter
            if (!q) return true;
            if (String(p.bookingId).includes(q)) return true;
            if (p.amount.toLowerCase().includes(q)) return true;
            if (p.status.toLowerCase().includes(q)) return true;
            if (p.customer.toLowerCase().includes(q)) return true;

            return false;
        });
    }, [payments, period, query, today]);

    const total = useMemo(() => {
        return filtered.reduce((sum, p) => {
            const num = Number(p.amount.replace(/[^0-9.-]+/g, ""));
            return sum + num;
        }, 0);
    }, [filtered]);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Payments
            </Typography>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ mb: 3 }}
            >
                <TextField
                    size="small"
                    placeholder="Search payments..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ width: { xs: "100%", sm: "360px" } }}
                />

                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel id="period-label">Period</InputLabel>
                    <Select
                        labelId="period-label"
                        value={period}
                        label="Period"
                        onChange={(e) => setPeriod(e.target.value)}
                    >
                        <MenuItem value="last7">Last 7 days</MenuItem>
                        <MenuItem value="month">This month</MenuItem>
                        <MenuItem value="all">All</MenuItem>
                    </Select>
                </FormControl>
            </Stack>



            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Booking ID</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Receipt</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filtered.map((p, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{p.date}</TableCell>
                                    <TableCell>{p.customer}</TableCell>
                                    <TableCell>{p.bookingId}</TableCell>
                                    <TableCell>{p.amount}</TableCell>
                                    <TableCell>{p.status}</TableCell>
                                    <TableCell align="right">
                                        <Button size="small" onClick={() => alert("Download receipt (placeholder)")}>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Box>
    );
}
