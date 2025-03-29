import Breadcrumb from "@/components/Breadcrumb";
import CurriculumTable from "@/components/CurriculumTable";
import { SlClose } from "react-icons/sl";
import React from "react";

const CurriculumFramework = () => {
  return (
    <div className=" w-full h-screen flex flex-col justify-center py-8 items-center bg-gray-100 ">
      <div className="w-4/6 max-h-[90vh] ">
        <div className="w-full h-full flex rounded-xl flex-col p-7 gap-y-8 bg-background">
          {/* {close Icon} */}
          <div className=" flex justify-between">
            <h1 className=" font-semibold text-2xl">Configure New Framework</h1>
            <SlClose className=" text-3xl text-primary/50 cursor-pointer" />
          </div>
          <Breadcrumb />
          {/* Curriculum Table */}
          <CurriculumTable />
        </div>
      </div>
    </div>
  );
};

export default CurriculumFramework;
