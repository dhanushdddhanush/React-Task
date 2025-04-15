import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const today = new Date();
const formatDate = (date) => date.toISOString().split("T")[0];

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    email: "",
    retypeEmail: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    phoneType: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Personal Information Validation
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.day || !formData.month || !formData.year)
      newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    // Account Information Validation
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Must be a valid email";
    if (formData.email !== formData.retypeEmail)
      newErrors.retypeEmail = "Emails must match";
    if (!formData.password) newErrors.password = "Password is required";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(formData.password)
    )
      newErrors.password =
        "Must have 1 uppercase, 1 lowercase, 1 special character, and be at least 8 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords must match";
    if (!formData.securityQuestion)
      newErrors.securityQuestion = "Security Question is required";
    if (!formData.securityAnswer)
      newErrors.securityAnswer = "Security Answer is required";

    // Contact Information Validation
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required";
    else if (!/^\d{5}$/.test(formData.zipCode))
      newErrors.zipCode = "Must be a valid 5-digit Zip Code";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    else if (!/^\d+$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone Number must contain digits only";
    else if (formData.phoneNumber.length < 10)
      newErrors.phoneNumber = "Phone Number must be at least 10 digits";
    if (!formData.phoneType) newErrors.phoneType = "Phone Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/Welcome", { state: formData });
    }
  };

  return (
    <div className="signup-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Register with us</h2>

          <div className="form-section">
            <p className="section-title">Personal Information</p>
            <div className="input-group">
              <label>First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p>{errors.firstName}</p>}
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p>{errors.lastName}</p>}
            </div>
            <div className="dob-group">
              <label>Date of Birth</label>
              <div className="dob-inputs">
                <input
                  name="day"
                  placeholder="Day"
                  value={formData.day}
                  onChange={handleChange}
                  max={31}
                />
                <input
                  name="month"
                  placeholder="Month"
                  value={formData.month}
                  onChange={handleChange}
                  max={12}
                />
                <input
                  name="year"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleChange}
                  max={today.getFullYear()}
                />
              </div>
              {errors.dob && <p>{errors.dob}</p>}
            </div>
            <div className="input-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p>{errors.gender}</p>}
            </div>
          </div>

          <div className="form-section">
            <p className="section-title">Account Information</p>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="input-group">
              <label>Retype Email</label>
              <input
                type="email"
                name="retypeEmail"
                value={formData.retypeEmail}
                onChange={handleChange}
              />
              {errors.retypeEmail && <p>{errors.retypeEmail}</p>}
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
            <div className="input-group">
              <label>Security Question</label>
              <select
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
              >
                <option value="">Select a question</option>
                <option value="pet">What is your pet's name?</option>
                <option value="mother">What is your mother's maiden name?</option>
              </select>
              {errors.securityQuestion && <p>{errors.securityQuestion}</p>}
            </div>
            <div className="input-group">
              <label>Security Answer</label>
              <input
                name="securityAnswer"
                value={formData.securityAnswer}
                onChange={handleChange}
              />
              {errors.securityAnswer && <p>{errors.securityAnswer}</p>}
            </div>
          </div>

          <div className="form-section">
            <p className="section-title">Contact Information</p>
            <div className="input-group">
              <label>Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <p>{errors.address}</p>}
            </div>
            <div className="input-group">
              <label>City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <p>{errors.city}</p>}
            </div>
            <div className="input-group">
              <label>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
              </select>
              {errors.state && <p>{errors.state}</p>}
            </div>
            <div className="input-group">
              <label>Zip Code</label>
              <input
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
              {errors.zipCode && <p>{errors.zipCode}</p>}
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
            </div>
            <div className="input-group">
              <label>Phone Type</label>
              <select
                name="phoneType"
                value={formData.phoneType}
                onChange={handleChange}
              >
                <option value="">Select Phone Type</option>
                <option value="mobile">Mobile</option>
                <option value="home">Home</option>
              </select>
              {errors.phoneType && <p>{errors.phoneType}</p>}
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
