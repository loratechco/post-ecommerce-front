'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { useSession } from '@/lib/auth/useSession'
import { useToast } from "@/hooks/use-toast";
import { getUserPermissions } from '@/app/actions/userActions'


// The main component
export default function Permission({ userId }: { userId: string }) {
    const { toast } = useToast();
    const token = useSession();

    const [accordionData, setAccordionData] = useState<JSX.Element[] | null>(null)
    const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({})
    const [activeItems, setActiveItems] = useState<string[]>([])

    // Handle switch toggle
    const handleSwitchChange = useCallback((id: string, checked: boolean) => {
        setSwitchStates(prev => ({ ...prev, [id]: checked }))
    }, [])

    // Handle send button click
    const handleSend = useCallback(async () => {
        const active = Object.entries(switchStates)
            .filter(([, isActive]) => isActive)
            .map(([id]) => id)
        setActiveItems(active)

        const activeToggle = active.map((id) => {
            return id;
        })
        try {
            const res = await axios.post('http://app.api/api/permissions/assign-to-user',
                {
                    permissions: activeToggle
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })

            toast({
                description: res.data,
                duration: 3000,
                className: "bg-green-200 text-green-800",
            });

            console.log(res?.data);

        } catch (error) {
            toast({
                description: error?.response?.data?.message,
                duration: 3000,
                className: "bg-red-200 text-red-800",
            });
            console.log(error);
        }

    }, [switchStates])

    useEffect(() => {
        getUserPermissions(userId)
            .then((data) => setAccordionData(data));
    }, [userId]);

    console.log(accordionData);

    const dynamicAccordionItem = useMemo(() => {

        if (accordionData) {
            console.log(activeItems);
            console.log(accordionData);
            return accordionData?.map((item) => (
                <AccordionItem key={item.id} value={item.id} className='border-0 my-2 px-3 last:py-1 rounded-xl bg-[#e4e4e7]'>
                    <AccordionTrigger className='font-bold [&[data-state=open]]:underline'>{item.title}</AccordionTrigger>
                    <AccordionContent className='pb-0'>
                        <div className="">
                            {item?.switches.map((switchItem) => (
                                <div
                                    key={switchItem.id}
                                    className="flex items-center justify-between py-4 italic">
                                    <Label htmlFor={switchItem.id} className='cursor-pointer select-none'>{
                                        switchItem.name
                                    }</Label>
                                    <Switch
                                        className='data-[state=unchecked]:!bg-gray-400'
                                        id={switchItem.id}
                                        // checked={switchStates[switchItem.id] || false}
                                        onCheckedChange={(checked) => handleSwitchChange(switchItem.id, checked)}
                                    />
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))
        }

    }, [accordionData, handleSwitchChange])

    return (
        <div className="w-full pt-3">
            <Accordion type="single" collapsible className="w-full">
                {dynamicAccordionItem}
            </Accordion>

            <Button onClick={handleSend} className="w-[6rem] mt-3">Send</Button>
        </div>
    )
}