"use client";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

// Convert nested object into an array format & identify last items

const calculateRowSpans = (data) => {
  let spanMatrix = data.map(() => Array(data[0].length).fill(1));

  for (let j = 0; j < data[0].length; j++) {
    for (let i = data.length - 1; i > 0; i--) {
      if (data[i][j] === data[i - 1][j]) {
        spanMatrix[i - 1][j] += spanMatrix[i][j];
        spanMatrix[i][j] = 0; // Hide the duplicate cell
      }
    }
  }
  return spanMatrix;
};

const CurriculumTable = () => {
  const [columnCount, setColumnCount] = useState(3);
  const [selectedColumn, setSelectedColumn] = useState(3);
  const [data, setData] = useState([
    {
      1: {
        1.1: {
          "1.1.1": {},
        },
      },
    },
  ]);
  function convertToArray(
    obj,
    path = [],
    result = [],
    lastItems = [],
    maxDepth = Infinity
  ) {
    const keys = Object.keys(obj);

    keys.forEach((key, index) => {
      const newPath = [...path, key];
      const isLastAtThisLevel = index === keys.length - 1;
      const children = Object.keys(obj[key]);

      if (children.length === 0 || newPath.length >= maxDepth) {
        // Stop adding further if maxDepth is reached
        result.push([...newPath]);

        if (isLastAtThisLevel) {
          lastItems.push(key);
        }
      } else {
        convertToArray(obj[key], newPath, result, lastItems, maxDepth);
        if (isLastAtThisLevel) {
          lastItems.push(key);
        }
      }
    });

    return {
      allPaths: result,
      lastItems: lastItems,
    };
  }

  const findMaxDepth = (obj, depth = 0) => {
    if (typeof obj !== "object" || Object.keys(obj).length === 0) return depth;
    return Math.max(
      ...Object.values(obj).map((child) => findMaxDepth(child, depth + 1))
    );
  };

  const createNestedStructure = (
    baseNum,
    maxDepth,
    currentDepth = 1,
    currentPath = baseNum.toString()
  ) => {
    if (currentDepth > maxDepth) {
      return {};
    }

    const result = {};
    const newKey = currentDepth === 1 ? baseNum.toString() : `${currentPath}.1`;

    result[newKey] = createNestedStructure(
      baseNum,
      maxDepth,
      currentDepth + 1,
      newKey
    );

    return result;
  };

  const addRow = (num) => {
    setData((prevData) => {
      const maxDepth = Math.max(...prevData.map((item) => findMaxDepth(item)));
      const newData = JSON.parse(JSON.stringify(prevData));

      if (num.length === 1) {
        // Handle root-level additions (e.g., "3")
        newData.push(createNestedStructure(num, maxDepth));
      } else {
        // Handle nested path additions (e.g., "1.3")
        const pathParts = num.split(".");
        const rootKey = pathParts[0];
        const parentPath = pathParts.slice(0, -1).join(".");
        const newKey = pathParts.join(".");

        const rootObj = newData.find((item) => item[rootKey] !== undefined);

        if (rootObj) {
          const levelsToAdd = maxDepth - pathParts.length;
          const newStructure = createNestedStructure(newKey, levelsToAdd + 1);

          let current = rootObj[rootKey];
          let currentPath = rootKey;

          for (let i = 1; i < pathParts.length - 1; i++) {
            currentPath += `.${pathParts[i]}`;
            current = current[currentPath];
          }

          current[newKey] = newStructure[newKey];
        }
      }

      return newData;
    });
  };

  const addColumn = () => {
    setColumnCount((prevCount) => prevCount + 1);
    setSelectedColumn((prevCount) => prevCount + 1);
    setData((prevData) => {
      // Create a deep copy of the data
      const newData = JSON.parse(JSON.stringify(prevData));

      // Function to recursively add children to leaf nodes
      const addChildrenToLeaves = (obj) => {
        Object.keys(obj).forEach((key) => {
          if (Object.keys(obj[key]).length === 0) {
            // If it's a leaf node, add a child
            const childKey = `${key}.1`;
            obj[key][childKey] = {};
          } else {
            // Otherwise, continue recursion
            addChildrenToLeaves(obj[key]);
          }
        });
      };

      // Process each root object in the data array
      newData.forEach((rootObj) => {
        const rootKey = Object.keys(rootObj)[0];
        addChildrenToLeaves(rootObj[rootKey]);
      });

      return newData;
    });
  };
  return (
    <>
      <div className="flex  flex-col gap-y-2 justify-center">
        <label className=" font-semibold">Number of levels</label>
        <div className=" flex ">
          {Array.from({ length: columnCount }, (_, index) => (
            <div
              onClick={() => {
                setSelectedColumn(index + 1);
              }}
              key={index}
              className={`flex items-center mb-2 `}
            >
              <label
                className={`mr-3 rounded-full size-10 text-center flex items-center justify-center   ${
                  selectedColumn === index + 1
                    ? "bg-black text-white"
                    : " bg-gray-300"
                } border border-gray-300 rounded-full cursor-pointer`}
              >
                {index + 1}
              </label>
            </div>
          ))}
          <div key={columnCount + 1} className="flex items-center mb-2">
            <label
              onClick={addColumn}
              className="mr-2 rounded-full bg-gray-200 border size-10 text-center flex items-center justify-center "
            >
              <IoAdd className=" text-xl" />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-300 mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-black text-white border border-gray-300">
                {convertToArray(
                  data[0],
                  [],
                  [],
                  [],
                  selectedColumn
                ).allPaths[0].map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-1 text-[12px] uppercase font-light text-center border border-gray-300"
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
                  [],
                  [],
                  selectedColumn
                );
                const rowSpans = calculateRowSpans(val);

                return val.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.slice(0, selectedColumn).map((cell, colIndex) =>
                      rowSpans[rowIndex][colIndex] > 0 ? (
                        <td
                          key={colIndex}
                          rowSpan={rowSpans[rowIndex][colIndex]}
                          className="border relative border-gray-400 px-4 py-2 text-center"
                        >
                          level{cell}
                          {cell.length === 1 && data.length === index + 1 && (
                            <div
                              onClick={() =>
                                addRow((Number(cell) + 1).toString())
                              }
                              className="absolute border z-30 right-1.5 bottom-1.5 cursor-pointer size-7 flex items-center text-blue-500 justify-center border-blue-500 rounded-sm"
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
                              className="absolute border z-30 right-1.5 bottom-1.5 flex items-center text-blue-500 justify-center cursor-pointer size-7 border-blue-500 rounded-sm"
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
        <button className=" rounded-md bg-gray-400 px-5 py-3 text-white">
          Same Framework
        </button>
      </div>
    </>
  );
};

export default CurriculumTable;
