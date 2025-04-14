import React, { useState } from "react";
import { format, addYears } from "date-fns";
import { useNavigate } from "react-router-dom";
import "../App.css";

const today = new Date();
const maxDate = addYears(today, 1);
const formatDate = (date) => format(date, "yyyy-MM-dd");

export default function SignupForm() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    joinDate: "",
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
    if (!formData.userName) newErrors.userName = "User Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Must be a valid email";
    if (!formData.password)
      newErrors.password = "Password is required";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(formData.password)
    )
      newErrors.password =
        "Must have 1 uppercase, 1 lowercase, 1 special character, and be at least 8 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords must match";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    else if (!/^\d+$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Digits only";
    else if (formData.phoneNumber.length < 10)
      newErrors.phoneNumber = "Minimum 10 digits";
    if (!formData.joinDate) newErrors.joinDate = "Join Date is required";
    else {
      const selectedDate = new Date(formData.joinDate);
      if (selectedDate < today)
        newErrors.joinDate = "Date can't be in the past";
      else if (selectedDate > maxDate)
        newErrors.joinDate = "Date can't be more than 1 year from today";
    }

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
          <input
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
          />
          {errors.userName && <p>{errors.userName}</p>}

          <input
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

          <input
            name="phoneNumber"
            placeholder="Mobile Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}

          <input
            type="date"
            name="joinDate"
            placeholder="Select a date"
            value={formData.joinDate}
            onChange={handleChange}
            min={formatDate(today)}
            max={formatDate(maxDate)}
          />
          {errors.joinDate && <p>{errors.joinDate}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="brand-container">
        <h1>Quest K2 Technologies</h1>
        <p>Innovate. Build. Transform</p>
      </div>
    </div>
  );
}
