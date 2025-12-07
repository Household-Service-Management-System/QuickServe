import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./pages/user/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import ServicesList from "./pages/user/ServicesList";
import ServiceDetail from "./pages/user/ServiceDetail";
import BookService from "./pages/user/BookService";
import MyBookings from "./pages/user/MyBookings";
import Payments from "./pages/user/Payments";
import Profile from "./pages/user/UserProfile";
import ServiceProvideProfile from "./pages/service-provider/ServiceProvideProfile";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="service/:id" element={<ServiceDetail />} />
          <Route path="book/:id" element={<BookService />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
