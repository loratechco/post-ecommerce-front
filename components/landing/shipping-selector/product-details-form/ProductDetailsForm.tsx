"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormControl, FormField, FormItem } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { memo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

import { BOX_SIZE, BoxSizeType } from "./productBoxSize";
import { PenLine } from "lucide-react";
import { ProductDetailFormType } from '@/app/types/landing-types'

const detailFields = [
  { id: `height`, label: "Height" },
  { id: `length`, label: "Length" },
  { id: `realWeight`, label: "RealWeight" },
  { id: `depth`, label: "Depth" },
];
interface Props {
  disableFieldTitles?: boolean;
}
function ProductDetailsForm({
  hookForm,
  selectBoxName,
  ProductDetailsFieldName = "",
  disableFieldTitles = false,
}: Props & ProductDetailFormType) {
  const [itemValue, setItemValue] = useState<BoxSizeType>({
    name: "select product size",
    height: null,
    length: null,
    depth: null,
    realWeight: null,
  });

  useEffect(() => {
    if (itemValue) {
      [
        {
          name: `height${ProductDetailsFieldName}`,
          value: itemValue?.height || "",
        },
        {
          name: `length${ProductDetailsFieldName}`,
          value: itemValue?.length || "",
        },
        {
          name: `realWeight${ProductDetailsFieldName}`,
          value: itemValue?.realWeight || "",
        },
        {
          name: `depth${ProductDetailsFieldName}`,
          value: itemValue?.depth || "",
        },
      ]?.forEach(({ name, value }) => hookForm.setValue(name, value));
    }
  }, [itemValue, hookForm, ProductDetailsFieldName]);

  return (
    <div className="flex items-center justify-center max-lg:flex-col w-full h-fit gap-x-3 gap-y-5 ">
      <div className="w-2/6 max-lg:w-full">
        <Label className="block text-xs font-semibold mb-2 ms-0.5">
          Product Size
        </Label>

        <FormField
          control={hookForm?.control}
          name={`product-${String(selectBoxName)}`}
          render={({ field }) => (
            <FormItem className="w-full">
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setItemValue(
                    (BOX_SIZE?.find(
                      (item) => item?.name === value
                    ) as BoxSizeType) || "value is null" as unknown as null
                  );
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-zinc-50 py-5">
                    <SelectValue
                      placeholder={
                        <div className="flex items-center gap-2">
                          <PenLine size={18} />
                          <span>Select product size</span>
                        </div>
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent >
                  {BOX_SIZE?.map((selectTypes, index) => (
                    <SelectItem className="hover:!bg-zinc-200/70" value={selectTypes?.name} key={index}>
                      <div className=" flex items-center justify-start gap-2">
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
          <div key={field?.id || index}>
            <Label
              className={cn(
                "text-xs font-semibold mb-2 ms-0.5",
                disableFieldTitles && "max-lg:hidden"
              )}
            >
              {field.label}
            </Label>
            <Input
              {...hookForm?.register(`${field.id}${ProductDetailsFieldName}`)}
              type="text"
              placeholder={field.label}
              id={field.id}
              className={cn(
                "input-primary bg-zinc-50 input-primary py-5 rounded-none border-zinc-400 text-[14px] max-sm:placeholder:text-xs",
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
