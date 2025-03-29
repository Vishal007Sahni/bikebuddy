import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustDash() {
  let navigate = useNavigate();
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showSignupOptions, setShowSignupOptions] = useState(false);

  return (
    <div className="form">
      <div
        style={{
          width: "100vw",
          height: "80vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={require("./landingpage.jpg")}
          style={{
            width: "100vw",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          alt="Landing Page"
        />
        <h1
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
          }}
        >
          Ride Together, Save Forever!
        </h1>

        {/* LOGIN & SIGNUP BUTTONS */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "20px",
          }}
        >
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
          <h3>Login As:</h3>
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
          <h3>Sign Up As:</h3>
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

// Reusable button styles
const buttonStyle = (bgColor) => ({
  padding: "10px 20px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
});

const modalStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#fff",
  padding: "20px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
};

const modalButtonStyle = {
  padding: "10px 20px",
  fontSize: "1rem",
  fontWeight: "bold",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  width: "150px",
  transition: "0.3s",
};

const cancelButtonStyle = {
  marginTop: "10px",
  backgroundColor: "#DC3545",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
};

export default CustDash;
