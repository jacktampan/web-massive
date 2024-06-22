import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchForm() {
  const [location, setLocation] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [harga, setHarga] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get("/api/search", {
        params: {
          location,
          fasilitas,
          harga,
        },
      });

      // Pastikan respons data adalah array
      if (Array.isArray(response.data)) {
        navigate("/search-results", { state: { results: response.data } });
      } else {
        navigate("/search-results", { state: { results: [] } });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      navigate("/search-results", { state: { results: [] } }); // Set results to an empty array in case of error
    }
  };

  return (
    <div className="container mx-auto p-4">
      <section className="bg-gray-100 dark:bg-zinc-800 flex justify-center p-4">
        <form
          className="flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-3xl"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="w-full md:w-1/4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              placeholder="Lokasi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fasilitas"
              type="text"
              placeholder="Fasilitas"
              value={fasilitas}
              onChange={(e) => setFasilitas(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="harga"
              type="text"
              placeholder="Harga"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SearchForm;
