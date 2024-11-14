'use client'

import { useState } from 'react'
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

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return

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
        <div className="flex flex-col h-[calc(100vh-4rem)] w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex mb-4 ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-start ${message.sender === 'admin' ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="w-8 h-8">
                                <AvatarFallback>{message.sender === 'admin' ? 'A' : 'C'}</AvatarFallback>
                            </Avatar>
                            <div className={`mx-2 ${message.sender === 'admin' ? 'text-right' : 'text-left'}`}>
                                <div className={`p-2 rounded-lg shadow ${message.sender === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                                    {message.content}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t rounded-xl p-4 overflow-hidden bg-gray-300">
                <div className="flex items-center">
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 mr-2"
                        
                    />
                    <Button onClick={handleSendMessage} size="sm">
                        <Send className="h-4 w-4 mr-1" />
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )
}