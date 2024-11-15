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
import { useEffect, useState } from "react"
// this is token context
import { useSession } from "@/lib/auth/useSession";
import axios from "axios"
const FormSchema = z.object({
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
})


import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Permission() {

    const token = useSession()
    const [dataAccordionItems, setDataAccordionItems] = useState(["test1", "test2"]);

    const { data, error } = useSWR('/api/profile-data', fetcher)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            security_emails: true,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    useEffect(() => {
        const getAccordionDataItems = async () => {

            try {
                const res = await axios.get('https://post-eco-api.liara.run/api/permissions',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                if (res?.status >= 200 && res?.status < 300) {
                    return res;
                }

            } catch (error) {
                console.log(error);
            }
        }

        getAccordionDataItems().then((res => {
            console.log("🚀 ~ result ~ res:", res?.data)
            const array: string[] = res?.data?.[""];
            setDataAccordionItems(array);
            console.log(array);

        })).catch((error => {
            console.log("��� ~ error ~ error:", error)
            toast({
                description: "Your message has been sent.",
            })
            return null;
        }))
    }, [token])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <Accordion type="single" collapsible className="w-full">

                    <AccordionItem value="item-1">
                        <AccordionTrigger>Email Notifications</AccordionTrigger>
                        <AccordionContent>

                            <PermissionToggle
                                form={form}
                            />
                        </AccordionContent>
                    </AccordionItem>

                    {
                        dataAccordionItems?.map((items, index) => (
                            <AccordionItem value={`${index}-item`} key={index}>
                                <AccordionTrigger>{items}</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It comes with default styles that matches the other
                                    components&apos; aesthetic.
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }


                </Accordion>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default Permission;