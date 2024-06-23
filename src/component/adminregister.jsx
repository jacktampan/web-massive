import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hanabira.co/api/auth/register/admin",
        formData
      );
      alert("Admin registered successfully");
    } catch (error) {
      console.error("There was an error registering the admin!", error);
      alert("Failed to register admin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-color1">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="KostCozy Logo"
            className="h-32 w-32 mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-custom-orange">
            Register Admin at KostCozy
          </h2>
          <p className="text-gray-600">
            Please fill out the form below to create an admin account.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-custom-orange"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-custom-orange"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-custom-orange"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-custom-orange text-white py-2 rounded hover:bg-orange-600 transition duration-200"
          >
            Register
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/admin/login"
                className="text-custom-orange hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
