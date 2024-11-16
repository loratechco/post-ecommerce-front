"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import PermissionToggle from "./PermissionToggle"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import React, { ElementType, ReactNode, useEffect, useMemo, useState } from "react"
// this is token context
import { useSession } from "@/lib/auth/useSession";
import axios from "axios"
const FormSchema = z.object({
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
})

import useSWR from 'swr';
// const fetcher = (...args) => fetch(...args).then((res) => res.json())


function Permission() {
    const [accrdionComponent, setAccrdionComponent] = useState(null)
    const token = useSession()
    // const { data, error } = useSWR('/api/profile-data', fetcher)

    const form = useForm<z.infer<typeof FormSchema>>({})

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("🚀 ~ onSubmit ~ data:", data?.id)

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }
    const accordionData = [
        {
            id: 1, // اضافه کردن آیدی منحصر به فرد برای کتابخانه
            title: "Accordion One",
            items: [
                { label: "Item One", description: "Description for Item One", id: 1, value: false },
                { label: "Item Two", description: "Description for Item Two", id: 2, value: false },
                { label: "Item Three", description: "Description for Item Three", id: 3, value: false }
            ]
        },

        {
            id: 2, // آیدی منحصر به فرد برای این کتابخانه
            title: "Accordion Two",
            items: [
                { label: "Item One", description: "Description for Item One", id: 4, value: false },
                { label: "Item Two", description: "Description for Item Two", id: 5, value: false },
                { label: "Item Three", description: "Description for Item Three", id: 6, value: false }
            ]
        },
        {
            id: 3,
            title: "Accordion Three",
            items: [
                { label: "Item One", description: "Description for Item One", id: 7, value: false },
                { label: "Item Two", description: "Description for Item Two", id: 8, value: false },
                { label: "Item Three", description: "Description for Item Three", id: 9, value: false }
            ]
        },
        {
            id: 4,
            title: "Accordion Four",
            items: [
                { label: "Item One", description: "Description for Item One", id: 10, value: false },
                { label: "Item Two", description: "Description for Item Two", id: 11, value: false },
                { label: "Item Three", description: "Description for Item Three", id: 12, value: false }
            ]
        },
        {
            id: 5,
            title: "Accordion Five",
            items: [
                { label: "custom Item", description: "Description for Item One", id: 13, value: true },
                { label: "Item Two", description: "Description for Item Two", id: 14, value: false },
                { label: "Item Three", description: "Description for Item Three", id: 15, value: false }
            ]
        }
    ];

    // useEffect(() => {
    //     const getAccordionDataItems = async () => {

    //         try {
    //             const res = await axios.get('https://post-eco-api.liara.run/api/permissions',
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             )
    //             if (res?.status >= 200 && res?.status < 300) {
    //                 return res;
    //             }

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     getAccordionDataItems().then((res => {
    //         console.log("🚀 ~ result ~ res:", res?.data)
    //         const array: string[] = res?.data?.[""];
    //         setDataAccordionItems(array);
    //         console.log(array);

    //     })).catch((error => {
    //         console.log("��� ~ error ~ error:", error)
    //         toast({
    //             description: "Your message has been sent.",
    //         })
    //         return null;
    //     }))
    // }, [token])

    const memoizedAccordionData = useMemo(() => {
        console.log(852);
        return accordionData.map((itemsAccordion, index) => (
            <AccordionItem
                value={`${index}-item`}
                key={itemsAccordion.id}
                className="w-full"
            >
                <AccordionTrigger className="w-full">{itemsAccordion?.title}</AccordionTrigger>
                <AccordionContent className="w-full">
                    {
                        itemsAccordion?.items?.map((accordionContent) => (
                            <PermissionToggle
                                form={form}
                                fomrLabel={accordionContent?.label}
                                formDescription={accordionContent?.description}
                                id={accordionContent?.id}
                                checkedValue={accordionContent?.value}
                                key={accordionContent?.id}
                            />
                        ))
                    }
                </AccordionContent>
            </AccordionItem>
        ));
    }, [accordionData, form]); // محاسبه مجدد زمانی که فرم تغییر می‌کند.


    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <Accordion type="single" collapsible className="w-full">
                    {memoizedAccordionData}
                </Accordion>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default Permission;