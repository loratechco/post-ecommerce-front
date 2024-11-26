'use server'

import { cookieName } from "@/lib/auth/storage";
import { cookies } from "next/headers";

const getToken = async () => {
    const cookie = await cookies();
    return cookie.get(cookieName)?.value;
}

const userListFetch = async ({ pageQuery = '', query = '' }: { pageQuery?: string, query?: string }) => {
    const token = await getToken();

    try {
        console.log('pageQuery', pageQuery)
        const res = await fetch(`http://app.api/api/users?page=${pageQuery}&search=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            cache: "no-cache"
        });

        const result = await res.json();
        console.log(result.data)
        return { success: true, data: result?.data };

    } catch (error) {
        console.log("===>> getUserList ~ error:", error);
        return { success: false, data: [], error: 'خطا در دریافت لیست کاربران' };
    }
}

const handleDelete = async ({ id }: { id: string }) => {
    const token = await getToken();

    try {
        const res = await fetch(`http://app.api/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: data.message || 'خطا در حذف کاربر'
            };
        }

        const updatedList = await userListFetch();

        return {
            success: true,
            data: updatedList.data
        };
    } catch (error: any) {
        console.log("🚀 ~ handleDelete ~ error:", error);
        return {
            success: false,
            error: error.message || 'خطا در حذف کاربر'
        };
    }
}

const createUserActions = () => {
    const getToken = async () => {
        const cookie = await cookies();
        return cookie.get(cookieName)?.value;
    }

    const getUserPermissions = async (id: string) => {
        try {
            const token = await getToken();
            const res = await fetch(`http://app.api/api/permissions/user/${id}/permissions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                cache: "no-cache"
            });

            if (!res.ok) {
                console.error('API Error:', res.status, res.statusText);
                throw new Error(`خطا در دریافت دسترسی‌ها: ${res.status}`);
            }

            const result = await res.json();
            return result;

        } catch (error: any) {
            console.error("Error fetching permissions:", error);
            throw new Error(error.message || 'خطا در دریافت دسترسی‌ها');
        }
    }

    return {
        getUserPermissions
    }
}

const { getUserPermissions } = createUserActions();
export { userListFetch, handleDelete, getUserPermissions };