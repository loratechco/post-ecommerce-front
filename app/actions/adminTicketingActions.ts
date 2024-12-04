'use server'

import axios from "axios";
import { API_URL } from './actionHelper'

// دریافت لیست تیکت‌ها
const getUserListTickets = async ({ token, currentPage = '', search = '' }: { token: string, currentPage: string, search: string }) => {
    try {
        console.log('search=>>>', search);
        const res = await axios.get(`${API_URL}/tickets?page=${currentPage}&search=${search}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('res=>>>', res.data);
        return { data: res.data.data, last_page: res.data.last_page, res: res.data };
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