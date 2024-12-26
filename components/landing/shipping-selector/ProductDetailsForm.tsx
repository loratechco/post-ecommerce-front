"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { memo, useEffect, useState } from "react";
import { Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { randomCodeGenerator } from "@/lib/randomGeneratCode";

interface Props {
  hookForm: UseFormReturn;
  selectBoxName: string;
  ProductDetailsFieldName: string | number;
}

type Box = {
  name: string | null;
  width: number | null; // inches
  length: number | null; // inches
  height: number | null; // inches
  volume: number | null; // cubic inches
};

const BOX_SIZE = [
  {
    name: "select product size",
    width: null, // inches
    length: null, // inches
    height: null, // inches
    volume: null, // cubic inches
    BoxIcon: null,
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

const generatUnicId = randomCodeGenerator(7);

const detailFields= [
  { id: `width`, label: "width" },
  { id: `length`, label: "length" },
  { id: `height`, label: "height" },
  { id: `volume`, label: "volume" },
  
];

function ProductDetailsForm({
  hookForm,
  selectBoxName,
  ProductDetailsFieldName = "",
}: Props) {
  const [itemValue, setItemValue] = useState<Box>({
    name: "Custom",
    width: null,
    length: null,
    height: null,
    volume: null,
  });

  const getSelectBoxValueItem = (value) => {
    setItemValue(
      (BOX_SIZE.find((item) => item?.name === value) as Box) || "value is null"
    );
  };

  useEffect(() => {
    if (itemValue) {
      [
        {
          name: `width${ProductDetailsFieldName}`,
          value: itemValue?.width || "",
        },
        {
          name: `length${ProductDetailsFieldName}`,
          value: itemValue?.length || "",
        },
        {
          name: `height${ProductDetailsFieldName}`,
          value: itemValue?.height || "",
        },
        {
          name: `volume${ProductDetailsFieldName}`,
          value: itemValue?.volume || "",
        },
      ]?.forEach(({ name, value }) => hookForm.setValue(name, value));
    }
  }, [itemValue, hookForm, ProductDetailsFieldName]);

  return (
    <div className="pt-9 pb-5 flex items-center justify-center max-lg:flex-col w-full h-fit gap-x-3 gap-y-5">
      <div className="w-2/6 max-lg:w-full">
        <Label className="block text-xs font-semibold mb-2 ms-0.5">
          Product Size
        </Label>

        <FormField
          control={hookForm?.control}
          name={selectBoxName}
          render={({ field }) => (
            <FormItem className="w-full">
              <Select
                onValueChange={(e) => {
                  field.onChange(e);
                  getSelectBoxValueItem(e);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-zinc-50 py-5 text-xs">
                    <SelectValue placeholder="select product size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BOX_SIZE?.map((selectTypes, index) => (
                    <SelectItem value={selectTypes?.name} key={index}>
                      <div className=" flex items-center justify-start gap-1">
                        <div>{selectTypes?.BoxIcon}</div>
                        <div className="">{selectTypes?.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div
        className={cn(
          "grid grid-cols-4 w-4/6 max-lg:w-full rounded-lg overflow-hidden *:flex *:flex-col ",
          itemValue?.height && "*:pointer-events-none *:select-none"
        )}
      >
        {detailFields?.map((field, index) => (
          <div key={field?.id ||  index}>
            <Label
              htmlFor={field.id}
              className="text-xs font-semibold mb-2 ms-0.5"
            >
              {field.label}
            </Label>
            <Input
              {...hookForm?.register(`${field.id}${ProductDetailsFieldName}`)}
              type="text"
              placeholder={field.label}
              id={field.id}
              className={cn(
                "input-primary bg-zinc-50 input-primary py-5 rounded-none border-zinc-400 text-[14px]",
                index === 0 && "rounded-l-lg",
                index === detailFields?.length - 1 && "rounded-r-lg"
              )}
              style={{ fontSize: "14px" }}
            />
          </div>
        ))}

      </div>
    </div>
  );
}

export default memo(ProductDetailsForm);
