
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

export default function ShippingCard() {
  return (
    <Card className="mx-auto border rounded-xl overflow-hidden min-[970px]:hidden">
      <div className="bg-colo text-white p-3 text-center">
        <span className="font-medium">Estimated delivery time: </span>
        <span className="text-xl font-bold">24/48</span> hours
      </div>

      <CardHeader className="space-y-4 border-b">
        <div className="flex items-center justify-between">
          <div className="">
            <Image
              src={"https://betaspedire.b-cdn.net/imgs/courier_logos/poste.svg"}
              alt="image-company"
              width={120}
              height={90}
            />
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 4 }, (_, key) => (
              <div className="flex flex-col items-center" key={key}>
                <div className="size-8">
                  <Image
                    src={
                      "https://betaspedire.b-cdn.net/imgs/services/servizi-01.svg"
                    }
                    alt="image"
                    className="size-full object-cover"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-1">Home</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">SDA EXTRA LARGE</div>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Departure date:</div>
            <div className="font-medium">Thu - 02/01/2025</div>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-sm text-muted-foreground">
              Estimated delivery:
            </div>
            <div className="font-medium">Mon - 06/01/2025</div>
          </div>
        </div>

        <div className="border-b pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Pickup:</div>
              <div className="font-medium">Home delivery (included)</div>
              <div className="text-sm text-muted-foreground">
                from ShippingPoint + €1.99
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Delivery:</div>
              <div className="font-medium">Home delivery (included)</div>
              <div className="text-sm text-muted-foreground">
                to ShippingPoint + €1.99
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <PrinterIcon className="w-4 h-4" />
          <span>Request print</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-2">
        <div>
          <div className="text-2xl font-bold text-sky-500">€17.90</div>
          <div className="text-sm text-muted-foreground">VAT included</div>
        </div>
        
        <Button className="bg-primary-color hover:bg-primary-color/70 px-8">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
}
