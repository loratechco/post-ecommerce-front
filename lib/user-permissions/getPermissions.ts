'use client'

import { useContext } from "react";
import { PermissionsContext } from "./permissionsProvider";

function getPermissions() {
    const permission = useContext(PermissionsContext)

    if (permission === null)
        throw new Error('The permission Context is null')

    return permission;
}

export default getPermissions;