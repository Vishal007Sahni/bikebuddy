import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateProfile() {
  const [customer, setCustomer] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [adhar, setAdhar] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user")); // Fetch customer details from sessionStorage
    console.log("SessionStorage user data:", user); // Log the sessionStorage data
    if (user) {
      setCustomer(user);
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
      setAdhar(user.adhar);
    } else {
      console.warn("No user data found in sessionStorage."); // Log a warning if no data is found
    }
  }, []);

  const handleUpdate = async () => {
    const updatedCustomer = {
      uid: customer.uid,
      name,
      email,
      mobile,
      adhar,
    };

    console.log("Payload being sent to backend:", updatedCustomer);

    try {
      const response = await axios.put(
        `http://localhost:8080/customer/update-profile/${customer.cid}`,
        updatedCustomer
      );
      alert(response.data);
      sessionStorage.setItem("user", JSON.stringify({ ...customer, ...updatedCustomer })); // Update sessionStorage
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Failed to update profile. Please check the input and try again.");
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Mobile:</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <div>
        <label>Adhar:</label>
        <input
          type="text"
          value={adhar}
          onChange={(e) => setAdhar(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default UpdateProfile;
