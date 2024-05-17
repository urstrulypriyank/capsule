"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HintImage from "@/app/assets/Images/Hints.jpeg";
const ToggleHints = () => {
  const [showHints, setShowHints] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => {
      setShowHints(false);
    }, 3000);

    return () => clearTimeout(id);
  }, [showHints]);
  if (showHints)
    return (
      <div className="md:w-[80%] w-[95vw]  mx-auto flex">
        <Image
          src={HintImage}
          height={100}
          width={100}
          alt="buttons represent product avaibility in terms of border color"
          className="w-[60%] h-[30%] mx-auto mt-2"
          unoptimized
        />
      </div>
    );
  return (
    <div className="md:w-[80%] w-[95vw]  mx-auto flex">
      <button
        className="border border-blue-400 px-2 py-1 mt-6 text-center  mx-auto bg-white backdrop-blur-lg shadow-md rounded-xl space-y-2 bg-gradient-to-r from-white via-cyan-50 to-cyan-100"
        onClick={() => setShowHints(true)}
      >
        Show Hints
      </button>
    </div>
  );
};

export default ToggleHints;
