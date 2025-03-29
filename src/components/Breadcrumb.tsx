import React from "react";
import { LiaLessThanSolid } from "react-icons/lia";
const Breadcrumb = () => {
  return (
    <div className="  rounded-sm flex items-center  p-4  gap-x-2 border border-primary/20">
      <p className=" font-semibold">NCF</p>
      <LiaLessThanSolid className=" rotate-180 text-sm " />
      <p className=" font-semibold">Grade 9</p>
      <LiaLessThanSolid className=" rotate-180 text-sm " />
      <p className=" font-semibold">Science</p>
    </div>
  );
};

export default Breadcrumb;
