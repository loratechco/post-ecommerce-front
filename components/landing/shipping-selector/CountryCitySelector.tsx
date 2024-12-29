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
const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;
import {
  DataStructureCountry,
  Country,
  ProductDetailFormType,
} from "@/app/types/shipping-selector-types";
import Flag from "react-world-flags";
interface CountryCitySelectorProps {
  countries: Country[];
  hookForm: any;
  countryName: string;
  cityName: string;
  cityData: string[];
}

const CountryCitySelector: React.FC<CountryCitySelectorProps> = ({
  countries,
  hookForm,
  countryName,
  cityName,
  cityData,
}) => {
  const getCountriesSelected = ({ value }) => {
    const result = countries.find((countrie) => countrie.name === value);
    return result;
  };

  return (
    <div className="flex items-center justify-center w-full lg:w-1/2 rounded-lg overflow-hidden">
      {/* Country Selector */}
      <FormField
        control={hookForm?.control}
        name={countryName}
        render={({ field }) => (
          <FormItem className="w-1/2">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
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
              <PopoverContent className="max-w-56 sm:max-w-64 lg:max-w-56">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandList>
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup className="">
                      {countries.map((countrie) => (
                        <CommandItem
                          className="hover:!bg-zinc-200/70"
                          value={countrie.name}
                          key={countrie?.name}
                          onSelect={() => {
                            hookForm.setValue(countryName, countrie.name);
                          }}
                        >
                          <Flag code={countrie?.code} width={23} height={23} />
                          {countrie.name}
                          <Check
                            data-active={countrie.name === field.value}
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
          <FormItem className="bg-zinc-300 flex flex-col w-1/2">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    data-muted={!field.value}
                    className="w-full justify-between py-5 rounded-none data-[muted=true]:text-muted-foreground max-sm:text-xs"
                  >
                   <div className="overflow-hidden text-ellipsis">
                   {languages.find((city) => city.value === field.value)
                      ?.label || "Select the city"}
                   </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="max-w-56 sm:max-w-64 lg:max-w-56 p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandList>
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          className="hover:!bg-zinc-200/70"
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            hookForm.setValue(cityName, language.value);
                          }}
                        >
                          {language.label}
                          <Check
                            data-active={language.value === field.value}
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
    </div>
  );
};

export default CountryCitySelector;
