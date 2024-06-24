import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchForm() {
  const [kota, setKota] = useState("");
  const [kategoriKost, setKategoriKost] = useState("");
  const [hargaMin, setHargaMin] = useState("");
  const [hargaMax, setHargaMax] = useState("");
  const [suggestions, setSuggestions] = useState({
    kota: [],
    kategoriKost: [],
    harga: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get("https://hanabira.co/api/suggestions");
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get("https://hanabira.co/api/search", {
        params: {
          kota,
          kategoriKost,
          hargaMin,
          hargaMax,
        },
      });

      if (Array.isArray(response.data)) {
        navigate("/search-results", { state: { results: response.data } });
      } else {
        navigate("/search-results", { state: { results: [] } });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      navigate("/search-results", { state: { results: [] } });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <section className="bg-custom-color dark:bg-zinc-800 flex justify-center p-4">
        <form
          className="flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-5xl"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <select
            className="py-2 px-4 border text-gray-700 focus:outline-none focus:shadow-outline"
            value={kota}
            onChange={(e) => setKota(e.target.value)}
          >
            <option value="">Kota</option>
            {(suggestions.kota || []).map((kota, index) => (
              <option key={index} value={kota}>
                {kota}
              </option>
            ))}
          </select>

          <select
            className="py-2 px-4 border rounded-full text-gray-700 focus:outline-none focus:shadow-outline"
            value={kategoriKost}
            onChange={(e) => setKategoriKost(e.target.value)}
          >
            <option value="">Kategori</option>
            {(suggestions.kategoriKost || []).map((kategori, index) => (
              <option key={index} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>

          <input
            className="py-2 px-4 border rounded-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hargaMin"
            type="number"
            placeholder="Harga Min"
            value={hargaMin}
            onChange={(e) => setHargaMin(e.target.value)}
          />

          <input
            className="py-2 px-4 border rounded-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hargaMax"
            type="number"
            placeholder="Harga Max"
            value={hargaMax}
            onChange={(e) => setHargaMax(e.target.value)}
          />

          <button
            className="bg-custom-orange hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Search
          </button>
        </form>
      </section>
    </div>
  );
}

export default SearchForm;
