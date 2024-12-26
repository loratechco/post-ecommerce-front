"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";


const originAndDestinationStructure = {
  fieldsOrigin: {
    countryOrigin: {
      name: "country-origin",
      lable: "Country of Origin",
      placeholder: "Select the country of origin",
    },
    cityOrigin: {
      name: "city-origin",
      lable: "City of Origin",
      placeholder: "Select the city of origin",
    },
  },

  fieldDestination: {
    countryDestination: {
      name: "country-destination",
      lable: "Country of Destination",
      placeholder: "Select the destination country",
    },
    cityDestination: {
      name: "city-destination",
      lable: "City of Destination",
      placeholder: "Select the destination city",
    },
  },
};

interface CountryCitySelectorProps {
    countries: { name: string; flag: string }[];
    hookForm: any; // می‌توانید نوع دقیق‌تر برای `hookForm` تعریف کنید
    countryName: string;
    cityName: string;
    countryPlaceholder: string;
    cityPlaceholder: string;
    cityData: string[];
  }

  const CountryCitySelector: React.FC<CountryCitySelectorProps> = ({
    countries,
    hookForm,
    countryName,
    cityName,
    countryPlaceholder,
    cityPlaceholder,
    cityData
  }) => {
    return (
      <div className="flex items-center justify-center w-full lg:w-1/2 rounded-lg overflow-hidden">
        {/* Country Selector */}
        <FormField
          control={hookForm?.control}
          name={countryName}
          render={({ field }) => (
            <FormItem className="w-1/2 bg-zinc-300">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:!ring-0 rounded-none bg-zinc-50 py-5">
                    <SelectValue placeholder={countryPlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country, index) => (
                    <SelectItem
                      value={country.name}
                      key={index}
                    >{`${country.flag} ${country.name}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
  
        {/* City Selector */}
        <FormField
          control={hookForm?.control}
          name={cityName}
          render={({ field }) => (
            <FormItem className="bg-zinc-300 w-1/2">
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:!ring-0 rounded-none bg-zinc-50 py-5">
                    <SelectValue placeholder={cityPlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cityData?.map((cityItems, index) => (
                    <SelectItem
                      value={cityItems}
                      key={index}
                    >cityItems</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
    );
  };
  
  export default CountryCitySelector;
