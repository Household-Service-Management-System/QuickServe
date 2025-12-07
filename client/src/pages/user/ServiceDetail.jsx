import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ServiceDetail() {
  const { id } = useParams();

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" mb={1}>
          Service #{id}
        </Typography>

        <Typography variant="body1" mb={2}>
          Here you can display full details about the selected service.
          Description, duration, technician info, pricing etc.
        </Typography>

        <Button variant="contained" size="large" href={`/user/book/${id}`}>
          Book Service
        </Button>
      </CardContent>
    </Card>
  );
}
