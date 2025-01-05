'use server'
import { cookies } from 'next/headers';
import axios from 'axios';
import { API_Backend } from '@/hooks/use-fetch';

const PERMISSION_COOKIE_NAME = 'USER_PERMISSIONS';

type RefreshPermissionResponse = {
    success: boolean;
    data: any;
    error?: string;
}

export async function refreshPermissionCookie(token: string): Promise<RefreshPermissionResponse> {
    try {
        if (!token) {
            return {
                success: false,
                data: null,
                error: 'Token not provided'
            };
        }

        // دریافت پرمیشن‌های جدید از API
        const response = await axios.get(
            `${API_Backend}/api/permissions/my-permissions`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response?.data) {
            return {
                success: false,
                data: null,
                error: 'No permissions data received'
            };
        }

        // به‌روزرسانی کوکی با پرمیشن‌های جدید
        const { set } = await cookies();
        set(PERMISSION_COOKIE_NAME, JSON.stringify(response.data), {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: undefined, // بدون انقضا
        });

        return {
            success: true,
            data: response.data
        };

    } catch (error: any) {
        console.error('Error refreshing permission cookie:', error);
        return {
            success: false,
            data: null,
            error: error?.response?.data?.message || 'Failed to refresh permissions'
        };
    }
}
