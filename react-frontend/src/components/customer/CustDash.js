import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustDash() {
  let navigate = useNavigate();
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showSignupOptions, setShowSignupOptions] = useState(false);

  return (
    <div className="form" style={formContainerStyle}>
      <div style={imageContainerStyle}>
        <img
          src={require("./landingpage.jpg")}
          style={imageStyle}
          alt="Landing Page"
        />
        <h1 style={headingStyle}>
          Ride Together, Save Forever!
        </h1>

        {/* LOGIN & SIGNUP BUTTONS */}
        <div style={buttonsContainerStyle}>
          <button
            style={buttonStyle("#007BFF")}
            onClick={() => setShowLoginOptions(!showLoginOptions)}
          >
            Login
          </button>

          <button
            style={buttonStyle("#28A745")}
            onClick={() => setShowSignupOptions(!showSignupOptions)}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* LOGIN OPTIONS */}
      {showLoginOptions && (
        <div style={modalStyle}>
          <h3 style={modalTitleStyle}>Login As:</h3>
          <button
            style={modalButtonStyle}
            onClick={() => navigate("/customer/login")}
          >
            Customer Login
          </button>
          <button
            style={modalButtonStyle}
            onClick={() => navigate("/driver/login")}
          >
            Driver Login
          </button>
          <button
            style={cancelButtonStyle}
            onClick={() => setShowLoginOptions(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* SIGNUP OPTIONS */}
      {showSignupOptions && (
        <div style={modalStyle}>
          <h3 style={modalTitleStyle}>Sign Up As:</h3>
          <button
            style={modalButtonStyle}
            onClick={() => navigate("/customer/register")}
          >
            Customer Sign Up
          </button>
          <button
            style={modalButtonStyle}
            onClick={() => navigate("/driver/register")}
          >
            Driver Sign Up
          </button>
          <button
            style={cancelButtonStyle}
            onClick={() => setShowSignupOptions(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

// Styles
const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f8f9fa',
  padding: '0',
};

const imageContainerStyle = {
  width: "100%",
  height: "100vh",
  position: "relative",
  overflow: "hidden",
  borderRadius: '0',
  boxShadow: 'none',
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const headingStyle = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translateX(-50%)",
  color: "#fff",
  fontSize: "2.2rem",
  fontWeight: "bold",
  textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
  textAlign: "center",
  padding: '0 20px',
  maxWidth: '90%',
  zIndex: 10,
};

const buttonsContainerStyle = {
  position: "absolute",
  bottom: "15%",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  zIndex: 10,
};

const buttonStyle = (bgColor) => ({
  padding: "12px 24px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "2px 2px 12px rgba(0, 0, 0, 0.3)",
});

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "25px",
  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.4)",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  zIndex: 1000,
  maxWidth: '95%',
  width: 'auto',
};

const modalTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#343a40'
};

const modalButtonStyle = {
  padding: "12px 24px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  width: "100%",
  maxWidth: '200px',
  transition: "0.3s",
  textAlign: 'center',
};

const cancelButtonStyle = {
  marginTop: "15px",
  backgroundColor: "#DC3545",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "0.3s",
};

export default CustDash;
