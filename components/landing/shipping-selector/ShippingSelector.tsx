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
import { PlusIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { API_Backend, useGEt } from "@/hooks/use-fetch";
import axios from "axios";

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

type AddProductDetailsForm = {
  hookForm: any;
  selectBoxName: string | number;
  ProductDetailsFieldName: string | number;
};

const getData = async () =>{
  try {
    const {data}= await axios.post(`${API_Backend}/api/providers/getavailibilities`);
    console.info(data);
  } catch (error) {
    console.info(error?.response , 'This Pure Error=>>>>>>>',error);
  }
}


export function SelectBox({ token }: { token: string }) {
  const form = useForm();

  getData()

  const [saveData, setData] = useState<AddProductDetailsForm[]>([]);

  function onSubmit(data) {
    console.info(data);
  }
  const addNewProductDetailsFormComponent = () => {
    console.log("hi");
    if (saveData?.length >= 3) return;
    setData((prev) => [
      ...prev,
      {
        hookForm: () => form,
        ProductDetailsFieldName: prev.length + 1,
        selectBoxName: prev.length + 1,
      },
    ]);
  };

  const deleteHandlerdetailfieldsComponent = (items: AddProductDetailsForm) => {
    const filterRemoveItem = saveData?.filter(
      (filterItem) => filterItem?.selectBoxName !== items?.selectBoxName
    );
    ["width", "length", "height", "volume"]?.forEach((staticKey) =>
      form.unregister(`${staticKey}${items?.selectBoxName}`)
    );
    setData(filterRemoveItem);
  };

  return (
    <div className="p-5 shadow-md rounded-lg bg-zinc-300 w-2/3 max-md:w-11/12 ">
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

          <div className="w-full space-y-5 pt-3">
            <ProductDetailsForm
              hookForm={form}
              selectBoxName={"first-type-product"}
              ProductDetailsFieldName={"-first-item"}
            />

            {saveData?.map((items) => (
              <div className="">
                <ProductDetailsForm
                  disableFieldTitles={true}
                  hookForm={items?.hookForm()}
                  ProductDetailsFieldName={items?.ProductDetailsFieldName}
                  selectBoxName={String(items?.selectBoxName)}
                  key={items?.selectBoxName}
                />

                <button
                  className="text-xs block text-red-600 p-0 ps-1 font-semibold pt-2"
                  onClick={() => deleteHandlerdetailfieldsComponent(items)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="w-full pb-7 flex items-center justify-start gap-3">
              <Button
                onClick={addNewProductDetailsFormComponent}
                variant={"outline"}
                type="button"
                className="text-xs px-2 py-[1.19rem]"
              >
                <PlusIcon size={20} />
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
