const SHIPPING_GUIDE_DATA = [
  {
    title: "What You Can Ship",
    content:
      "Before booking your shipment online, we recommend checking what items can be shipped online.",
    icon: "/pic/cosa-spedire.jpg",
    button: {
      label: "Learn More",
      href: "#",
    },
  },
  {
    title: "Packaging Guide",
    content:
      "Proper packaging is essential to prepare your package before handing it over to the courier and ensuring the safety of your shipment.",
    icon: "/pic/imballaggio.jpg",
    button: {
      label: "Learn More",
      href: "#",
    },
  },
  {
    title: "The Spedire.com Blog",
    content:
      "We select everything that could help you organize your shipments in Italy or abroad. The best rates, solutions, couriers, exclusive guides, and much more!",
    icon: "/pic/blog-small.jpg",
    button: {
      label: "Learn More",
      href: "#",
    },
  },
] as const;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

function ShippingResources() {
  return (
    <section className="space-y-12">
      <div>
        <h2 className="section-title">
          Useful and always updated resources for your shipments
        </h2>
      </div>

      <div className=" *:shadow-none *:border-none grid grid-cols-3 max-md:grid-cols-1 gap-x-3 max-md:space-y-12">
        {SHIPPING_GUIDE_DATA?.map((items, Key) => (
          <Card key={Key} className="">
            <CardHeader className="p-0 rounded-lg overflow-hidden max-h-64">
              <Image
                src={items?.icon}
                alt={items?.title.toLowerCase()}
                width={500}
                height={500}
                loading="lazy"
                className="size-full object-cover"
              />
            </CardHeader>

            <CardContent className="text-start p-0 py-7 space-y-3 px-3">
              <CardTitle className="text-[#2B2F41]">{items?.title}</CardTitle>
              <CardDescription className="text-base font-medium">
                {items?.content}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-start w-full p-0 px-5 pb-3">
              <Link href={items?.button?.href}>
                <Button
                  variant={"link"}
                  className="text-primary-color text-base font-medium centerize-flex p-0"
                >
                  {items?.button?.label}
                  <Image
                    src={"/pic/caret-circled.svg"}
                    alt="circl-arrow"
                    loading="lazy"
                    className="inline-block"
                    width={19}
                    height={30}
                  />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ShippingResources;
