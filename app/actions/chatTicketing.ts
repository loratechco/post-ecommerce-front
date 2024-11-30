import axios from "axios"
const API_URL = 'http://app.api/api';

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
        const res = await axios.get(`${API_URL}/tickets/${ticketId}/messages`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return { ok: true, response: res?.data }
    } catch (error) {
        console.error('خطا در دریافت پیام:', error);
        return { ok: false, response: error };
    }
}

export { sendMessage, getTicket }
