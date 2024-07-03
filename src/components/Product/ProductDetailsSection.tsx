"use client";
import React, { useState } from "react";
import CoreDetails from "./ProductCoreDetails";
import ProductReviews from "./ProductReviews";

const ProductDetailsSection = ({ productDetails, productAdditionalInfo,ReviewAndRatings }) => {
  
  const [selectedButton, setSelectedButton] = useState("details");

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="border p-8 mt-12 rounded-md">
      <button
        className={`text-[20px] border rounded-full px-8 py-1 mb-4 uppercase ${
          selectedButton === "details" ? "text-[#08c] border-[#08c]" : ""
        }`}
        onClick={() => handleButtonClick("details")}
      >
        Details
      </button>
      <button
        className={`text-[20px] border rounded-full px-8 py-1 mb-4 uppercase ml-2 ${
          selectedButton === "reviews" ? "text-[#08c] border-[#08c]" : ""
        } `}
        onClick={() => handleButtonClick("reviews")}
      >
        Reviews
      </button>
      {selectedButton === "details" && <CoreDetails productDetails={productDetails} productAdditionalInfo={productAdditionalInfo}/>}

      {selectedButton === "reviews" && <ProductReviews ReviewAndRatings={ReviewAndRatings}/>}
    </div>
  );
};

export default ProductDetailsSection;
