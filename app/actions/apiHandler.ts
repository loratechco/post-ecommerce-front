'use server'
import axios from "axios";
const API_URL = 'http://app.api';

export const apiHandler = async ({
    method = "GET",
    endpoint = "",
    token = "",
    data = null
}) => {

    try {

        const url = `${API_URL}/${endpoint}`;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios({
            method,
            url,
            data,
            headers
        });

        // بازگشت داده‌ها در صورت موفقیت
        return {
            success: true,
            data: response.data,
            message: '',
            status: response.status,
        };
    } catch (error) {
        // مدیریت خطاها
        return {
            success: false,
            message: error.response?.data?.message || "An error occurred",
            status: error.response?.status || 500,
        };
    }
};

const checkeEndPoint = (endpoint: string) => {
    // Endpoint should not start with slash and http.
    const regex = /^(\/|https?:\/\/)/;

    if (regex.test(endpoint)) {
        console.error(
            "FileName: apiHandler",
            "Endpoint should not start with slash(/) and http.",
            'Guide ====>The endpoint should be like this:(api/groups)'
        );
        return { ok: true, endpoint };
    }
    return { ok: true, endpoint };
}

export const getData = async (
    endpoint: string,
    token: string,
    customErrorMessage?: string
): Promise<{
    res: any;
    errorMessage: string | null;
} | undefined> => {
    try {
        const endpointResult = checkeEndPoint(endpoint);
        if (!endpointResult.ok) return;

        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok)
            throw `${customErrorMessage || 'Error receiving information, please try again'}`;

        const resutl = await response.json();
        return {
            res: resutl,
            errorMessage: null,
        };
    } catch (error) {
        console.error(error);
        return {
            res: error,
            errorMessage: null,
        };
    }
}

