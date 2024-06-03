import React, { useState } from "react";
import Logoimg from "../assets/logo.png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/list" },
    { name: "Contact", href: "#" },
    { name: "Masuk/Daftar", href: "#", isButton: true, onClick: toggleDialog },
  ];

  return (
    <nav className="bg-white dark:bg-zinc-800 container mx-auto">
      <div className="flex justify-around">
        <div className="flex items-center py-5 px-2">
          <a href="/">
            <img src={Logoimg} alt="Logo" className="h-36" />
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-1">
          {links.slice(0, 3).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="py-5 px-3 text-zinc-700 dark:text-white hover:text-zinc-900 dark:hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleDialog}
            className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Masuk/Daftar
          </button>
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
        className={`mobile-menu md:hidden ${
          isMenuOpen ? "flex" : "hidden"
        } flex-col items-center`}
      >
        {links.slice(0, 3).map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="block py-2 px-4 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            {link.name}
          </a>
        ))}
        <button
          onClick={toggleDialog}
          className="block py-2 px-4 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Masuk/Daftar
        </button>
      </div>

      {isDialogOpen && (
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
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:w-auto"
                  >
                    Pencari Kost
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={toggleDialog}
                  >
                    Pemilik Kost
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
