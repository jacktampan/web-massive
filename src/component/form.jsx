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
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (product) {
      const fetchOptions = async () => {
        try {
          const response = await axios.get(
            `http://23.26.138.128:3000/api/products/${product.id}`
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

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    const selectedOption = options.find(
      (option) => option.id === selectedMethod
    );
    const paymentInfo = {
      method: "Bank Transfer",
      bank: "BNI",
      accountNumber: "1234567890",
    };

    navigate("/order-summary", {
      state: { product, selectedOption, paymentInfo },
    });
  };

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          onSubmit={handleConfirmOrder}
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Jangka Waktu
              </h2>

              <RadioGroup value={selectedMethod} onChange={setSelectedMethod}>
                <RadioGroup.Label className="sr-only">
                  Rental Period
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {options.map((option) => (
                    <RadioGroup.Option
                      key={option.id}
                      value={option.id}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "ring-2 ring-indigo-500" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {option.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                Rp {option.price.toLocaleString()}
                              </RadioGroup.Description>
                            </span>
                          </span>
                          {checked ? (
                            <CheckCircleIcon
                              className="h-5 w-5 text-indigo-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {["BNI", "BCA", "BRI", "Mandiri"].map((bank) => (
                    <div key={bank} className="flex items-center">
                      <input
                        id={bank.toLowerCase()}
                        name="payment-type"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultChecked={bank === "BNI"}
                      />
                      <label
                        htmlFor={bank.toLowerCase()}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {bank}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {product ? (
                  <li className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <span className="font-medium text-gray-700 hover:text-gray-800">
                              Kost {product.name}
                            </span>
                          </h4>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          Rp{" "}
                          {options
                            .find((option) => option.id === selectedMethod)
                            ?.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ) : (
                  <p>No product selected</p>
                )}
              </ul>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
