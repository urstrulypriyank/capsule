// Button.jsx
"use client";
import React, { useContext, useEffect, useState } from "react";
import { ChoiceContext } from "../Body/MedicineCombinationContainer";

const Button = ({ item, buttonType }) => {
  const [isPriceAvailabele, setIsPriceAvailable] = useState(false);
  const [buttonText, setButtonText] = useState(item);
  const [priceList, setPriceList] = useState(null);
  const { selectedData, setSelectedData, saltFormsJson } = useContext(ChoiceContext);

  useEffect(() => {
    if (!(selectedData.form && selectedData.strength && selectedData.packing)) return;

    let priceList = [];
    if (buttonType === "strength") {
      if (saltFormsJson[selectedData.form] && saltFormsJson[selectedData.form][buttonText]) {
        priceList = saltFormsJson[selectedData.form][buttonText][selectedData.packing];
      }
    } else if (buttonType === "form") {
      if (saltFormsJson[buttonText] && saltFormsJson[buttonText][selectedData.strength]) {
        priceList = saltFormsJson[buttonText][selectedData.strength][selectedData.packing];
      }
    } else if (buttonType === "packing") {
      if (saltFormsJson[selectedData.form] && saltFormsJson[selectedData.form][selectedData.strength]) {
        priceList = saltFormsJson[selectedData.form][selectedData.strength][item];
      }
    }

    if (priceList) {
      setPriceList(priceList);
    }
  }, [selectedData, item, saltFormsJson, buttonType, buttonText]);

  useEffect(() => {
    if (priceList) {
      Object.keys(priceList).forEach((key) => {
        if (priceList[key]) {
          setIsPriceAvailable(true);
        }
      });
    }
  }, [priceList]);

  return (
    <li
      className={`
        p-1 rounded-md border-2 backdrop-blur-md 
        ${isPriceAvailabele ? "border-solid" : "border-dashed"} 
        ${item === selectedData[buttonType] ? "border-blue-400" : "border-gray-400"}
      `}
      onClick={() => setSelectedData({ ...selectedData, [buttonType]: item })}
    >
      {item}
    </li>
  );
};

export default Button;
