import Link from "next/link";
import { Navbar } from "./Navbar";

import SideBar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";

function HeaderAndSidBar() {
  return (
    <header className="relative z-40">
      <div className="shadow-md flex gap-5 items-center justify-start max-lg:justify-between fixed top-0 left-0 bg-white  w-full px-4">
        <Link href={"/"}>LOGO</Link>

        <div className="max-lg:hidden flex items-center justify-between w-full py-3.5">
          <Navbar />
          <div className="centerize-flex gap-3 ">
            <Button
              variant={"default"}
              className="bg-tertiary-color hover:bg-green-400/90 px-3 font-semibold py-0.5"
            >
              Create Shipment
            </Button>

            <Button
              variant={"default"}
              className="bg-primary-color hover:bg-primary-color/85 px-3 font-semibold py-0.5"
            >
              Track shipment
            </Button>

            <Button
              variant={"outline"}
              className="border-primary-color border-2 text-primary-color bg-primary-color/10 px-3 font-semibold py-0.5 hover:text-primary-color hover:bg-primary-color/20"
            >
              Serve aiuto?
            </Button>
          </div>
        </div>

        <div className="centerize-flex gap-5">
          <div className="centerize-flex gap-5">
            <span className="block h-16 w-px bg-zinc-300 max-lg:hidden"></span>
            <Link
              href={"/login"}
              className="block h-full cursor-pointer centerize-flex gap-2"
            >
              <User2 />
              <span className="max-lg:sr-only block text-[#2B2F41] font-semibold !text-sm w-12">
                Log in
              </span>
            </Link>
            <span className="block h-16 w-px bg-zinc-300 lg:hidden"></span>
          </div>

          <aside className="py-3.5 lg:hidden">
            <SideBar />
          </aside>
        </div>
      </div>
    </header>
  );
}

export default HeaderAndSidBar;
