import React from "react";

const CoreDetails = ({ productDetails, productAdditionalInfo }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: productDetails }} />

      <div className="py-8">
        <h1 className="pb-3 text-[20px]">Additional Info</h1>
        <table className="w-full border rounded-xl">
          {productAdditionalInfo?.map((trRow) => (
            <>
              <tr className="w-full border">
                <td className="w-[40%] border-r py-2 px-3">
                  <p className="text-base">{trRow.key}</p>
                </td>
                <td className="w-[60%] py-2 px-3">
                  <p className="text-base">{trRow.value}</p>
                </td>
              </tr>
            </>
          ))}
        </table>
      </div>
    </div>
  );
};

export default CoreDetails;
