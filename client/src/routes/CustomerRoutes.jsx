import { Route } from "react-router-dom";
import CustomerLayout from "../components/layout/CustomerLayout";
import Dashboard from "../pages/customer/Dashboard";
import Bookings from "../pages/customer/Bookings";
import Payments from "../pages/customer/Payments";
import Profile from "../pages/customer/Profile";

export default function CustomerRoutes() {
  return (
    <Route path="/customer" element={<CustomerLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="payments" element={<Payments />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  );
}
