import {
  CalendarIcon,
  HomeIcon,
  PrinterIcon,
  Package,
  Truck,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { LandingDataStructure } from "@/app/types/landing-types";
import { memo } from "react";

type Service = {
  icon: string; // URL آیکون سرویس
  name: string; // نام سرویس
};

type ShippingCardProps = {
  courierLogo: string; // آدرس لوگوی شرکت حمل و نقل
  courierName: string; // نام شرکت حمل و نقل
  estimatedDelivery: string; // زمان تخمینی تحویل
  departureDate: string; // تاریخ ارسال
  services: Service[]; // آرایه‌ای از سرویس‌ها
  price: string | number; // قیمت ارسال (می‌تواند رشته یا عدد باشد)
};

function ShippingCard({
  courierLogo,
  courierName,
  estimatedDelivery,
  departureDate,
  services,
  price,
}: ShippingCardProps) {
  return (
    <Card className="mx-auto border rounded-xl overflow-hidden min-[970px]:hidden">
      <CardHeader className="w-full centerize-flex h-16 bg-tertiary-color !py-2">
        <div className="text-base centerize-flex text-white space-x-2 text-nowrap">
          <p>estimated delivery</p>
          <p className="font-bold text-3xl max-sm:text-xl">
            {estimatedDelivery}
          </p>
          <p> hours</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4 border-b pb-4">
          <div className="centerize-flex gap-2 flex-col">
            <Image
              src={`https://betaspedire.b-cdn.net/imgs/courier_logos/${courierLogo}`}
              alt={`${courierName} image-company`}
              width={120}
              height={90}
            />
            <div className="text-zinc-500 text-xs  text-center">
              <p className="sr-only">{courierName} icon</p>
              <span className="text-sm pt-1 block">
                <p>Departure date:</p>
                <p className=" text-black">IN THE DAY</p>
              </span>
            </div>
          </div>

          <div className="centerize-flex gap-2 flex-col text-center">
            {/* icons section  */}
            <span className="centerize-flex gap-2 h-24">
              {services?.map((service, index) => (
                <div className="flex flex-col items-center " key={index}>
                  <div className="size-8">
                    <Image
                      src={service?.icon}
                      alt="image"
                      className="size-full object-cover"
                      width={40}
                      height={40}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {service?.name}
                  </span>
                </div>
              ))}
            </span>

            <div className="space-y-2 text-sm">
              <div className="text-muted-foreground">
                Departure date:
              </div>
              <div className="">{departureDate}</div>
            </div>
          </div>
        </div>

        <div className="border-b pb-4  text-zinc-500">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Withdraw:</p>
              <p className="text-sm">delivered to your home + €0.99</p>
              <p className="text-sm">from SpedirePoint + €1.99</p>
            </div>

            <div>
              <div className="font-medium">Delivery:</div>
              <div className="text-sm">
                at home (included) to SpedirePoint + €1.99
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground border-b pb-4">
          <PrinterIcon className="w-4 h-4" />
          <span>Request print</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-2">
        <div>
          <div className="text-2xl font-bold text-sky-500">€{price}</div>
          <div className="text-sm text-muted-foreground">VAT included</div>
        </div>

        <Button className="bg-primary-color hover:bg-primary-color/70 px-8">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
}

  export default memo(ShippingCard);
