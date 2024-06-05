import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./modal";

const Page = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://38.45.67.174:5000/api/products/${id}`
        );
        const product = response.data;
        setProduct({
          id: product.id,
          name: product.namaKost,
          price: `Rp ${product.hargaPerBulan}`,
          rating: 4, // This field is not available in the API response, so we set it manually
          images: [
            {
              id: 1,
              name: product.namaKost,
              src: `http://38.45.67.174:5000/uploads/${product.fotoKost}`,
              alt: product.namaKost,
            },
            {
              id: 2,
              name: "Luar Kamar",
              src: `http://38.45.67.174:5000/uploads/${product.fotoLuarKamar}`,
              alt: "Luar Kamar",
            },
            {
              id: 3,
              name: "Dalam Kamar",
              src: `http://38.45.67.174:5000/uploads/${product.fotoDalamKamar}`,
              alt: "Dalam Kamar",
            },
          ],
          kelamin: [
            { name: "Pria" }, // This field is also not available in the API response
          ],
          description: `${product.alamat}, ${product.kota}, ${product.provinsi}`,
          hargaPerBulan: product.hargaPerBulan,
          hargaPer3Bulan: product.hargaPer3Bulan,
          hargaPer6Bulan: product.hargaPer6Bulan,
          hargaPer12Bulan: product.hargaPer12Bulan,
          fasilitasKamar: JSON.parse(product.fasilitasKamar),
          fasilitasBersama: JSON.parse(product.fasilitasBersama),
          peraturan: JSON.parse(product.peraturan),
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (src) => {
    setModalImageSrc(src);
    setIsModalOpen(true);
  };

  const handleRentNowClick = () => {
    navigate(`/checkout`, { state: { product } });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-14">
      <div className="flex justify-center items-center gap-14">
        <img
          src={product.images[0].src}
          alt="Hero Image"
          onClick={() => handleImageClick(product.images[0].src)}
          className="cursor-pointer"
        />
        <div className="flex flex-col gap-4">
          <img
            src={product.images[1].src}
            alt="Hero Image"
            onClick={() => handleImageClick(product.images[1].src)}
            className="cursor-pointer max-h-36"
          />
          <img
            src={product.images[2].src}
            alt="Hero Image"
            onClick={() => handleImageClick(product.images[2].src)}
            className="cursor-pointer max-h-36"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 mt-10">
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <button
          onClick={handleRentNowClick}
          className="w-1/2 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 col-start-4"
        >
          Rent Now
        </button>
      </div>
      <div className="bg-gray-50 w-fit p-4">
        <p>Khusus {product.kelamin[0].name}</p>
      </div>
      <div className="mt-4">
        <p className="text-base text-gray-900">{product.description}</p>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">
              Fasilitas Bersama
            </h2>
          </div>
          <ul className="list-disc list-inside">
            {product.fasilitasBersama.map((fasilitas, index) => (
              <li key={index}>{fasilitas}</li>
            ))}
          </ul>

          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">
              Fasilitas Kamar
            </h2>
          </div>
          <ul className="list-disc list-inside grid grid-cols-2">
            {product.fasilitasKamar.map((fasilitas, index) => (
              <li key={index}>{fasilitas}</li>
            ))}
          </ul>

          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Tata Tertib</h2>
          </div>
          <ul className="list-disc list-inside">
            {product.peraturan.map((aturan, index) => (
              <li key={index}>{aturan}</li>
            ))}
          </ul>
        </div>

        {/* <div className="col-start-3">
          <div className="mt-10">
            <img src={product.images[0].src} alt="" />
          </div>
          <div className="mt-10">
            <ul>
              <li>2.43 km dari Universitas Sains Al-Quran (UNSIQ)</li>
              <li>2.33 km dari Stasiun Cisauk</li>
              <li>0.35 km dari Alfamart</li>
            </ul>
          </div>
        </div> */}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageSrc={modalImageSrc}
        />
      )}
    </div>
  );
};

export default Page;
