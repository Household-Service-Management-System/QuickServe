import { Card, CardContent, Typography, TextField, Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

export default function BookService() {
  const { id } = useParams();

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, maxWidth: 450 }}>
      <CardContent>
        <Typography variant="h5" mb={2}>
          Book Service #{id}
        </Typography>

        <Stack spacing={2}>
          <TextField label="Full Name" fullWidth />
          <TextField label="Address" fullWidth />
          <TextField label="Preferred Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />

          <Button variant="contained" fullWidth>Confirm Booking</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
