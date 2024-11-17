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
import axios from "axios";
import formSchema from "../../profile/accountTab/schemaEditProfile";

import { getUserAccount } from './useFetch'; // وارد کردن تابع getUserAccount
import { useSession } from '@/lib/auth/useSession'; // وارد کردن useSession
// تابع fetcher که با SWR استفاده می‌شود
import useSWR from 'swr'
const fetcher = (token) => getUserAccount(token);

interface Props {
    params: { id: string }
}

export default function ({ params: { id } }: Props) {

    const userToken = useSession();  // گرفتن توکن کاربر از useSession

    const { data, error } = useSWR(userToken, fetcher);  // دریافت داده‌ها از API

    const [switchState, setSwitchState] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<null | string>(null)
    const [userData, setUserData] = useState<[] | Promise<void> | null>(null)

    useEffect(() => setFetchError(null), [fetchError])

    type FormData = z.infer<typeof formSchema>;
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            lastname: '',
            email: '',
            phoneNumber: '',
        },
    });

    const userAvatar = watch("image")
    const { preview, previewError } = useImagePreview(userAvatar);

    const formFields = [
        { id: "name", register: register("name"), placeholder: "Json", type: "text", nameLabel: "Name" },
        { id: "lastname", register: register("lastname"), placeholder: "Json", type: "text", nameLabel: "Last Name" },
        { id: "email", register: register("email"), placeholder: "exam@gmail.com", type: "email", nameLabel: "Email" },
        { id: "phoneNumber", register: register("phoneNumber"), placeholder: "092500002524", type: "tel", nameLabel: "Phone Number" }
    ]

    useEffect(() => {
        console.log(error);
        if (data) {
            const { name, last_name, email, phone } = data;
            setSwitchState(data?.business_customer);  // به‌روزرسانی وضعیت سوییچ
            setUserData(data);  // ذخیره داده‌ها در وضعیت
            reset({
                name: name,
                lastname: last_name,
                email: email,
                phoneNumber: phone,
                image: data?.avatar,
            });
        }
    }, [data])

    const onSubmit = async (data: FormData) => {

        const file = userAvatar[0];
        const formData = new FormData();
        formData.append("avatar", file);

        console.log("🚀 ~ onSubmit ~ formData:", formData)
        console.log(userAvatar[0]);

        const { name, lastname, email, phoneNumber } = data;
        const userData = {
            name: id | data?.name,
            last_name: data?.lastname,
            email: data?.email,
            phone: data?.phoneNumber,
            avatar: formData || null,
            business_customer: switchState || false,
            is_administrator: true,
            password: "1234567",
            password_confirmation: "1234567",
        }

        try {
            console.log(userToken);
            const res = await axios.put("https://post-eco-api.liara.run/api/profile",
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            )

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
        previewError, // استفاده از پیام خطا از استیت مشترک
        errors?.name?.message,
        errors?.lastname?.message,
        errors?.email?.message,
        errors?.phoneNumber?.message,
        errors?.image?.message,
    ];


    return (
        <>
            <ErrorToast
                errorMessagesArray={errorMessages}
                dependency={errors}
                dependencyOption={previewError || fetchError}
            />
            <form className="py-5 space-y-7" onSubmit={handleSubmit(onSubmit)}>

                <div className="relative size-14 ">

                    <input
                        className="z-10 size-full appearance-none bg-transparent opacity-0 absolute inset-0 cursor-pointer"
                        type="file"
                        accept="image/*"
                        {...register("image")}
                    />

                    <Avatar className="cursor-pointer relative z-0 size-full">
                        <AvatarImage
                            src=
                            {
                                `${userData?.avatar || preview || 'https://github.com/shadcn.png'}`
                            }
                            className="object-cover" />
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
                        defaultChecked={switchState}
                        // checked={}
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
    )
}