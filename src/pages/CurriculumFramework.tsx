import Breadcrumb from "@/components/Breadcrumb";
import CurriculumTable from "@/components/CurriculumTable";
import { SlClose } from "react-icons/sl";
import React from "react";

const CurriculumFramework = () => {
  return (
    <div className=" w-full min-h-screen flex flex-col justify-center py-8 items-center bg-gray-100">
      <div className=" w-4/6 h-11/12 flex rounded-xl shadow relative shadow-black flex-col p-7 gap-y-8">
        <SlClose className="absolute text-3xl top-10 right-10 text-gray-500 cursor-pointer" />
        <h1 className=" font-semibold text-2xl">Configure New Framework</h1>
        <Breadcrumb />
        <CurriculumTable />
      </div>
    </div>
  );
};

export default CurriculumFramework;
