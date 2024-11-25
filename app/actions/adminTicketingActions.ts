'use server'


const API_URL = 'http://app.api/api';

const adminTicketingActions = async () => {

    const getUserListTickets = async ({ token }: { token: string }) => {
        const response = await fetch(`${API_URL}/tickets`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok)
            throw new Error('Failed to fetch tickets');

        return response.json();
    }

    return { getUserListTickets };
}

export const { getUserListTickets } = await adminTicketingActions();