"use client";
import { createNestedStructure, findMaxDepth } from "@/utils/tableUtils";
import { useState } from "react";

export function useTableState() {
  const [columnCount, setColumnCount] = useState(5);
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

  const addColumn = (count: number) => {
    setSelectedColumn(count);
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
  const calculateRowSpans = (data) => {
    const spanMatrix = data.map(() => Array(data[0].length).fill(1));

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

  return {
    data,
    columnCount,
    selectedColumn,
    addRow,
    addColumn,
    calculateRowSpans,
  };
}
