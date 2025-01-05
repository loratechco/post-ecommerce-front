/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import BoxMobileSize from "./box-mobile-size";
import BoxPcSize from "./box-pc-size";
import { LandingDataStructure } from "@/app/types/landing-types";
import { useEffect, useState } from "react";

import { differenceInHours, parse } from "date-fns";
import { AccardionSkeleton } from "@/components/skeletons/AccardionSkeleton";

function getEstimatedDelivery(dataConsegnaPrevista: string): string {
  // تبدیل تاریخ ورودی به یک شیء تاریخ با فرمت درست
  const estimatedDate = parse(
    dataConsegnaPrevista,
    "EEEE dd MMMM yyyy",
    new Date()
  );

  // اگر تاریخ ورودی به درستی پارس نشده باشد (مطمئن شویم که تاریخ درست است)
  if (isNaN(estimatedDate.getTime())) {
    console.error("Invalid date format.");
    return "";
  }

  const currentDate = new Date();
  const diffInHours = differenceInHours(estimatedDate, currentDate);

  // اگر تفاوت در بازه 24-48 ساعت باشد
  if (diffInHours >= 24 && diffInHours <= 48) {
    return "24/48"; // نمایش 24/48
  }
  // اگر تفاوت در بازه 72-96 ساعت باشد
  else if (diffInHours >= 72 && diffInHours <= 96) {
    return "72/96"; // نمایش 72/96
  }
  // در غیر این صورت، نمایش تعداد ساعت‌ها
  return `${diffInHours}`;
}

function BoxOption() {
  const router = useRouter();
  const [postServiceData, setPostServiceData] =
    useState<LandingDataStructure | null>(null);

  useEffect(() => {
    const landingData = localStorage.getItem("landing-data");
    if (landingData) {
      setPostServiceData(JSON.parse(landingData));
    } else {
      router.replace("/");
    }
  }, []);
  const avalible = postServiceData?.avalibles[0] || null;
  return (
    <section className="max-w-7xl max-[970px]:max-w-xl mx-auto space-y-9 pt-28 px-[3%] min-[970px]:pt-36 pb-16 min-h-screen">
      {avalible? (avalible?.prices?.simulazione?.spedizioni?.map((shipments, key) => (
        <div key={shipments?.id || key}>
          <BoxPcSize
            // courierLogo={'https://betaspedire.b-cdn.net/imgs/courier_logos/inpost.png'} // فرض بر اینکه تصویر کوریر در `tariffImage` باشد
            courierName={shipments?.corriere} // نام کوریر از `corriere`
            estimatedDelivery={getEstimatedDelivery(
              shipments?.dataConsegnaPrevista
            )} // تاریخ تحویل پیش‌بینی‌شده
            departureDate={shipments?.dataRitiro} // تاریخ رهایی
            services={[]} // خدمات اضافی
            price={shipments?.tariffa}
          />
          <BoxMobileSize
            // courierLogo={'https://betaspedire.b-cdn.net/imgs/courier_logos/inpost.png'} // فرض بر اینکه تصویر کوریر در `tariffImage` باشد
            courierName={shipments?.corriere} // نام کوریر از `corriere`
            estimatedDelivery={getEstimatedDelivery(
              shipments?.dataConsegnaPrevista
            )} // تاریخ تحویل پیش‌بینی‌شده
            departureDate={shipments?.dataRitiro} // تاریخ رهایی
            services={[]} // خدمات اضافی
            price={shipments?.tariffa} // قیمت از `tariffa`
          />
        </div>
      ))):(
        <AccardionSkeleton numberItems={4} perrentClassName="*:!h-40 !space-y-7"/>
      )}
    </section>
  );
}

export default BoxOption;
