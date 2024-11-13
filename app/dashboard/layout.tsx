import { AppSidebar } from "@/components/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import Skeleton from "./components/Skeleton"
import HeaderDasboard from "./components/Header"
import React, { Suspense } from "react"

// import { Suspense } from "react"

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>  
            <SidebarProvider>

                <AppSidebar />

                <SidebarInset>
                    <HeaderDasboard />
                    <Suspense fallback={<Skeleton />}> 
                    {children}
                    </Suspense>
                </SidebarInset>

            </SidebarProvider>
        </>
    );
}

export default DashboardLayout;