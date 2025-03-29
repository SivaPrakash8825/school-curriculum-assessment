import React from "react";
import { GoChevronRight } from "react-icons/go";
const Breadcrumb = () => {
  return (
    <div className="  rounded-sm flex items-center  p-4  gap-x-2 border border-clr-border">
      <p className=" font-semibold">NCF</p>
      <GoChevronRight className="  text-lg " />
      <p className=" font-semibold">Grade 9</p>
      <GoChevronRight className="  text-lg " />
      <p className=" font-semibold">Science</p>
    </div>
  );
};

export default Breadcrumb;
