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
    hookForm: UseFormReturn<any>;
    selectBoxName: string | number;
    ProductDetailsFieldName: string | number;
}

export type LandingDataStructure = {
  avalibles: {
    vendor: string;
    prices: {
      simulazione: {
        id: number;
        codice: string;
        dataCreazione: string;
        idUtente: number;
        spedizioni: {
          corriere: string;
          tariffCode: string;
          tariffLabel: string;
          capDestinatario: string;
          capMittente: string;
          codice: string;
          colli: {
            altezza: number;
            larghezza: number;
            profondita: number;
            peso: number;
          }[];
          comuneDestinatario: string;
          comuneMittente: string;
          consigneeAddressLine1: string;
          consigneeAddressLine2: string;
          consigneeAddressLine3: string;
          dataConsegnaPrevista: string;
          dataConsegnaPrevistaIT: string;
          dataRitiro: string;
          dataRitiroIT: string;
          id: number;
          iva: number;
          ivaEsclusa: string;
          nazioneDestinatario: string;
          nazioneMittente: string;
          numeroColli: number;
          provinciaDestinatario: string;
          provinciaMittente: string;
          senderAddressLine1: string;
          senderAddressLine2: string;
          senderAddressLine3: string;
          serviziAccessori: number;
          supplementoCarburante: number;
          tariffImage: string;
          tariffa: number;
          tariffaBase: number;
          violations: any[]; // اگر نوع دقیق violations مشخص باشد، جایگزین کنید.
        }[];
      };
    };
  }[];
} ;