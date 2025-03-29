"use client";
import { useTableState } from "@/hooks/useTableState";
import { convertToArray } from "@/utils/tableUtils";
import React from "react";
import { IoAdd } from "react-icons/io5";

const CurriculumTable = () => {
  const {
    addColumn,
    addRow,
    calculateRowSpans,
    columnCount,
    data,
    selectedColumn,
  } = useTableState();
  return (
    <>
      <div className="flex  flex-col gap-y-2 justify-center">
        <label className=" font-semibold">Number of levels</label>
        <div className=" flex ">
          {Array.from({ length: columnCount }, (_, index) => (
            <div
              onClick={() => {
                addColumn(index + 1);
              }}
              key={index}
              className={`flex items-center mb-2 `}
            >
              <label
                className={`mr-3 rounded-full size-10 text-center flex items-center justify-center   ${
                  selectedColumn === index + 1
                    ? "bg-primary text-white"
                    : " bg-primary/10"
                } rounded-full cursor-pointer`}
              >
                {index + 1}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-primary border-r border-2 border-primary text-white">
                {(
                  convertToArray(data[0], [], [], [], selectedColumn)
                    .allPaths[0] as string[]
                )?.map((column: string, index: number) => (
                  <th
                    key={index}
                    className="px-4 py-1 text-[12px] border-white text-white uppercase font-light text-center border "
                  >
                    add name for level {index + 1}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((column, index) => {
                const { allPaths: val, lastItems: lastMap } = convertToArray(
                  column,
                  [],
                  [] as string[][],
                  [],
                  selectedColumn
                );
                const rowSpans = calculateRowSpans(val);

                return val.map((row: string[], rowIndex) => (
                  <tr key={rowIndex}>
                    {row.slice(0, selectedColumn).map((cell, colIndex) =>
                      rowSpans[rowIndex][colIndex] > 0 ? (
                        <td
                          key={colIndex}
                          rowSpan={rowSpans[rowIndex][colIndex]}
                          className="border-2 text-sm capitalize relative   border-primary/25 px-4 py-2 text-center"
                        >
                          level {cell}
                          {cell.length === 1 && data.length === index + 1 && (
                            <div
                              onClick={() =>
                                addRow((Number(cell) + 1).toString())
                              }
                              className="absolute border z-30 right-1 bottom-1 cursor-pointer size-7 flex items-center text-blue-500 justify-center border-blue-500 rounded-sm"
                            >
                              <IoAdd className=" text-sm" />
                            </div>
                          )}
                          {cell.length > 1 && lastMap.includes(cell) && (
                            <div
                              onClick={() => {
                                const newNum =
                                  Number(cell.split(".").pop()) + 1;
                                const parentNum = cell
                                  .split(".")
                                  .slice(0, -1)
                                  .join(".");
                                addRow(parentNum + "." + newNum);
                              }}
                              className="absolute border z-30 right-1 bottom-1 flex items-center text-blue-500 justify-center cursor-pointer size-7 border-blue-500 rounded-sm"
                            >
                              <IoAdd className=" text-sm" />
                            </div>
                          )}
                        </td>
                      ) : null
                    )}
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" w-full flex justify-end">
        <button className=" rounded-md bg-primary/30 px-5 py-2 text-white">
          Same Framework
        </button>
      </div>
    </>
  );
};

export default CurriculumTable;
