// App.jsx

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

const removeDarkMode = () => {
  const root = document.documentElement; // Biasanya <html>
  root.classList.remove("dark");
};

function Main() {
  useEffect(() => {
    removeDarkMode();
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="font-sans">
      <Main />
    </div>
  </React.StrictMode>
);
