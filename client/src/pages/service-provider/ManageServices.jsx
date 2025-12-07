// src/pages/service-provider/ManageServices.jsx
import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Switch,
    Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function ManageServices() {
    const navigate = useNavigate();

    // static services data (local state to allow toggling)
    const [services, setServices] = useState([
        { id: "s1", name: "AC Repair", category: "Home Appliances", price: 500, active: true },
        { id: "s2", name: "Electrical Wiring", category: "Electrical", price: 350, active: true },
        { id: "s3", name: "Plumbing", category: "Plumbing", price: 700, active: false },
    ]);

    const toggleActive = (id) => {
        setServices((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
    };

    const handleEdit = (id) => {
        navigate(`/service-provider/services/edit/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this service? (static placeholder)")) {
            setServices((prev) => prev.filter((s) => s.id !== id));
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Manage Services
            </Typography>

            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="subtitle1">Your offered services</Typography>
                        <Box>
                            <Button variant="contained" onClick={() => navigate("/service-provider/services/add")}>
                                Add Service
                            </Button>
                        </Box>
                    </Box>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Service</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {services.map((s) => (
                                <TableRow key={s.id}>
                                    <TableCell>{s.name}</TableCell>
                                    <TableCell>{s.category}</TableCell>
                                    <TableCell>₹{s.price}</TableCell>
                                    <TableCell>
                                        <Switch checked={s.active} onChange={() => toggleActive(s.id)} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleEdit(s.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleDelete(s.id)}>
                                            <DeleteIcon />
                                        </IconButton>
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
