import { Printer, Package } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function BoxPcSize() {
    return ( 
        <div className="max-h-48 max-[970px]:hidden rounded-xl hover:shadow-lg shadow-md transition-all duration-200 hover:ring-1 ring-primary-color overflow-hidden w-full">
        <ul className=" flex items-center justify-between gap-2 *:basis-1/7 ">
          <li
            className="text-sm w-32 max-lg:w-28 text-center bg-tertiary-color h-full px-2 py-2 text-white"
            style={{
              clipPath: "polygon(0 0, 100% 0%, 90% 100%, 0% 100%)",
              WebkitClipPath: "polygon(0 0, 100% 0%, 90% 100%, 0% 100%)",
            }}
          >
            <p className="w-20 mx-auto">estimated delivery</p>
            <p className="text-3xl font-semibold max-lg:text-2xl">24/48</p>
            <p className="">hours</p>
          </li>

          <li className="centerize-flex flex-col gap-2">
            <Image
              src={
                "https://betaspedire.b-cdn.net/imgs/courier_logos/inpost.png"
              }
              alt="company"
              width={60}
              height={40}
            />
            <p className="text-zinc-500 text-sm w-24 text-center">
              INPOST NAZIONALE
            </p>
          </li>

          <li className="w-20 "></li>

          <li className="divide-x divide-zinc-300  centerize-flex *:px-1.5 *:text-center *:text-zinc-500 !basis-2/7">
            <div>
              <p>Departure date:</p>
              <p className="text-black"> SAME DAY</p>
            </div>

            <div>
              <p>Estimated delivery:</p>
              <p className="text-black"> Thu - 02/01/2025</p>
            </div>
          </li>

          <li className="text-center">
            <p className="text-3xl font-bold text-primary-color">€ 6,25</p>
            <p className="text-zinc-500">VAT included</p>
          </li>

          <li className="pe-4">
            <Button
              variant={"default"}
              className="bg-tertiary-color hover:bg-tertiary-color/70 font-semibold text-base p-6 max-lg:px-4"
            >
              Choose
            </Button>
          </li>
        </ul>

        <div className="max-h-24 px-4 py-3 text-zinc-500 flex items-center justify-between basis-1/3 border-t border-zinc-300 ">
         
          <div className="*:space-x-2">
            <p className="">Withdraw:</p>
            <p className="">
              at home <span className="font-semibold"> 0,99€</span>
              <span>da SpedirePoint</span>
              <span className="font-semibold">1,99€</span>
            </p>
            <span className=""></span>
          </div>

          <div className="*:space-x-2">
            <p className="">Withdraw:</p>
            <p className="">
              at home <span className="font-semibold"> 0,99€</span>
              <span>da SpedirePoint</span>
              <span className="font-semibold">1,99€</span>
            </p>
          </div>

          <div className="centerize-flex gap-2">
            <Image
              src={"https://betaspedire.b-cdn.net/imgs/icon-18.svg"}
              width={18}
              height={18}
              alt="Print-pic"
            />
            <p>To print</p>
          </div>
        </div>
      </div>
     );
}

export default BoxPcSize;