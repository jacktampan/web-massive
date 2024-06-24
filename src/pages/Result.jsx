import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../component/navbar";
export default function List() {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="my-4 text-xl">Daftar Kost yang Anda Cari</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {results.map((product) => {
              const hargaDiskon = product.hargaPer12Bulan / 12;
              const isDiskonLebihMurah = hargaDiskon < product.hargaPerBulan;
              const fasilitasKamar = JSON.parse(product.fasilitasKamar).slice(
                0,
                3
              );

              return (
                <Link
                  key={product.id}
                  to={`/page/${product.id}`}
                  className="group text-sm bg-white shadow rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={`https://hanabira.co/${product.fotoKost}`}
                      alt={product.namaKost}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-0 left-0 m-2 bg-yellow-500 text-white px-2 py-1 rounded">
                      Promo
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">
                      {product.namaKost}
                    </h3>
                    <p className="text-gray-500">
                      {product.alamat}, {product.kota}, {product.provinsi}
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="text-gray-900 font-bold">
                        Rp {product.hargaPerBulan}
                      </span>
                      {isDiskonLebihMurah && (
                        <span className="ml-2 text-red-500 line-through">
                          Rp {hargaDiskon}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Fasilitas: {fasilitasKamar.join(", ")}
                    </div>
                    <div className="mt-2 text-sm font-medium text-red-500">
                      Hanya {product.jumlahKamarTersedia} kamar tersisa
                    </div>
                  </div>
                  <div className="p-4 bg-gray-100 text-right">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Lihat ketersediaan
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
