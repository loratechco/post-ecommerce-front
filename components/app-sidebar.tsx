"use client"

import * as React from "react"
import {
  LogOut,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
// import { NavSecondary } from "@/components/nav-secondary"
// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { signOut } from "@/lib/auth/logOut"
// import Link from "next/link"
import ProfileUser from "@/app/dashboard/components/ProfileBadge"
import { Session } from "inspector/promises"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import dataNavMain from "@/app/dashboard/components/dataNavbarDashoard"

const BASE_ROUTE = '/dashboard'
const data = dataNavMain(BASE_ROUTE)
interface Props {
  userData: Session;
}

export function AppSidebar({ userData }: Props) {

  return (
    <Sidebar variant="inset"
      className={`h-full`}
    >
      <ScrollArea className="flex-1">
        <Link href="/dashboard/profile" className="bg-transparent">
          <SidebarHeader className=" rounded-md h-14 hover:bg-gray-200 hover:text-black overflow-hidden">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>

                  <ProfileUser userData={userData} />

                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
        </Link>

        <SidebarContent>
          <NavMain items={data?.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
          {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        </SidebarContent>

        <SidebarFooter className="h-full flex justify-center mt-3">
          <div className="">
            <button
              onClick={() => signOut()}
              className="my-3 w-full flex justify-center items-center gap-2 rounded-md bg-red-200 hover:bg-red-300 py-2.5"
            >
              Log out
              <LogOut size="15" />
            </button>
          </div>
        </SidebarFooter>
      </ScrollArea>
    </Sidebar>

  )
}
