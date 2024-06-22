// ProductPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../Modal";
import { useAuth } from "../AuthContext";

const Page = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://104.234.231.224:3000/api/products/${id}`
        );
        const product = response.data;
        setProduct({
          id: product.id,
          name: product.namaKost,
          price: `Rp ${product.hargaPerBulan}`,
          images: [
            {
              id: 1,
              name: product.namaKost,
              src: `http://104.234.231.224:3000/${product.fotoKost}`,
              alt: product.namaKost,
            },
            {
              id: 2,
              name: "Luar Kamar",
              src: `http://104.234.231.224:3000/${product.fotoLuarKamar}`,
              alt: "Luar Kamar",
            },
            {
              id: 3,
              name: "Dalam Kamar",
              src: `http://104.234.231.224:3000/${product.fotoDalamKamar}`,
              alt: "Dalam Kamar",
            },
          ],
          kelamin: product.kategoriKost,
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
    setModalContent(
      <div className="text-center p-6">
        <img src={src} alt="Product Image" className="mx-auto" />
      </div>
    );
    setIsModalOpen(true);
  };

  const handleRentNowClick = () => {
    if (!isLoggedIn) {
      setModalContent(
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="mb-4">You need to login to rent this product.</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </div>
      );
      setIsModalOpen(true);
    } else {
      navigate(`/checkout`, { state: { product } });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-14">
      <div className="flex justify-center items-center gap-14">
        {product.images?.[0]?.src && (
          <img
            src={product.images[0].src}
            alt="Hero Image"
            onClick={() => handleImageClick(product.images[0].src)}
            className="cursor-pointer"
          />
        )}
        <div className="flex flex-col gap-4">
          {product.images?.[1]?.src && (
            <img
              src={product.images[1].src}
              alt="Hero Image"
              onClick={() => handleImageClick(product.images[1].src)}
              className="cursor-pointer max-h-36"
            />
          )}
          {product.images?.[2]?.src && (
            <img
              src={product.images[2].src}
              alt="Hero Image"
              onClick={() => handleImageClick(product.images[2].src)}
              className="cursor-pointer max-h-36"
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 mt-10">
        <h1 className="text-2xl font-bold text-gray-900">
          Kost {product.name}
        </h1>
        <button
          onClick={handleRentNowClick}
          className="w-1/2 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 col-start-3"
        >
          Rent Now
        </button>
      </div>
      <div className="bg-gray-50 w-fit p-4">
        <p>Khusus {product.kelamin}</p>
      </div>
      <div className="mt-4">
        <p className="text-base text-gray-900">{product.description}</p>
      </div>
      <div className="grid grid-cols-2">
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
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          contentLabel="Modal"
        >
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default Page;
