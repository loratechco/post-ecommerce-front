"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Account from "./accountTab/Account";

import ChangePassword from "./ChangeUserPassword";
// this is token context
// import { useSession } from "@/lib/auth/useSession";
import Link from "next/link";
import Permission from "./permissionTab/PermissionAccordion";

function TabsListProfile() {

    // console.log("🚀 ~ findRoute ~ findRoute:", tabApis[0].getApi)

    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList className="">
                <TabsTrigger className="w-[70%]" value="account">Account</TabsTrigger>
                <TabsTrigger className="w-[70%]" value="Permission">Permission</TabsTrigger>
                <TabsTrigger className="w-[70%] max-sm:my-2" value="change-password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
                <Account />
            </TabsContent>

            <TabsContent value="Permission">
                <Permission />
            </TabsContent>

            <TabsContent value="change-password">
                <ChangePassword />
            </TabsContent>
        </Tabs>
    );
}

export default TabsListProfile;