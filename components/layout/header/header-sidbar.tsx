// "use client";
import Link from "next/link";
import { Navbar } from "./Navbar";

import SideBar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
// import { useSession } from "@/lib/auth/useSession";

function HeaderAndSidBar() {
  // const session = useSession();
  return (
    <header className="relative z-40">
      <div className="shadow-md flex gap-5 items-center justify-start max-lg:justify-between fixed top-0 left-0 bg-white  w-full px-4">
        <Link href={"/"}>LOGO</Link>

        <div className="max-lg:hidden flex items-center justify-between w-full py-3.5">
          <Navbar />
          <div className="centerize-flex gap-3 ">
            <Button
              variant={"default"}
              className="bg-secondary hover:bg-secondary/90 px-3 font-semibold py-0.5"
            >
              Create Shipment
            </Button>

            <Button
              variant={"default"}
              className="bg-primary hover:bg-primary/85 px-3 font-semibold py-0.5"
            >
              Track shipment
            </Button>

            <Button
              variant={"outline"}
              className="border-primary border-2 text-primary bg-primary/10 px-3 font-semibold py-0.5 hover:text-primary hover:bg-primary/20"
            >
              Serve aiuto?
            </Button>
          </div>
        </div>

        <div className="centerize-flex gap-5">
          <div className="centerize-flex gap-5">
            <span className="block h-16 w-px bg-zinc-300 max-lg:hidden"></span>

            <Link href={"/login"} className="h-full  centerize-flex">
              <User2 />
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
