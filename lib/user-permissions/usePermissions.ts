'use client'

import { usePermissions } from "./PermissionsProvider";

  
function useGetPermissions() {
    const permission = usePermissions();

    if (permission === null)
        console.log('The permission Context is null')

    return permission;
}

export default useGetPermissions;