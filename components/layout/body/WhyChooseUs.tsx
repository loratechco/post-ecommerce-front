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

const WHY_CHOOSEUS_DATA = [
  {
    title: "Affordable Rates",
    content:
      "On Spedire.com, thanks to agreements with our partner carriers, you can find the most affordable rates for shipping within Italy or abroad.",
    icon: "/pic/plus-01.svg",
    href: "#",
    btnName: "Find out more",
  },
  {
    title: "Spedire.com Recharge Options",
    content:
      "The more you ship, the more you save! Purchase Spedire.com recharges and get additional discounts on your shipments.",
    icon: "/pic/plus-02.svg",
    href: "#",
    btnName: "Buy refills",
  },
  {
    title: "Shipping Guarantee",
    content:
      "We offer free guarantees for your shipments against damage or loss, up to a maximum value of €49.",
    icon: "/pic/plus-03.svg",
    href: "#",
    btnName: "Buy refills",
  },
  {
    title: "Spedire Point",
    content:
      "Choose whether to have the courier pick up your package from your home or drop it off at a Spedire Point. Find the most practical and convenient solution for you!",
    icon: "/pic/plus-06.svg",
    href: "#",
    btnName: "Buy refills",
  },
  {
    title: "Tracking Service",
    content:
      "Track the status of your shipment at any time using our tracking service for national and international deliveries.",
    icon: "/pic/plus-04.svg",
    href: "#",
    btnName: "Buy refills",
  },
  {
    title: "Dedicated Support",
    content:
      "On Spedire.com, you’ll have access to a dedicated support service available at all times to help you manage any shipment or use Spedire.com effectively.",
    icon: "/pic/plus-07.svg",
    href: "#",
    btnName: "Buy refills",
  },
  {
    title: "Carriers",
    content:
      "Why rely on just one carrier? Choose the best carrier for each of your shipments, whether within Italy or abroad.",
    icon: "/pic/traccia.svg",
    href: "#",
    btnName: "Buy refills",
  },
  {
    title: "Cash on Delivery",
    content:
      "On Spedire.com, you can send packages and envelopes within Italy or abroad using cash on delivery with a single click. Just select this option during the booking process.",
    icon: "/pic/plus-01.svg",
    href: "#",
    btnName: "Buy refills",
  },
  {
    title: "Triangulation",
    content:
      "Do you want to ship a package with a sender that differs from the departure location? On Spedire.com, you can do it!",
    icon: "/pic/plus-02.svg",
    href: "#",
    btnName: "Buy refills",
  },
];

function WhyChooseUs() {
  return (
    <section className="space-y-12">
      <div className="">
        <h2 className="section-title">
          Why choose Spedire.com for send your packages
        </h2>
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-fit-230 justify-center gap-3 *:shadow-none *:border-none">
        {WHY_CHOOSEUS_DATA?.map((items, key) => (
          <Card className="centerize-flex flex-col" key={key}>
            <CardHeader className="flex items-center justify-center flex-col gap-3 text-xl">
              <Image
                src={items?.icon}
                alt={items?.title}
                width={50}
                height={50}
              />
              <CardTitle className="text-[#2B2F41]">{items?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base font-medium">
                <p>{items?.content}</p>
              </CardDescription>
              <CardFooter className="centerize-flex !p-0 !m-0">
                <Link href={items?.href}>
                  <Button
                    variant={"link"}
                    className="text-primary-color text-base font-medium centerize-flex"
                  >
                    {items?.btnName}
                    <Image
                      src={"/pic/caret-circled.svg"}
                      alt="circl-arrow"
                      className="inline-block"
                      loading="lazy"
                      width={19}
                      height={30}
                    />
                  </Button>
                </Link>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
