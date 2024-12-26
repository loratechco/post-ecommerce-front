"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CountryCitySelector from "./CountryCitySelector";
import InputNumber from "@/app/dashboard/components/input-number";
import ProductDetailsForm from "./ProductDetailsForm";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

// test data

const countries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "China", flag: "🇨🇳" },
  { name: "India", flag: "🇮🇳" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Peru", flag: "🇵🇪" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Iran", flag: "🇮🇷" },
  { name: "Iraq", flag: "🇮🇶" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Finland", flag: "🇫🇮" },
];

export function SelectBox() {
  const form = useForm();

  let addNewProductDetailsFormComponentArray = [];
  const [addProductDetailsForm, setAddProductDetailsForm] = useState(null);

  function onSubmit(data) {
    console.info(data);
  };
  const addNewProductDetailsFormComponentFunc = () => {
    console.log('hi');
  };

  return (
    <div className="p-5 shadow-md rounded-lg bg-zinc-300 w-2/3 max-md:w-11/12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full">
            <h2 className=" font-bold text-start pb-3 ps-1">
              Shipping Selector
            </h2>
            <div className="flex items-center justify-center max-lg:flex-col gap-5">
              <CountryCitySelector
                cityData={["Tehran", "Shiraz", "Isfahan", "Tabriz", "Mashhad"]}
                countries={countries}
                hookForm={form}
                countryName="country-origin"
                countryPlaceholder="Select the country of origin"
                cityName="city-origin"
                cityPlaceholder="Select the city of origin"
              />
              <CountryCitySelector
                cityData={["Tehran", "Shiraz", "Isfahan", "Tabriz", "Mashhad"]}
                countries={countries}
                hookForm={form}
                countryName="country-origin"
                countryPlaceholder="Select the country of origin"
                cityName="city-origin"
                cityPlaceholder="Select the city of origin"
              />
            </div>
          </div>

          <div className="flex items-center justify-center max-lg:flex-col lg:gap-3 w-full">

            <ProductDetailsForm
              hookForm={form}
              selectBoxName={"type-product"}
              ProductDetailsFieldName={1}
            />

            <div className="max-lg:w-full w-auto max-lg:pb-7  lg:mt-10">
              <Button
              onClick={addNewProductDetailsFormComponentFunc}
                variant={"outline"}
                type="button"
                className="text-xs px-2 py-[1.19rem]"
              >
                <PlusIcon className="inline" size={20} />
                <span>Add Package</span>
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full py-5">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
