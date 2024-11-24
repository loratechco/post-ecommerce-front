'use server'
import axios from "axios";
import { cookies } from 'next/headers';
import { cookieName } from '../auth/storage';


export const savePermissions = async (permissionsData: object[]) => {
    const cookieStore = await cookies();
    const userData = JSON.stringify(permissionsData);
    cookieStore.set('USER_PERMISSIONS', userData, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60, // 30 days
    });
}

export const fetchPermissions = async (token?: string) => {
    try {
        console.log('Fetching permissions with token:', token);

        const { data } = await axios.get(
            'http://app.api/api/permissions/my-permissions',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (data) {
            console.log('Permissions received:', JSON.stringify(data));
            await savePermissions(data);
            return data;
        }

        console.log('No permissions data received', data);
        return null;
    } catch (error: any) {
        console.error("Error fetching permissions:", error.response?.data?.message);
        return null;
    }
}
