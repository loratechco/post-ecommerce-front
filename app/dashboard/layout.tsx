import { AppSidebar } from "@/components/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import HeaderDasboard from "./components/Header"
import React from "react"

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <SidebarProvider>

                <AppSidebar />

                <SidebarInset className="">
                    <HeaderDasboard />
                    {/* <Suspense fallback={<Skeleton />}> */}
                    <section className="px-4">
                        {children}
                    </section>
                    {/* </Suspense> */}
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

export default DashboardLayout;