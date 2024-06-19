import React from "react";
import { useLocation } from "react-router-dom";

export default function OrderSummary() {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <div>Loading...</div>;
  }

  const products = [
    {
      id: product.id,
      name: product.name,
      description: `Harga sewa untuk Kost ${product.name}`,
      href: "#",
      quantity: 1,
      price: `Rp ${product.hargaPerBulan.toLocaleString()}`,
      imageSrc: product.images[0].src,
      imageAlt: product.images[0].alt,
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Segera selesaikan pembayaranmu
          </p>
          <p className="mt-2 text-base text-gray-500">
            Pesanan kamu akan di proses setelah kami menerima pembayaran.
          </p>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex space-x-6 border-b border-gray-200 py-10"
            >
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    <a href={product.href}> Kost {product.name}</a>
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Payment</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Payment method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>Bank Transfer</p>
                  <p>BNI</p>
                  <p>No. Rekening: 1234567890</p>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">{`Rp ${(
                  parseInt(product.price.replace("Rp ", "").replace(".", "")) +
                  10000
                ).toLocaleString()}`}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
