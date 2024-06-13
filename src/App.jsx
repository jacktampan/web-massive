import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page from "./pages/Page";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import Profile from "./pages/Profile";
import AdminRegister from "./pages/AdminRegister";
import AdminSettings from "./pages/AdminSettings";
import AdminLogin from "./pages/LoginAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/page/:id" element={<Page />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
