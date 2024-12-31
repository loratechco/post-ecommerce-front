"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CountryCitySelector from "./CountryCitySelector";
import ProductDetailsForm from "./product-details-form/ProductDetailsForm";
import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useReducer, useState } from "react";
import {
  DataStructureCountry,
  Country,
  ProductDetailFormType,
} from "@/app/types/shipping-selector-types";
import { randomCodeGenerator } from "@/lib/randomGeneratCode";
import TooltipPrimary from "@/components/toolltip-primary";
import {
  citySearchReducer,
  initialCitySearchState,
} from "./search-citys-reducer";
import useSearchCitysLogic from "./use-search-citys-logic";
type GetCitys = { city_name: string; id: number };

export function SelectBox({
  token,
  countrysData,
}: {
  token: string;
  countrysData: DataStructureCountry;
}) {
  const form = useForm();

  const [addNewComponent, setAddNewComponent] = useState<
    (ProductDetailFormType & { key: string | number })[]
  >([]);

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

  const addNewProductDetailsFormComponentHandler = () => {
    const randomKey = randomCodeGenerator(3);
    console.log("hi");
    if (addNewComponent?.length >= 1) return;
    setAddNewComponent((prev) => [
      ...prev,
      {
        key: randomKey,
        hookForm: form,
        ProductDetailsFieldName: prev.length + 1,
        selectBoxName: prev.length + 1,
      },
    ]);
  };

  const deleteHandlerdetailfieldsComponent = (items: ProductDetailFormType) => {
    const filterRemoveItem = addNewComponent?.filter(
      (filterItem) => filterItem?.selectBoxName !== items?.selectBoxName
    );
    ["width", "length", "height", "volume"]?.forEach((staticKey) =>
      form.unregister(`${staticKey}${items?.selectBoxName}`)
    );
    setAddNewComponent(filterRemoveItem);
  };

  const [citySearchData, dispatch] = useReducer(
    citySearchReducer,
    initialCitySearchState
  );

  const [originCityData, setOriginCityData] = useState<GetCitys[]>(null);
  const [destinationCityData, setDestinationCityData] =
    useState<GetCitys[]>(null);

  useSearchCitysLogic({
    citySearchData,
    setOriginCityData,
    setDestinationCityData,
  });

  console.info(citySearchData);

  return (
    <div className="p-5 shadow-md rounded-lg bg-sky-50 w-3/4 max-md:w-11/12 relative">
      <div className="w-full flex justify-center items-center">
        <Link href={"#"} className="block">
          <span className="block -translate-y-8 h-fit max-md:text-sm max-sm:text-xs text-nowrap max-sm:px-1 bg-secondery-color hover:bg-amber-500 transition-colors duration-150 px-3 py-0.5   rounded-md text-white">
            Do you do a lot of shipping? Discover SPEDIREPRO
          </span>
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full">
            <h2 className=" font-bold text-start pb-3 ps-1">
              Shipping Selector
            </h2>
            <div className="flex items-center justify-center max-lg:flex-col gap-3">
              <CountryCitySelector
                getSearchCityValue={(value) =>
                  dispatch({ type: "SET_ORIGIN_CITY", payload: value })
                }
                countries={
                  dataOriginDestinationCountries?.origin_countries as Country[]
                }
                hookForm={form}
                countryName="country-origin"
                cityData={originCityData}
                cityName="city-origin"
              />

              <CountryCitySelector
                getSearchCityValue={(value) =>
                  dispatch({ type: "SET_DESTINATION_CITY", payload: value })
                }
                cityData={destinationCityData}
                countries={
                  dataOriginDestinationCountries?.destination_countries as Country[]
                }
                hookForm={form}
                countryName="country-destination"
                cityName="city-destination "
              />
            </div>
          </div>

          <div className="w-full space-y-5 pt-5">
            <ProductDetailsForm
              hookForm={form}
              selectBoxName={"first-type-product"}
              ProductDetailsFieldName={"-first-item"}
            />

            {addNewComponent?.map((items) => (
              <div className="max-md:hidden" key={items?.key}>
                <ProductDetailsForm
                  disableFieldTitles={true}
                  hookForm={items?.hookForm}
                  ProductDetailsFieldName={items?.ProductDetailsFieldName}
                  selectBoxName={String(items?.selectBoxName)}
                  key={`${items?.key}-${String(items?.selectBoxName)}`}
                />

                <button
                  className="text-xs block text-red-600 p-0 ps-1 font-semibold pt-2"
                  onClick={() => deleteHandlerdetailfieldsComponent(items)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="w-full pt-3 lg:pt-5 flex items-center justify-start gap-3 max-md:hidden max-md:pointer-events-none max-md:select-none">
              <TooltipPrimary
                content={
                  addNewComponent?.length >= 1
                    ? "Adding more load is not allowed"
                    : "You can add a load"
                }
                classNameTooltipContent="bg-zinc-100 border border-zinc-300"
              >
                <span>
                  <Button
                    onClick={addNewProductDetailsFormComponentHandler}
                    variant={"outline"}
                    type="button"
                    className="text-xs px-2 py-[1.19rem]  disabled:!opacity-60 "
                    disabled={addNewComponent?.length >= 1}
                  >
                    <PlusIcon size={20} />
                    <span>Add Package</span>
                  </Button>
                </span>
              </TooltipPrimary>
            </div>
          </div>

          <Button type="submit" className="w-full py-5 mt-7">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
