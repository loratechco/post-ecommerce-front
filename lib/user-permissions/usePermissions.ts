'use client'

import { useContext } from "react";
import { usePermissions } from "./PermissionsProvider";

function getPermissions() {
    const permission = useContext(usePermissions)

    if (permission === null)
        console.log('The permission Context is null')

    return permission;
}

export default getPermissions;