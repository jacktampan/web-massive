import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function List() {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="my-4 text-xl">Daftar Kost yang Anda Cari</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {results.map((product) => (
            <Link
              key={product.id}
              to={`/page/${product.id}`}
              className="group text-sm"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src={`https://hanabira.co/${product.fotoKost}`}
                  alt={product.namaKost}
                  className="w-96 h-80 object-cover object-center"
                />
              </div>
              <h3 className="mt-4 font-medium text-gray-900">
                {product.namaKost}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {product.alamat}, {product.kota}, {product.provinsi}
              </p>
              <p className="mt-2 font-medium text-gray-900">
                Rp {product.hargaPerBulan}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
