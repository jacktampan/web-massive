import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "../component/navbar";

const Product = ({ product }) => {
  const {
    id,
    namaKost,
    hargaPerBulan,
    fotoKost,
    fasilitasKamar,
    jumlahKamarTersedia,
    alamat,
    kota,
    provinsi,
  } = product;

  // Mengambil 3 fasilitas kamar pertama untuk ditampilkan
  const fasilitas = JSON.parse(fasilitasKamar).slice(0, 3);

  // Fungsi untuk memformat harga ke dalam format keuangan dengan titik sebagai pemisah ribuan
  const formatRupiah = (number) => {
    return number
      .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
      .replace(",00", "");
  };

  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-1">
      <Link to={`/page/${id}`}>
        <div className="bg-white dark:bg-slate-800 shadow border dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="w-full h-56 overflow-hidden">
            <img
              src={`https://hanabira.co/${fotoKost}`}
              alt={namaKost}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="py-4 px-6">
            <div className="flex justify-between items-center">
              <div>
                <h6 className="hover:text-blue-600 text-[17px] font-medium mb-1">
                  {namaKost}
                </h6>
              </div>
              <div>
                <p className="text-3xl font-bold">
                  {formatRupiah(hargaPerBulan)}
                </p>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Fasilitas: {fasilitas.join(", ")}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {alamat}, {kota}, {provinsi}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Hanya {jumlahKamarTersedia} kamar tersisa
            </div>
          </div>
          <div className="py-4 px-6 bg-gray-100 text-right">
            <button className="bg-custom-orange text-white px-4 py-2 rounded">
              Lihat ketersediaan
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

const Sidebar = ({
  filterFasilitasKamar,
  filterFasilitasBersama,
  selectedFilters,
  setSelectedFilters,
}) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevFilters) => {
      if (checked) {
        return [...prevFilters, name];
      } else {
        return prevFilters.filter((filter) => filter !== name);
      }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-4 lg:p-6">
      <form>
        <div>
          <h5 className="text-xl leading-tight font-bold mt-6">
            Fasilitas Kamar
          </h5>
          {filterFasilitasKamar.map((option) => (
            <div className="block mt-4" key={option}>
              <input
                className="form-check-input"
                type="checkbox"
                id={option}
                name={option}
                checked={selectedFilters.includes(option)}
                onChange={handleCheckboxChange}
              />{" "}
              <label className="form-check-label" htmlFor={option}>
                {option}
              </label>
            </div>
          ))}
        </div>

        <hr className="dark:border-slate-700 my-6" />

        <div>
          <h5 className="text-xl leading-tight font-bold mt-6 mb-4">
            Fasilitas Bersama
          </h5>
          {filterFasilitasBersama.map((option) => (
            <div className="block mt-4" key={option}>
              <input
                className="form-check-input"
                type="checkbox"
                id={option}
                name={option}
                checked={selectedFilters.includes(option)}
                onChange={handleCheckboxChange}
              />{" "}
              <label className="form-check-label" htmlFor={option}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

Sidebar.propTypes = {
  filterFasilitasKamar: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterFasilitasBersama: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedFilters: PropTypes.func.isRequired,
};

const EPGrid12_Qr7J3PqS = () => {
  const location = useLocation();
  const [fasilitasKamar, setFasilitasKamar] = useState([]);
  const [fasilitasBersama, setFasilitasBersama] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const {
    results = [],
    filterFasilitasKamar = [],
    filterFasilitasBersama = [],
  } = location.state || {};

  useEffect(() => {
    if (results.length > 0) {
      // Mengumpulkan semua fasilitas kamar dan bersama dari results
      const allFasilitasKamar = [];
      const allFasilitasBersama = [];

      results.forEach((result) => {
        allFasilitasKamar.push(...JSON.parse(result.fasilitasKamar));
        allFasilitasBersama.push(...JSON.parse(result.fasilitasBersama));
      });

      // Menghapus duplikat
      setFasilitasKamar([...new Set(allFasilitasKamar)]);
      setFasilitasBersama([...new Set(allFasilitasBersama)]);
    }
  }, [results]);

  const filteredResults = results.filter((result) => {
    const fasilitasKamarArray = JSON.parse(result.fasilitasKamar);
    const fasilitasBersamaArray = JSON.parse(result.fasilitasBersama);
    return selectedFilters.every(
      (filter) =>
        fasilitasKamarArray.includes(filter) ||
        fasilitasBersamaArray.includes(filter)
    );
  });

  return (
    <div>
      <Navbar />
      <section className="py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
        <div className="container relative px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mt-12">
            <div className="w-full md:w-1/3 xl:w-1/4">
              <Sidebar
                filterFasilitasKamar={fasilitasKamar}
                filterFasilitasBersama={fasilitasBersama}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </div>
            <div className="w-full md:w-2/3 xl:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {filteredResults.map((product, index) => (
                  <Product key={index} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EPGrid12_Qr7J3PqS;
