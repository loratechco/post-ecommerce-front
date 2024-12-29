import getToken from "@/lib/auth/getSession";
import "@/components/landing/landing.module.css";
import { SelectBox } from "@/components/landing/shipping-selector/ShippingSelector";
import { DataStructureCountry } from "@/app/types/shipping-selector-types";
import { Navbar } from "@/components/layout/header/Navbar";
import Image from "next/image";
import HeaderAndSidBar from "@/components/layout/header/header-sidbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const steps = [
  {
    title: "Compare",
    description:
      "Create your shipment online and compare quotes from Spedire's carriers.",
    icon: "/pic/compare(1).png",
  },
  {
    title: "Choose",
    description:
      "Select the most affordable rates and exclusive services from Spedire to ensure safe shipping.",
    icon: "", // Replace with the actual icon or class name for the icon
  },
  {
    title: "Prepare Your Package",
    description:
      "Pack your parcel, print the label, and attach it so it's clearly visible. Easy, right?",
    icon: "", // Replace with the actual icon or class name for the icon
  },
  {
    title: "Hand Over Your Package",
    description:
      "Wait for the courier at home, or drop off your package at a Spedire Point if you prefer.",
    icon: "", // Replace with the actual icon or class name for the icon
  },
  {
    title: "Track Your Shipment",
    description:
      "Use Spedire's tracking to monitor your shipment's status at any time.",
    icon: "", // Replace with the actual icon or class name for the icon
  },
];

export default async function Page() {
  const { token } = JSON.parse((await getToken()) as string);
  const { res } = await getCountryData();

  return (
    <section className=" bg-zinc-200 relative z-0">
      <HeaderAndSidBar />
      <section className="w-full flex items-center justify-center  relative">
        <div className=" absolute top-0 left-0 -z-10 overflow-hidden size-full bg-sky-500">
          <Image
            src="/pic/freepik__candid-image-photography-natural-textures-highly-r__77571.jpeg"
            alt="delivery-ship"
            fill
            className="object-cover z-10  max-lg:hidden"
            priority={true}
            quality={100}
          />
          <span className="block bg-black/25 absolute top-0 left-0 size-full z-20 max-lg:hidden"></span>
        </div>

        <div className=" flex items-center justify-center flex-col gap-12 pt-28 lg:pt-48 pb-12 w-full">
          <div className="space-y-5 text-center text-white">
            <h1 className="text-3xl lg:text-5xl font-semibold">
              Shipping parcels all over the world
            </h1>
            <h2 className="text-xl lg:text-2xl">
              Send parcels to Italy and across the globe at unbeatable rates!
            </h2>
          </div>
          <SelectBox token={token} countrysData={res as DataStructureCountry} />
        </div>
      </section>

      <section className="container text-center mx-auto pt-12 space-y-5">
        <h2 className="text-3xl max-lg:text-xl">
          Online shipping? It's very simple on Spedire.com
        </h2>
        <p className="">
          To ship online throughout Italy or abroad you need a PC or Smartphone
          with an Internet connection and a printer. Nothing more!
        </p>

        <div className="mt-5 grid grid-cols-5 gap-3 *:rounded-none">
          {steps?.map((item) => (
            <Card className=" border-none shadow-none bg-blue-700 text-start">
              <CardHeader>
                <CardTitle>
                  <Image
                    src={item?.icon || "/pic/compare(1)"}
                    width={45}
                    height={45}
                    loading="lazy"
                    alt="pic"
                  />
                  <h3>{item?.title}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-200">
                  {item?.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}
