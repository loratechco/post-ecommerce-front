'use server'


const API_URL = 'http://app.api/api';

const getUserListTickets = async ({ token }: { token: string }) => {

    try {
        const response = await fetch(`${API_URL}/tickets`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) return []

        return response.json();

    } catch (error) {
        console.log(error);
        return error as string || 'An error occurred';
    }
}

const createTicket = async ({ token, title, description }: { token: string, title: string, description: string }) => {

    try {
        const response = await fetch(`${API_URL}/tickets`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) return { createTicketError: response.statusText }

        return { createTicketError: null, data: response.json() };
    } catch (error) {
        console.log(error);
        return error as string || 'An error occurred';
    }
}

export { getUserListTickets, createTicket };