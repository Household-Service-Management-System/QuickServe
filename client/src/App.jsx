import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./pages/user/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import ServicesList from "./pages/user/ServicesList";
import ServiceDetail from "./pages/user/ServiceDetail";
import BookService from "./pages/user/BookService";
import MyBookings from "./pages/user/MyBookings";
import Payments from "./pages/user/Payments";
import Profile from "./pages/user/UserProfile";


import ServiceProviderLayout from "./pages/service-provider/ServiceProviderLayout";
import ServiceProviderDashboard from "./pages/service-provider/ServiceProviderDashboard";
import ManageServices from "./pages/service-provider/ManageServices";
import ServiceRequest from "./pages/service-provider/ServiceRequest";
import ViewPayments from "./pages/service-provider/ViewPayments";
import ServiceProviderProfile from "./pages/service-provider/ServiceProviderProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="service/:id" element={<ServiceDetail />} />
          <Route path="book/:id" element={<BookService />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Route>



        <Route path="/service-provider" element={<ServiceProviderLayout />}>
          <Route index element={<ServiceProviderDashboard />} />
          <Route path="requests" element={<ServiceRequest />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="payments" element={<ViewPayments />} />
          <Route path="profile" element={<ServiceProviderProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
