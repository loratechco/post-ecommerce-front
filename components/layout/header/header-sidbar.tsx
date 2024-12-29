import Link from "next/link";
import { Navbar } from "./Navbar";

import SideBar from "./Sidebar";

function HeaderAndSidBar() {

  return (
    <header className="relative z-40">
      <div className=" flex gap-5 items-center justify-start max-lg:justify-between fixed top-0 left-0 bg-sky-50  w-full py-3.5 px-5">
        <Link href={'#home'}>LOGO</Link>

        <div className="max-lg:hidden">
          <Navbar />
        </div>

        <aside className="lg:hidden">
          <SideBar />
        </aside>
      </div>
    </header>
  );
}

export default HeaderAndSidBar;
