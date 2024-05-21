import React, { useState } from 'react';

function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    registered: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation or send data to the server here
    console.log('Form submitted:', formData);
    // Reset form after submit
    setFormData({
      username: '',
      email: '',
      password: '',
      registered: true
    });
    // Call onRegister function if provided
    if (onRegister) {
      onRegister();
    }
  };

  if (formData.registered) {
    return (
      <div className="text-center">
        <p className="text-green-500">Registration successful! Please proceed to login.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-200">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
