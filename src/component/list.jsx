import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function List() {
  const [productsKost, setProductsKost] = useState([]);

  useEffect(() => {
    fetch("https://hanabira.co/api/products")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((product) => ({
          id: product.id,
          name: product.namaKost,
          href: `/page/${product.id}`, // Update href to navigate to the Page component with the product ID
          price: `Rp ${product.hargaPerBulan}`,
          availability: `${product.alamat}, ${product.kota}, ${product.provinsi}`,
          imageSrc: `https://hanabira.co/${product.fotoKost}`,
          imageAlt: product.namaKost,
        }));
        setProductsKost(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-5xl text-custom-orange text-center">
          Daftar Kost yang Tersedia
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {productsKost.map((product) => (
            <Link
              key={product.id}
              to={product.href}
              className="group text-sm solid border rounded-lg"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-96 h-80 object-cover object-center"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-black-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.availability}
                </p>
                <div className="flex justify-end p-4">
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Harga per bulan:
                    </span>
                    <button className="bg-custom-orange text-black font-bold px-4 py-2 rounded-lg">
                      {product.price}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
