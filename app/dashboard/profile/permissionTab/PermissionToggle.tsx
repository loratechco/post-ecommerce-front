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
import React from "react"

interface Props {
    form: any;
    fomrLabel: string;
    formDescription: string;
    id: number | string;
    checkedValue: boolean;
}

function PermissionToggle(
    {
        form,
        fomrLabel,
        id,
        formDescription,
        checkedValue
    }: Props) {

    return (

        <div className="space-y-3" key={id + 'div'}>
            <FormField

                control={form.control}
                name={fomrLabel}
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between w-full py-3 px-2 border-b">
                        <div className="space-y-0.5">
                            <FormLabel>{fomrLabel}</FormLabel>
                            <FormDescription>
                                {formDescription}
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                defaultChecked={checkedValue}
                                onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    console.log(field.name);
                                    console.log(field.value);
                                }}

                                id={id}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>

    );
}

export default React.memo(PermissionToggle);