import Image from "next/image";
import Link from "next/link";
import IconsCustomSvg from "@/public/Icons-custom-svg";
import { Button } from "@/components/ui/button";

function ShippingPromo() {
  return (
    <section className="grid grid-cols-2 max-md:grid-cols-1 gap-y-12 gap-x-7 w-full text-start">
      <div className="space-y-5 mt-1">
        <h2 className="section-title">
          Do you handle a high volume of shipments? Try SpedirePRO!
        </h2>

        <p className="section-description">
          SpedirePRO is the best Italian business platform for the professional
          management of shipments in Italy or abroad. Even more advantageous
          rates, no subscriptions or hidden costs.
        </p>

        <div className="w-full  flex items-center justify-start pt-7">
          <Link
            type="button"
            href={"#guide-shipment"}
            className="" // اضافه کردن "group"
          >
            <Button variant={"default"} className="btn-perimary !bg-secondery-color group hover:!bg-amber-500 centerize-flex">
              <span className="block">Try Ship Pro</span>
              <IconsCustomSvg
                svgName="arrowRight"
                className="p-1 animation-group-move-right *:stroke-2"
                widthSize="25px"
                heightSize="25px"
              />
            </Button>
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg lg:w-9/12 w-full mx-auto">
        <Image
          width={400}
          height={400}
          className="object-cover size-full"
          src={"/pic/delivery-tools.webp"}
          alt="delivery-tools"
          loading="lazy"
          priority={false}
        />
      </div>
    </section>
  );
}

export default ShippingPromo;
