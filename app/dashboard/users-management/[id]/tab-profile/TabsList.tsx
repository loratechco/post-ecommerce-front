"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Account from "./accountTab/Account";

import ChangePassword from "./ChangeUserPassword";
// this is token context
// import { useSession } from "@/lib/auth/useSession";
import Link from "next/link";
import Permission from "./permissionTab/PermissionAccordion";
import { useSession } from "@/lib/auth/useSession";

function TabsListProfile({ userId }) {

    const token = useSession()

    console.log("🚀 ~ TabsListProfile ~ userId:", userId)

    // console.log("🚀 ~ findRoute ~ findRoute:", tabApis[0].getApi)

    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList className="">
                <TabsTrigger className="w-[70%]" value="account">Account</TabsTrigger>
                <TabsTrigger className="w-[70%]" value="Permission">Permission</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
                <Account userId={userId} userToken={token} />
            </TabsContent>

            <TabsContent value="Permission">
                <Permission userId={userId} userToken={token} />
            </TabsContent>
        </Tabs>
    );
}

export default TabsListProfile;