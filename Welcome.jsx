import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

export default function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  if (!formData) {
    return (
      <div className="welcome-container">
        <div className="welcome-content">
          <h2>No data found</h2>
          <button onClick={() => navigate("/")}>Go back to Signup</button>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h2>Welcome, {formData.userName}!</h2>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
        <p><strong>Join Date:</strong> {formData.joinDate}</p>
    
        <button onClick={() => navigate("/")}>Back to Signup</button>
      </div>
    </div>
  );
}
