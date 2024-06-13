import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./productcard";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";

const getRandomProducts = (products, count) => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Cards = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://38.45.67.174:3000/api/products"
        );
        const data = response.data.map((product) => ({
          id: product.id,
          namaKost: product.namaKost,
          alamat: product.alamat,
          kota: product.kota,
          provinsi: product.provinsi,
          hargaPerBulan: product.hargaPerBulan,
          fotoKost: product.fotoKost,
        }));
        setProducts(getRandomProducts(data, 3));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center my-8 dark:text-white text-orange-500">
        Cari Kost Pilihan Kamu
      </h1>
      <div className="inline-grid md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link to="/list">
        <Button className="rounded bg-orange-500 mt-4 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
          Lihat Semua
        </Button>
      </Link>
    </div>
  );
};

export default Cards;
