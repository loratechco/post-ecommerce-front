"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "./accountTab/Account";

import Permission from "./permissionTab/PermissionAccordion";
import { useSession } from "@/lib/auth/useSession";
// import { usePermissions } from "@/lib/user-permissions/PermissionsProvider";

function TabsListProfile({ userId }: { userId: string }) {
//   const { permissions, refreshPermissions } = usePermissions();
  const { token } = useSession() ;


  // const accessPermission = permissions?.permissions.includes('change-users-permissions')
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="Permission">Permission</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <Account userId={userId} userToken={token} />
      </TabsContent>

      <TabsContent value="Permission">
        <Permission userId={userId} />
      </TabsContent>
    </Tabs>
  );
}

export default TabsListProfile;
