import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/page/${product.id}`);
  };

  return (
    <div
      className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden mx-auto max-w-96 cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={`https://backend.sikomik.com/${product.fotoKost}`}
        alt={`Image of ${product.namaKost}`}
        className="w-full h-48 object-cover"
        onError={(e) =>
          (e.target.src =
            "https://placehold.co/100x100?text=Image+not+available")
        }
      />
      <div className="p-4">
        <h2 className="text-lg font-bold dark:text-white">
          {product.namaKost}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          {product.alamat}, {product.kota}, {product.provinsi}
        </p>
      </div>
      <div className="flex justify-end p-4">
        <div className="flex flex-col items-end gap-2">
          <span className="text-zinc-500 dark:text-zinc-400">
            Harga per bulan:
          </span>
          <button className="bg-custom-orange text-black font-bold px-4 py-2 rounded-lg">
            Rp {product.hargaPerBulan}
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    namaKost: PropTypes.string.isRequired,
    alamat: PropTypes.string.isRequired,
    kota: PropTypes.string.isRequired,
    provinsi: PropTypes.string.isRequired,
    hargaPerBulan: PropTypes.number.isRequired,
    fotoKost: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
