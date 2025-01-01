import { Box, PenLine } from "lucide-react";
export const BOX_SIZE = [
  {
    name: "Select product size",
    height: null, // inches
    length: null, // inches
    realWeight: null, // inches
    depth: null, // cubic inches
    BoxIcon: <PenLine size={18} />,
  },
  {
    name: "Small",
    height: 5.4375, // inches
    length: 8.6875, // inches
    realWeight: 1.75, // inches
    depth: 5.4375 * 8.6875 * 1.75, // cubic inches
    BoxIcon: <Box size={16} />,
  },
  {
    name: "Medium",
    height: 8.75, // inches
    length: 11.25, // inches
    realWeight: 6, // inches
    depth: 8.75 * 11.25 * 6, // cubic inches
    BoxIcon: <Box size={18} />,
  },
  {
    name: "Large",
    height: 12, // inches
    length: 14, // inches
    realWeight: 3.5, // inches
    depth: 12 * 14 * 3.5, // cubic inches
    BoxIcon: <Box size={20} />,
  },
  {
    name: "Extra Large",
    height: 12.25, // inches
    length: 12.25, // inches
    realWeight: 6, // inches
    depth: 12.25 * 12.25 * 6, // cubic inches
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
