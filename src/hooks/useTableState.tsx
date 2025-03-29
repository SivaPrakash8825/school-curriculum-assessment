"use client";
import { useState } from "react";

// Define the types
interface CellValue {
  value: string;
}

interface Cell {
  values: CellValue[];
}

interface Row {
  cells: Cell[];
}

export function useTableState() {
  const [columns, setColumns] = useState<string[]>(["Column 1"]);
  const [rows, setRows] = useState<Row[]>([
    { cells: [{ values: [{ value: "Cell Data" }] }] },
  ]);

  const addColumn = (columnName: string) => {
    setColumns([...columns, columnName]);
    setRows(
      rows.map((row) => ({
        ...row,
        cells: [...row.cells, { values: [{ value: "" }] }],
      }))
    );
  };

  const addRow = () => {
    const newRow: Row = {
      cells: columns.map(() => ({ values: [{ value: "" }] })),
    };
    setRows([...rows, newRow]);
  };

  const addCellValue = (rowIndex: number, cellIndex: number) => {
    const updatedRows = [...rows];
    if (updatedRows[rowIndex] && updatedRows[rowIndex].cells[cellIndex]) {
      updatedRows[rowIndex].cells[cellIndex].values.push({ value: "" });
      setRows(updatedRows);
    }
  };

  const deleteRow = (rowIndex: number) => {
    setRows(rows.filter((_, index) => index !== rowIndex));
  };

  const updateCellValue = (
    rowIndex: number,
    cellIndex: number,
    valueIndex: number,
    value: string
  ) => {
    const updatedRows = [...rows];
    if (updatedRows[rowIndex]?.cells[cellIndex]?.values[valueIndex]) {
      updatedRows[rowIndex].cells[cellIndex].values[valueIndex].value = value;
      setRows(updatedRows);
    }
  };

  const deleteCellValue = (
    rowIndex: number,
    cellIndex: number,
    valueIndex: number
  ) => {
    const updatedRows = [...rows];
    if (updatedRows[rowIndex]?.cells[cellIndex]?.values.length > 1) {
      updatedRows[rowIndex].cells[cellIndex].values.splice(valueIndex, 1);
      setRows(updatedRows);
    }
  };

  const getMaxCellCount = () => {
    return Math.max(...rows.map((row) => row.cells.length), 0);
  };

  return {
    columns,
    rows,
    addColumn,
    addRow,
    addCellValue,
    deleteRow,
    updateCellValue,
    deleteCellValue,
    getMaxCellCount,
  };
}
