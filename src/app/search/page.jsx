/* 
    we need : 
      1. salt name
      2. all forms 
      3. strengthn in mg
      4. packing
      5. price available in near 
  */

import SaltListContainer from "@/components/Body/SaltListContainer";
import React from "react";

export default async function SearchPage({ searchParams }) {
  return (
    <>
      <SaltListContainer searchText={searchParams.q} />
    </>
  );
}
