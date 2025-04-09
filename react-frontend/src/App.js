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
import CarbonFootprintCalculator from "./components/carbonFootprint";

import Flexboxeg from "./components/Flexboxeg";

function App() {
  // let navigate = useNavigate();
  return (
    <Router>
      <div className="App">
        <NavbarComp />

        <Routes>
          <Route path="/" element={<CustDash />}>
            {" "}
          </Route>

          <Route path="/team" element={<Team />}>
            {" "}
          </Route>
          <Route path="/about-us" element={<About />}>
            {" "}
          </Route>
          <Route path="/career" element={<Career />}>
            {" "}
          </Route>
          <Route path="/contact-us" element={<Contact />}>
            {" "}
          </Route>
          <Route path="/admin/login" element={<AdminLogin />}>
            {" "}
          </Route>
          <Route path="/driver/register" element={<DriverSignup />}></Route>
          <Route path="/customer/register" element={<CustSignup />}></Route>

          <Route path="/admin/customerlist" element={<CustomerList />}></Route>
          <Route path="/admin/driverlist" element={<DriverList />}></Route>
          <Route path="/admin/newdriverlist" element={<AuthDrivers />}></Route>
          <Route
            path="/admin/paymentstable"
            element={<PaymentsTable />}
          ></Route>
          <Route path="/admin/controller" element={<AdminController />}></Route>
          <Route path="/driver/login" element={<DriverLogin />}></Route>
          <Route
            path="/driver/controller"
            element={<DriverController />}
          ></Route>
          <Route path="/driver/addride" element={<AddRide />}></Route>
          <Route path="/driver/myrides" element={<PreviousRides />}></Route>
          <Route path="/driver/updateprofile" element={<Profile />}></Route>
          <Route path="/rides" element={<TestRides></TestRides>}></Route>
          <Route path="/customer/bookride" element={<ConfirmRide />}></Route>
          <Route path="/customer/login" element={<CustLogin />}></Route>
          <Route path="/customer/signup" element={<CustSignup />}></Route>
          {/* <Route path ="/rides" element ={< Protected cmp ={ TestRides}/>}></Route> */}
          <Route path="/rides" element={<TestRides></TestRides>}></Route>
          <Route path="/customer/payment" element={<BookRide />}></Route>
          <Route path="/customer/otp" element={<NewPayment />}></Route>
          <Route path="/status" element={<Done />}></Route>
          <Route path="/driver/subsride" element={<Subsride />}></Route>
          <Route path="/extra" element={<Extra />}></Route>
          <Route path="/customer/prevrides" element={<Previousride />}></Route>
          <Route
            path="/customer/controller"
            element={<Custcontroller />}
          ></Route>
          <Route path="/customer/update" element={<Custprofile />}></Route>

          <Route
            path="/carbon-footprint"
            element={<CarbonFootprintCalculator />}
          />
          {/* testing */}
        </Routes>

        <Footer />
      </div>
    </Router>
    // <Flexboxeg />
  );
}

export default App;
