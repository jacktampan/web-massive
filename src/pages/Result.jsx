import React from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="container mx-auto p-4">
      <section className="mt-4">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result) => (
              <div key={result.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-bold">{result.namaKost}</h3>
                <p>{result.alamat}</p>
                <p>
                  {result.kota}, {result.provinsi}
                </p>
                <p>{result.hargaPerBulan} per bulan</p>
                {/* Add more details as needed */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No results found</p>
        )}
      </section>
    </div>
  );
}

export default SearchResults;
