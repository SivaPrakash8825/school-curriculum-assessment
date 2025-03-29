import React from "react";
import { PiLessThanLight } from "react-icons/pi";
const Breadcrumb = () => {
  return (
    <div className="  rounded-sm flex items-center  p-4  gap-x-2 border border-gray-300">
      <p className=" font-semibold">NCF</p>
      <PiLessThanLight className=" rotate-180 text-sm mt-1" />
      <p className=" font-semibold">Grade 9</p>
      <PiLessThanLight className=" rotate-180 text-sm mt-1" />
      <p className=" font-semibold">Science</p>
    </div>
  );
};

export default Breadcrumb;
