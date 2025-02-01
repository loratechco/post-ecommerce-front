/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ProductDetailsForm from "./product-details-form/ProductDetailsForm";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useReducer, useState } from "react";
import {
  DataStructureCountry,
  ProductDetailFormType,
} from "@/app/types/landing-types";
import { randomCodeGenerator } from "@/lib/randomGeneratCode";
import TooltipPrimary from "@/components/toolltip-primary";
import {
  citySearchReducer,
  initialCitySearchState,
} from "./country-city-selector-form/search-citys-reducer";
import useSearchCitysLogic from "./use-search-citys-logic";
import { API_Backend } from "@/hooks/use-fetch";
import axios from "axios";
import CounterySitySelectorListItems from "./country-city-selector-form/country-city-selector-list-items";
import { useRouter } from "next/navigation";

export function SelectBox({
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

  const addNewProductDetailsFormComponentHandler = () => {
    const randomKey = randomCodeGenerator(3);
    if (addNewComponent?.length >= 2) return;
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

  const deleteHandlerDetailFieldsComponent = (items: ProductDetailFormType) => {
    const filterRemoveItem = addNewComponent?.filter(
      (filterItem) => filterItem?.selectBoxName !== items?.selectBoxName
    );
    ["height", "length", "depth", "realWeight"]?.forEach((staticKey) => {
      form.unregister(`${staticKey}-item-${items?.selectBoxName}`);
    });

    form.unregister(`product-${items?.selectBoxName}`);
    setAddNewComponent(filterRemoveItem);
  };

  //search citys handler
  const [citySearchData, dispatch] = useReducer(
    citySearchReducer,
    initialCitySearchState
  );
  useSearchCitysLogic({
    citySearchData,
    dispatch,
  });

  const router = useRouter();

  const onSubmit = useCallback(async (data: Record<string, any>) => {
    let capOrigin = null;
    let capDestination = null;
    if (
      data?.countryOrigin?.name?.toLowerCase()?.includes("italia") &
      data?.countryDestination?.name?.toLowerCase()?.includes("italia")
    ) {
      capOrigin = data?.cityOrigin?.cap;
      capDestination = data?.cityDestination?.cap;
    }

    const staticData = {
      nazioneMittente: data?.countryOrigin?.code ?? "",
      nazioneDestinatario: data?.countryDestination?.code ?? "",
      capMittente: capOrigin ?? "",
      cittaMittente: data?.cityOrigin?.city_name ?? "",
      // provinciaMittente: data?.cityOrigin?.province ?? "",
      capDestinatario: capDestination ?? "",
      cittaDestinatario: data?.cityDestination?.city_name ?? "",
      // provinciaDestinatario: data?.cityDestination?.province ?? "",
    };

    const keysData = ["height", "width", "depth", "realWeight", "product"];

    const mapKey = (key: string) =>
      key
        .replace(/-(item-\d+)$/, "") 
        .replace(/height/, "altezza")
        .replace(/width/, "larghezza")
        .replace(/depth/, "profondita")
        .replace(/realWeight/, "pesoReale")
        .replace(/product/, "packagingType");

    if (!keysData.some((key) => data.hasOwnProperty(`${key}-item-0`))) {
      console.error(
        "Missing data for item-0. Ensure the data starts with item-0."
      );
      return;
    }

    const groupedData = Object.entries(data)
      .filter(([key]) => keysData.some((k) => key.includes(k)))
      .reduce<Record<string, Record<string, any>>>((acc, [key, value]) => {
        const match = key.match(/item-(\d+)$/);
        if (match) {
          const groupIndex = match[1];
          if (!acc[groupIndex]) acc[groupIndex] = {};
          acc[groupIndex][mapKey(key)] = value;
        }
        return acc;
      }, {});

    const colliArray = Object.keys(groupedData)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => groupedData[key]);

    const finalData = {
      ...staticData,
      colli: colliArray.map((item) => ({
        ...item,
        larghezza: item?.larghezza ?? 15, 
        packagingType: item?.packagingType ?? 0, 
      })),
    };

    toast({
      title: "Due to the disabled APIs, this section is displayed as a demo",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(finalData, null, 2)}</code>
        </pre>
      ),
    })

    try {
      const res = await axios.post(
        `${API_Backend}/api/providers/getavailibilities`,
        finalData
      );
      const checkData =
        res?.data?.avalibles?.[0]?.prices?.simulazione?.spedizioni?.find(
          (item) => item || null
        );

      if (!res?.data || !checkData || res?.data?.avalibles?.length <= 0) {
        toast({
          title: "Unsuccessful",
          description: "There is no service",
          className: "toaster-errors",
        });
      } else {
        localStorage.setItem("landing-data", JSON.stringify(res?.data));
        router.push("/shipping-options");
      }
    } catch (error) {
      console.error("error=>>>>", error);
    }
  }, []);

  return (
    <div className="p-5 shadow-md rounded-lg bg-white w-3/4 max-md:w-11/12 relative">
      <div className="w-full flex justify-center items-center">
        <span className="block -translate-y-8 h-fit max-md:text-sm max-sm:text-xs text-nowrap max-sm:px-1 bg-secondery-color hover:bg-amber-500 transition-colors duration-150 px-3 py-0.5   rounded-md text-white">
          <Link href={"#"} className="px-1 max-sm:px-0.5">
            Do you do a lot of shipping? Discover SPEDIREPRO
          </Link>
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full">
            <h2 className=" font-bold text-start pb-3 ps-1">
              Shipping Selector
            </h2>

            <CounterySitySelectorListItems
              citySearchData={citySearchData}
              dataOriginDestinationCountries={dataOriginDestinationCountries}
              dispatch={dispatch}
              form={form}
            />
          </div>

          <div className="w-full space-y-5 pt-5">
            {/* init fields */}
            <ProductDetailsForm
              hookForm={form}
              selectBoxName={"0"}
              ProductDetailsFieldName={"-item-0"}
            />

            {addNewComponent?.map((items) => (
              <div  key={items?.key}>
                <ProductDetailsForm
                  disableFieldTitles={true}
                  hookForm={items?.hookForm}
                  ProductDetailsFieldName={
                    "-item-" + items?.ProductDetailsFieldName
                  }
                  selectBoxName={String(items?.selectBoxName)}
                  key={`${items?.key}-${String(items?.selectBoxName)}`}
                />

                <button
                  className="text-xs block text-red-600 p-0 ps-1 font-semibold pt-2"
                  onClick={() => deleteHandlerDetailFieldsComponent(items)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="w-full pt-3 lg:pt-5 flex items-center justify-start gap-3">
              <TooltipPrimary
                content={
                  addNewComponent?.length >= 2
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
                    disabled={addNewComponent?.length >= 2}
                  >
                    <PlusIcon size={20} />
                    <span>Add Package</span>
                  </Button>
                </span>
              </TooltipPrimary>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-5 mt-7 flex items-center justify-center bg-secondary hover:bg-secondary/90 transition-colors duration-150 text-zinc-50 font-semibold"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <LoaderCircleIcon
                width={20}
                height={20}
                className="animate-spin size-10 mx-0.5"
              />
            )}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
