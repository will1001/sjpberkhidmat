import { Children } from "react";

export const customStyles = {
  rows: {
    style: {
      minHeight: "56px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      background: "#374151",
      color: "white",
      width: "screen  ",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

export const conditionalRowStyles = [
  {
    when: (row) => row.id % 2 != 0,
    style: {
      background: "#F9FAFB",
    },
  },
  {
    when: (row) => row.id % 2 == 0,
    style: {
      background: "#FFFFFF",
    },
  },
];
