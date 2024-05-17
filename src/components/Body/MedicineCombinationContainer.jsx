"use client";
import React, { createContext } from "react";
import Button from "../Buttons/Button";
import { useState } from "react";

export const ChoiceContext = createContext();

const MedicineCombinationContainer = ({
  form,
  possiblePacking,
  possibleStrength,
  selectedData,
  setSelectedData,
  saltFormsJson = { saltFormsJson },
}) => {
  const [showAllForms, setShowAllForms] = useState(false);
  const [showAllStrength, setShowAllStrength] = useState(false);
  const [showAllPacking, setShowAllPacking] = useState(false);
  const size = Object.keys(form).length;
  return (
    <ChoiceContext.Provider
      value={{ saltFormsJson, selectedData, setSelectedData }}
    >
      <div className="w-full h-full m-4 md:place-self-center place-self-auto place-content-center space-y-4 ">
        {/* FORM OF DRUG */}
        <section className="grid grid-cols-2">
          <div>Form:</div>

          <ul className="flex flex-wrap w-full items-center text-center [&>*]:m-1">
            {Object.entries(form).map(([item], index) => {
              if (!showAllForms && index > 1) return null;
              return (
                <Button key={item + index} item={item} buttonType={"form"} />
              );
            })}

            {!showAllForms && size > 1 && (
              <button
                className="text-blue-500 underline"
                onClick={() => setShowAllForms(!showAllForms)}
              >
                More
              </button>
            )}
            {showAllForms && (
              <button
                className="text-blue-500 underline"
                onClick={() => setShowAllForms(!showAllForms)}
              >
                Hide
              </button>
            )}
          </ul>
        </section>

        {/* STRENGTH OF DRUG */}
        <section className="grid grid-cols-2">
          <div>Strength:</div>

          <ul className="flex flex-wrap w-full items-center text-center [&>*]:m-1">
            {possibleStrength?.map((item, index) => {
              if (!showAllStrength && index > 1) return null;
              return (
                <Button
                  key={item + index}
                  item={item}
                  buttonType={"strength"}
                />
              );
            })}
            {!showAllStrength && possibleStrength.length > 2 && (
              <button
                className="text-blue-500 underline"
                onClick={() => setShowAllStrength(!showAllStrength)}
              >
                More
              </button>
            )}
            {showAllStrength && (
              <button
                className="text-blue-500 underline"
                onClick={() => setShowAllStrength(!showAllStrength)}
              >
                Hide
              </button>
            )}
          </ul>
        </section>

        {/* PACKAGING OF DRUG */}
        <section className="grid grid-cols-2">
          <div>Pacakaging:</div>

          <ul className="flex flex-wrap w-full items-center text-center [&>*]:m-1">
            {possiblePacking?.map((item, index) => {
              if (!showAllPacking && index > 1) return null;
              return (
                <Button key={item + index} item={item} buttonType={"packing"} />
              );
            })}
            {!showAllPacking && possiblePacking.length > 2 && (
              <button
                className="text-blue-500 underline"
                onClick={() => setShowAllPacking(!showAllPacking)}
              >
                More
              </button>
            )}
            {showAllPacking && (
              <button
                className="text-blue-500 underline"
                onClick={() => setShowAllPacking(!showAllPacking)}
              >
                Hide
              </button>
            )}
          </ul>
        </section>
      </div>
    </ChoiceContext.Provider>
  );
};
export default MedicineCombinationContainer;
