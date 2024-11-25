import "server-only"

import { cookies } from "next/headers"

export default async function getPermissions(): Promise<string | null> {
    const { get } = await cookies()
    const permissionsData = get('USER_PERMISSIONS')

    if (!permissionsData?.value) {
        return null;
    }

    try {
        return JSON.parse(permissionsData.value);
    } catch (error) {
        console.error('Error parsing permissions:', error);
        return null;
    }
}