import React from "react";
import logo from "../assets/logo.png";
import googleLogo from "../assets/google-logo.png";
import facebookLogo from "../assets/facebook-logo.png";

function Login() {
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
            Welcome to KostCozy
          </h2>
          <p className="text-gray-600">
            Please enter your email, we'll send you an OTP on your email address
          </p>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Masukkan email anda
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-orange-500"
              placeholder="Email"
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
            <a href="/register" className="text-orange-500 hover:underline">
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

export default Login;
