"use client";
import { getMinSellingPrice } from "@/utils/utils";
import React, { useEffect, useState } from "react";

const SaltListItem = ({ saltName, saltForms, strength, saltFormsJson }) => {
  const [selectedData, setSelectedData] = useState({
    form: saltForms[0],
    strength: null,
    packing: null,
  });
  // const [possibleSatlForms, setPossibleSaltForms] = useState(saltForms);
  const [possibleStrength, setPossibleStrength] = useState([]);
  const [possiblePacking, setPossiblePacking] = useState([]);

  // varaible to hold minimum price
  const [minPrice, setMinPrice] = useState(null);

  useEffect(() => {
    if (!selectedData.form) return;
    const newStrengthObj = saltFormsJson[selectedData.form];
    const newStrength = [];
    Object.keys(newStrengthObj).forEach((key) => newStrength.push(key));
    const item = newStrength[0];
    setSelectedData((prevState) => ({ ...prevState, strength: item }));

    setPossibleStrength(newStrength);
  }, [selectedData.form]);

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
  }, [selectedData.strength]);

  // use effect to update dynamic price based on selection
  useEffect(() => {
    if (!(selectedData.strength && selectedData.packing && selectedData.form))
      return;

    const newPackingObj =
      saltFormsJson[selectedData?.form][selectedData?.strength];
    const newPriceObj = newPackingObj[selectedData.packing];
    let price = Number.MAX_SAFE_INTEGER;
    Object.keys(newPriceObj).forEach((key) => {
      if (newPriceObj[key]) {
        const priceList = newPriceObj[key];
        price = Math.min(price, getMinSellingPrice(priceList));
      }
    });

    setMinPrice(price);
  }, [selectedData.packing]);

  return (
    <div className="my-6 min min-h-44 md:w-[80%] flex flex-col  md:flex-row  mx-auto border boreder-1 bg-white backdrop-blur-lg shadow-md  rounded-xl space-y-2">
      <PackagingSection
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

const PackagingSection = ({
  saltForms,
  possiblePacking,
  possibleStrength,
  selectedData,
  setSelectedData,
  minPrice,
  saltFormsJson,
}) => {
  return (
    <div className="w-full h-full  m-4 md:place-self-center place-self-auto place-content-center space-y-4 ">
      {/* FORM OF DRUG */}
      <section className="grid grid-cols-2">
        <div>Form:</div>
        <div>
          <ul className="flex flex-wrap w-full   items-center text-center [&>*]:m-1 ">
            {saltForms?.map((item, index) => {
              return (
                <li
                  key={item + index}
                  className={`
                  p-1 rounded-md  border-2 backdrop-blur-md 
                  ${
                    minPrice &&
                    minPrice !== Number.MAX_SAFE_INTEGER &&
                    item == selectedData.form
                      ? "border-solid"
                      : "border-dashed"
                  } 
                  
                  ${
                    item == selectedData.form
                      ? "border-blue-400"
                      : "border-gray-400"
                  }
                  
                  `}
                  onClick={() =>
                    setSelectedData({ ...selectedData, form: item })
                  }
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* STRENGTH OF DRUG */}
      <section className="grid grid-cols-2">
        <div>Strength:</div>
        <div>
          <ul className="flex flex-wrap w-full   items-center text-center [&>*]:m-1 ">
            {possibleStrength?.map((item, index) => {
              return (
                <li
                  key={item + index}
                  className={`
                  p-1 rounded-md  border-2 backdrop-blur-md 
                  ${
                    minPrice &&
                    minPrice !== Number.MAX_SAFE_INTEGER &&
                    item == selectedData.strength
                      ? "border-solid"
                      : "border-dashed"
                  } 
                  
                  ${
                    item == selectedData.strength
                      ? "border-blue-400"
                      : "border-gray-400"
                  }
                  
                  `}
                  onClick={() =>
                    setSelectedData({ ...selectedData, strength: item })
                  }
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* PACKAGING OF DRUG */}
      <section className="grid grid-cols-2">
        <div>Pacakaging:</div>
        <div>
          <ul className="flex flex-wrap w-full   items-center text-center [&>*]:m-1 ">
            {possiblePacking?.map((item, index) => {
              return (
                <li
                  key={item + index}
                  className={`
                  p-1 rounded-md  border-2 backdrop-blur-md 
                  ${
                    minPrice &&
                    minPrice !== Number.MAX_SAFE_INTEGER &&
                    item == selectedData.packing
                      ? "border-solid"
                      : "border-dashed"
                  } 
                  
                  ${
                    item == selectedData.packing
                      ? "border-blue-400"
                      : "border-gray-400"
                  }
                  
                  `}
                  onClick={() =>
                    setSelectedData({ ...selectedData, packing: item })
                  }
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

const SaltDetailSection = ({ saltName, selectedData }) => {
  return (
    <div className="h-[100]  flex justify-center items-center w-full  ">
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
      <div className="h-[100] flex justify-center items-center w-full" v>
        <p>No Store Selling this product near you</p>
      </div>
    );
  return (
    <div className="h-[100]  flex justify-center items-center w-full">
      <p className="text-xl font-extrabold">From₹{minPrice}</p>
    </div>
  );
};
