import React, { useState } from "react";
import Image from "next/image";
import englandFlag from "@/assets/demo1_en.png";
import banglaFlag from "@/assets/bd_flag.png";

const HeaderTop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    language: "ENGLISH",
    flag: englandFlag,
  });

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="bg-[#0188cc]">
      <div className="flex justify-between items-center lg:container xl:w-[75%] mx-auto">
        {" "}
        <div className="flex justify-between items-center gap-1">
          <select className="bg-[#0188cc] text-white">
            <option value="volvo">USD</option>
            <option value="volvo">BDT</option>
          </select>
          <div className="relative">
            <button
              onClick={toggleOpen}
              className="bg-[#0188cc] text-white px-3 py-2 rounded flex justify-center items-center gap-1"
            >
              <Image
                src={selectedOption.flag}
                alt="flag picture"
                width={20}
                height={20}
              />
              {selectedOption.language}
            </button>
            {isOpen && (
              <ul className="absolute w-full bg-white text-black mt-2 rounded">
                <li
                  onClick={() =>
                    handleOptionClick({
                      language: "ENGLISH",
                      flag: englandFlag,
                    })
                  }
                  className="p-2 flex justify-center items-center gap-1"
                >
                  <Image
                    src={englandFlag}
                    alt="flag picture"
                    width={20}
                    height={20}
                  />
                  ENGLISH
                </li>
                <li
                  onClick={() =>
                    handleOptionClick({ language: "BANGLA", flag: banglaFlag })
                  }
                  className="p-2 flex justify-center items-center gap-1"
                >
                  <Image
                    src={banglaFlag}
                    alt="flag picture"
                    width={20}
                    height={20}
                  />
                  BANGLA
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
