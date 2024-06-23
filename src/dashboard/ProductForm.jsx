import { Fragment, useState } from "react";
import axios from "axios";
import CheckboxGroup from "./CheckboxGroup";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    namaKost: "",
    ukuranKost: "",
    jumlahTotalKamar: "",
    jumlahKamarTersedia: "",
    hargaPerBulan: "",
    hargaPer3Bulan: "",
    hargaPer6Bulan: "",
    hargaPer12Bulan: "",
    alamat: "",
    kota: "",
    provinsi: "",
    fasilitasKamar: [],
    fasilitasBersama: [],
    peraturan: [],
    kategoriKost: "",
    fotoKost: null,
    fotoLuarKamar: null,
    fotoDalamKamar: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCheckboxChange = (group, option) => {
    setFormData((prevData) => ({
      ...prevData,
      [group]: prevData[group].includes(option)
        ? prevData[group].filter((item) => item !== option)
        : [...prevData[group], option],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key] &&
        !Array.isArray(formData[key]) &&
        key !== "fotoKost" &&
        key !== "fotoLuarKamar" &&
        key !== "fotoDalamKamar"
      ) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://104.234.231.224:3000/api/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product created:", response.data);
      // Reset form
      setFormData({
        namaKost: "",
        ukuranKost: "",
        jumlahTotalKamar: "",
        jumlahKamarTersedia: "",
        hargaPerBulan: "",
        hargaPer3Bulan: "",
        hargaPer6Bulan: "",
        hargaPer12Bulan: "",
        alamat: "",
        kota: "",
        provinsi: "",
        fasilitasKamar: [],
        fasilitasBersama: [],
        peraturan: [],
        kategoriKost: "",
        fotoKost: null,
        fotoLuarKamar: null,
        fotoDalamKamar: null,
      });
      setShowNotification(true);
    } catch (error) {
      console.error("There was an error creating the product!", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 p-6 bg-white">
      <h1 className="text-2xl font-bold text-custom-orange">Product Form</h1>
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-custom-orange">Nama Kost:</label>
            <input
              type="text"
              name="namaKost"
              value={formData.namaKost}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.namaKost && (
              <p className="text-red-500">{errors.namaKost}</p>
            )}
          </div>
          <div>
            <label className="text-custom-orange">Ukuran Kost:</label>
            <input
              type="text"
              name="ukuranKost"
              value={formData.ukuranKost}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.ukuranKost && (
              <p className="text-red-500">{errors.ukuranKost}</p>
            )}
          </div>
          <div>
            <label className="text-custom-orange">Jumlah Total Kamar:</label>
            <input
              type="number"
              name="jumlahTotalKamar"
              value={formData.jumlahTotalKamar}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.jumlahTotalKamar && (
              <p className="text-red-500">{errors.jumlahTotalKamar}</p>
            )}
          </div>
          <div>
            <label className="text-custom-orange">Jumlah Kamar Tersedia:</label>
            <input
              type="number"
              name="jumlahKamarTersedia"
              value={formData.jumlahKamarTersedia}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.jumlahKamarTersedia && (
              <p className="text-red-500">{errors.jumlahKamarTersedia}</p>
            )}
          </div>
          <div>
            <label className="text-custom-orange">Harga Per Bulan:</label>
            <input
              type="number"
              name="hargaPerBulan"
              value={formData.hargaPerBulan}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.hargaPerBulan && (
              <p className="text-red-500">{errors.hargaPerBulan}</p>
            )}
          </div>
          <div>
            <label className="text-custom-orange">Harga Per 3 Bulan:</label>
            <input
              type="number"
              name="hargaPer3Bulan"
              value={formData.hargaPer3Bulan}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.hargaPer3Bulan && (
              <p className="text-red-500">{errors.hargaPer3Bulan}</p>
            )}
          </div>
          <div>
            <label className="text-custom-orange">Harga Per 6 Bulan:</label>
            <input
              type="number"
              name="hargaPer6Bulan"
              value={formData.hargaPer6Bulan}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.hargaPer6Bulan && (
              <p className="text-red-500">{errors.hargaPer6Bulan}</p>
            )}
          </div>
          <div>
            <label className="text-custom-orange">Harga Per 12 Bulan:</label>
            <input
              type="number"
              name="hargaPer12Bulan"
              value={formData.hargaPer12Bulan}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.hargaPer12Bulan && (
              <p className="text-red-500">{errors.hargaPer12Bulan}</p>
            )}
          </div>
          <div>
            <label className="text-custom-orange">Alamat:</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.alamat && <p className="text-red-500">{errors.alamat}</p>}
          </div>
          <div>
            <label className="text-custom-orange">Kota:</label>
            <input
              type="text"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.kota && <p className="text-red-500">{errors.kota}</p>}
          </div>
          <div>
            <label className="text-custom-orange">Provinsi:</label>
            <input
              type="text"
              name="provinsi"
              value={formData.provinsi}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.provinsi && (
              <p className="text-red-500">{errors.provinsi}</p>
            )}
          </div>
          <CheckboxGroup
            title="Fasilitas Kamar"
            options={[
              "AC",
              "Keset Toilet",
              "TV",
              "Bantal",
              "Kipas Angin",
              "TV Kabel",
              "Cermin",
              "Kulkas",
              "Tidak ada Kasur",
              "Cleaning service",
              "Kursi",
              "Ventilasi",
              "Dapur Pribadi",
              "Lemari Baju",
              "Wastafel",
              "Dispenser",
              "Meja",
              "Water Heater",
              "Guling",
              "Meja Rias",
              "Microwave",
              "Jendela",
              "Meja Makan",
              "Sapu",
              "Kasur",
              "Sofa",
              "Pel",
            ]}
            selectedOptions={formData.fasilitasKamar}
            handleChange={(option) =>
              handleCheckboxChange("fasilitasKamar", option)
            }
          />

          <CheckboxGroup
            title="Fasilitas Bersama"
            options={[
              "Laundry",
              "Parkir Mobil",
              "Rooftop",
              "Kamar Mandi Luar - WC jongkok",
              "Parkir Motor",
              "Taman",
              "Kamar mandi Luar - WC duduk",
              "Keamanan (CCTV, satpam)",
              "Ruang Tamu",
              "Balcon",
              "Balkon atau teras",
              "Ruang Makan",
              "Dapur bersama",
              "Taman atau area hijau",
              "Musholla",
              "Wifi",
              "Ruang belajar atau ruang kerja",
              "Mesin Cuci",
              "Furniture Lemari, Meja",
              "Alat memasak (microwave, kompor)",
              "Kulkas",
              "Ruang tamu atau ruang komunal",
              "Gazebo",
              "Kompor",
              "Layanan kebersihan",
              "Dispenser",
              "Jemuran",
            ]}
            selectedOptions={formData.fasilitasBersama}
            handleChange={(option) =>
              handleCheckboxChange("fasilitasBersama", option)
            }
          />
          <CheckboxGroup
            title="Peraturan Kost"
            options={[
              "Tidak boleh bawa hewan peliharaan",
              "Tidak boleh merokok di kamar",
              "Dilarang menerima tamu menginap",
              "Tamu hanya boleh berkunjung pada jam tertentu",
              "Denda kerusakan barang kost",
              "Wajib sertakan KTP saat pengajuan sewa",
            ]}
            selectedOptions={formData.peraturan}
            handleChange={(option) => handleCheckboxChange("peraturan", option)}
          />
          <div>
            <label className="text-custom-orange">Kategori Kost:</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="kategoriKost"
                  value="Pria"
                  checked={formData.kategoriKost === "Pria"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Pria
              </label>
              <label>
                <input
                  type="radio"
                  name="kategoriKost"
                  value="Wanita"
                  checked={formData.kategoriKost === "Wanita"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Wanita
              </label>
              <label>
                <input
                  type="radio"
                  name="kategoriKost"
                  value="Campuran"
                  checked={formData.kategoriKost === "Campuran"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Campuran
              </label>
            </div>
            {errors.kategoriKost && (
              <p className="text-red-500">{errors.kategoriKost}</p>
            )}
          </div>
          <div>
            <label className="text-custom-orange">Foto Kost:</label>
            <input
              type="file"
              name="fotoKost"
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="text-custom-orange">Foto Luar Kamar:</label>
            <input
              type="file"
              name="fotoLuarKamar"
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="text-custom-orange">Foto Dalam Kamar:</label>
            <input
              type="file"
              name="fotoDalamKamar"
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-custom-orange text-white p-2 rounded-md"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
      {/* Notification */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={showNotification}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      Successfully submit!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Silakan ke menu list untuk melihat daftar kost.
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setShowNotification(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
