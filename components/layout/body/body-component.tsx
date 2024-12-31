import EasySteps from "./EasySteps";
import ShippingPromo from "./ShippingPromo";

import * as React from "react";
import Slider from "./Slider";
import WhyChooseUs from "./WhyChooseUs";
import ShippingResources from "./ShippingResources";
import ShipmentMission from "./ShipmentMission";

function BodyComponent() {
  return (
    <section className="relative z-0 px-4 mx-auto text-center pt-20 space-y-28 pb-9 container">
      <EasySteps />

      <ShippingPromo />

      <Slider />

      <WhyChooseUs />

      <ShipmentMission />

      <ShippingResources />
    </section>
  );
}

export default BodyComponent;
