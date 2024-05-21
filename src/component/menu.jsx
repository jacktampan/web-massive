import React from "react";

const productsUniversitas = [
    {
      id: 1,
      name: 'Universitas Sains Alquran (UNSIQ)',
      href: '#',
      price: 'Rp 500000',
      availability: 'Jl. KH. Hasyim Asyari Km. 03 Kalibeber Kecamatan Mojotengah',
      imageSrc: 'https://placehold.co/300x300',
      imageAlt: 'White fabric pouch with white zipper, black zipper pull, and black elastic loop.',
    },
    {
      id: 2,
      name: 'Sekolah Tinggi Ilmu Kesehatan Muhammadiyah Wonosobo',
      href: '#',
      price: 'Rp 700000',
      availability: 'Jl. Munggang, Kalibeber Mojotengah Wonosobo',
      imageSrc: 'https://placehold.co/300x300',
      imageAlt: 'Front of tote bag with washed black canvas body, black straps, and tan leather handles and accents.',
    },
    {
      id: 3,
      name: 'Akademi Pertanian PGRI Wonosobo',
      href: '#',
      price: 'Rp 900000',
      availability: 'Jln. Mayjen Bambang Sugeng No. 1 Sidojoyo Wonosobo',
      imageSrc: 'https://placehold.co/300x300',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
  ]
  

  const productsKost = [
    {
      id: 1,
      name: 'Cozy Kost Cempaka',
      href: '#',
      price: 'Rp 500000',
      availability: 'Jln. Mayjen Bambang Sugeng No. 1 Sidojoyo Wonosobo',
      imageSrc: 'https://placehold.co/300x300',
      imageAlt:
        'Cozy Kost Cempaka',
    },
    ,
    {
      id: 2,
      name: 'Cozy Kost Urban Residence',
      href: '#',
      price: 'Rp 700000',
      availability: 'Jln. Mayjen Bambang Sugeng No. 2 Sidojoyo Wonosobo',
      imageSrc: 'https://placehold.co/300x300',
      imageAlt:
        'Cozy Kost Urban Residence',
    },
    ,
    {
      id: 3,
      name: 'Cozy Kost Azzahra',
      href: '#',
      price: 'Rp 900000',
      availability: 'Jln. Mayjen Bambang Sugeng No. 3 Sidojoyo Wonosobo',
      imageSrc: 'https://placehold.co/300x300',
      imageAlt:
        'Cozy Kost Azzahra',
    },
  ]  
  export default function Menu() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="my-4 text-xl">Cari Kampus Terdekat Pilihan Kamu</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {productsUniversitas.map((product) => (
              <a key={product.id} href={product.href} className="group text-sm">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.availability}</p>
                <p className="mt-2 font-medium text-gray-900">{product.price}</p>
              </a>
            ))}
          </div>
          
        <h2 className="my-4 text-xl">Cari Kost Sesuai Budget Kamu</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {productsKost.map((producto) => (
              <a key={producto.id} href={producto.href} className="group text-sm">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                  <img
                    src={producto.imageSrc}
                    alt={producto.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 font-medium text-gray-900">{producto.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{producto.availability}</p>
                <p className="mt-2 font-medium text-gray-900">{producto.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }