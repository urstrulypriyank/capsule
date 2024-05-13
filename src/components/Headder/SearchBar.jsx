"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const handleSearchBtn = (e) => {
    e.preventDefault();
    router.push("/search?q=" + searchText);
  };
  return (
    <div className="mt-5 w-full  md:flex mx-auto">
      <form
        className="flex border-2 rounded-l-full rounded-r-full mx-auto w-[90%] md:w-[70%] [&>*]:p-2 shadow-2xl bg-white"
        action={(e) => handleSearchBtn(e)}
      >
        <SearchIcon />
        <input
          type="text"
          name=""
          id=""
          placeholder="Type Your Medicine name here"
          className="w-full outline-none"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="mx-2"
          onClick={(e) => handleSearchBtn(e)}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

const SearchIcon = () => {
  return <div className="mx-2">🔎</div>;
};
