import React from "react";
import {
  FolderIcon,
  HomeIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Add",
    href: "/dashboard/add",
    icon: DocumentPlusIcon,
    current: false,
  },
  {
    name: "List",
    href: "/dashboard/list",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Track",
    href: "/dashboard/track",
    icon: FolderIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    window.location.href = "/admin/login"; // Redirect to login page
  };

  return (
    <div className="flex h-full flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 shrink-0 items-center">
        <img className="h-8 w-auto" src={logo} alt="Kost Cozy" />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <button
              onClick={handleLogout}
              className="group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            >
              <svg
                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12H3m0 0l4-4m-4 4l4 4m10-4v6m0-6V6m0 6h6"
                />
              </svg>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
