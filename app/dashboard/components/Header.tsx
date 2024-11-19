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

function HeaderDasboard() {

    const path = usePathname();
    const route = path.replace("/dashboard/", "");

    const uperCaseRoutWord = route[0].toUpperCase() + route.slice(1);

    function formatPath(input) {
        // اگر یک اسلش بعد از کلمه باشد، آن را حذف کنیم
        if (input.includes('/')) {
            const basePath = input.split('/')[0]; // متن قبل از اسلش
            return `Edit User Profile`;
        }

        // اگر اسلش وجود نداشت، متن را صرفاً فرمت می‌کنیم
        return capitalizeWords(input);
    }

    function capitalizeWords(wordInput) {
        return wordInput
            .replace(/[-_]/g, ' ') // تبدیل خط تیره و آندرلاین به اسپیس
            .replace(/\b\w/g, (char) => char.toUpperCase()); // بزرگ کردن حرف اول هر کلمه
    }

    const mainRoute = "/dashboard"
    const routes = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Users Management", href: "/dashboard/users-management" },
        //... add more routes here if needed
    ]

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
                                    <BreadcrumbLink
                                        href={'/dashboard/' + route}
                                    >
                                        {route.includes('users-management/') ? formatPath(route) : capitalizeWords(route)}
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