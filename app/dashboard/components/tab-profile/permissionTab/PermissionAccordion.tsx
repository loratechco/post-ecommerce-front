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
import useSWR from 'swr'
import { useToast } from "@/hooks/use-toast"
import AccardionSkeleton from '@/components/skeletons/AccardionSkeleton'

// تعریف تایپ‌ها
type SwitchItem = {
    id: string;
    name: string;
    can: boolean;
}

type AccordionItem = {
    id: string;
    title: string;
    switches: SwitchItem[];
}

const dataFetcher = async (url: string, userToken: string) => {
    try {
        const res = await axios.post(url, { user_id: 0 }, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export default function Permission() {
    const { toast } = useToast();
    const { token } = useSession();

    const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({});
    const [initialStateSet, setInitialStateSet] = useState(false);
    const [activeInit, setActiveInit] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { data: accordionData, error } = useSWR<AccordionItem[]>(
        token ? ['permission-data', `http://app.api/api/permissions`] : null,
        ([_, url]) => dataFetcher(url, token),
        {
            errorRetryCount: 2,
            onSuccess: () => setIsLoading(false)
        }
    );

    // تنظیم وضعیت اولیه سوییچ‌ها
    useEffect(() => {
        if (!initialStateSet && accordionData && Array.isArray(accordionData)) {
            const initialSwitchStates: Record<string, boolean> = {};

            accordionData?.forEach(item => {
                if (!Array.isArray(item?.switches)) return;

                item?.switches?.forEach(switchItem => {
                    initialSwitchStates[switchItem.id] = switchItem?.can || false;
                });
            });

            setSwitchStates(initialSwitchStates);
            setInitialStateSet(true);

            console.log('Initial switch states:', initialSwitchStates);
        }
    }, [accordionData, initialStateSet]);

    // Handle switch toggle
    const handleSwitchChange = (id: string, checked: boolean) => {
        setSwitchStates(prev => {
            const newState = { ...prev, [id]: checked };
            return newState;
        });
    }

    // Handle send button click
    const handleSend = useCallback(async () => {
        const activePermissions = Object.entries(switchStates)
            .filter(([, isActive]) => isActive)
            .map(([id]) => id);

        console.log("Active permissions to send:", activePermissions);

        try {
            const res = await axios.post('http://app.api/api/permissions/assign-to-user',
                {
                    permissions: activePermissions
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

            toast({
                description: res?.data?.message || 'oky',
                duration: 3000,
                className: "bg-green-200 text-green-800",
            });

        } catch (error: any) {
            toast({
                description: error?.response?.data?.message || "Failed to assign permissions",
                duration: 3000,
                className: "bg-red-200 text-red-800",
            });
            console.error(error);
        }
    }, [switchStates, token, toast]);

    const dynamicAccordionItem = useMemo(() => {
        if (!accordionData) return null;

        return accordionData.map((item) => (
            <AccordionItem
                key={item.id}
                value={item.id}
                className='border-0 my-2 px-3 last:py-1 rounded-xl bg-[#e4e4e7]'
            >
                <AccordionTrigger className='font-bold [&[data-state=open]]:underline'>
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className='pb-0'>
                    <div className="">
                        {item?.switches?.map((switchItem) => (
                            <div
                                key={switchItem?.id}
                                className="flex items-center justify-between py-4 italic"
                            >
                                <Label
                                    htmlFor={switchItem?.id}
                                    className='cursor-pointer select-none'
                                >
                                    {switchItem?.name}
                                </Label>
                                <Switch
                                    className='data-[state=unchecked]:!bg-gray-400'
                                    id={switchItem.id}
                                    checked={switchStates[switchItem.id] ?? false}
                                    onCheckedChange={(checked) =>
                                        handleSwitchChange(switchItem.id, checked)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        ));
    }, [accordionData, switchStates, handleSwitchChange]);


    return (
        <div className="w-full pt-3">
            <Accordion type="single" collapsible className="w-full">
                {isLoading ? <AccardionSkeleton /> : dynamicAccordionItem}
            </Accordion>
            <Button
                onClick={handleSend}
                className="w-[6rem] mt-3"
                disabled={isLoading || !initialStateSet}
            >
                Send
            </Button>
        </div>
    );
}