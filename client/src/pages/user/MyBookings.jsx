import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const dummyBookings = [
  { id: 1, name: "AC Service", date: "2025-02-10", status: "Completed" },
  { id: 2, name: "Plumbing Repair", date: "2025-02-12", status: "Pending" }
];

export default function MyBookings() {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        My Bookings
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dummyBookings.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
