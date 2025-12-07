import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

 function UserDashboard() {
  const stats = [
    { title: "Total Bookings", value: 12 },
    { title: "Pending Services", value: 3 },
    { title: "Completed Services", value: 9 },
    { title: "Total Payments", value: "₹ 4,200" },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        User Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Card elevation={4} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h4" mt={1} fontWeight="bold">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default UserDashboard;