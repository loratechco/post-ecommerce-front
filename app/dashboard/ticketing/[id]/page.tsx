"use client"

import TicketChat from '@/components/TicketChat'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function TicketChatPage() {
    return (
        <div className="h-[calc(100vh-6.2rem)] p-4 relative">
            <h1 className="text-2xl font-bold mb-4 pb-7 border-b border-zinc-300">Ticket Support Chat</h1>
            <div className="h-[calc(100%-3rem)]">
                <TicketChat />
            </div>
        </div>
    )
}