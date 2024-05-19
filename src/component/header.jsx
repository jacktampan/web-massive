import React from 'react';

const WelcomePage = () => {
  return (
    <div className="container mx-auto p-14">
      <div className="flex flex-wrap justify-center md:justify-between items-center">
        <div className="flex md:flex-row items-center md:w-1/2">
          <div className="text-center md:text-left md:pr-8">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
              Welcome to Our Website!
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              Discover the most amazing products and services here. Stay tuned for updates.
            </p>
            <div className="flex mt-8 md:flex-row md:space-x-4 md:items-center">
              <img src="https://placehold.co/100x100" alt="Image 1" className="w-20 h-20 rounded-lg shadow-lg mb-4 md:mb-0" />
              <img src="https://placehold.co/100x100" alt="Image 2" className="w-20 h-20 rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 md:order-none flex justify-end">
          <img src="https://placehold.co/500x400" alt="Hero Image" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
