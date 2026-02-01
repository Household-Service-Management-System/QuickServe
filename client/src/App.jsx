import { BrowserRouter, Routes, Route } from "react-router-dom";

//SP pages
import ServiceProviderLayout from "./pages/service-provider/ServiceProviderLayout";
import ServiceProviderDashboard from "./pages/service-provider/ServiceProviderDashboard";
import ManageServices from "./pages/service-provider/ManageServices";
import AddService from "./pages/service-provider/AddService";
import EditService from "./pages/service-provider/EditService";
import ServiceRequest from "./pages/service-provider/ServiceRequest";
import ViewPayments from "./pages/service-provider/ViewPayments";
import ServiceProviderProfile from "./pages/service-provider/ServiceProviderProfile";
import Documents from "./pages/service-provider/Documents";
import Support from "./pages/service-provider/Support";
import Settings from "./pages/service-provider/Settings";

//Home pages
import Home from "./pages/Home/Home";
import HowItWorks from "./pages/Home/HowItWorks";
import Services from "./pages/Home/Services";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";

//Admin pages

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Complaint from "./pages/admin/Complaint";
import ViewComplaint from "./pages/admin/ViewComplaint";
import ServiceProvider from "./pages/admin/ServiceProvider";
import ServiceProviderDetail from "./pages/admin/ServiceProviderDetail";
import PaymentList from "./pages/admin/PaymentList";
import PendingRequest from "./pages/admin/PendingRequest";
import Setting from "./pages/admin/Setting";
import Logout from "./pages/admin/Logout";


//Customer pages
import CustomerLayout from "./components/layout/CustomerLayout";
import Dashboard from "./pages/customer/Dashboard";
import CustomerBookings from "./pages/customer/Bookings";
import CustomerPayments from "./pages/customer/Payments";
import CustomerProfile from "./pages/customer/Profile";
import CustomerSupport from "./pages/customer/Support";
import CustomerSettings from "./pages/customer/Settings";
import ServicesByCategory from "./pages/Home/ServiceByCategories";
import ServiceDetails from "./pages/Home/ServiceDetails";


//Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

//Unauthorized Page - shown when user tries to access a route without proper role(status 403)
import Unauthorized from "./pages/Unauthorized";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Home page routes  */}
        <Route path="/" element={<Home />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/ServicesList" element={<Services />} />



        {/* Login component route */}
        <Route path="/login" element={<Login />} />
        {/* SignUp component route */}
        <Route path="/signup" element={<Signup />} />
        {/* this is UNAUTHORIZED route */}
        <Route path="/unauthorized" element={<Unauthorized />} />


        {/* Services by Category : Popular Categories on frontend*/}
        <Route
          path="/services/category/:categoryId"
          element={<ServicesByCategory />}
        />

        {/* Service Details Page : Services Listed under a particular category*/}
        <Route
          path="/services/details/:serviceId"
          element={<ServiceDetails />}
        />



        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >


          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<CustomerBookings />} />
          <Route path="payments" element={<CustomerPayments />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="support" element={<CustomerSupport />} />
          <Route path="settings" element={<CustomerSettings />} />
        </Route>



        <Route
          path="/service-provider"
          element={
            // ProtectedRoute acts as a guard before rendering anything inside
            // Only users with ROLE_SERVICEPROVIDER can access this route
            <ProtectedRoute allowedRoles={["ROLE_SERVICEPROVIDER"]}>
              {/* This is the layout component that wraps all service-provider pages */}
              <ServiceProviderLayout />
            </ProtectedRoute>
          }
        >

          {/* Default route: /service-provider => Dashboard component*/}
          <Route index element={<ServiceProviderDashboard />} />

          {/* /service-provider/requests => Upcoming Bookings*/}
          <Route path="requests" element={<ServiceRequest />} />

          {/* /service-provider/services => Add or Manage Services(Edit,Delete) */}
          <Route path="services" element={<ManageServices />} />
          <Route path="services/add" element={<AddService />} />
          <Route path="services/edit/:id" element={<EditService />} />


          {/* /service-provider/payments => Payment History*/}
          <Route path="payments" element={<ViewPayments />} />

          {/* /service-provider/profile => Service Provider Profile*/}
          <Route path="profile" element={<ServiceProviderProfile />} />

          {/* /service-provider/documents => Manage Documents */}
          <Route path="documents" element={<Documents />} />

          {/* /service-provider/support => Support Page */}
          <Route path="support" element={<Support />} />

          {/* /service-provider/settings => Settings Page */}
          <Route path="settings" element={<Settings />} />
        </Route>



        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Complaints */}
          <Route path="complaint" element={<Complaint />} />
          <Route path="complaint/:id" element={<ViewComplaint />} />

          {/*Page for showing VERIFIED service providers*/}
          <Route path="service-providers" element={<ServiceProvider />} />

          {/*Page for showing UNVERIFIED service providers*/}
          <Route path="pending-requests" element={<PendingRequest />} />
          <Route
            path="service-providers/:id"
            element={<ServiceProviderDetail />}
          />


          {/* Service Providers */}
          <Route path="service-providers" element={<ServiceProvider />} />
          <Route
            path="service-providers/:id"
            element={<ServiceProviderDetail />}
          />
          {/* Payments */}
          <Route path="payment-list" element={<PaymentList />} />


          {/* Settings */}
          <Route path="settings" element={<Setting />} />

          {/* Logout */}
          <Route path="logout" element={<Logout />} />
          {/* Settings */}
          <Route path="settings" element={<Setting />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
