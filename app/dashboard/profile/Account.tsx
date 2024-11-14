"use client"
import FormInput from "@/components/FormInput";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form";
import ErrorToast from "@/components/ErrorToast";
import React, { useEffect, useState } from "react";
import useImagePreview from "./useImagePrwie";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getData, postData } from "@/app/lib/fetchMethod";
import axios from "axios";

function Account({ userToken }: { userToken: string | null }) {
    const [switchState, setSwitchState] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<null | string>(null)
    useEffect(() => setFetchError(null), [fetchError])

    const formSchema = z.object({
        name: z.string()
            .min(2, { message: "Name must be at least 2 characters long" })
            .max(30, { message: "Name must be less than 30 characters" }),

        lastname: z.string()
            .min(2, { message: "Last name must be at least 2 characters long" })
            .max(30, { message: "Last name must be less than 30 characters" }),

        email: z.string()
            .email({ message: "Please enter a valid email address" }),

        "phoneNumber": z.string()
            .regex(/^09\d{9}$/, { message: "Phone number must be in the format 09XXXXXXXXX" }),
    });

    type FormData = z.infer<typeof formSchema>;
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const { preview, error } = useImagePreview(
        watch("image")
    );


    const formFields = [
        { id: "name", register: register("name"), placeholder: "Json", type: "text", nameLabel: "Name" },
        { id: "lastname", register: register("lastname"), placeholder: "Json", type: "text", nameLabel: "Last Name" },
        { id: "email", register: register("email"), placeholder: "exam@gmail.com", type: "email", nameLabel: "Email" },
        { id: "phoneNumber", register: register("phoneNumber"), placeholder: "092500002524", type: "tel", nameLabel: "Phone Number" }
    ]

    const onSubmit = async (data: FormData) => {
        const userData = {
            name: data?.name,
            last_name: data?.lastname,
            email: data?.email,
            phone: data?.phoneNumber,
            avatar: preview || false,
            business_customer: switchState || false,
            is_administrator: true,
        }

        try {
            console.log(userToken);
            const res = await axios.post("https://post-eco-api.liara.run/api/profile", {
                userData,
                headers: {
                    Authorization: `Bearer${userToken}`,
                },
            })
            console.log("🚀 ~ onSubmit ~ res:", res)

            if (res.status !== 200)
                throw res;

        } catch (error) {
            setFetchError(error?.response?.data?.message)
            console.log(error?.response?.data?.message);
        }

    };

    const errorMessages = [
        fetchError,
        error, // استفاده از پیام خطا از استیت مشترک
        errors?.name?.message,
        errors?.lastname?.message,
        errors?.email?.message,
        errors?.phoneNumber?.message,
        errors?.image?.message,
    ];

    return (
        <>
            <form className="py-5 space-y-7" onSubmit={handleSubmit(onSubmit)}>

                <ErrorToast
                    errorMessagesArray={errorMessages}
                    dependency={errors}
                    dependencyOption={error || fetchError}
                />
                <div className="relative size-14 ">
                    <input
                        className="z-10 size-full appearance-none bg-transparent opacity-0 absolute inset-0 cursor-pointer"
                        type="file"
                        accept="image/*"
                        capture="user"
                        {...register("image")}
                    />

                    <Avatar className="cursor-pointer relative z-0 size-full">
                        <AvatarImage src={`${preview || 'https://github.com/shadcn.png'}`} className="object-cover" />
                        <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                </div>

                <div className="grid gap-7 grid-cols-2 max-lg:grid-cols-1">
                    {formFields.map((field) => (
                        <FormInput
                            key={field?.id}
                            id={field?.id}
                            placeholder={field?.placeholder}
                            type={field?.type}
                            nameLabel={field?.nameLabel}
                            register={field?.register}
                            className="w-full border-gray-400"
                        />
                    ))
                    }
                </div>

                <div className="flex items-center space-x-2">
                    <Switch
                        defaultChecked={false}
                        // checked={false}
                        // disabled={true}
                        onCheckedChange={(checked) => {
                            setSwitchState(checked);
                            console.log("🚀 ~ Account ~ checked:", switchState)
                        }}
                        id="busines-customer"
                        className="data-[state=unchecked]:!bg-gray-400 data-[state=checked]:!bg-gray-800" />
                    <Label htmlFor="busines-customer" className="cursor-pointer">Busines Customer</Label>
                </div>

                <div className="">
                    <label className="block pb-2 text-sm">Save profile changes</label>
                    <Button className="px-5 border border-gray-400 bg-gray-300 hover:bg-gray-400 text-black font-semibold"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Submit
                    </Button>
                </div>

            </form>

        </>
    );
}

export default React.memo(Account);
