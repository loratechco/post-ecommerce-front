import { Button } from "@/components/ui/button";
import IconsCustomSvg from "@/public/Icons-custom-svg";
import Link from "next/link";

function ShipmentMission() {
  return (
    <article className="text-start space-y-12">
      <h2 className="section-title">Your Shipment, Our Mission</h2>

      <div className="text-zinc-700 !text-base space-y-7">
        <p>
          Spedire.com is the best solution for managing any type of shipment
          <strong>easily, quickly, and affordably</strong>, whether within Italy
          or abroad.
        </p>
        <p>
          We are among the leaders in the shipping industry, standing out for
          being
          <strong>reliable, fast in deliveries</strong>, and offering a
          <strong>convenient, secure, and guaranteed service</strong>.
        </p>
        <p>
          Whether you are an individual or a business, from the comfort of your
          home or office, you can request package shipments worldwide. The
          chosen express courier will handle the pickup (during the time slots
          you specify) to ensure your package is delivered
          <strong>as quickly as possible</strong>.
        </p>
        <p>
          Whether it’s
          <strong>documents, a gift, or a large postal package</strong>,
          Spedire.com is always at your service with the same
          <strong>efficiency and professionalism</strong>!
        </p>
        <p>
          Every shipment is a mission for us, to be completed with
          <strong>meticulousness, precision, and punctuality</strong>.
        </p>
      </div>

      <div >
        <Link href={"#"}>
          <Button
            variant={"default"}
            className="!btn-perimary centerize-flex group"
          >
            <span className="block">who we are</span>
            <IconsCustomSvg
              svgName="arrowRight"
              className="p-1 animation-group-move-right *:stroke-2"
              widthSize="25px"
              heightSize="25px"
            />
          </Button>
        </Link>
      </div>
    </article>
  );
}

export default ShipmentMission;
