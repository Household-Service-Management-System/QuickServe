import { BrowserRouter, Routes, Route } from "react-router-dom";

//User pages
import UserLayout from "./pages/user/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import ServicesList from "./pages/user/ServicesList";
import ServiceDetail from "./pages/user/ServiceDetail";
import BookService from "./pages/user/BookService";
import MyBookings from "./pages/user/MyBookings";
import Payments from "./pages/user/Payments";
import Profile from "./pages/user/UserProfile";

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
import AdminDashboard from "./pages/admin/AdminDashboard";
import Customer from "./pages/admin/Customer";
import ServiceProvider from "./pages/admin/ServiceProvider";
import PaymentList from "./pages/admin/PaymentList";
import ViewComplaint from "./pages/admin/ViewComplaint";
import ServiceProviderDetail from "./pages/admin/ServiceProviderDetail";
import PendingRequest from "./pages/admin/PendingRequest";
import Setting from "./pages/admin/Setting";
import Logout from "./pages/admin/Logout";

import CustomerLayout from "./components/layout/CustomerLayout";
import Dashboard from "./pages/customer/Dashboard";
import CustomerBookings from "./pages/customer/Bookings";
import CustomerPayments from "./pages/customer/Payments";
import CustomerProfile from "./pages/customer/Profile";
import CustomerSupport from "./pages/customer/Support";
import CustomerSettings from "./pages/customer/Settings";
import ServicesByCategory from "./pages/Home/ServiceByCategories";
import ServiceDetails from "./pages/Home/ServiceDetails";

import ProtectedRoute from "./routes/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     loginSuccess({
  //       id: 4,
  //       role: "ROLE_USER",
  //       name: "Rahul",
  //     })
  //   );
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/ServicesList" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />




        {/* <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="service/:id" element={<ServiceDetail />} />
          <Route path="book/:id" element={<BookService />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Route> */}

        {/* Home page routes  */}
        <Route
          path="/services/category/:categoryId"
          element={<ServicesByCategory />}
        />

        <Route
          path="/services/details/:serviceId"
          element={<ServiceDetails />}
        />

        <Route path="/unauthorized" element={<Unauthorized />} />


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
            <ProtectedRoute allowedRoles={["ROLE_SERVICEPROVIDER"]}>
              <ServiceProviderLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ServiceProviderDashboard />} />
          <Route path="requests" element={<ServiceRequest />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="services/add" element={<AddService />} />
          <Route path="services/edit/:id" element={<EditService />} />
          <Route path="payments" element={<ViewPayments />} />
          <Route path="profile" element={<ServiceProviderProfile />} />
          <Route path="documents" element={<Documents />} />
          <Route path="support" element={<Support />} />
          <Route path="settings" element={<Settings />} />
        </Route>




        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="serviceProvider" element={<ServiceProvider />} />
          <Route path="paymentList" element={<PaymentList />} />
          <Route path="viewComplaint" element={<ViewComplaint />} />
          <Route
            path="serviceProviderDetail"
            element={<ServiceProviderDetail />}
          />
          <Route path="pendingRequest" element={<PendingRequest />} />
          <Route path="setting" element={<Setting />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
