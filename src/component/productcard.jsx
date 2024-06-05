import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleRentNow = () => {
    navigate(`/page/${product.id}`);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden mx-auto max-w-96">
      <img
        src={`http://38.45.67.174:5000/uploads/${product.fotoKost}`}
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
      <div className="flex justify-between items-center p-4 gap-4">
        <span className="text-zinc-500 dark:text-zinc-400">
          Harga per bulan:
        </span>
        <button
          onClick={handleRentNow}
          className="bg-orange-500 text-black text-bold px-4 py-2 rounded-lg"
        >
          Rp {product.hargaPerBulan}
        </button>
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
