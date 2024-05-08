'use client'
import React, { useEffect, useState } from "react";
import DisImage from "@/assets/discount.jpg";
import Image from "next/image";

const AddsModel = () => {
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalShown(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setModalShown(false);
  };

  return (
    <div>
      {modalShown && (
        <div>
          <div className="fixed inset-0 bg-black opacity-20 p-3" onClick={closeModal}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 m-2 bg-red-500 p-2 text-white"
              >
                ✕
              </button>
              <div className="bg-gray-200">
                <Image
                  src={DisImage}
                  width={600}
                  height={400}
                  alt="discount image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddsModel;