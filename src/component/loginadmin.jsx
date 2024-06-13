import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import googleLogo from "../assets/google-logo.png";
import facebookLogo from "../assets/facebook-logo.png";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://38.45.67.174:3000/api/auth/login/admin",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      // Redirect to admin dashboard or any other page
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="KostCozy Logo"
            className="h-32 w-32 mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-orange-500">
            Admin Login
          </h2>
          <p className="text-gray-600">
            Please enter your username and password to login.
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Masukkan username anda
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-orange-500"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Masukkan password anda
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-orange-500"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-sm text-orange-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="text-center p-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/admin/register"
              className="text-orange-500 hover:underline"
            >
              Sign Up
            </a>
          </p>
          <p className="text-gray-600 mt-2">Or login using</p>
          <div className="flex justify-center">
            <button className="bg-white border rounded-full p-2 mx-1 hover:bg-gray-100">
              <img src={googleLogo} alt="Google Logo" className="h-6" />
            </button>
            <button className="bg-white border rounded-full p-2 mx-1 hover:bg-gray-100">
              <img src={facebookLogo} alt="Facebook Logo" className="h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
