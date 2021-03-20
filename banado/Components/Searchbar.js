import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Searchbar = () => {
  return (
    <div class="flex flex-col overflow-hidden border  dark:border-gray-600 lg:flex-row">
      <input
        class="px-6 py-3 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
        type="text"
        name="email"
        placeholder="Search Products"
        aria-label="Search"
      />

      <button class="px-5 py-3 text-sm font-medium lg:ml-8 tracking-wider text-gray-100 uppercase transition-colors duration-200 transform  focus:outline-none colortheme">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default Searchbar;
