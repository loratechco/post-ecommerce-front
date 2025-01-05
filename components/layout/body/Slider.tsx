'use client'
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";


const CAROUSEL_DATA = [
  "https://betaspedire.b-cdn.net/imgs/courier_logos/ups.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/poste.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/ups.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/ups.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/poste.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/ups.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/poste.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/ups.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/ups.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/poste.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/poste.svg",
  "https://betaspedire.b-cdn.net/imgs/courier_logos/poste.svg",
];

function Slider() {
    return ( 
        <section className="w-full flex items-center justify-center flex-col gap-7 space-y-12 ">
        <div className="">
          <h1 className="section-title">Spedire.com couriers</h1>
        </div>
        <Carousel
          className="w-[90%]"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent className="">
            {CAROUSEL_DATA.map((data, key) => (
              <CarouselItem
                key={key}
                className="max-sm:basis-full basis-1/3 lg:basis-1/4 "
              >
                <div className="p-1 flex items-center justify-center">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 size-40">
                      <Image
                        src={data}
                        width={100}
                        height={100}
                        className="size-full "
                        alt="logo-company"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
     );
}

export default Slider;