import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import {  navbarStructur } from "./navbar-data-items";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

function SideBar() {
  return (
    <Sheet>
      <SheetTrigger className="">
        <AlignJustify />
      </SheetTrigger>
      <SheetContent className="bg-sky-200 p-0 !border-none" side={'left'}>
        <SheetTitle className="sr-only">Sidebar content</SheetTitle>
        <SheetHeader className=" text-start">
          <div className="w-full h-32 overflow-hidden">
            <Image
              src="/pic/delivery-shiping.jpg"
              alt="shipping-truck"
              width={400}
              height={200}
              priority={false}
              className="size-full object-cover"
              loading="lazy"
            />
          </div>
        </SheetHeader>

        <ul className="space-y-3 text-start pt-5 max-h-[30rem] md:px-3.5 px-2 py-2">
          <ScrollArea className="max-sm:h-[23rem] h-[28rem] md:pr-5 p-0">
            {navbarStructur?.map((nav, index) => (
              <li key={index} className="pb-4">
                <p className="text-base font-semibold pb-3">{nav?.title}</p>
                {nav?.items.map((items, index) => (
                  <Link
                    key={index}
                    href={items?.href}
                    className="flex justify-start gap-2 text-sm items-center my-2 w-full py-2 rounded-lg hover:bg-sky-300/50"
                  >
                    <i className="ml-2">{items?.icon}</i>
                    <p>{items?.titleItem}</p>
                  </Link>
                ))}
              </li>
            ))}
          </ScrollArea>
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;
