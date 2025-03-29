import Breadcrumb from "@/components/Breadcrumb";
import CurriculumTable from "@/components/CurriculumTable";
import { SlClose } from "react-icons/sl";
import React from "react";

const CurriculumFramework = () => {
  return (
    <div className=" w-full h-screen flex flex-col justify-center py-8 items-center bg-gray-100 ">
      <div className="w-4/6 max-h-[90vh] ">
        <div className="w-full h-full flex rounded-xl  relative flex-col p-7 gap-y-8 bg-background">
          {/* {close Icon} */}
          <SlClose className="absolute text-3xl top-9 right-7 text-primary/50 cursor-pointer" />
          <h1 className=" font-semibold text-2xl">Configure New Framework</h1>
          <Breadcrumb />
          {/* Curriculum Table */}
          <CurriculumTable />
        </div>
      </div>
    </div>
  );
};

export default CurriculumFramework;
