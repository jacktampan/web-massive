import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedBank, setSelectedBank] = useState("BNI");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (product) {
      const fetchOptions = async () => {
        try {
          const response = await axios.get(
            `http://104.234.231.224:3000/api/products/${product.id}`
          );
          const data = response.data;
          setOptions([
            {
              id: "perbulan",
              title: "Harga per bulan",
              price: data.hargaPerBulan,
            },
            {
              id: "per3bulan",
              title: "Harga per 3 bulan",
              price: data.hargaPer3Bulan,
            },
            {
              id: "per6bulan",
              title: "Harga per 6 bulan",
              price: data.hargaPer6Bulan,
            },
            {
              id: "per12bulan",
              title: "Harga per 12 bulan",
              price: data.hargaPer12Bulan,
            },
          ]);
          setSelectedMethod("perbulan");
        } catch (error) {
          console.error("Error fetching product options:", error);
        }
      };

      fetchOptions();
    }
  }, [product]);

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    const selectedOption = options.find(
      (option) => option.id === selectedMethod
    );

    try {
      const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage
      const response = await axios.post(
        "http://104.234.231.224:3000/api/orders",
        {
          kostId: product.id,
          duration: selectedMethod,
          totalPrice: selectedOption.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order response:", response.data);
      navigate("/order-summary", {
        state: {
          product,
          selectedOption,
          paymentInfo: {
            method: "Bank Transfer",
            bank: selectedBank,
            accountNumber: "1234567890", // Update this with the correct account number
          },
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error (show error message to user, etc.)
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleConfirmOrder}>
            <div className="bg-white shadow sm:rounded-lg mb-4">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Pilih Durasi Sewa
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Pilih durasi sewa yang diinginkan.</p>
                </div>
                <RadioGroup
                  value={selectedMethod}
                  onChange={setSelectedMethod}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Pilih durasi sewa
                  </RadioGroup.Label>
                  <div className="space-y-4">
                    {options.map((option) => (
                      <RadioGroup.Option
                        key={option.id}
                        value={option.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "ring-2 ring-offset-2 ring-custom-orange"
                              : "",
                            "relative block bg-white border border-gray-300 rounded-lg shadow-sm px-6 py-4 cursor-pointer focus:outline-none sm:flex sm:justify-between"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className="font-medium text-gray-900"
                                >
                                  {option.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="text-gray-500"
                                >
                                  Rp {option.price.toLocaleString()}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            <div
                              className={classNames(
                                checked
                                  ? "border-custom-orange"
                                  : "border-transparent",
                                "absolute -inset-px rounded-lg border-2 pointer-events-none"
                              )}
                              aria-hidden="true"
                            />
                            {checked ? (
                              <CheckCircleIcon
                                className="h-5 w-5 text-custom-orange"
                                aria-hidden="true"
                              />
                            ) : null}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-6">
                  Pilih Bank
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Pilih bank untuk pembayaran.</p>
                </div>
                <RadioGroup
                  value={selectedBank}
                  onChange={setSelectedBank}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Pilih bank
                  </RadioGroup.Label>
                  <div className="space-y-4">
                    {["BNI", "Mandiri", "BRI", "BCA"].map((bank) => (
                      <RadioGroup.Option
                        key={bank}
                        value={bank}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "ring-2 ring-offset-2 ring-custom-orange"
                              : "",
                            "relative block bg-white border border-gray-300 rounded-lg shadow-sm px-6 py-4 cursor-pointer focus:outline-none sm:flex sm:justify-between"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className="font-medium text-gray-900"
                                >
                                  {bank}
                                </RadioGroup.Label>
                              </div>
                            </div>
                            <div
                              className={classNames(
                                checked
                                  ? "border-custom-orange"
                                  : "border-transparent",
                                "absolute -inset-px rounded-lg border-2 pointer-events-none"
                              )}
                              aria-hidden="true"
                            />
                            {checked ? (
                              <CheckCircleIcon
                                className="h-5 w-5 text-custom-orange"
                                aria-hidden="true"
                              />
                            ) : null}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-custom-orange px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-custom-orange-dark focus:outline-none focus:ring-2 focus:ring-custom-orange focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
