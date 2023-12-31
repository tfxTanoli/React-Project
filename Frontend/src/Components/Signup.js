import React, { useState } from "react";
import { addUser, addGoogleUser } from "../Service/api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addUser(formData);

    if (response && response.token) {
      localStorage.setItem("token", response.token);
    }

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleGoogleSignup = async (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    const email = credentialResponseDecoded.email;
    const name = credentialResponseDecoded.name;
    const googleObj = {
      name: name,
      email: email,
    };

    console.log("Google Object:", googleObj);

    // await addGoogleUser(googleEmail, googlePicture, isGoogleAccount);
    console.log(name, email);
    const response = await addGoogleUser(googleObj);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="signup-form p-4 rounded"
        style={{
          backgroundColor: "#ffffff",
          color: "#495057",
          width: "400px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-center">Sign Up</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-control"
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block w-100">
          Sign Up
        </button>
        <GoogleLogin
          onSuccess={handleGoogleSignup}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </form>
    </div>
  );
};

export default SignUpForm;
