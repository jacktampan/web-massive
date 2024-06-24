import React from "react";
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import heroImage from "../assets/hero.jpeg";
const WelcomePage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center md:justify-between items-center">
        <div className="flex md:flex-row items-center md:w-1/2">
          <div className="text-center md:text-left md:pr-8">
            <h1 className="text-5xl text-custom-orange dark:text-white">
              Sekarang Cari Kost Semudah Rebahan
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              Bingung cari kost dimana ? Cari disini Aja ! Cari kost jadi lebih
              mudah, cepat, dan tidak perlu keliling kota.
            </p>
            <div className="flex mt-8 space-x-4 justify-center">
              <img
                src={image1}
                alt="Image 1"
                className="w-60 h-60 rounded-lg shadow-lg mb-4 md:mb-0"
              />
              <img
                src={image2}
                alt="Image 2"
                className="w-60 h-60 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 md:order-none flex justify-end">
          <img
            src={heroImage}
            alt="Hero Image"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
