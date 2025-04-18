import React, { useEffect, useState } from "react";
import "./styles/login.css";

function Custprofile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [adhar, setAdhar] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user")); // Fetch customer details from sessionStorage
    console.log("SessionStorage user data:", user); // Log the sessionStorage data
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
      setAdhar(user.adhar);
    } else {
      console.warn("No user data found in sessionStorage."); // Log a warning if no data is found
    }
  }, []);

  return (
    <div className="cont-view">
      <h2>Customer Profile</h2>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Mobile: {mobile}</div>
      <div>Adhar: {adhar}</div>
    </div>
  );
}

export default Custprofile;