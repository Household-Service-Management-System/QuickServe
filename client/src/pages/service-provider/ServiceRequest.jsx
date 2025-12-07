// src/pages/service-provider/ServiceRequest.jsx
import React from "react";
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
    Chip,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ServiceRequest() {
    const navigate = useNavigate();

    // static requests
    const requests = [
        { id: 101, customer: "Rohit Sharma", service: "AC Repair", date: "2025-11-20", amount: "₹500", status: "Pending" },
        { id: 102, customer: "Anita Verma", service: "Electrical", date: "2025-11-19", amount: "₹350", status: "Accepted" },
        { id: 103, customer: "Suresh Kumar", service: "Plumbing", date: "2025-11-17", amount: "₹700", status: "Completed" },
    ];

    const getColor = (status) => {
        if (status === "Pending") return "warning";
        if (status === "Accepted") return "info";
        if (status === "Completed") return "success";
        return "default";
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Service Requests
            </Typography>

            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell>Service</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {requests.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell>{r.customer}</TableCell>
                                    <TableCell>{r.service}</TableCell>
                                    <TableCell>{r.date}</TableCell>
                                    <TableCell>{r.amount}</TableCell>
                                    <TableCell>
                                        <Chip label={r.status} color={getColor(r.status)} size="small" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button size="small" onClick={() => alert("View details (placeholder)")}>
                                            View
                                        </Button>
                                        <Button size="small" onClick={() => alert("Accept (placeholder)")}>
                                            Accept
                                        </Button>
                                        <Button size="small" onClick={() => alert("Reject (placeholder)")}>
                                            Reject
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
