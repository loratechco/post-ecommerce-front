
import BoxMobileSize from "./box-mobile-size";
import BoxPcSize from "./box-pc-size";

interface ShippingOption {
  carrier: {
    name: string;
    logo: string;
  };
  estimatedDelivery: string;
  departureDate: string;
  deliveryDate: string;
  price: number;
  requiresPrinting?: boolean;
}

const options: ShippingOption[] = [
  {
    carrier: {
      name: "Poste Italiane",
      logo: "/placeholder.svg?height=40&width=100",
    },
    estimatedDelivery: "24/48",
    departureDate: "IN THE DAY",
    deliveryDate: "Lun - 15/04/2024",
    price: 8.99,
    requiresPrinting: true,
  },
  {
    carrier: {
      name: "UPS EXPRESS ITALIA",
      logo: "/placeholder.svg?height=40&width=40",
    },
    estimatedDelivery: "24/48",
    departureDate: "ven - 04/12/2024",
    deliveryDate: "mar - 16/04/2024",
    price: 10.99,
    requiresPrinting: true,
  },
] as const;

function BoxOption() {
  return (
    <section className="max-w-6xl max-[970px]:max-w-xl mx-auto space-y-4 p-4">
      <BoxPcSize />
      <BoxMobileSize />
    </section>
  );
}

export default BoxOption;
