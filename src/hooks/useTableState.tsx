"use client";
import { createNestedStructure, findMaxDepth } from "@/utils/tableUtils";
import { useState } from "react";

export function useTableState() {
  const [columnCount] = useState(5);
  const [selectedColumn, setSelectedColumn] = useState(5);
  interface DataNode {
    [key: string]: DataNode | object;
  }

  interface TableData {
    [key: string]: DataNode;
  }

  const [data, setData] = useState<TableData[]>([
    {
      1: {
        1.1: {
          "1.1.1": {
            "1.1.1.1": {
              "1.1.1.1.1": {},
            },
          },
        },
      },
    },
  ]);

  type AddRowFunction = (num: string) => void;

  const addRow: AddRowFunction = (num) => {
    setData((prevData) => {
      const maxDepth = Math.max(...prevData.map((item) => findMaxDepth(item)));
      const newData: TableData[] = JSON.parse(JSON.stringify(prevData));

      if (num.length === 1) {
        // Handle root-level additions (e.g., "3")
        newData.push(createNestedStructure(num, maxDepth) as TableData);
      } else {
        // Handle nested path additions (e.g., "1.3")
        const pathParts = num.split(".");
        const rootKey = pathParts[0];
        const newKey = pathParts.join(".");

        const rootObj = newData.find(
          (item) => item[rootKey as string] !== undefined
        );

        if (rootObj) {
          const levelsToAdd = maxDepth - pathParts.length;
          const newStructure = createNestedStructure(newKey, levelsToAdd + 1);

          let current: DataNode = rootObj[rootKey] as DataNode;
          let currentPath = rootKey;

          for (let i = 1; i < pathParts.length - 1; i++) {
            currentPath += `.${pathParts[i]}`;
            current = current[currentPath] as DataNode;
          }

          (current as DataNode)[newKey] = (newStructure as DataNode)[newKey];
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
      interface LeafNode {
        [key: string]: LeafNode | object;
      }

      const addChildrenToLeaves = (obj: LeafNode): void => {
        Object.keys(obj).forEach((key) => {
          if (Object.keys(obj[key]).length === 0) {
            // If it's a leaf node, add a child
            const childKey = `${key}.1`;
            (obj[key] as LeafNode)[childKey] = {};
          } else {
            // Otherwise, continue recursion
            addChildrenToLeaves(obj[key] as LeafNode);
          }
        });
      };

      // Process each root object in the data array
      newData.forEach((rootObj: TableData) => {
        const rootKey = Object.keys(rootObj)[0];
        addChildrenToLeaves(rootObj[rootKey]);
      });

      return newData;
    });
  };
  interface RowSpanMatrix {
    [rowIndex: number]: number[];
  }

  interface CalculateRowSpansFunction {
    (data: string[][]): RowSpanMatrix;
  }

  const calculateRowSpans: CalculateRowSpansFunction = (data) => {
    const spanMatrix: RowSpanMatrix = data.map(() =>
      Array(data[0].length).fill(1)
    );

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
