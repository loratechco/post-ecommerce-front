 
import { Box, PenLine } from "lucide-react";
export const BOX_SIZE = [
  {
    name: "Select product size",
    width: null, // inches
    length: null, // inches
    height: null, // inches
    volume: null, // cubic inches
    BoxIcon: <PenLine size={18}/>,
  },
  {
    name: "Small",
    width: 5.4375, // inches
    length: 8.6875, // inches
    height: 1.75, // inches
    volume: 5.4375 * 8.6875 * 1.75, // cubic inches
    BoxIcon: <Box size={16} />,
  },
  {
    name: "Medium",
    width: 8.75, // inches
    length: 11.25, // inches
    height: 6, // inches
    volume: 8.75 * 11.25 * 6, // cubic inches
    BoxIcon: <Box size={18} />,
  },
  {
    name: "Large",
    width: 12, // inches
    length: 14, // inches
    height: 3.5, // inches
    volume: 12 * 14 * 3.5, // cubic inches
    BoxIcon: <Box size={20} />,
  },
  {
    name: "Extra Large",
    width: 12.25, // inches
    length: 12.25, // inches
    height: 6, // inches
    volume: 12.25 * 12.25 * 6, // cubic inches
    BoxIcon: <Box size={22} />,
  },
];

  export type BoxSizeType = {
    name: string | null;
    width: number | null; // inches
    length: number | null; // inches
    height: number | null; // inches
    volume: number | null; // cubic inches
  };