import React from "react";
import { useLocation } from "react-router-dom";

export default function OrderSummary() {
  const location = useLocation();
  const product = location.state?.product;
  const selectedOption = location.state?.selectedOption;
  const paymentInfo = location.state?.paymentInfo;
  const discountedPrice = location.state?.discountedPrice;
  const usedPoints = location.state?.usedPoints;

  if (!product || !selectedOption || !paymentInfo) {
    return <div>Loading...</div>;
  }

  const products = [
    {
      id: product.id,
      name: product.name,
      description: `Harga sewa untuk Kost ${product.name} (${selectedOption.title})`,
      href: "#",
      quantity: 1,
      price: `Rp ${selectedOption.price.toLocaleString()}`,
      imageSrc: product.images[0].src,
      imageAlt: product.images[0].alt,
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 shadow mt-8 bg-white rounded-lg">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-custom-orange">
            Terima Kasih!
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-custom-orange sm:text-5xl">
            Segera Selesaikan Pembayaranmu
          </p>
          <p className="mt-2 text-base text-gray-600">
            Pesanan kamu akan diproses setelah kami menerima pembayaran.
          </p>
          <p className="mt-2 text-base text-gray-600">
            Untuk informasi lebih lanjut, cek daftar pesanan di{" "}
            <a href="/profile" className="text-custom-orange underline">
              /profile
            </a>
            .
          </p>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Pesanan Anda</h2>

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
                  <h4 className="font-medium text-custom-orange">
                    <a href={product.href}>Kost {product.name}</a>
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Informasi Anda</h3>

            <h4 className="sr-only">Pembayaran</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-custom-orange">
                  Metode Pembayaran
                </dt>
                <dd className="mt-2 text-gray-700">
                  <p>{paymentInfo.method}</p>
                  <p>{paymentInfo.bank}</p>
                  <p>No. Rekening: {paymentInfo.accountNumber}</p>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">Ringkasan</h3>
            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-custom-orange">Total Harga</dt>
                <dd className="text-custom-orange">
                  {usedPoints > 0 ? (
                    <>
                      <div className="line-through">{`Rp ${selectedOption.price.toLocaleString()}`}</div>
                      <div>{`Rp ${discountedPrice.toLocaleString()}`}</div>
                    </>
                  ) : (
                    `Rp ${selectedOption.price.toLocaleString()}`
                  )}
                </dd>
              </div>
              {usedPoints > 0 && (
                <div className="flex justify-between">
                  <dt className="font-medium text-custom-orange">
                    Points Digunakan
                  </dt>
                  <dd className="text-custom-orange">{usedPoints}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
