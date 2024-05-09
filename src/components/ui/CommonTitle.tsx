import React from "react";

type ICommonTitleProps = {
  title?: string;
  children: string;
};

const CommonTitle = ({ title, children }:ICommonTitleProps) => {
  return (
    <h3 className="lg:pb-10 pb-20 lg:pt-4 lg:px-0 px-5 text-3xl font-bold">
      {title}, <span className="opacity-50"> {children}</span>{" "}
    </h3>
  );
};

export default CommonTitle;
