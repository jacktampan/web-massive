import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { StarIcon, HeartIcon } from "@heroicons/react/20/solid";

const Product = ({ product }) => {
  const {
    namaKost,
    hargaPerBulan,
    hargaPer12Bulan,
    fotoKost,
    fasilitasKamar,
    jumlahKamarTersisa,
    alamat,
    kota,
    provinsi,
  } = product;
  const hargaDiskon = hargaPer12Bulan / 12;
  const isDiskonLebihMurah = hargaDiskon < hargaPerBulan;
  const fasilitas = JSON.parse(fasilitasKamar).slice(0, 3);

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4">
      <div className="bg-white dark:bg-slate-800 shadow border dark:border-slate-700 rounded-xl p-4 pb-0">
        <div className="bg-gray-100 dark:bg-slate-700 rounded flex justify-center items-center min-h-[265px] relative p-12 w-full">
          <div className="absolute top-2.5 right-2.5 w-10 h-10 bg-white dark:bg-slate-800 rounded-full text-base flex justify-center items-center cursor-pointer">
            <HeartIcon className="w-5 h-5 text-red-500" />
          </div>
          <img
            src={`https://hanabira.co/${fotoKost}`}
            alt={namaKost}
            className="max-w-full h-auto"
          />
        </div>
        <div className="py-6 px-1">
          <div className="flex justify-between items-center">
            <div>
              <Link to={`/page/${product.id}`}>
                <h6 className="hover:text-blue-600 text-[17px] font-medium mb-1">
                  {namaKost}
                </h6>
              </Link>
              <span className="text-sm text-yellow-500 flex">
                {Array.from({ length: 4 }, (_, index) => (
                  <StarIcon key={index} className="w-4 h-4 mr-1" />
                ))}
                <StarIcon className="w-4 h-4 mr-1" />
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold">Rp {hargaPerBulan}</p>
              {isDiskonLebihMurah && (
                <p className="text-red-500 line-through">Rp {hargaDiskon}</p>
              )}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Fasilitas: {fasilitas.join(", ")}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {alamat}, {kota}, {provinsi}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Hanya {jumlahKamarTersisa} kamar tersisa
          </div>
        </div>
        <div className="p-4 bg-gray-100 text-right">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Lihat ketersediaan
          </button>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

const Sidebar = ({ filterFasilitasKamar, filterFasilitasBersama }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-4 lg:p-6">
      <form>
        <div>
          <h5 className="text-xl leading-tight font-bold mt-6">
            Fasilitas Kamar
          </h5>
          {filterFasilitasKamar.map((option) => (
            <div className="block mt-4" key={option}>
              <input className="form-check-input" type="checkbox" id={option} />{" "}
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
              <input className="form-check-input" type="checkbox" id={option} />{" "}
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
};

const EPGrid12_Qr7J3PqS = () => {
  const location = useLocation();
  const { results, filterFasilitasKamar, filterFasilitasBersama } =
    location.state || {
      results: [],
      filterFasilitasKamar: [],
      filterFasilitasBersama: [],
    };

  return (
    <section className="py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <div className="container relative px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mt-12">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <Sidebar
              filterFasilitasKamar={filterFasilitasKamar}
              filterFasilitasBersama={filterFasilitasBersama}
            />
          </div>
          <div className="w-full md:w-2/3 xl:w-3/4">
            <div className="grid grid-cols-12 gap-4">
              {results.map((product, index) => (
                <Product key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EPGrid12_Qr7J3PqS;
