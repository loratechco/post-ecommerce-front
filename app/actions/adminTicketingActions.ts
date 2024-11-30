'use server'

import axios from "axios";
const API_URL = 'http://app.api/api';

// دریافت لیست تیکت‌ها
const getUserListTickets = async ({ token, currentPage = '' }: { token: string, currentPage: string }) => {
    try {
        const res = await axios.get(`${API_URL}/tickets?page=${currentPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // console.log('data=>>>', res)

        return { data: res.data.data, last_page: res.data.last_page };
    } catch (error) {
        console.error('خطا در دریافت تیکت‌ها:', error);
        return [];
    }
}

// ایجاد تیکت جدید
const createTicket = async ({ title, token }: { title: string, token: string }) => {
    try {
        const response = await axios.post(`${API_URL}/tickets`, { title }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { createTicketError: null, data: response.data };
    } catch (error) {
        console.error('خطا در ایجاد تیکت:', error);
        return {
            createTicketError: 'خطایی در ایجاد تیکت رخ داده است',
            data: null
        };
    }
}

export { getUserListTickets, createTicket };