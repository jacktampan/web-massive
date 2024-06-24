import { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://hanabira.co/api/products");
      const parsedProducts = response.data.map((product) => ({
        ...product,
        fasilitasKamar: Array.isArray(product.fasilitasKamar)
          ? product.fasilitasKamar
          : JSON.parse(product.fasilitasKamar),
        fasilitasBersama: Array.isArray(product.fasilitasBersama)
          ? product.fasilitasBersama
          : JSON.parse(product.fasilitasBersama),
        peraturan: Array.isArray(product.peraturan)
          ? product.peraturan
          : JSON.parse(product.peraturan),
      }));
      setProducts(parsedProducts);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hanabira.co/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("There was an error deleting the product!", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validasi data
    if (
      !editingProduct.namaKost ||
      !editingProduct.ukuranKost ||
      !editingProduct.jumlahTotalKamar ||
      !editingProduct.jumlahKamarTersedia ||
      !editingProduct.hargaPerBulan ||
      !editingProduct.alamat ||
      !editingProduct.kota ||
      !editingProduct.provinsi ||
      !editingProduct.kategoriKost
    ) {
      alert("Please provide all required fields");
      return;
    }

    // Convert objek atau array ke string JSON
    const updatedProduct = {
      ...editingProduct,
      fasilitasKamar: JSON.stringify(editingProduct.fasilitasKamar),
      fasilitasBersama: JSON.stringify(editingProduct.fasilitasBersama),
      peraturan: JSON.stringify(editingProduct.peraturan),
    };

    setLoading(true);
    try {
      await axios.put(
        `https://hanabira.co/api/products/${editingProduct.id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditingProduct(null);
      setOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("There was an error updating the product!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            List Kost
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Daftar semua Kost di akun Anda termasuk nama dan harga bulanan.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Nama Kost
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Harga Per Bulan
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.namaKost}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.hargaPerBulan}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingProduct && (
        <Transition show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Edit Produk
                        </DialogTitle>
                        <div className="mt-2">
                          <form onSubmit={handleSave}>
                            <div>
                              <label>Nama Kost:</label>
                              <input
                                type="text"
                                name="namaKost"
                                value={editingProduct?.namaKost || ""}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Ukuran Kost:</label>
                              <input
                                type="text"
                                name="ukuranKost"
                                value={editingProduct?.ukuranKost || ""}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Jumlah Total Kamar:</label>
                              <input
                                type="number"
                                name="jumlahTotalKamar"
                                value={editingProduct?.jumlahTotalKamar || 0}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Jumlah Kamar Tersedia:</label>
                              <input
                                type="number"
                                name="jumlahKamarTersedia"
                                value={editingProduct?.jumlahKamarTersedia || 0}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Harga Per Bulan:</label>
                              <input
                                type="number"
                                name="hargaPerBulan"
                                value={editingProduct?.hargaPerBulan || 0}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Harga Per 3 Bulan:</label>
                              <input
                                type="number"
                                name="hargaPer3Bulan"
                                value={editingProduct?.hargaPer3Bulan || 0}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Harga Per 6 Bulan:</label>
                              <input
                                type="number"
                                name="hargaPer6Bulan"
                                value={editingProduct?.hargaPer6Bulan || 0}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Harga Per 12 Bulan:</label>
                              <input
                                type="number"
                                name="hargaPer12Bulan"
                                value={editingProduct?.hargaPer12Bulan || 0}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Alamat:</label>
                              <input
                                type="text"
                                name="alamat"
                                value={editingProduct?.alamat || ""}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Kota:</label>
                              <input
                                type="text"
                                name="kota"
                                value={editingProduct?.kota || ""}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Provinsi:</label>
                              <input
                                type="text"
                                name="provinsi"
                                value={editingProduct?.provinsi || ""}
                                onChange={handleChange}
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label>Kategori Kost:</label>
                              <div className="flex space-x-4">
                                <label>
                                  <input
                                    type="radio"
                                    name="kategoriKost"
                                    value="Pria"
                                    checked={
                                      editingProduct?.kategoriKost === "Pria"
                                    }
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
                                    checked={
                                      editingProduct?.kategoriKost === "Wanita"
                                    }
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
                                    checked={
                                      editingProduct?.kategoriKost ===
                                      "Campuran"
                                    }
                                    onChange={handleChange}
                                    className="mr-2"
                                  />
                                  Campuran
                                </label>
                              </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default ProductList;
