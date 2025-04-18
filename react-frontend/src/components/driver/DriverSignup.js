import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DriverSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const [vehicleNo, setVehicle] = useState("");
  const [vehicleAge, setVehicleAge] = useState("");
  const [mileage, setMileage] = useState("");
  const [collegeUniqueId, setCollegeUniqueId] = useState("");

  const driverDto = {
    vehicleNo: vehicleNo,
    vehicleAge: vehicleAge,
    mileage: mileage,
  };
  const role = "DRIVER";

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
    setSubmitted(false);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  const handleVehicle = (e) => {
    setVehicle(e.target.value);
    setSubmitted(false);
  };
  const handleVehicleAge = (e) => {
    setVehicleAge(e.target.value);
    setSubmitted(false);
  };
  const handleMileage = (e) => {
    setMileage(e.target.value);
    setSubmitted(false);
  };
  const handleCollegeUniqueId = (e) => {
    setCollegeUniqueId(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      mobile === "" ||
      pwd === "" ||
      vehicleNo === "" ||
      vehicleAge === "" ||
      mileage === "" ||
      collegeUniqueId === ""
    ) {
      setError(true);
    } else {
      axios
        .post("http://localhost:8080/user/register/", {
          name,
          email,
          mobile,
          pwd,
          role,
          driverDto,
          collegeUniqueId,
        })
        .then((res) => {
          if (res.status === 200) {
            alert(res.data);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert(err.response.data);
          } else {
            console.log(err);
          }
        });

      setSubmitted(true);
      setError(false);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{ display: submitted ? "" : "none" }}
      ></div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="error" style={{ display: error ? "" : "none" }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="cont">
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <div className="form-container">
        <div className="form-scrollable">
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "60px",
              color: "#007BFF",
              letterSpacing: "1px",
            }}
          >
            <h1>Driver Registration</h1>
          </div>
          <form>
            <input
              onChange={handleName}
              className="input"
              value={name}
              type="text"
              placeholder="Name"
            />
            <input
              onChange={handleMobile}
              className="input"
              value={mobile}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              placeholder="Mobile Number"
            />
            <input
              onChange={handleEmail}
              className="input"
              value={email}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={handlePassword}
              className="input"
              value={pwd}
              type="password"
              placeholder="Password"
            />
            <input
              onChange={handleVehicle}
              className="input"
              value={vehicleNo}
              type="text"
              placeholder="Vehicle Number"
            />
            <input
              onChange={handleVehicleAge}
              className="input"
              value={vehicleAge}
              type="number"
              placeholder="Number of Years (Vehicle Age)"
            />
            <input
              onChange={handleMileage}
              className="input"
              value={mileage}
              type="text"
              placeholder="Mileage (e.g., 50km/l or 5km/kWh)"
            />
            <input
              onChange={handleCollegeUniqueId}
              className="input"
              value={collegeUniqueId}
              type="text"
              placeholder="College Unique ID"
            />
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="ghost"
              id="signIn"
              onClick={() => navigate("/driver/login")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
