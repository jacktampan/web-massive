import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://backend.sikomik.com/api/auth/login", {
        username,
        password,
        role: "user",
      });
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      // Redirect to dashboard or any other page
      window.location.href = "/";
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-color1">
      <div className="p-8 rounded border-solid border w-full max-w-sm bg-white">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="KostCozy Logo"
            className="h-32 w-32 mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-custom-orange">
            Welcome to KostCozy
          </h2>
          <p className="text-gray-600">
            Please enter your username and password to login.
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Your username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-custom-orange"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-custom-orange"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-custom-orange text-white py-2 rounded hover:bg-orange-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="text-center p-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-custom-orange hover:underline">
              Sign Up
            </a>
          </p>
          <p className="text-gray-600 mt-2">
            Want to go back?{" "}
            <a href="/" className="text-custom-orange hover:underline">
              Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
