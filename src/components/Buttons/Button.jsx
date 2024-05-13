"use client";
import React from "react";

const Button = ({
  minPrice,
  item,
  selectedData,
  setSelectedData,
  buttonType,
}) => {
  return (
    <li
      className={`
    p-1 rounded-md  border-2 backdrop-blur-md 
    ${
      minPrice &&
      minPrice !== Number.MAX_SAFE_INTEGER &&
      item == selectedData[buttonType]
        ? "border-solid"
        : "border-dashed"
    } 
    
    
    ${item == selectedData[buttonType] ? "border-blue-400" : "border-gray-400"}
    
    `}
      onClick={() => setSelectedData({ ...selectedData, [buttonType]: item })}
    >
      {item}
    </li>
  );
};

export default Button;
