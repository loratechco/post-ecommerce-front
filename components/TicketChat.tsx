'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from 'lucide-react'

type Message = {
    id: string
    sender: 'admin' | 'customer'
    content: string
    timestamp: string
}

const initialMessages: Message[] = [
    { id: '1', sender: 'customer', content: 'Hello, I\'m having trouble with my payment', timestamp: '2023-05-10 10:30 AM' },
    { id: '2', sender: 'admin', content: 'I\'m sorry to hear that. Can you please provide more details about the issue?', timestamp: '2023-05-10 10:32 AM' },
    { id: '3', sender: 'customer', content: 'When I try to submit my payment, I get an error message saying "Transaction failed"', timestamp: '2023-05-10 10:35 AM' },
]

export default function TicketChat() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [newMessage, setNewMessage] = useState('')


    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // اسکرول به پایین هر زمان که پیام‌ها تغییر می‌کنند
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return
        scrollToBottom()
        const message: Message = {
            id: Date.now().toString(),
            sender: 'admin',
            content: newMessage,
            timestamp: new Date().toLocaleString()
        }

        setMessages([...messages, message])
        setNewMessage('')
    }

    return (
        <div className=" flex flex-col size-full bg-white overflow-hidden">
            {/* Messages */}
            <ScrollArea className="flex-1 w-full max-sm:text-xs px-4" >
                {messages.map((message) => (
                    <div key={message.id} ref={messagesEndRef} className={`flex mb-7 ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-start ${message.sender === 'admin' ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="size-8">
                                <AvatarFallback>{message.sender === 'admin' ? 'A' : 'C'}</AvatarFallback>
                            </Avatar>
                            <div className={`mx-2 ${message.sender === 'admin' ? 'text-right' : 'text-left'}`}>

                                <div className={`px-2 py-2.5 rounded-lg shadow ${message.sender === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                                    {message.content}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollArea>

            {/* Message Input */}
            <div className="rounded-md p-3.5 bg-zinc-200 overflow-hidden ">
                <div className="flex items-center max-sm:text-xs">
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 mr-2 focus:outline-none border-zinc-400 py-5 focus-visible:border-zinc-600 focus-visible:ring-0"
                    />
                    <Button onClick={handleSendMessage} size="sm" className='py-5 max-sm:text-xs'>
                        <Send className="h-4 w-4 mr-1" />
                        <p className='text-sm'>Send</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}