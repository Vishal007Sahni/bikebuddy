import { Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/tablestyles.css';
import './ConfirmRide.css';

export default function ConfirmRide() {
  let navigate = useNavigate();
  const [cust, setCustomer] = useState({});
  const [driver, setDriver] = useState({});
  const [rid, setRid] = useState('');
  const [image, setImage] = useState(null);

  // useEffect(() => {}, []);

  // payment

  const email = cust.email;

  const subject = "JoinMyRide : OTP for Payment";
  const random = Math.floor(100000 + Math.random() * 900000);
  const body = "Dear User , You OTP for payment is " + random;
  // const [otp, setOtp] = useState('');

  async function sendOtp() {
    await axios.post("http://localhost:8080/mail/send-mail", {
      email,
      subject,
      body
    }).then(res => console.log(res));
  }

  let driver1 = JSON.parse(sessionStorage?.getItem('driver'))?.user?.uid;

  useEffect(() => {
    console.log("SessionStorage contents:", sessionStorage); // Log sessionStorage contents
    let cust = JSON.parse(sessionStorage.getItem('user'));
    setCustomer(cust);

    let rid = JSON.parse(sessionStorage.getItem('rid'));
    setRid(rid);

    axios.get(`http://localhost:8080/user/${driver1}/image`)
      .then(res => {
        console.log('posting data', res);
        setImage(res.data);
      });

    const ride = JSON.parse(sessionStorage.getItem("ride"));
    setRid(ride.rid);
    setDriver(ride.driver);
  }, []);

  let isimg;

  if (image == null) {
    isimg = false;
  } else {
    isimg = true;
  }

  return (
    <div className="confirm-ride-container">
      <h1>Ride Details</h1>
      <table cellPadding={10} className="cardtable">
        <tr>
          <td className="data">Source:</td>
          <td className="data">{JSON.parse(sessionStorage.getItem("ride")).source}</td>
        </tr>
        <tr>
          <td className="data">Destination:</td>
          <td className="data">{JSON.parse(sessionStorage.getItem("ride")).dest}</td>
        </tr>
        <tr>
          <td className="data">Charges:</td>
          <td className="data">{JSON.parse(sessionStorage.getItem("ride")).charges}</td>
        </tr>
        <tr>
          <td className="data">Time:</td>
          <td className="data">{JSON.parse(sessionStorage.getItem("ride")).time}</td>
        </tr>
        <tr>
          <td className="data">Driver Name:</td>
          <td className="data">{JSON.parse(sessionStorage.getItem("ride")).driverName}</td>
        </tr>
        <tr>
          <td className="data">Driver Phone:</td>
          <td className="data">{JSON.parse(sessionStorage.getItem("ride")).driverPhone}</td>
        </tr>
      </table>
      <br />
      <button onClick={() => navigate("/customer/book")}>Book Ride</button>
    </div>
  );
}