import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

import UploadPhoto from "./UploadPhoto";

function DriverController() {
  const navigate = useNavigate();

  let i = "";
  // let formData = new FormData();
  const [driver, setDriver] = useState({});
  const [image, setImage] = useState(null);

  const subject = "JoinMyRide:Attention";
  const body = "Your account has been deactivated...!!!!!";

  useEffect(() => {
    let driver = JSON.parse(sessionStorage.getItem("driver-info"));
    setDriver(driver);

    axios.get(`http://localhost:8080/user/${driver.uid}/image`).then((res) => {
      console.log("posting data", res);
      setImage(res.data);
    });
  }, []);

  const email = driver.email;

  function logout() {
    sessionStorage.clear();
    navigate("/driver/Login");
  }

  const confirm = () => {
    if (window.confirm("Are you sure") == true) {
      deactivatate();
    } else {
      navigate("/driver/controller");
    }
  };

  async function deactivatate() {
    const result = await axios
      .delete(`http://localhost:8080/driver/deactivate/${driver.did}`)
      .then((res) => alert(res.data));
    sessionStorage.clear();

    await axios.post(`http://localhost:8080/mail/send-mail`, {
      email,
      subject,
      body,
    });
  }

  let isimg;

  if (image == null) {
    isimg = false;
  } else {
    isimg = true;
  }

  return (
    <div>
      <div className="card">
        <div className="circular--portrait">
          {isimg ? (
            <img src={`data:image/png;base64,${image}`} />
          ) : (
            <div>
              <img src={require("./user1.jpg")}></img>
              <UploadPhoto />
            </div>
          )}
        </div>
      </div>

      <button
        style={{ margin: "5px" }}
        onClick={() => navigate("/driver/addride")}
      >
        Add Rides
      </button>

      <button
        style={{ margin: "5px" }}
        onClick={() => navigate("/driver/myrides")}
      >
        Previous Rides
      </button>

      <button
        style={{ margin: "5px" }}
        onClick={() => navigate("/driver/updateprofile")}
      >
        Update Profile
      </button>

      <button
        style={{ margin: "5px" }}
        onClick={() => {
          navigate("/driver/register");
          confirm();
        }}
      >
        Deactivate
      </button>

      {/* adding CarbonFootprintCalculator */}
      <button
        onClick={() => navigate("/carbon-footprint")}
        style={{ margin: "5px" }}
      >
        Carbon Footprint Calculator
      </button>

      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to logout?")) {
            logout();
          }
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default DriverController;
