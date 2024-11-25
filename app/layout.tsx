import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { Inter } from "next/font/google"
import "./globals.css"

import { cn } from "@/lib/utils"

import getSession from "@/lib/auth/getSession"
import { SessionProvider } from "@/lib/auth/SessionProvider"
import { PermissioinsProvider } from "@/lib/user-permissions/PermissionsProvider"
import getPermissions from "@/lib/user-permissions/getPermissions"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description:
    "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()
  const permissions = await getPermissions()

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <SessionProvider session={session}>
          <PermissioinsProvider userPermissions={permissions}>
            {children}
            <Toaster />
          </PermissioinsProvider>
        </SessionProvider>
      </body>
    </html>
  )
} 