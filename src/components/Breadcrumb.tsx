import React from "react";
import { GoChevronRight } from "react-icons/go";
const Breadcrumb = () => {
  return (
    <div className="  rounded-md flex items-center  p-4  gap-x-2 border border-clr-border/50">
      <p className=" font-normal">NCF</p>
      <GoChevronRight className="  text-lg " />
      <p className=" font-medium">Grade 9</p>
      <GoChevronRight className="  text-lg " />
      <p className=" font-medium">Science</p>
    </div>
  );
};

export default Breadcrumb;
