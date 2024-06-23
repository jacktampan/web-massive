import React, { useState, useEffect } from "react";
import Logoimg from "../assets/logo.png";

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const Dialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="justify-center sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Masuk ke CozyKost
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Saya ingin masuk sebagai
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 justify-center sm:flex sm:flex-row-reverse sm:px-6">
              <a
                href="/register"
                className="inline-flex w-full justify-center rounded-md bg-custom-orange px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:w-auto"
              >
                Pencari Kost
              </a>
              <a
                href="/admin/register"
                className="inline-flex w-full justify-center rounded-md bg-custom-color px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto mt-3"
                onClick={onClose}
              >
                Pemilik Kost
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const startInactivityTimer = () => {
      window.inactivityTimeout = setTimeout(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        alert("You have been logged out due to inactivity.");
      }, INACTIVITY_TIMEOUT);
    };

    const resetInactivityTimer = () => {
      clearTimeout(window.inactivityTimeout);
      startInactivityTimer();
    };

    if (token) {
      setIsLoggedIn(true);
      startInactivityTimer();
    }

    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);
    window.addEventListener("scroll", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);

    return () => {
      clearTimeout(window.inactivityTimeout);
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
      window.removeEventListener("scroll", resetInactivityTimer);
      window.removeEventListener("click", resetInactivityTimer);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  const links = [
    { name: "Home", href: "/" },
    { name: "List", href: "/list" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-white container mx-auto">
      <div className="flex justify-between items-center py-5 px-2">
        <a href="/">
          <img src={Logoimg} alt="Logo" className="h-12" />
        </a>
        <div className="hidden md:flex items-center space-x-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="py-5 px-3 text-zinc-700 dark:text-white hover:text-zinc-900 dark:hover:text-white"
            >
              {link.name}
            </a>
          ))}
          {isLoggedIn ? (
            <a
              href="/profile"
              className="py-2 px-4 bg-custom-orange text-white rounded hover:bg-orange-600"
            >
              Profile
            </a>
          ) : (
            <button
              onClick={toggleDialog}
              className="py-2 px-4 bg-custom-color text-white rounded hover:bg-orange-600"
            >
              Masuk/Daftar
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6 text-zinc-500 dark:text-white hover:text-zinc-900 dark:hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`md:hidden ${
          isMenuOpen ? "flex" : "hidden"
        } flex-col items-center`}
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="block py-2 px-4 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            {link.name}
          </a>
        ))}
        {isLoggedIn ? (
          <a
            href="/profile"
            className="block py-2 px-4 text-sm bg-custom-orange text-white rounded hover:bg-orange-600"
          >
            Profile
          </a>
        ) : (
          <button
            onClick={toggleDialog}
            className="block py-2 px-4 text-sm bg-custom-orange text-white rounded hover:bg-orange-600"
          >
            Masuk/Daftar
          </button>
        )}
      </div>
      <Dialog isOpen={isDialogOpen} onClose={toggleDialog} />
    </nav>
  );
};

export default NavBar;
