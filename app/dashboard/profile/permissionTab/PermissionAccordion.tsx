'use client'

import { useState, useCallback } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

// Define the types for our data structure
type SwitchItem = {
    id: string
    name: string
}

type AccordionItemData = {
    id: string
    title: string
    switches: SwitchItem[]
}

// Test array simulating dynamic data
const testAccordionData: AccordionItemData[] = [
    {
        id: 'accordion1',
        title: 'Personal Information',
        switches: [
            { id: 'switch1', name: 'Share Name' },
            { id: 'switch2', name: 'Share Email' },
            { id: 'switch3', name: 'Share Phone Number' },
        ],
    },
    {
        id: 'accordion2',
        title: 'Notification Preferences',
        switches: [
            { id: 'switch4', name: 'Email Notifications' },
            { id: 'switch5', name: 'SMS Notifications' },
            { id: 'switch6', name: 'Push Notifications' },
        ],
    },
    {
        id: 'accordion3',
        title: 'Privacy Settings',
        switches: [
            { id: 'switch7', name: 'Make Profile Public' },
            { id: 'switch8', name: 'Allow Friend Requests' },
            { id: 'switch9', name: 'Show Online Status' },
        ],
    },
]

// The main component
export default function Permission({ items = testAccordionData }: { items?: AccordionItemData[] }) {
    // State to keep track of switch statuses
    const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({})
    // State to store the result of active switches
    const [activeItems, setActiveItems] = useState<string[]>([])

    // Handle switch toggle
    const handleSwitchChange = useCallback((id: string, checked: boolean) => {
        setSwitchStates(prev => ({ ...prev, [id]: checked }))
    }, [])

    // Handle send button click
    const handleSend = useCallback(() => {
        const active = Object.entries(switchStates)
            .filter(([, isActive]) => isActive)
            .map(([id]) => id)
        setActiveItems(active)
        console.log('Active switches:', Object.entries(switchStates))
    }, [switchStates])

    console.log(activeItems);

    return (
        <div className="w-full pt-3">
            <Accordion type="single" collapsible className="w-full">
                {items.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className='border-0 my-2 px-3 last:py-1 rounded-xl bg-zinc-100'>
                        <AccordionTrigger className='font-bold [&[data-state=open]]:underline'>{item.title}</AccordionTrigger>
                        <AccordionContent className='pb-0'>
                            <div className="">
                                {item.switches.map((switchItem) => (
                                    <div
                                        key={switchItem.id}
                                        className="flex items-center justify-between py-4 italic">
                                        <Label htmlFor={switchItem.id}>{
                                            switchItem.name
                                        }</Label>
                                        <Switch
                                            className='data-[state=unchecked]:!bg-gray-400'
                                            id={switchItem.id}
                                            checked={switchStates[switchItem.id] || false}
                                            onCheckedChange={(checked) => handleSwitchChange(switchItem.id, checked)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <Button onClick={handleSend} className="w-[6rem] ms-1">Send</Button>

            {activeItems.length > 0 && (
                <div className="mt-4 p-4 border rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Active Switches:</h3>
                    <ul className="list-disc pl-5">
                        {activeItems.map((id) => {
                            const item = items.find(accordion => accordion.switches.some(s => s.id === id))
                            const switchItem = item?.switches.find(s => s.id === id)
                            return (
                                <li key={id}>
                                    {switchItem?.name} (ID: {id})
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}