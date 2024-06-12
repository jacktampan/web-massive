import React, { useState } from "react";
import profilePic from "../assets/profile.png";
import { Input } from "@headlessui/react";

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    new_address: "",
    phone_number: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://38.45.67.174:3000/api/user/settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      alert("Settings saved!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    window.location.href = "/login"; // Redirect to login page
  };

  const renderProfileInformation = () => {
    return (
      <div className="profile-information text-center mb-8">
        <img
          src={profilePic}
          alt="Profile"
          className="profile-picture w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="profile-name text-xl font-semibold mt-4">
          Luthfi Firmansyah
        </h2>
        <p className="profile-email text-gray-600">Luthfiajaz@gmail.com</p>
      </div>
    );
  };

  const renderAccountSettingsForm = () => {
    return (
      <div className="account-settings-form mb-8">
        <h3 className="form-heading text-lg font-semibold mb-4">
          Account Settings
        </h3>
        <p className="form-description text-gray-600 mb-4">
          Here you can change account information
        </p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username*</label>
            <Input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address*</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Address</label>
            <Input
              name="new_address"
              type="text"
              value={formData.new_address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <Input
              name="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </form>
      </div>
    );
  };

  const renderChangePasswordForm = () => {
    return (
      <div className="change-password-form mb-8">
        <h3 className="form-heading text-lg font-semibold mb-4">
          Change Password
        </h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Old Password*</label>
            <Input
              name="old_password"
              type="password"
              value={formData.old_password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Password*</label>
            <Input
              name="new_password"
              type="password"
              value={formData.new_password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Confirm Password*
            </label>
            <Input
              name="confirm_password"
              type="password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </form>
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="buttons flex justify-between">
        <button
          className="save-button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="logout-button bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  };

  return (
    <div className="account-settings p-8 bg-white shadow-md rounded-lg max-w-2xl mx-auto">
      {renderProfileInformation()}
      <div className="forms">
        {renderAccountSettingsForm()}
        {renderChangePasswordForm()}
      </div>
      {renderButtons()}
    </div>
  );
};

export default AccountSettings;
