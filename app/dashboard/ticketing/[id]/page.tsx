import TicketChat from '@/components/chat/TicketChat'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cookies } from 'next/headers'
import { cookieName } from '@/lib/auth/storage'
import { getTicket } from '@/app/actions/chatTicketing'
import { Suspense } from 'react'
import axios from 'axios'
import { API_URL } from '@/app/actions/actionHelper'

export default
    async function TicketChatPage({ params }: { params: { id: string } }) {
    const cookie = await cookies();
    const sessionData = JSON.parse(
        cookie.get(cookieName)?.value as string
    );

    const { id } = await params;
    const getTicketData = async () => {

        try {
            const res = await fetch(`${API_URL}/tickets/${id}/messages`, {
                headers: {
                    method: 'GET',
                    Authorization: `Bearer ${sessionData.token}`
                }
            })
            console.log('res =>>>>>>>+++++', res);
            return res;
        } catch (error) {
            console.log('خطا در دریافت تیکت:', error);
            return { ok: false, response: error };
        }
    }
    const ticketData = await getTicketData();
    return (
        <div className="h-[calc(100vh-6.2rem)] p-1  relative w-full">
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }} className="w-full">
                <h1 className="text-2xl font-bold mb-7 w-full">
                    {ticketData?.title || `Ticket Support Chat`}
                </h1>
            </div>

            <div className="h-[calc(100%-3rem)] border-t border-zinc-300">
                <Suspense fallback={<div>Loading...</div>}>
                    <TicketChat
                        id={id}
                        sessionData={sessionData}
                        ticketData={ticketData?.messages as []}
                    />
                </Suspense>
            </div>
        </div>
    )
}