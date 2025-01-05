'use server'
import axios from 'axios';
import { API_URL } from './actionHelper'
const userListFetch = async ({ pageQuery = '', query = '', token }: { pageQuery?: string, query?: string, token: string }) => {
    try {
        const { data } = await axios.get(`${API_URL}/users`, {
            params: { page: pageQuery, search: query },
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        return { success: true, data: data.data, error: null };

    } catch (error:any) {
        return {
            success: false,
            data: [],
            error: error?.message || 'Error in receiving user list'
        };
    }
}

const handleDelete = async ({ id, pageQuery, token }: { id: string, pageQuery: string, token: string }) => {

    try {
        const res = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: data.message || 'Error in delete user list'
            };
        }

        const updatedList = await userListFetch({ pageQuery, token });

        console.log(updatedList.data.data);
        return {
            success: true,
            data: updatedList?.data
        };
    } catch (error: any) {
        console.log("🚀 ~ handleDelete ~ error:", error);
        return {
            success: false,
            error: error.message || 'Error in delete user list'
        };
    }
}

const getUserPermissions = async (id: string, token: string) => {
    try {
        const res = await fetch(`${API_URL}/permissions/user/${id}/permissions`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cache: "no-cache"
        });

        const result = await res.json();
        return result;

    } catch (error: any) {
        console.error("Error fetching permissions:", error);
        throw new Error(error.message || 'خطا در دریافت دسترسی‌ها');
    }
}


export { userListFetch, handleDelete, getUserPermissions };