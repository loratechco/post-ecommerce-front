"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

function PermissionToggle({ form, fomrLabel, id, formDescription }: { form: any, fomrLabel: string, formDescription: string, id: number | string, }) {

    return (

        <div className="space-y-3">
            <FormField
                key={id}
                control={form.control}
                name="marketing_emails"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between p-3 border-b">
                        <div className="space-y-0.5">
                            <FormLabel>{fomrLabel}</FormLabel>
                            <FormDescription>
                                {formDescription}
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>

    );
}

export default PermissionToggle;