'use server'
import axios from "axios"
import { API_URL } from './actionHelper'

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

if (typeof value === 'string') {
    //کدت
}

const getTicket = async ({ ticketId, token }: { ticketId: string, token: string }) => {
    console.log(`${API_URL}/tickets/${ticketId}/messages`);
    try {
        const res = await axios.get('http://app.api/api/tickets/1/messages', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log('res =>>>>>>>+++++', res);
        return res;

    } catch (error: any) {
        console.error('خطا در دریافت تیکت:', error);
        return { ok: false, response: error };
    }
}

const getServerAction = (endPiont: string, token: string,) => {
    try {
        const res = axios.get(`${API_URL}/${endPiont}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // console.log(res);
        // return res
    } catch (error) {
        // console.log(error);
        // return error
    }
}
export { sendMessage, getTicket, getServerAction }
