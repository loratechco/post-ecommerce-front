"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import dataNavMain from "@/app/dashboard/components/dataNavbarDashoard";
import { memo } from "react";

function HeaderDasboard() {
  const path = usePathname();
  const { navMain } = dataNavMain("/dashboard");

  const sortedNavMain = navMain?.sort((a, b) => b.url.length - a.url.length);

  const result = sortedNavMain?.find((item) => path.startsWith(item.url));
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="hidden md:block mt-1" />
            <BreadcrumbLink href={result?.url}>
              {result?.title || ""}
            </BreadcrumbLink>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

export default memo(HeaderDasboard);
