'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from 'lucide-react'
import axios from 'axios'
import { getTicket, sendMessage } from '@/app/actions/chatTicketing'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import ChatInput from './ChatInput'

type Message = {
    user_id: string
    sender: string
    content: string
    timestamp: string
    avatar: string;
}

interface Props {
    id: string;
    ticketData: Message[];
    sessionData: {
        token: string,

        initData: {
            avatar: string
            business_customer: number
            created_at: string
            deleted_at: string | null
            email: string
            email_verified_at: string | null
            id: string;
            is_administrator: number
            last_name: string | null
            name: string
            phone: string | null
            phone_verified_at: string | null
            updated_at: string
        }
    }
}

export default function TicketChat({ id, sessionData: { token, initData }, ticketData }: Props) {
    const [messages, setMessages] = useState<Message[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null);

    // scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef
            .current
            ?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    // send message handler 
    const handleSendMessage = async (newMessage: string) => {

        const message: Message = {
            user_id: userId,
            sender: findUser?.sender || 'admin',
            content: newMessage,
            timestamp: new Date().toLocaleString(),
            avatar: findUser?.avatar || '',
        }

        console.log('findUser=>>>', findUser);

        const res = await sendMessage({
            ticketId: id,
            message: message?.content,
            token
        })

        if (!res.ok) {
            toast({
                title: 'unsuccessful',
                className: 'bg-red-300 text-red-900',
                duration: 3000,
                description: 'Failed to send message, please try again later',
            })
            return;
        };

        setMessages([...messages, message])
    }

    // get data from server
    useEffect(() => {
        console.log('ticketData=>>>', ticketData)
        if (!ticketData) {
            setMessages([])
            toast({
                title: 'unsuccessful',
                className: 'bg-red-300 text-red-900',
                duration: 3000,
                description: 'Ticket not found, please try again later',
            })
            return;
        };
        // success get ticket data
        setMessages(ticketData)
    }, [id, token])

    const userId = String(initData?.id);
    // find user in messages
    const findUser = messages.find(({ user_id }) => user_id === userId);
    return (
        <div className="flex flex-col size-full bg-white overflow-hidden pt-[3%]">
            {/* Messages */}
            <ScrollArea className="flex-1 w-full max-sm:text-xs">
                {messages?.map(({
                    user_id,
                    avatar,
                    content,
                    timestamp,
                    sender
                }, index) => (
                    <div
                        key={index}
                        ref={messagesEndRef}
                        className={cn(
                            'flex mb-7  px-4',
                            user_id === userId && 'justify-end'
                        )}>

                        <div className={cn(
                            'flex items-start',
                            user_id === userId && 'flex-row-reverse'
                        )}>
                            <Avatar className="size-8">
                                <AvatarImage src={`http://app.api/${avatar}`} />
                                <AvatarFallback>
                                    {sender.charAt(0).toUpperCase() || 'N'}
                                </AvatarFallback>
                            </Avatar>

                            <div className={cn(
                                'mx-2 w-full',
                                user_id === userId && 'text-right'
                            )}>

                                <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }} className={cn(
                                    'px-2 py-2.5 rounded-lg shadow bg-zinc-300 ',
                                    user_id === userId && 'bg-blue-500 text-white'
                                )}>
                                    {content}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollArea>

            <ChatInput onSendMessage={handleSendMessage} ref={inputRef} />
        </div>
    )
}