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
          `https://backend.sikomik.com/api/products/${id}`
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
              src: `https://backend.sikomik.com/${product.fotoKost}`,
              alt: product.namaKost,
            },
            {
              id: 2,
              name: "Luar Kamar",
              src: `https://backend.sikomik.com/${product.fotoLuarKamar}`,
              alt: "Luar Kamar",
            },
            {
              id: 3,
              name: "Dalam Kamar",
              src: `https://backend.sikomik.com/${product.fotoDalamKamar}`,
              alt: "Dalam Kamar",
            },
          ],
          kelamin: product.kategoriKost,
          description: `${product.alamat}, ${product.kota}, ${product.provinsi}`,
          hargaPerBulan: product.hargaPerBulan,
          hargaPer3Bulan: product.hargaPer3Bulan,
          hargaPer6Bulan: product.hargaPer6Bulan,
          hargaPer12Bulan: product.hargaPer12Bulan,
          fasilitasKamar: product.fasilitasKamar,
          fasilitasBersama: product.fasilitasBersama,
          peraturan: product.peraturan,
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
            className="w-full bg-custom-orange text-white py-2 rounded transition duration-200"
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
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-14">
        {product.images?.[0]?.src && (
          <img
            src={product.images[0].src}
            alt="Hero Image"
            onClick={() => handleImageClick(product.images[0].src)}
            className="cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        )}
        <div className="flex flex-col gap-4">
          {product.images?.[1]?.src && (
            <img
              src={product.images[1].src}
              alt="Luar Kamar"
              onClick={() => handleImageClick(product.images[1].src)}
              className="cursor-pointer max-h-36 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          )}
          {product.images?.[2]?.src && (
            <img
              src={product.images[2].src}
              alt="Dalam Kamar"
              onClick={() => handleImageClick(product.images[2].src)}
              className="cursor-pointer max-h-36 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <h1 className="text-3xl font-bold text-gray-900 col-span-2">
          Kost {product.name}
        </h1>
        <button
          onClick={handleRentNowClick}
          className="w-full rounded-md bg-orange-500 text-white py-3 text-lg font-semibold hover:bg-orange-600 transition duration-200 col-start-3"
        >
          Rp {product.hargaPerBulan}/bulan
        </button>
      </div>
      <div className="bg-gray-100 w-fit p-2 rounded-lg mt-4">
        <p className="text-sm text-gray-700">Khusus {product.kelamin}</p>
      </div>
      <div className="mt-4">
        <p className="text-base text-gray-700">{product.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <div>
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">
              Fasilitas Bersama
            </h2>
            <hr className="border-t border-gray-300 my-2" />
            <ul className="list-disc list-inside text-gray-700">
              {product.fasilitasBersama.map((fasilitas, index) => (
                <li key={index}>{fasilitas}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">
              Fasilitas Kamar
            </h2>
            <hr className="border-t border-gray-300 my-2" />
            <ul className="list-disc list-inside text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.fasilitasKamar.map((fasilitas, index) => (
                <li key={index}>{fasilitas}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Tata Tertib</h2>
            <hr className="border-t border-gray-300 my-2" />
            <ul className="list-disc list-inside text-gray-700">
              {product.peraturan.map((aturan, index) => (
                <li key={index}>{aturan}</li>
              ))}
            </ul>
          </div>
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
