import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IconsCustomSvg from "@/public/Icons-custom-svg";
import Image from "next/image";
import Link from "next/link";
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
    icon: "/pic/choose.png",
  },
  {
    title: "Prepare Your Package",
    description:
      "Pack your parcel, print the label, and attach it so it's clearly visible. Easy, right?",
    icon: "/pic/package.png",
  },
  {
    title: "Hand Over Your Package",
    description:
      "Wait for the courier at home, or drop off your package at a Spedire Point if you prefer.",
    icon: "/pic/delivery-package.png",
  },
  {
    title: "Track Your Shipment",
    description:
      "Use Spedire's tracking to monitor your shipment's status at any time.",
    icon: "/pic/track-pacakage.png",
  },
];
function EasySteps() {
  return (
    <section className="space-y-12">
      <div className=" space-y-5">
        <h2 className="section-title">
          Online shipping? It&#39;s very simple on Spedire.com
        </h2>
        <p className="section-description">
          To ship online throughout Italy or abroad you need a PC or Smartphone
          with an Internet connection and a printer. Nothing more!
        </p>
      </div>

      <div className="grid grid-cols-5 max-lg:grid-cols-fill-230 justify-center gap-3 *:shadow-none  *:text-start *:bg-zinc-100  *:border-none ">
        {steps?.map((item, key) => (
          <Card className="max-md:last:col-span-full group " key={key}>
            <CardHeader className=" space-y-6">
              <div className="flex items-center justify-start w-full relative">
                <Image
                  src={item?.icon || "/pic/pic"}
                  width={40}
                  height={40}
                  loading="lazy"
                  className="absolute -left-1 z-20 bg-zinc-100"
                  alt={item?.title.toLowerCase() || "image"}
                />

                <div className="border px-0.5 sm:px-[5px] py-0.5 border-primary-color absolute sm:right-1/3 -right-1 -top-4 z-10 bg-white rounded-full animation-group-move-right">
                  <IconsCustomSvg
                    svgName="arrowRight"
                    className="max-sm:hidden pt-1.5 flex items-center justify-center *:stroke-2"
                    heightSize="20px"
                    widthSize="20px"
                  />

                  <div className="sm:hidden size-7 text-center pb-1">
                    {key + 1}
                  </div>
                </div>

                <span className="absolute z-0 top-1/2 left-0 w-full h-px bg-zinc-400 transform -translate-y-1/2"></span>
              </div>

              <CardTitle className="pt-2 text-primary-color">
                <h3>{item?.title}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[15px] font-medium">
                {item?.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-full flex items-center justify-center">
        <Link type="button" href={"#guide-shipment"}>
          <Button variant={"default"} className="btn-perimary group">
            <span className="block">guide to the first shipment</span>
            <IconsCustomSvg
              svgName="arrowRight"
              className="p-1 animation-group-move-right"
              widthSize="25px"
              heightSize="25px"
            />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default EasySteps;
