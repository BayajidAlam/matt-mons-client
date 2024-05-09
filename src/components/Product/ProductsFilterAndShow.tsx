"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductFilter = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");

  return (
    <>
      <div className="container lg:px-32 lg:py-20 w-[92%] mx-auto">
        <div className="lg:flex gap-5 ">
          <div className="p-10 lg:p-0">
            <div className="flex items-center">
              <h4 className="text-xl font-semibold">Price</h4>
              <input
                className="border outline-none p-2 mx-2 rounded-lg"
                type="number"
                min="0"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="my-5">
              <h4 className="text-xl font-semibold">Category</h4>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="All"
                  className="cursor-pointer"
                  checked={categoryFilter === ""}
                  onChange={(e) =>
                    setCategoryFilter(e.target.checked ? "" : "")
                  }
                />
                <label>All</label>
              </div>
              <div className="gap-2 flex items-center my-3 ">
                <input
                  type="checkbox"
                  value="travel bag"
                  className="cursor-pointer"
                  checked={categoryFilter === "travel bag"}
                  onChange={(e) =>
                    setCategoryFilter(e.target.checked ? "travel bag" : "")
                  }
                />
                <label>Travel Bag</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="clothing"
                  className="cursor-pointer"
                  checked={categoryFilter === "clothing"}
                  onChange={(e) =>
                    setCategoryFilter(e.target.checked ? "clothing" : "")
                  }
                />
                <label>Clothing</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="backpacks"
                  className="cursor-pointer"
                  checked={categoryFilter === "backpacks"}
                  onChange={(e) =>
                    setCategoryFilter(e.target.checked ? "backpacks" : "")
                  }
                />
                <label>Backpacks</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="accessories"
                  className="cursor-pointer"
                  checked={categoryFilter === "accessories"}
                  onChange={(e) =>
                    setCategoryFilter(e.target.checked ? "accessories" : "")
                  }
                />
                <label>Accessories</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="new arrivals"
                  className="cursor-pointer"
                  checked={categoryFilter === "new arrivals"}
                  onChange={(e) =>
                    setCategoryFilter(e.target.checked ? "new arrivals" : "")
                  }
                />
                <label>New Arrivals</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="sale"
                  className="cursor-pointer"
                  checked={categoryFilter === "sale"}
                  onChange={(e) =>
                    setCategoryFilter(e.target.checked ? "sale" : "")
                  }
                />
                <label>Sale</label>
              </div>
            </div>

            {/* Size Filter */}
            <div className="my-5">
              <h4 className="text-xl font-semibold">Size</h4>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="S"
                  checked={sizeFilter === "S"}
                  onChange={(e) => setSizeFilter(e.target.checked ? "S" : "")}
                />
                <label>S</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="M"
                  checked={sizeFilter === "M"}
                  onChange={(e) => setSizeFilter(e.target.checked ? "M" : "")}
                />
                <label>M</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="L"
                  checked={sizeFilter === "L"}
                  onChange={(e) => setSizeFilter(e.target.checked ? "L" : "")}
                />
                <label>L</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="XL"
                  checked={sizeFilter === "XL"}
                  onChange={(e) => setSizeFilter(e.target.checked ? "XL" : "")}
                />
                <label>XL</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="XXL"
                  checked={sizeFilter === "XXL"}
                  onChange={(e) => setSizeFilter(e.target.checked ? "XXL" : "")}
                />
                <label>XXL</label>
              </div>
              {/* Add more checkbox inputs for other sizes */}
            </div>

            {/* Color Filter */}
            <div className="my-5">
              <h4 className="text-xl font-semibold">Color</h4>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="white"
                  checked={colorFilter === "white"}
                  onChange={(e) =>
                    setColorFilter(e.target.checked ? "white" : "")
                  }
                />
                <label>White</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="red"
                  checked={colorFilter === "red"}
                  onChange={(e) =>
                    setColorFilter(e.target.checked ? "red" : "")
                  }
                />
                <label>Red</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="green"
                  checked={colorFilter === "green"}
                  onChange={(e) =>
                    setColorFilter(e.target.checked ? "green" : "")
                  }
                />
                <label>Green</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="blue"
                  checked={colorFilter === "blue"}
                  onChange={(e) =>
                    setColorFilter(e.target.checked ? "blue" : "")
                  }
                />
                <label>Blue</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="black"
                  checked={colorFilter === "black"}
                  onChange={(e) =>
                    setColorFilter(e.target.checked ? "black" : "")
                  }
                />
                <label>Black</label>
              </div>
              <div className="gap-2 flex items-center my-3">
                <input
                  type="checkbox"
                  value="brown"
                  checked={colorFilter === "brown"}
                  onChange={(e) =>
                    setColorFilter(e.target.checked ? "brown" : "")
                  }
                />
                <label>Brown</label>
              </div>
            </div>
          </div>
          {/* here Filter Results */}

          <div
            className="grid grid-cols-1 md:grid-cols-2
           lg:grid-cols-3 xl:grid-cols-3 gap-3 w-full"
          >
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
