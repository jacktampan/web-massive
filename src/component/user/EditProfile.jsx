import React, { useEffect, useState } from "react";
import axios from "axios";
import profilePic from "../../assets/profile.png";
const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileResponse = await axios.get(
          "https://hanabira.co/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const profileData = profileResponse.data;
        setProfile(profileData);
        setFormData({
          username: profileData.username,
          email: profileData.email,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("https://hanabira.co/api/users/profile", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated!");
    } catch (error) {
      alert("Failed to save profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    window.location.href = "/login"; // Redirect to login page
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile p-8 bg-white solid border rounded-lg max-w-2xl mx-auto">
      <div className="profile-information text-center mb-8">
        <img
          src={profilePic}
          alt="Profile"
          className="profile-picture w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="profile-name text-xl font-semibold mt-4">
          {profile.username}
        </h2>
        <p className="profile-email text-gray-600">{profile.email}</p>
      </div>

      <div className="account-settings-form mb-8">
        <h3 className="form-heading text-lg font-semibold mb-4">
          Account Settings
        </h3>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="buttons flex justify-between">
            <button
              type="submit"
              className="save-button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              className="logout-button bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
