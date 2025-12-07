import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

const payments = [
  { id: 1, service: "Home Cleaning", amount: "₹1200", status: "Paid" },
  { id: 2, service: "AC Service", amount: "₹800", status: "Pending" }
];

export default function Payments() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight="bold">
        Payments
      </Typography>

      {payments.map(pay => (
        <Card key={pay.id} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">{pay.service}</Typography>
            <Typography>Amount: {pay.amount}</Typography>
            <Chip
              label={pay.status}
              color={pay.status === "Paid" ? "success" : "warning"}
              sx={{ mt: 1 }}
            />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
