import React from 'react';

function SearchForm() {
  return (
    <div className="container mx-auto p-4">
      <section className="bg-gray-100 dark:bg-zinc-800 flex justify-center p-4">
        <form className="flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-3xl">
          <div className="w-full md:w-1/3">
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="location" 
              type="text" 
              placeholder="Lokasi" 
            />
          </div>
          <div className="w-full md:w-1/3">
            <select 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="gender"
            >
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
          <div className="w-full md:w-1/3">
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="price" 
              type="text" 
              placeholder="Harga" 
            />
          </div>
          <div className="w-full md:w-1/3">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
              type="button"
            >
              Search
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SearchForm;
