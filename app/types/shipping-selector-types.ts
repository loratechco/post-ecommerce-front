import { UseFormReturn } from "react-hook-form";

export type Country = {
  enabled: string;
  code: string;
  name: string;
  EU: boolean;
  notes: string | null;
};

export type DataStructureCountry = {
  origin_countries: Country[] | null;
  destination_countries: Country[] | null;
};

export type ProductDetailFormType = {
    hookForm: UseFormReturn;
    selectBoxName: string;
    ProductDetailsFieldName: string | number;
}