import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoneD from './DoneD';

// Add inline CSS for animation and spinner
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    animation: 'fadeIn 1.5s',
    background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
    borderRadius: '16px',
    margin: '40px auto',
    maxWidth: '600px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '40px 24px'
  },
  heading: {
    color: '#2d3a4b',
    fontWeight: 700,
    fontSize: '1.5rem',
    marginBottom: '24px',
    textAlign: 'center',
    letterSpacing: '0.5px'
  },
  spinner: {
    margin: '24px 0',
    width: '48px',
    height: '48px',
    border: '6px solid #b2bec3',
    borderTop: '6px solid #0984e3',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  subtext: {
    color: '#636e72',
    fontSize: '1.1rem',
    marginTop: '12px',
    textAlign: 'center'
  }
};

// Add keyframes for animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
`;
if (!document.head.querySelector('style[data-done-animation]')) {
  styleSheet.setAttribute('data-done-animation', 'true');
  document.head.appendChild(styleSheet);
}

function Done (){
    const [cust, setCustomer] = useState({});
    const [ride, setRide] = useState({});
    const random = Math.floor(100000 + Math.random() * 900000);
    const navigate = useNavigate();

    useEffect(() => {
        let cust = JSON.parse(sessionStorage.getItem('user'))
        setCustomer(cust)
        let ride = JSON.parse(sessionStorage.getItem('ride'))
        setRide(ride)
        let rid = ride.rid;
        let cid = cust.cid;

        const timer = setTimeout(() => {  
            axios.post("http://localhost:8080/mail/booking-mail",{
                cid,
                rid,
                random
            }).then(res=>console.log(res))
        }, 0);

        // Auto-navigate after 30 seconds
        const navTimer = setTimeout(() => {
            navigate("/customer/controller");
        }, 30000);

        return () => {
            clearTimeout(timer);
            clearTimeout(navTimer);
        };
    },[])

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>
                🎉 Booking Confirmed! <br />
                <span style={{fontWeight: 400, fontSize: '1.1rem'}}>You will receive an email with OTP.<br />Please use that OTP to start the Ride.</span>
            </h2>
            <div style={styles.spinner}></div>
            <div style={styles.subtext}>
                Redirecting you to your dashboard in <b>20 seconds</b>...<br/>
                Please check your email for the OTP.
            </div>
        </div>
    );
}

export default Done;