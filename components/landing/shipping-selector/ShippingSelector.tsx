"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CountryCitySelector from "./CountryCitySelector";
import ProductDetailsForm from "./product-details-form/ProductDetailsForm";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { API_Backend, useGEt } from "@/hooks/use-fetch";
import axios from "axios";
import { DataStructureCountry,Country ,ProductDetailFormType} from "../../../app/types/shipping-selector-types";

const getData = async () => {
  try {
    const { data } = await axios.post(
      `${API_Backend}/api/providers/getavailibilities`
    );
    console.info(data);
  } catch (error) {
    console.info(error?.response, "This Pure Error=>>>>>>>", error);
  }
};

export function SelectBox({
  token,
  countrysData,
}: {
  token: string;
  countrysData: DataStructureCountry;
}) {
  const form = useForm();
  getData();
  const [saveData, setData] = useState<ProductDetailFormType[]>([]);
  const [dataOriginDestinationCountries, setDataOriginDestinationCountries] =
    useState<DataStructureCountry>({
      origin_countries: [],
      destination_countries: [],
    });

  useEffect(() => {
    if (!countrysData || Object.entries(countrysData)?.length <= 0) return;
    setDataOriginDestinationCountries({
      origin_countries: countrysData?.destination_countries || null,
      destination_countries: countrysData?.origin_countries || null,
    });

    console.info(countrysData);
  }, [countrysData]);

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

  const deleteHandlerdetailfieldsComponent = (items: ProductDetailFormType) => {
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
                countries={dataOriginDestinationCountries?.origin_countries as Country[]}
                hookForm={form}
                countryName="country-origin"
                cityName="city-origin"
              />
              <CountryCitySelector
                cityData={["Tehran", "Shiraz", "Isfahan", "Tabriz", "Mashhad"]}
                countries={dataOriginDestinationCountries?.destination_countries  as Country[]}
                hookForm={form}
                countryName="country-destination"
                cityName="city-destination "
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
