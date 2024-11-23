"use client"

import TicketChat from '@/components/TicketChat'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { ChevronRight, LucideChevronLeft } from "lucide-react"

export default function TicketChatPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] rounded-lg relative">
            <div className="h-full relative">
                <div className="absolute top-4 right-4 z-10 ">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="gap-2 py-2 px-3 border-zinc-400 hover:bg-zinc-200 transition-colors">
                                <LucideChevronLeft className="size-4" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Ticket List</SheetTitle>
                                <SheetDescription>
                                    View and manage your support tickets here
                                </SheetDescription>
                            </SheetHeader>

                            <div className="space-y-4 py-4">
                                <div className="bg-card p-3 rounded-lg shadow-sm hover:shadow cursor-pointer transition-shadow">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Ticket #1234</span>
                                        <Badge variant="secondary" className='bg-green-500 text-black hover:bg-green-600'>Open</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">
                                        Technical support needed...
                                    </p>
                                    <div className="mt-2 text-xs text-muted-foreground">
                                        Updated 2h ago
                                    </div>
                                </div>

                                <div className="bg-card p-3 rounded-lg shadow-sm hover:shadow cursor-pointer transition-shadow">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Ticket #1235</span>
                                        <Badge variant="secondary" className='bg-yellow-500 text-black hover:bg-yellow-600'>Pending</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">
                                        Account access issue...
                                    </p>
                                    <div className="mt-2 text-xs text-muted-foreground">
                                        Updated 5h ago
                                    </div>
                                </div>
                            </div>

                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button className="w-full">
                                        Create New Ticket
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="h-[calc(100vh-6.2rem)] p-4 relative">
                    <h1 className="text-2xl font-bold mb-4 pb-7 border-b border-zinc-300">Ticket Support Chat</h1>
                    <div className="h-[calc(100%-3rem)]">
                        <TicketChat />
                    </div>
                </div>
            </div>
        </div>
    )
}