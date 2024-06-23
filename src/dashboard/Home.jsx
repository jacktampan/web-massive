import React from "react";
import Sidebar from "./Sidebar";

// ContactCS Component
const ContactCS = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Hubungi Customer Service
      </h2>
      <a
        href="tel:082623639272"
        className="bg-custom-orange hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg block mb-4 text-center"
      >
        WA CS: 0826-2363-9272
      </a>
      <button className="bg-custom-orange hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg w-full">
        Chat CS
      </button>
    </div>
  );
};

// AboutUs Component
const AboutUs = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-md mt-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Tentang Kami</h2>
      <p className="text-gray-700">
        KostCozy adalah platform yang memudahkan Anda mencari kost yang nyaman
        dan sesuai dengan kebutuhan Anda. Kami berkomitmen untuk memberikan
        layanan terbaik bagi pelanggan kami.
      </p>
    </div>
  );
};

// Home Component
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="flex-1">
          <div className="mt-10 text-center">
            <h1 className="text-3xl font-bold text-custom-orange">KostCozy</h1>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ContactCS />
            <AboutUs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
