import { Box, PenLine } from "lucide-react";
export  const BOX_SIZE = [
  {
    name: "Select product size",
    height: null, // inches
    length: null, // inches
    realWeight: null, // pounds
    depth: null, // cubic inches
    BoxIcon: <PenLine size={18} />,
  },
  {
    name: "Small",
    height: 8, // inches
    length: 15, // inches
    realWeight: 1, // pounds
    depth: 15, // cubic inches (manually set)
    BoxIcon: <Box size={16} />,
  },
  {
    name: "Medium",
    height: 8.75, // inches
    length: 11.25, // inches
    realWeight: 6, // pounds
    depth: 20, // cubic inches (manually set)
    BoxIcon: <Box size={18} />,
  },
  {
    name: "Large",
    height: 12, // inches
    length: 14, // inches
    realWeight: 3.5, // pounds
    depth: 30, // cubic inches (manually set)
    BoxIcon: <Box size={20} />,
  },
  {
    name: "Extra Large",
    height: 12.25, // inches
    length: 12.25, // inches
    realWeight: 6, // pounds
    depth: 40, // cubic inches (manually set)
    BoxIcon: <Box size={22} />,
  },
];



export type BoxSizeType = {
  name: string | null;
  height: number | null; // inches
  length: number | null; // inches
  realWeight: number | null; // inches
  depth: number | null; // cubic inches
};
