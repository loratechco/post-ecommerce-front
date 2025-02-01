import { SelectBox } from "@/components/landing/shipping-selector/ShippingSelector";
import { DataStructureCountry } from "@/app/types/landing-types";
import Image from "next/image";
import Link from "next/link";

const missionDetails = [
  {
    description: "A shipping specialist always ready to help you",
    icon: "/pic/perk-3.svg",
  },
  {
    description: "Free damage and theft protection up to €49!",
    icon: "/pic/perk-2.svg",
  },
  {
    description: "Over 40,000 shipping points to choose from",
    icon: "/pic/perk-1.svg",
  },
] as const;
interface Props {
  token: string;
  data: DataStructureCountry;
}

function HeroSection({ data, token }: Props) {
  return (
    <>
      <section className="w-full flex items-center flex-col justify-center relative">
        <div className=" absolute top-0 left-0 -z-10 overflow-hidden size-full bg-primary">
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

        <div className=" flex items-center justify-center flex-col gap-12 pt-28 lg:pt-48  w-full">
          <div className="space-y-5 text-center text-white max-sm:px-[5%] max-lg:px-[10%]">
            <h1 className="text-3xl lg:text-5xl font-semibold">
              Shipping parcels all over the world
            </h1>
            <h2 className="text-xl lg:text-2xl">
              Send parcels to Italy and across the globe at unbeatable rates!
            </h2>

            <div className="outline px-2 py-1 mx-6 outline-white/50 rounded-lg text-base font-semibold border border-white">
              <p>
                You abandoned a shipment you were creating:
                <Link href={"#"} className="underline">
                  do you want to recover it{" "}
                </Link>{" "}
                or
                <Link href={"#"} className="underline">
                  delete it?
                </Link>
              </p>
            </div>
          </div>

          <SelectBox token={token} countrysData={data} />
          <div className="centerize-flex pb-12 max-md:flex-col gap-3">
            {missionDetails?.map((items, key) => (
              <div
                className="centerize-flex gap-3 max-w-64 py-3 max-lg:text-sm max-lg:max-w-48"
                key={key}
              >
                <Image
                  src={items?.icon}
                  priority={true}
                  alt="pic-missons"
                  width={45}
                  height={45}
                />
                <p className="text-white">{items?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full bg-secondery-color py-5 px-7 text-center text-white ">
        <Link href={"#"} className="">
          Do you have a company or an eCommerce business with many shipments?
          Discover
          <span className="underline ms-2 font-semibold">SPEDIREPRO</span>
        </Link>
      </div>
    </>
  );
}

export default HeroSection;
