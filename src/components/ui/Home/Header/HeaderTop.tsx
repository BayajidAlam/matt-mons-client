import React, { useState } from "react";
import Image from "next/image";
import englandFlag from "@/assets/demo1_en.png";
import banglaFlag from "@/assets/bd_flag.png";
import Link from "next/link";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";

const HeaderTop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    language: "ENGLISH",
    flag: englandFlag,
  });

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const navItems = (
    <>
      <li>
        <Link className="text-white text-[13px]" href={"/"}>
          Home
        </Link>
      </li>
      <li>
        <Link className="text-white text-[13px]" href={"/"}>
          Sign In
        </Link>
      </li>
      <li>
        <Link className="text-white text-[13px]" href={"/"}>
          Register
        </Link>
      </li>
      <li>
        <Link className="text-white text-[13px]" href={"/"}>
          Blog
        </Link>
      </li>
      <li>
        <Link className="text-white text-[13px]" href={"/"}>
          About Us
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-[#0188cc] py-2">
      <div className="flex justify-between items-center  w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto">
        {" "}
        <div className="flex justify-between items-center gap-1">
          <select className="bg-[#0188cc] text-white text-[13px]">
            <option
              style={{
                fontSize: "10px",
              }}
              value="volvo"
              className="text-[13px] bg-white text text-black"
            >
              USD
            </option>
            <option
              value="volvo"
              className="text-[13px] bg-white text text-black"
              style={{
                fontSize: "10px",
              }}
            >
              BDT
            </option>
          </select>
          <div className="relative">
            <button
              onClick={toggleOpen}
              className="bg-[#0188cc] text-white px-3 py-2 rounded flex justify-center items-center gap-1"
            >
              <Image
                src={selectedOption.flag}
                alt="flag picture"
                width={15}
                height={15}
              />
              <p className="text-[13px]"> {selectedOption.language}</p>
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
                  <p className="text-[13px]"> ENGLISH</p>
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
                    width={15}
                    height={15}
                  />
                  <p className="text-[13px]"> BANGLA</p>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center gap-4">
            <ul className="hidden md:flex justify-center items-center gap-8 ">
              {navItems}
            </ul>
            <span className="border border-r-[1px] h-3 border-white"></span>
            <div className="flex justify-between items-center gap-3 text-white">
              <div className="hover:bg-[#3b5a9a] rounded-full p-2">
                <TiSocialFacebook className="text-[16px]"/>
              </div>
              <div className="hover:bg-[#3b5a9a] rounded-full p-2">
                <FaTwitter className="text-[16px]"/>
              </div>
              <div className="hover:bg-[#3b5a9a] rounded-full p-2">
                <IoLogoInstagram className="text-[16px]"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
