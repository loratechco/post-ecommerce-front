import getToken from "@/lib/auth/getSession";
import "../components/landing/landing.module.css";
import { SelectBox } from "@/components/landing/shipping-selector/ShippingSelector";

const getCountryData = async () => {
  try {
    const data = await fetch("https://www.spedire.com/api/environment", {
      cache: "force-cache",
    });
    return { res: await data.json() };
  } catch (error) {
    console.error("country data has a problem");
    return { res: null };
  }
};

import { DataStructureCountry } from "@/app/types/shipping-selector-types";

export default async function Page() {
  const { token } = JSON.parse((await getToken()) as string);
  const { res } = await getCountryData();

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SelectBox token={token} countrysData={res as DataStructureCountry} />
    </div>
  );
}
