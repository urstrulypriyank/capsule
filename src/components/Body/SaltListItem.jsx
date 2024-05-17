"use client";
import { getMinSellingPrice } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import MedicineCombinationContainer from "./MedicineCombinationContainer";

const SaltListItem = ({ saltName, saltForms, strength, saltFormsJson }) => {
  const [selectedData, setSelectedData] = useState({
    form: saltForms[0],
    strength: null,
    packing: null,
  });
  const [possibleStrength, setPossibleStrength] = useState([]);
  const [possiblePacking, setPossiblePacking] = useState([]);
  const [minPrice, setMinPrice] = useState(null);

  useEffect(() => {
    if (!selectedData.form) return;
    const newStrengthObj = saltFormsJson[selectedData.form];
    const newStrength = [];
    Object.keys(newStrengthObj).forEach((key) => newStrength.push(key));
    const item = newStrength[0];
    setSelectedData((prevState) => ({ ...prevState, strength: item }));

    setPossibleStrength(newStrength);
  }, [selectedData.form, saltFormsJson]);

  useEffect(() => {
    if (!selectedData.strength) return;

    const newPackingObj =
      saltFormsJson[selectedData.form][selectedData.strength];

    function calculatePacking() {
      const newPacking = [];

      Object.keys(newPackingObj).forEach((key) => newPacking.push(key));
      setSelectedData((prevState) => ({
        ...prevState,
        packing: newPacking[0],
      }));
      setPossiblePacking(newPacking);
    }

    calculatePacking();
  }, [selectedData.strength, saltFormsJson, selectedData.form]);

  useEffect(() => {
    if (!(selectedData.strength && selectedData.packing && selectedData.form))
      return;

    const newPackingObj =
      saltFormsJson[selectedData?.form][selectedData?.strength];
    const newPriceObj = newPackingObj[selectedData.packing];
    let price = Number.MAX_SAFE_INTEGER;
    if (newPackingObj && newPriceObj)
      Object.keys(newPriceObj).forEach((key) => {
        if (newPriceObj[key]) {
          const priceList = newPriceObj[key];
          price = Math.min(price, getMinSellingPrice(priceList));
        }
      });

    setMinPrice(price);
  }, [selectedData.packing, saltFormsJson]);

  return (
    <div className="my-6 min min-h-44 md:w-[80%] flex flex-col md:flex-row mx-auto border boreder-1 bg-white backdrop-blur-lg shadow-md rounded-xl space-y-2 bg-gradient-to-r from-white via-white to-cyan-50">
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
          {selectedData?.form} | {selectedData?.strength}|{" "}
          {selectedData.packing}
        </li>
      </ul>
    </div>
  );
};

const PriceSection = ({ minPrice }) => {
  if (!minPrice || minPrice == Number.MAX_SAFE_INTEGER)
    return (
      <div className="h-[100] flex justify-center items-center w-full">
        <p>No Store Selling this product near you</p>
      </div>
    );
  return (
    <div className="h-[100] flex justify-center items-center w-full">
      <p className="text-xl font-extrabold">From₹{minPrice}</p>
    </div>
  );
};
