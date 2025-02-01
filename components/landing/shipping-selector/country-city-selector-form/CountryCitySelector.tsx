/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Country } from "@/app/types/landing-types";
import Flag from "react-world-flags";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useMemo, useState } from "react";

interface CountryCitySelectorProps {
  countries: Country[];
  hookForm: any;
  countryName: string;
  cityName: string;
  cityData: {
    city_name: string;
    id: number;
    cap?: string;
    province?: string;
  }[];
  selectedCountry: (value: string) => void;
  getSearchCityValue: (searchValue: string) => void;
  disabled?: boolean;
}

const CountryCitySelector: React.FC<CountryCitySelectorProps> = ({
  countries,
  hookForm,
  countryName,
  cityName,
  cityData,
  selectedCountry,
  getSearchCityValue,
  disabled,
}) => {
  const countrieDataChecker = useMemo(() => {
    console.info(countries);
    return Object.entries(countries).length <= 0 || !countries
      ? null
      : countries;
  }, [countries]);

  const getCountriesSelected = ({ value }) => {
    const result = countrieDataChecker?.find(
      (countrie) => countrie?.name === value?.name
    );
    return result;
  };

  const [closeCountry, setCloseCountry] = useState(false);
  const [closeCity, setCloseCity] = useState(false);

  const [cityValue, setCityValue] = useState<string>("");
  const debounceValue = useDebounce(cityValue, 1500);
  useEffect(() => getSearchCityValue(debounceValue), [debounceValue]);

  const cityDataChecker = useMemo(() => {
    console.info(cityData);
    return Object.entries(cityData).length <= 0 || !cityData ? null : cityData;
  }, [cityData]);

  return (
    <div className="flex items-center justify-center w-full lg:w-1/2 rounded-lg overflow-hidden">
      {/* Country Selector */}
      <FormField
        control={hookForm?.control}
        name={countryName}
        render={({ field }) => (
          <FormItem className="w-1/2">
            <Popover
              open={closeCountry}
              onOpenChange={(isOpen) => setCloseCountry(isOpen)}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    onClick={() => setCloseCountry((perv) => !perv)}
                    variant="outline"
                    role="combobox"
                    data-muted={!field.value}
                    className="w-full flex justify-between py-5 rounded-none data-[muted=true]:text-muted-foreground max-sm:text-xs"
                  >
                    <div className="flex items-center justify-start gap-2 overflow-hidden">
                      <Flag
                        code={getCountriesSelected(field)?.code}
                        width={23}
                        height={23}
                      />
                      <p className=" overflow-hidden text-ellipsis">
                        {getCountriesSelected(field)?.name ||
                          "Select the country"}
                      </p>
                    </div>
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="max-w-56 sm:max-w-64 lg:max-w-56 p-0 z-10">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandList className="max-h-44   ">
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup className="">
                      {countrieDataChecker?.map((countrie) => (
                        <CommandItem
                          className="hover:!bg-zinc-200/70"
                          value={countrie.name}
                          key={countrie?.name}
                          onSelect={() => {
                            selectedCountry(countrie?.name);
                            hookForm.setValue(countryName, countrie);
                            setCloseCountry(false);
                          }}
                        >
                          <Flag code={countrie?.code} width={23} height={23} />
                          {countrie?.name}
                          <Check
                            data-active={countrie.name === field.value?.name}
                            className="ml-auto opacity-0  transition-opacity data-[active=true]:opacity-100"
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />

      {/* City Selector */}
      <FormField
        control={hookForm?.control}
        name={cityName}
        render={({ field }) => (
          <FormItem className="bg-zinc-300 flex flex-col w-1/2 ">
            <Popover
              open={closeCity}
              onOpenChange={(isOpen) => setCloseCity(isOpen)}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    onClick={() => setCloseCity((perv) => !perv)}
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    data-muted={!field.value}
                    className="w-full justify-between py-5 rounded-none data-[muted=true]:text-muted-foreground max-sm:text-xs"
                  >
                    <div className="overflow-hidden text-ellipsis">
                      {(!disabled && (
                        <>
                          <p className="text-start">
                            {cityDataChecker?.find(
                              (city) =>
                                city?.city_name === field.value?.city_name ||
                                city?.cap === field.value?.cap
                            )?.city_name || "Select the city"}
                          </p>
                          <div className="flex items-center justify-start gap-2">
                            <span className="text-xs text-zinc-500 block text-start">
                              {
                                cityDataChecker?.find(
                                  (city) =>
                                    city?.city_name ===
                                      field.value?.city_name ||
                                    city?.cap === field.value?.cap
                                )?.cap
                              }
                            </span>
                            <span className="text-xs text-zinc-500 block text-start">
                              {
                                cityDataChecker?.find(
                                  (city) =>
                                    city?.city_name === field.value?.city_name
                                )?.province
                              }
                            </span>
                          </div>
                        </>
                      )) ||
                        "Select the city"}
                    </div>

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="max-w-56 sm:max-w-64 lg:max-w-56 p-0 z-10">
                <Command>
                  <CommandInput
                    placeholder="Search language..."
                    onValueChange={(value) => {
                      setCityValue(value);
                      console.info(field.value, cityDataChecker);
                    }}
                  />
                  <CommandList className="max-h-48">
                    <CommandEmpty>No city found.</CommandEmpty>

                    <CommandGroup className="">
                      {cityDataChecker?.map((city, key) => (
                        <CommandItem
                          className="hover:!bg-zinc-200/70"
                          value={`${city?.city_name} ${city?.cap}`}
                          key={city?.city_name + String(key)}
                          onSelect={() => {
                            hookForm.setValue(cityName, disabled ? "" : city);
                            setCloseCity(false);
                          }}
                        >
                          <p>{city?.city_name}</p>
                          <span className="text-zinc-500 text-xs">
                            {city?.cap}
                          </span>
                          <span className="text-zinc-500 text-xs">
                            {city?.province}
                          </span>
                          <Check
                            data-active={city?.city_name === field?.value}
                            className="ml-auto opacity-0 transition-opacity data-[active=true]:opacity-100"
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CountryCitySelector;
