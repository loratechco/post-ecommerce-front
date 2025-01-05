"use client"
import { forwardRef, memo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'

interface MessageInputProps {
    onSendMessage: (message: string) => void;
}

const MessageInput = forwardRef<HTMLInputElement, MessageInputProps>(
    ({ onSendMessage }: MessageInputProps, ref) => {
        const handleSend = () => {
            if (!ref || !('current' in ref)) return;
            const message = ref.current?.value || '';
            if (message.trim() === '') return;

            onSendMessage(message);
            if (ref.current) {
                ref.current.value = '';
            }
        }

        return (
            <div className="rounded-md p-3.5 mt-4 bg-zinc-200 overflow-hidden ">
                <div className="flex items-center max-sm:text-xs">
                    <Input
                        ref={ref}
                        type="text"
                        placeholder="Type your message..."
                        onKeyDown={(e) => e.key.includes('Enter') && handleSend()}
                        className="flex-1 mr-2 focus:outline-none border-zinc-400 py-5 md:text-base focus-visible:border-zinc-600 focus-visible:ring-0"
                    />
                    <Button onClick={handleSend} size="sm" className='py-5 max-sm:text-xs'>
                        <Send className="h-4 w-4 mr-1" />
                        <p className='text-sm max-sm:hidden'>Send</p>
                    </Button>
                </div>
            </div>
        )
    })

MessageInput.displayName = 'MessageInput'
export default memo(MessageInput);