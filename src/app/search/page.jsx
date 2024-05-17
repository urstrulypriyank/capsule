/* 
    we need : 
      1. salt name
      2. all forms 
      3. strengthn in mg
      4. packing
      5. price available in near 
  */

import SaltListContainer from "@/components/Body/SaltListContainer";
import ToggleHints from "@/components/Body/ToggleHints";
import React from "react";

export default async function SearchPage({ searchParams }) {
  return (
    <>
      <div className="mx-auto text-center">
        <h2 className="text-2xl font-bold mt-6">List Of Drugs</h2>
      </div>
      <ToggleHints />
      <SaltListContainer searchText={searchParams.q} />
    </>
  );
}
