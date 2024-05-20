import React from "react";

const product = {
  name: 'Kost Cempaka',
  price: 'Rp 500000',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Kost Cempaka',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Kost Cempaka',
    },
  ],
  kelamin: [
    { name: 'Pria' },
    { name: 'White' },
  ],
  description: `
    Jl. KH. Hasyim Asy'ari Km. 03 Kalibeber Kecamatan Mojotengah
  `,
};

const Page = () => {
  return (
    <div className="container mx-auto p-14">
      <div className="flex justify-center items-center gap-14">
        <img src="https://placehold.co/900x700" alt="Hero Image" />
        <div className="flex flex-col gap-4">
          <img src="https://placehold.co/500x300" alt="Hero Image" />
          <img src="https://placehold.co/500x300" alt="Hero Image" />
        </div>
      </div>
    <div className="grid grid-cols-4 mt-10">
        <h1 className="text-2xl font-bold text-gray-900">
            {product.name}
        </h1>
        <button
                type="submit"
                className="w-1/2 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 col-start-4">
                {product.price}
            </button>
    </div>
        <div className="bg-gray-50 w-fit p-4">
          <p>Khusus {product.kelamin[0].name}</p>
        </div>
        <div className="mt-4">
            <p className="text-base text-gray-900">
          {product.description}
          </p>
          </div>
      <div className="grid grid-cols-3">
        <div>
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Fasilitas Bersama</h2>
          </div>
          <ul className="list-disc list-inside grid grid-cols-2">
            <li>Kompor</li>
            <li>Kulkas</li>
            <li>Gas</li>
            <li>Parkiran Motor</li>
            <li>Kulkas</li>
            <li>Wi-Fi</li>
            <li>Mesin Cuci</li>
            <li>Cleaning</li>
            <li>CCTV</li>
          </ul>

          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Fasilitas Kamar</h2>
          </div>
          <ul className="list-disc list-inside grid grid-cols-2">
            <li>Kamar Mandi Dalam</li>
            <li>Kasur</li>
            <li>Lemari</li>
            <li>Kipas Angin</li>
            <li>Meja Belajar</li>
            <li>Kursi Belajar</li>
          </ul>

          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Tata Tertib</h2>
          </div>
          <ul className="list-disc list-inside">
            <li>Boleh Membawa Hewan Peliharaan</li>
            <li>Anak-anak diperbolehkan dtinggal</li>
            <li>Boleh tinggal dengan pasangan halal</li>
          </ul>
        </div>

        <div className="col-start-3">
            <div className="mt-10"><img src="https://placehold.co/500x300" alt="" /></div>
            <div className="mt-10">
          <ul>
            <li>2.43 km dari Universitas Sains Al-Quran (UNSIQ)</li>
            <li>2.33 km dari Stasiun Cisauk</li>
            <li>0.35 km dari Alfamart</li>
          </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
