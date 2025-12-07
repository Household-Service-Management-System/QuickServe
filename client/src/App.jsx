import { BrowserRouter, Routes, Route } from "react-router-dom";

// USER PAGES
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
// HOME PAGES
import Home from "./pages/Home/Home";
import HowItWorks from "./pages/Home/HowItWorks";
import Services from "./pages/Home/Services";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import Customer from "./pages/admin/Customer";
import ServiceProvider from "./pages/admin/ServiceProvider";
import PaymentList from "./pages/admin/PaymentList";
import ViewComplaint from "./pages/admin/ViewComplaint";
import ServiceProviderDetail from "./pages/admin/ServiceProviderDetail";
import PendingRequest from "./pages/admin/PendingRequest";
import Setting from "./pages/admin/Setting";
import Logout from "./pages/admin/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/ServicesList" element={<Services />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>

        {/* USER ROUTES */}
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
        {/* ADMIN ROUTES s */}
        <Route path="/admin">
          <Route index element={<AdminDashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="serviceProvider" element={<ServiceProvider />} />
          <Route path="paymentList" element={<PaymentList />} />
          <Route path="viewComplaint" element={<ViewComplaint />} />
          <Route path="serviceProviderDetail" element={<ServiceProviderDetail />} />
          <Route path="pendingRequest" element={<PendingRequest />} />
          <Route path="setting" element={<Setting />} />
          <Route path="logout" element={<Logout />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
