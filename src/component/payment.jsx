import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

const PaymentForm = () => {
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bayar_ditempat');
  const [duration, setDuration] = useState('1');
  const [rentalDate, setRentalDate] = useState('');
  const [selectedBank, setSelectedBank] = useState('BCA');
  const [price, setPrice] = useState(0);

  const calculatePrice = () => {
    let basePrice = 100000; // base price per month
    switch (duration) {
      case '1':
        return basePrice;
      case '6':
        return basePrice * 6 * 0.9; // 10% discount for 6 months
      case '12':
        return basePrice * 12 * 0.8; // 20% discount for 12 months
      default:
        return basePrice;
    }
  };

  const handleFormChange = () => {
    const price = calculatePrice();
    setPrice(price);
  };

  const paymentMethods = [
    { id: 'bayar_ditempat', name: 'Bayar di Tempat' },
    { id: 'bayar_sekarang', name: 'Bayar Sekarang' },
  ];

  const durations = [
    { id: '1', name: '1 Bulan' },
    { id: '6', name: '6 Bulan' },
    { id: '12', name: '12 Bulan' },
  ];

  const banks = [
    { id: 'BCA', name: 'BCA' },
    { id: 'MANDIRI', name: 'MANDIRI' },
    { id: 'BNI', name: 'BNI' },
    { id: 'BRI', name: 'BRI' },
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md my-10">
      <h2 className="text-2xl font-bold mb-4">Form Pembayaran</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Metode Pembayaran</label>
          <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <RadioGroup.Option
                  key={method.id}
                  value={method.id}
                  className={({ active, checked }) =>
                    `${active ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                    ${checked ? 'bg-blue-500 text-white' : 'bg-white'}
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium ${checked ? 'text-white' : 'text-gray-900'}`}
                            >
                              {method.name}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-shrink-0 text-white">
                            <CheckIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Durasi Pembayaran</label>
          <RadioGroup value={duration} onChange={setDuration}>
            <div className="space-y-2">
              {durations.map((dur) => (
                <RadioGroup.Option
                  key={dur.id}
                  value={dur.id}
                  className={({ active, checked }) =>
                    `${active ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                    ${checked ? 'bg-blue-500 text-white' : 'bg-white'}
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium ${checked ? 'text-white' : 'text-gray-900'}`}
                            >
                              {dur.name}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-shrink-0 text-white">
                            <CheckIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Waktu Penyewaan</label>
          <input
            type="date"
            value={rentalDate}
            onChange={(e) => setRentalDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Metode Pembayaran Bank</label>
          <RadioGroup value={selectedBank} onChange={setSelectedBank}>
            <div className="space-y-2">
              {banks.map((bank) => (
                <RadioGroup.Option
                  key={bank.id}
                  value={bank.id}
                  className={({ active, checked }) =>
                    `${active ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                    ${checked ? 'bg-blue-500 text-white' : 'bg-white'}
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium ${checked ? 'text-white' : 'text-gray-900'}`}
                            >
                              {bank.name}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-shrink-0 text-white">
                            <CheckIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </form>
      <div className="mt-4">
        <button
          onClick={handleFormChange}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Hitung Harga
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Rincian Pembayaran</h3>
        <p>Bulan: {durations.find((dur) => dur.id === duration).name}</p>
        <p>Jatuh Tempo: {rentalDate}</p>
        <p>Bank: {banks.find((bank) => bank.id === selectedBank).name}</p>
        <p>Biaya: Rp {price.toLocaleString()}</p>
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">
          Bayar
        </button>
      </div>
    </div>
  );
};

const CheckIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default PaymentForm;
