import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DriverSignup() {
  const navigate = useNavigate();
  // States for registration
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const [adhar, setAadhar] = useState("");
  const [vehicleNo, setVehicle] = useState("");
  const [licenseNo, setLicense] = useState("");
  const [collegeUniqueId, setCollegeUniqueId] = useState(""); // New state

  const driverDto = { vehicleNo: vehicleNo, licenseNo: licenseNo };
  const role = "DRIVER";

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleAadhar = (e) => {
    setAadhar(e.target.value);
    setSubmitted(false);
  };
  const handleVehicle = (e) => {
    setVehicle(e.target.value);
    setSubmitted(false);
  };

  const handleLicense = (e) => {
    setLicense(e.target.value);
    setSubmitted(false);
  };

  const handleCollegeUniqueId = (e) => {
    setCollegeUniqueId(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      mobile === "" ||
      adhar === "" ||
      pwd === "" ||
      vehicleNo === "" ||
      licenseNo === "" ||
      collegeUniqueId === ""
    ) {
      setError(true);
    } else {
      axios
        .post("http://localhost:8080/user/register/", {
          name,
          email,
          mobile,
          adhar,
          pwd,
          role,
          driverDto,
          collegeUniqueId, // Include the new field
        })
        .then((res) => {
          if (res.status === 200) {
            alert(res.data); // Success message
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert(err.response.data); // Alert for invalid unique ID or other errors
          } else {
            console.log(err);
          }
        });

      setSubmitted(true);
      setError(false);
    }
  };

  // Showing success message
  const successMessage = () => {
    // alert(`Driver ${name} successfully registered!!`)
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        {/* <h1>Driver {name} successfully registered!!</h1> */}
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="cont">
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <div className="form-container sign-up-container">
        <h1>Driver Registration</h1>
        <form>
          <table>
            {/* Labels and inputs for form data */}
            <tr>
              <td>
                <input
                  onChange={handleName}
                  className="input"
                  value={name}
                  type="text"
                  placeholder="Name"
                />
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <input
                  onChange={handleMobile}
                  className="input"
                  value={mobile}
                  type="number"
                  placeholder="Mobile Number"
                />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  onChange={handleEmail}
                  className="input"
                  value={email}
                  type="email"
                  placeholder="Email"
                />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  onChange={handlePassword}
                  className="input"
                  value={pwd}
                  type="password"
                  placeholder="Password"
                />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  onChange={handleAadhar}
                  className="input"
                  value={adhar}
                  type="number"
                  placeholder="Aadhar Number"
                />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  onChange={handleVehicle}
                  className="input"
                  value={vehicleNo}
                  type="text"
                  placeholder="Vehicle Number"
                />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  onChange={handleLicense}
                  className="input"
                  value={licenseNo}
                  type="text"
                  placeholder="License Number"
                />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  onChange={handleCollegeUniqueId}
                  className="input"
                  value={collegeUniqueId}
                  type="text"
                  placeholder="College Unique ID"
                />
              </td>
            </tr>

            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </table>
        </form>
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
              onClick={() => {
                navigate("/driver/login");
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
