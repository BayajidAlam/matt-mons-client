import React from "react";

const ProductDetailsSection = () => {
  return (
    <div className="border p-8 mt-12 rounded-md">
      <div className="space-y-4">
        <h1>Details</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat.
        </p>
        <ol
          style={{
            listStyleType: "circle",
            marginLeft: "20px",
          }}
        >
          <li>Any Product types that You want - Simple, Configurable</li>
          <li>Downloadable/Digital Products, Virtual Products</li>
          <li>Inventory Management with Backordered items</li>
        </ol>

        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="py-8">
        <h1>Additional Info</h1>
        <table className="w-full border rounded-xl">
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Stand Up</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">
                35″L x 24″W x 37-45″H(front to back wheel)
              </p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Folded (w/o wheels)</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">32.5″L x 18.5″W x 16.5″H</p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Door Pass Through</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">24</p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">24</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">Aluminum</p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Weight (w/o wheels)</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">20 LBS</p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Weight Capacity</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">Weight Capacity</p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Width</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">24″</p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Handle height (ground to handle)</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">37-45″</p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Wheels</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">21.5″</p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Head room (inside canopy)</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">25″</p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Color</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">Black, Blue, Red, White</p>
            </td>
          </tr>
          <tr className="w-full border">
            <td className="w-[40%] border-r py-2 px-3">
              <p className="text-base">Size</p>
            </td>
            <td className="w-[60%] py-2 px-3">
              <p className="text-base">M, S</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
