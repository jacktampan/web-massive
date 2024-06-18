import React, { useState, Fragment } from "react";
import Sidebar from "./Sidebar";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

// ContactCS Component
const ContactCS = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Hubungi Customer Service
      </h2>
      <a
        href="tel:082623639272"
        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg block mb-4 text-center"
      >
        WA CS: 0826-2363-9272
      </a>
      <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg w-full">
        Chat CS
      </button>
    </div>
  );
};

const AddKostForm = () => {
  const [selectedBank, setSelectedBank] = useState("BNI");
  const [noRekening, setNoRekening] = useState("");
  const [error, setError] = useState("");
  const banks = ["BNI", "BRI", "BCA", "Mandiri"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noRekening.trim() === "") {
      setError("Nomor Rekening tidak boleh kosong.");
      return;
    }
    setError("");
    console.log("Submitted No. Rekening:", noRekening);
    // Tambahkan logika pengiriman data ke backend di sini
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-md"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Ubah No Rekening</h2>
      <div className="mb-4">
        <label
          htmlFor="bank"
          className="block text-sm font-medium text-gray-700"
        >
          Bank
        </label>
        <Listbox value={selectedBank} onChange={setSelectedBank}>
          <div className="relative mt-1">
            <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-opacity-75 sm:text-sm">
              <span className="block truncate">{selectedBank}</span>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {banks.map((bank, bankIdx) => (
                  <ListboxOption
                    key={bankIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                      }`
                    }
                    value={bank}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {bank}
                        </span>
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div className="mb-4">
        <label
          htmlFor="noRekening"
          className="block text-sm font-medium text-gray-700"
        >
          Nomor Rekening
        </label>
        <input
          type="text"
          id="noRekening"
          name="noRekening"
          value={noRekening}
          onChange={(e) => setNoRekening(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nomor Rekening"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
      >
        Submit No. Rekening
      </button>
    </form>
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
    <div className="min-h-screen flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="mt-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800">KostCozy</h1>
          <AboutUs />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="max-w-md space-y-6">
            <ContactCS />
          </div>

          <div className="max-w-md space-y-6">
            <AddKostForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
