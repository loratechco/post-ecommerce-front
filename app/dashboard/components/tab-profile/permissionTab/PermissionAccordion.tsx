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
import useSWR, { mutate } from 'swr'
import { useToast } from "@/hooks/use-toast";

const dataFetcher = async (url: string, userToken: string) => {

    console.log(userToken);
    try {
        const res = await axios.post(url, { user_id: 0 }, {

            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // بازگرداندن خطا برای مدیریت توسط SWR
    }
};

// The main component
export default function Permission() {
    const { toast } = useToast();

    const token = useSession();
    console.log("🚀 ~ Permission ~ token:", token)

    const { data, error, isLoading } = useSWR(
        token ? ['permission-data', `http://app.api/api/permissions`] : null,
        ([_, url]) => dataFetcher(url, token),
        {
            errorRetryCount: 2
        }
    );

    console.log("🚀 ~ Permission ~ data:", error, 'isLoading ====>>', isLoading)

    const [accordionItemComponent, setAccordionItemComponent] = useState<JSX.Element[] | null>(null)
    const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({})
    const [activeItems, setActiveItems] = useState<string[]>([])

    const [activeInit, setActiveInit] = useState([])

    // Handle switch toggle
    const handleSwitchChange = useCallback((id: string, checked: boolean) => {
        setSwitchStates(prev => ({ ...prev, [id]: checked }))
    }, [])

    // Handle send button click
    const handleSend = useCallback(async () => {

        console.log(switchStates);
        const active = Object.entries(switchStates)
            .filter(([, isActive]) => isActive)
            .map(([id]) => id)
        setActiveItems(active)

        const activeToggle = active.map((id) => {
            return id;
        })
        console.log("🚀 ~ activeToggle ~ activeToggle:", ...activeInit)
        try {
            const res = await axios.post('http://app.api/api/permissions/assign-to-user',
                {
                    permissions: [...activeToggle, ...activeInit]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })


            toast({
                description: res?.data?.message || 'oky',
                duration: 3000, // نمایش به مدت ۳ ثانیه
                className: "bg-green-200 text-green-800", // استایل توستر
            });

        } catch (error) {
            toast({
                description: error?.response?.data?.message || "Failed to assign permissions. Please try again.",
                duration: 3000,
                className: "bg-red-200 text-red-800",
            });
            console.log(error);
        }

    }, [switchStates, activeInit])


    useEffect(() => {
        if (data) {
            data?.forEach(item => {
                const activeSwitchIds = item.switches
                    .filter(switchObj => switchObj.can === true)
                    .map(switchObj => switchObj.id);

                // لاگ گرفتن سوییچ‌های فعال
                if (activeSwitchIds.length > 0) {
                    console.log(`Active switches for item ${item.id}:`, activeSwitchIds);

                    setActiveInit(activeSwitchIds)
                }
            });
        }
    }, [data]);

    const dynamicAccordionItem = useMemo(() => {

        console.log(data, error);

        if (data) {
            console.log(activeItems);
            console.log(data);
            return data?.map((item) => (
                <AccordionItem key={item.id} value={item.id} className='border-0 my-2 px-3 last:py-1 rounded-xl bg-[#e4e4e7]'>
                    <AccordionTrigger className='font-bold [&[data-state=open]]:underline'>{item.title}</AccordionTrigger>
                    <AccordionContent className='pb-0'>
                        <div className="">
                            {item?.switches?.map((switchItem) => (
                                <div
                                    key={switchItem?.id}
                                    className="flex items-center justify-between py-4 italic">
                                    <Label htmlFor={switchItem?.id} className='cursor-pointer select-none'>{
                                        switchItem?.name
                                    }</Label>
                                    <Switch
                                        className='data-[state=unchecked]:!bg-gray-400'
                                        id={switchItem.id}
                                        defaultChecked={switchItem?.can || false}
                                        onCheckedChange={(checked) => handleSwitchChange(switchItem?.id, checked)}
                                    />
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))
        }

    }, [data, handleSwitchChange])

    return (
        <div className="w-full pt-3">
            <Accordion type="single" collapsible className="w-full">
                {dynamicAccordionItem}
            </Accordion>

            <Button onClick={handleSend} className="w-[6rem] mt-3">Send</Button>
        </div>
    )
}