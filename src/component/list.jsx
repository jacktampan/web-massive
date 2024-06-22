import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function List() {
  const [productsKost, setProductsKost] = useState([]);

  useEffect(() => {
    fetch("http://104.234.231.224:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((product) => ({
          id: product.id,
          name: product.namaKost,
          href: `/page/${product.id}`, // Update href to navigate to the Page component with the product ID
          price: `Rp ${product.hargaPerBulan}`,
          availability: `${product.alamat}, ${product.kota}, ${product.provinsi}`,
          imageSrc: `http://104.234.231.224:3000/${product.fotoKost}`,
          imageAlt: product.namaKost,
        }));
        setProductsKost(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="my-4 text-xl">Daftar Kost yang Anda Cari</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {productsKost.map((product) => (
            <Link key={product.id} to={product.href} className="group text-sm">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-96 h-80 object-cover object-center"
                />
              </div>
              <h3 className="mt-4 font-medium text-gray-900">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {product.availability}
              </p>
              <p className="mt-2 font-medium text-gray-900">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
