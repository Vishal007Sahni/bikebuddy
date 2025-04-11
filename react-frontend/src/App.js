import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Team from "./Pages/Team";
import About from "./Pages/About";
import Career from "./Pages/Career";
import Contact from "./Pages/Contact";
import AdminLogin from "./components/admin/AdminLogin";
import DriverSignup from "./components/driver/DriverSignup";
import CustomerList from "./components/admin/CustomerList";
import DriverList from "./components/admin/DriverList";
import AuthDrivers from "./components/admin/AuthDrivers";
import PaymentsTable from "./components/admin/PaymentsTable";
import AdminController from "./components/admin/AdminController";
import DriverLogin from "./components/driver/DriverLogin";
import DriverController from "./components/driver/DriverController";
import AddRide from "./components/driver/AddRide";
import PreviousRides from "./components/driver/PreviousRides";
import Profile from "./components/driver/Profile";
import CustDash from "./components/customer/CustDash";
import Rides from "./components/customer/Rides";
import ConfirmRide from "./components/customer/ConfirmRide";
import CustLogin from "./components/customer/CustLogin";
import CustSignup from "./components/customer/CustSignup";
import BookRide from "./components/customer/BookRide";
import TestRides from "./components/customer/TestRides";
import Protected from "./components/customer/Protected";
import Footer from "./components/Footer";
import NewPayment from "./components/customer/NewPayment";
import Done from "./components/customer/Done";
import Subsride from "./components/driver/Subsride";
import Extra from "./components/customer/Extra";
import Previousride from "./components/customer/Previousride";
import Custcontroller from "./components/customer/Cuscontroller";
import Custprofile from "./components/customer/Custprofile";
import Flexboxeg from "./components/Flexboxeg";
import RideResults from "./components/customer/RideResults"; // Import RideResults
import SearchRides from "./components/customer/SearchRides";

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComp />
        

        <Routes>
          <Route path="/" element={<CustDash />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/driver/register" element={<DriverSignup />} />
          <Route path="/customer/register" element={<CustSignup />} />
          <Route path="/admin/customerlist" element={<CustomerList />} />
          <Route path="/admin/driverlist" element={<DriverList />} />
          <Route path="/admin/newdriverlist" element={<AuthDrivers />} />
          <Route path="/admin/paymentstable" element={<PaymentsTable />} />
          <Route path="/admin/controller" element={<AdminController />} />
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/driver/controller" element={<DriverController />} />
          <Route path="/driver/addride" element={<AddRide />} />
          <Route path="/driver/myrides" element={<PreviousRides />} />
          <Route path="/driver/updateprofile" element={<Profile />} />
          <Route path="/rides" element={<TestRides />} />
          <Route path="/customer/bookride" element={<ConfirmRide />} />
          <Route path="/customer/login" element={<CustLogin />} />
          <Route path="/customer/signup" element={<CustSignup />} />
          <Route path="/customer/payment" element={<BookRide />} />
          <Route path="/customer/otp" element={<NewPayment />} />
          <Route path="/status" element={<Done />} />
          <Route path="/driver/subsride" element={<Subsride />} />
          <Route path="/extra" element={<Extra />} />
          <Route path="/customer/prevrides" element={<Previousride />} />
          <Route path="/customer/controller" element={<Custcontroller />} />
          <Route path="/customer/update" element={<Custprofile />} />
          <Route path="/search-rides" element={<SearchRides />} />
          <Route path="/rides/results" element={<RideResults />} /> {/* Add RideResults route */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;