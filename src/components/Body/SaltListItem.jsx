"use client";
import { getMinSellingPrice } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import MedicineCombinationContainer from "./MedicineCombinationContainer";

const SaltListItem = ({ saltName, saltForms, strength, saltFormsJson }) => {
  const [selectedData, setSelectedData] = useState({
    form: saltForms[0] || null,
    strength: null,
    packing: null,
  });
  const [possibleStrength, setPossibleStrength] = useState([]);
  const [possiblePacking, setPossiblePacking] = useState([]);
  const [minPrice, setMinPrice] = useState(null);

  useEffect(() => {
    if (!selectedData.form || !saltFormsJson) return;

    const newStrengthObj = saltFormsJson[selectedData.form];
    if (newStrengthObj) {
      const newStrength = Object.keys(newStrengthObj);
      const firstStrength = newStrength[0];

      setPossibleStrength(newStrength);
      setSelectedData((prevState) => ({
        ...prevState,
        strength: firstStrength,
      }));
    }
  }, [selectedData.form, saltFormsJson]);

  useEffect(() => {
    if (!selectedData.strength || !saltFormsJson || !selectedData.form) return;

    const newPackingObj =
      saltFormsJson[selectedData.form][selectedData.strength];
    if (newPackingObj) {
      const newPacking = Object.keys(newPackingObj);
      const firstPacking = newPacking[0];

      setPossiblePacking(newPacking);
      setSelectedData((prevState) => ({
        ...prevState,
        packing: firstPacking,
      }));
    }
  }, [selectedData.strength, saltFormsJson, selectedData.form]);

  useEffect(() => {
    if (
      !selectedData.strength ||
      !selectedData.packing ||
      !selectedData.form ||
      !saltFormsJson
    )
      return;

    const newPriceObj =
      saltFormsJson[selectedData.form]?.[selectedData.strength]?.[
        selectedData.packing
      ];
    let price = Number.MAX_SAFE_INTEGER;

    if (newPriceObj) {
      Object.keys(newPriceObj).forEach((key) => {
        const priceList = newPriceObj[key];
        if (Array.isArray(priceList) && priceList.length > 0) {
          price = Math.min(price, getMinSellingPrice(priceList));
        }
      });
    }

    setMinPrice(price === Number.MAX_SAFE_INTEGER ? null : price);
  }, [
    selectedData.packing,
    saltFormsJson,
    selectedData.form,
    selectedData.strength,
  ]);

  return (
    <div className="my-6 min min-h-44 md:w-[80%] flex flex-col md:flex-row mx-auto border border-1 bg-white backdrop-blur-lg shadow-md rounded-xl space-y-2 bg-gradient-to-r from-white via-white to-cyan-50">
      <MedicineCombinationContainer
        saltForms={saltForms}
        strength={strength}
        setSelectedData={setSelectedData}
        selectedData={selectedData}
        possibleStrength={possibleStrength}
        possiblePacking={possiblePacking}
        minPrice={minPrice}
        saltFormsJson={saltFormsJson}
      />
      <SaltDetailSection saltName={saltName} selectedData={selectedData} />
      <PriceSection minPrice={minPrice} />
    </div>
  );
};

export default SaltListItem;

const SaltDetailSection = ({ saltName, selectedData }) => {
  return (
    <div className="h-[100] flex justify-center items-center w-full">
      <ul className="flex flex-col justify-center items-center">
        <li className="font-semibold text-lg">{saltName}</li>
        <li>
          {selectedData?.form} | {selectedData?.strength} |{" "}
          {selectedData?.packing}
        </li>
      </ul>
    </div>
  );
};

const PriceSection = ({ minPrice }) => {
  if (!minPrice || minPrice === Number.MAX_SAFE_INTEGER)
    return (
      <div className="h-[100] flex justify-center items-center w-full">
        <p>No Store Selling this product near you</p>
      </div>
    );
  return (
    <div className="h-[100] flex justify-center items-center w-full">
      <p className="text-xl font-extrabold">From ₹{minPrice}</p>
    </div>
  );
};
