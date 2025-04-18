import React, { useEffect, useState } from "react";
import "./style/dlogin.css";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("driver-info"));
  const [name, setDname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [adhar, setAdhar] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [did, setDid] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    setDname(user.name);
    setEmail(user.email);
    setMobile(user.mobile);
    setAdhar(user.adhar);
    setVehicleNo(user.vehicleNo);
    setLicenseNo(user.licenseNo);
    setDid(user.did);
    setUid(user.uid);
  }

  function updateUser() {
    let newuser = {
      did,
      name,
      email,
      mobile,
      adhar,
      vehicleNo,
      licenseNo,
      uid,
    };

    fetch(`http://localhost:8080/driver/update-profile/${user.did}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newuser),
    })
      .then((response) => response.text()) // 👈 read response as plain text
      .then((message) => {
        alert("✅ " + message);
      })
      .catch((error) => {
        alert("❌ Failed to update profile: " + error.message);
      });
  }

  return (
    <div className="cont-update">
      <div className="form-container sign-up-container">
        Name :{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setDname(e.target.value);
          }}
        ></input>
        Email :{" "}
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        Mobile :{" "}
        <input
          type="text"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        ></input>
        adhar :{" "}
        <input
          type="text"
          value={adhar}
          onChange={(e) => {
            setAdhar(e.target.value);
          }}
        ></input>
        Vehicle No :{" "}
        <input
          type="text"
          value={vehicleNo}
          onChange={(e) => {
            setVehicleNo(e.target.value);
          }}
        ></input>
        License No "{" "}
        <input
          type="text"
          value={licenseNo}
          onChange={(e) => {
            setLicenseNo(e.target.value);
          }}
        ></input>
        <button onClick={updateUser}>Update</button>
      </div>
    </div>
  );
}

export default Profile;
