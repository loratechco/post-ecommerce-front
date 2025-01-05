"use client";
import { cn } from "@/lib/utils";
import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  delay?: number;
}

function SearchComponent({ className, children, delay = 1000 }: Props) {
  const path = usePathname();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const timeOutId = setTimeout(
      () => router.push(`${path}?search=${searchValue}`),
      delay
    );

    return () => clearTimeout(timeOutId);
  }, [searchValue, router, path, delay]);

  return (
    <div className="pt-5 w-full flex max-md:flex-col justify-between  gap-y-4 items-center">
      <div
        className={cn(
          "w-2/4 max-md:w-full flex items-center justify-center border px-1.5 border-zinc-300 rounded-lg overflow-hidden",
          className
        )}
      >
        <Search className="text-zinc-500" size={20} />

        <Input
          value={searchValue}
          onChange={({ target }) => {
            if (target.value.trim() === "") {
              setSearchValue("");
              return;
            }
            setSearchValue(target.value);
          }}
          placeholder="Search..."
          className="border-none focus-visible:ring-0"
        />
        <ArrowRight
          className="text-zinc-500 cursor-pointer  hover:text-zinc-700"
          size={20}
          onClick={() => {
            router.push(`${path}?search=${""}`);
            setSearchValue("");
          }}
        />
      </div>
      {/* For the elements next to the input  */}
      {children}
    </div>
  );
}

export default SearchComponent;
