"use client";
import React, { useEffect, useState } from "react";

const productsArray = [
  {
    _id: "64a9731202f6ab092b17ef64",
    productImg: "https://i.ibb.co/q95Jr3n/6.png",
    bgImage: "",
    smImage: "",
    name: "Waffle Knit Beanie",
    description: "New blue aqua",
    message: "50% Discount",
    reviews: "205",
    star: "4.8",
    price: 45,
    color: "blue",
    bgColor: "",
    category: "accessories",
    total: null,
    type: "women",
    __v: 0,
  },
  {
    _id: "64a973a602f6ab092b17ef70",
    productImg: "https://i.ibb.co/YXTXcsD/10.png",
    bgImage: "",
    smImage: "",
    name: "Travel Pet Carrier",
    description: "Dark pink 2023",
    message: "",
    reviews: "147",
    star: "4.7",
    price: 50,
    color: "pink",
    bgColor: "",
    category: "accessories",
    total: null,
    type: "women",
    __v: 0,
  },
  {
    _id: "64a9751902f6ab092b17ef80",
    productImg: "https://i.ibb.co/bmLL747/2.png",
    bgImage: "",
    smImage: "",
    name: "Travel Pet Carrier",
    description: "Matte black",
    message: "",
    reviews: "245",
    star: "4.7",
    price: 60,
    color: "black",
    bgColor: "",
    category: "sale",
    total: null,
    type: "women",
    __v: 0,
  },
  {
    _id: "64a97694bd7d59f5b3603d4f",
    productImg: "https://i.ibb.co/QQJbSRp/7.png",
    bgImage: "",
    smImage: "",
    name: "Rounded Buckle",
    description: "Classic green",
    message: "",
    reviews: "222",
    star: "4.7",
    price: 88,
    color: "green",
    bgColor: "",
    category: "backpacks",
    size: "XL",
    total: null,
    type: "women",
    __v: 0,
  },
  {
    _id: "64a9778ebd7d59f5b3603d5c",
    productImg: "https://i.ibb.co/VC24L3W/1.png",
    bgImage: "",
    smImage: "",
    name: "Wool Cashmere jacket",
    description: "Perfect mint green",
    message: "New in",
    reviews: "245",
    star: "4.3",
    price: 44,
    color: "green",
    bgColor: "",
    category: "new arrivals",
    size: "L",
    total: null,
    type: "women",
    __v: 0,
  },
  {
    _id: "64a9854bc3ea711a724fd493",
    productImg: "https://i.ibb.co/0my0mz1/4.png",
    name: "Waffle Knit Beanie",
    description: "New design 2023",
    message: "limited edition",
    reviews: "125",
    star: "4.2",
    price: 30,
    color: "pink",
    category: "clothing",
    size: "S",
    type: "women",
    __v: 0,
  },
];

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [products, setProducts] = useState(productsArray);

  useEffect(() => {
    setProducts(productsArray);
  }, []);

  const product = products.find((product) => product._id === id);

  return (
    <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto my-8">
      {product?.name}
    </div>
  );
};

export default ProductDetailsPage;
