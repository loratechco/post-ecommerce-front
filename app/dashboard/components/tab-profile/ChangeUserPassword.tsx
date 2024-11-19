"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import ErrorToast from "@/components/ErrorToast";
import FormInput from "@/components/FormInput";
import { formSchema } from "./passwordShema";

import useSWR from "swr";
import axios from "axios";
import { useSession } from "@/lib/auth/useSession";
import { useEffect } from "react";


import { useToast } from "@/hooks/use-toast";
export default function ChangePassword() {
    type FormData = z.infer<typeof formSchema>;
    const token = useSession()
    const { toast } = useToast();


    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const formFields = [
        { id: "oldPassword", register: register("oldPassword"), nameLabel: "Old Password" },
        { id: "newPassword", register: register("newPassword"), nameLabel: "New Password" },
        { id: "confirmation", register: register("confirmation"), nameLabel: "Confirmation Password" },
    ]

    const onSubmit = async ({
        confirmation: password_confirmation,
        newPassword: password,
        oldPassword: old_password

    }: FormData) => {

        try {
            const res = await axios.put('http://app.api/api/profile/change-password',
                {
                    old_password,
                    password,
                    password_confirmation
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

            toast({
                description: res?.data?.message,
                duration: 3000,
                className: "bg-green-400 text-green-950",
            });
            console.log(res.data);

        } catch (error) {
            toast({
                description: error?.response?.data?.message,
                duration: 3000,
                className: "bg-red-200 text-red-800",
            });
        }

    };

    const errorMessages = [
        errors?.confirmation?.message,
        errors?.newPassword?.message,
        errors?.oldPassword?.message,
    ]
    return (

        <form className="py-5 " onSubmit={handleSubmit(onSubmit)}>

            <ErrorToast
                errorMessagesArray={errorMessages}
                dependency={errors}
            />

            <div className="size-full space-y-3">
                {formFields.map((field) => (
                    <FormInput
                        key={field?.id}
                        id={field?.id}
                        type='password'
                        nameLabel={field?.nameLabel}
                        register={field?.register}
                        className="border-none"
                        placeholder="least 6 characters long"
                        classNameParentPasswordInput='w-full lg:w-1/2'
                    />
                ))}
            </div>

            <Button type="submit" variant='default' className="mt-5" disabled={isSubmitting}>
                Save Changes
            </Button>
        </form>
    )
}
