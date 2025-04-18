import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Custcontroller() {
  const [cust, setCust] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const cust = JSON.parse(sessionStorage.getItem("user")); // Fetch customer details from sessionStorage
    if (cust) {
      setCust(cust);
    }
  }, []);

  const subject = "JoinMyRide: Attention";
  const body = "Your account has been deactivated...!!!!!";
  const email = cust?.email;

  const confirm = () => {
    if (window.confirm("Are you sure?")) {
      deactivatate();
    } else {
      navigate("/customer/controller");
    }
  };

  async function deactivatate() {
    try {
      const result = await axios.delete(
        `http://localhost:8080/customer/deactivate/${cust?.cid}`
      );
      alert(result.data);

      await axios.post("http://localhost:8080/mail/send-mail", {
        email,
        subject,
        body,
      });

      sessionStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error deactivating account:", error);
    }
  }
  // logut updATED
  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      navigate("/");
    }
  };

  return (
    <div>
      <button
        style={{ margin: "5px" }}
        onClick={() => navigate("/search-rides")}
      >
        Search Rides
      </button>
      <button
        style={{ margin: "5px" }}
        onClick={() => navigate("/customer/prevrides")}
      >
        Previous Rides
      </button>
      <button
        style={{ margin: "5px" }}
        onClick={() => navigate("/customer/update-profile")}
      >
        Update Profile
      </button>
      <button style={{ margin: "5px" }} onClick={confirm}>
        Deactivate
      </button>
      <button
        onClick={() => {
          navigate("/carbon-footprint");
        }}
        style={{ margin: "5px" }}
      >
        Carbon Footprint Calculator
      </button>
      <button style={{ margin: "5px" }} onClick={logout}>
        Logout
      </button>

      {/* addding footprint button */}
    </div>
  );
}
