'use server'
import axios from "axios"
import { API_URL } from './actionHelper'
import { API_Backend } from "@/hooks/use-fetch"

const sendMessage = async ({ ticketId, message, token }: { ticketId: string, message: string, token: string }) => {
    try {
        const res = await axios.post(`${API_URL}/tickets/${ticketId}/messages`,
            { message },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return { ok: true, response: res.data }
    } catch (error) {
        console.error('خطا در ایجاد پیام:', error);
        return { ok: false, response: error };
    }
}

const getTicket = async ({ ticketId, token }: { ticketId: string, token: string }) => {
    try {
        // ابتدا بررسی کنید که ticketId و token معتبر هستند
        if (!ticketId || !token) {
            throw new Error('Ticket ID or Token is missing');
        }
        console.info('hi');

        // درخواست به سرور
        const res = await axios.get(`${API_Backend}/api/tickets/${ticketId}/messages`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(res?.status);

        // بررسی پاسخ و جلوگیری از ارورهای غیرمنتظره
        if (res?.data || Array.isArray(res.data)) {
            return { error: null, response: res.data };
        } else {
            // اگر داده‌ها به صورت غیرمنتظره‌ای نباشند، یک آرایه خالی ارسال می‌کنیم
            return { error: new Error(`Invalid data structure${res?.status}`), response: [] };
        }
    } catch (error: any) {
        // مدیریت خطا به طور دقیق‌تر
        console.error('Error fetching ticket messages:', error.message || error);
        console.log(error);
        return { error: error.message || 'An error occurred', response: [] };
    }
}

export { sendMessage, getTicket }
