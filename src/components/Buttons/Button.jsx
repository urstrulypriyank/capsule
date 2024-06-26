"use client";
import React, { useContext, useEffect, useState } from "react";
import { ChoiceContext } from "../Body/MedicineCombinationContainer";

const Button = ({ item, buttonType }) => {
  const [isPriceAvailabele, setIsPriceAvailable] = useState(false);
  const { selectedData, setSelectedData, saltFormsJson } =
    useContext(ChoiceContext);

  useEffect(() => {
    if (buttonType != "form") return;
    const list = saltFormsJson[item];
    Object.entries(list).map(([key, innerOne]) => {
      Object.entries(innerOne).map(([key, innerTwo]) => {
        Object.entries(innerTwo).map(([key, value]) => {
          if (value != null) {
            setIsPriceAvailable(true);
            return;
          }
        });
      });
    });
  });

  useEffect(() => {
    if (!selectedData.form || !selectedData.strength || !selectedData.packing)
      return;

    let priceList = [];
    if (buttonType === "strength") {
      if (
        saltFormsJson[selectedData.form] &&
        saltFormsJson[selectedData.form][item]
      ) {
        priceList =
          saltFormsJson[selectedData.form][item][selectedData.packing];
      }
    } else if (buttonType === "form") {
      if (saltFormsJson[item] && saltFormsJson[item][selectedData.strength]) {
        priceList =
          saltFormsJson[item][selectedData.strength][selectedData.packing];
      }
    } else if (buttonType === "packing") {
      if (
        saltFormsJson[selectedData.form] &&
        saltFormsJson[selectedData.form][selectedData.strength]
      ) {
        priceList =
          saltFormsJson[selectedData.form][selectedData.strength][item];
      }
    }

    if (priceList) {
      Object.keys(priceList).forEach((key) => {
        if (priceList[key]) {
          setIsPriceAvailable(true);
          return;
        }
      });
    }
  }, [selectedData, item, saltFormsJson, buttonType, item]);

  return (
    <li
      className={`
        p-1 rounded-md border-2 backdrop-blur-md 
        ${isPriceAvailabele ? "border-solid" : "border-dashed"} 
        ${
          item === selectedData[buttonType]
            ? "border-blue-400"
            : "border-gray-400"
        }
      `}
      onClick={() => setSelectedData({ ...selectedData, [buttonType]: item })}
    >
      {item}
    </li>
  );
};

export default Button;
