import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Account from "./accountTab/Account";

import ChangePassword from "./ChangeUserPassword";
// this is token context
// import { useSession } from "@/lib/auth/useSession";
import Link from "next/link";
import Permission from "./PermissionAccordion";

function TabsListProfile() {
    return (
        <Tabs defaultValue="account" className="w-full px-3">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="Permission">Permission</TabsTrigger>
                <TabsTrigger value="change-password">Change Password</TabsTrigger>
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