"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dataNavMain, { navMain } from "@/app/dashboard/components/dataNavbarDashoard";
import { useRouter } from "next/router";

function HeaderDasboard() {

    const path = usePathname();
    const { navMain } = dataNavMain('/dashboard');
    const data = navMain?.find(item => item.url === path);
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 ">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">

                            <BreadcrumbLink href="/dashboard">
                                Dashboard
                            </BreadcrumbLink>

                        </BreadcrumbItem>

                        {
                            path.includes('/dashboard/') && (
                                <>
                                    <BreadcrumbSeparator className="hidden md:block mt-1" />
                                    <BreadcrumbLink>
                                        {data?.title || ''}
                                    </BreadcrumbLink>
                                </>
                            )
                        }

                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}

export default HeaderDasboard;