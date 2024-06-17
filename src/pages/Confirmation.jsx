import React, { useState } from "react";

const PaymentConfirmationForm = () => {
  const [formData, setFormData] = useState({
    namaPenyewa: "",
    namaPemilikKost: "",
    noRekening: "",
    buktiPembayaran: null,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "buktiPembayaran") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validasi sederhana
    if (
      formData.namaPenyewa &&
      formData.namaPemilikKost &&
      formData.noRekening &&
      formData.buktiPembayaran
    ) {
      setShowConfirmation(true);
    } else {
      alert("Harap isi semua field.");
    }
  };

  const handleOkClick = () => {
    setShowConfirmation(false);
    setFormData({
      namaPenyewa: "",
      namaPemilikKost: "",
      noRekening: "",
      buktiPembayaran: null,
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {showConfirmation ? (
        <div className="flex flex-col items-center p-6 bg-white rounded shadow-md">
          <div className="flex items-center mb-4">
            <img
              src="https://i.ibb.co/w0dD31v/money-bag.png"
              alt="Money Bag"
              className="w-12 h-12"
            />
            <span className="text-xl font-bold ml-4">Pembayaran Berhasil</span>
          </div>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
            onClick={handleOkClick}
          >
            Ok
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded shadow-md"
        >
          <h1 className="text-2xl font-bold mb-6">
            Konfirmasi Bukti Pembayaran
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nama Penyewa</label>
            <input
              type="text"
              name="namaPenyewa"
              value={formData.namaPenyewa}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Nama Pemilik Kost
            </label>
            <input
              type="text"
              name="namaPemilikKost"
              value={formData.namaPemilikKost}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">No Rekening</label>
            <input
              type="tel"
              name="noRekening"
              value={formData.noRekening}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bukti Pembayaran</label>
            <input
              type="file"
              name="buktiPembayaran"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentConfirmationForm;
