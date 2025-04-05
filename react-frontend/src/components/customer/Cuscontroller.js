import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Custcontroller() {
  const [cust, setCust] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let cust = JSON.parse(sessionStorage.getItem("user"));
    setCust(cust);
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

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <button style={{ margin: "5px" }} onClick={() => navigate("/rides")}>
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
        onClick={() => navigate("/customer/update")}
      >
        Update Profile
      </button>
      <button style={{ margin: "5px" }} onClick={confirm}>
        Deactivate
      </button>
      <button style={{ margin: "5px" }} onClick={logout}>
        Logout
      </button>
    </div>
  );
}
