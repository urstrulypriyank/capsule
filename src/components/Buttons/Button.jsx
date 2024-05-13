"use client";
import React, { useEffect } from "react";

const Button = ({ minPrice, item ,selectedData}) => {
    const [isPrice,setIsPrice] = useState(false);
    useEffect(()=> {

        
    },[])
  return (
    <li
      key={item + index}
      className={`
                  p-1 rounded-md  border-2 backdrop-blur-md 
                  ${
                    minPrice && minPrice !== Number.MAX_SAFE_INTEGER
                      ? "border-solid"
                      : "border-dashed"
                  } 
                  
                  ${
                    item == selectedData.form
                      ? "border-blue-400"
                      : "border-gray-400"
                  }
                  
                  `}
      onClick={() => setSelectedData({ ...selectedData, form: item })}
    >
      {item}
    </li>
  );
};

export default Button;
