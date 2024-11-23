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
import formSchema from "./schemaEditProfile";

import { getUserAccount } from './useFetch'; // وارد کردن تابع getUserAccount
import { useSession } from '@/lib/auth/useSession'; // وارد کردن useSession
// تابع fetcher که با SWR استفاده می‌شود
import useSWR, { mutate } from 'swr'
import { toast } from "@/hooks/use-toast";
const fetcher = (token) => getUserAccount(token);


const formFields = [
    { id: "name", placeholder: "Json", type: "text", nameLabel: "Name" },
    { id: "last_name", placeholder: "Json", type: "text", nameLabel: "Last Name" },
    { id: "email", placeholder: "exam@gmail.com", type: "email", nameLabel: "Email" },
    { id: "phone", placeholder: "092500002524", type: "tel", nameLabel: "Phone Number" }
]
const formFieldsPassword = [
    { id: "newPassword", placeholder: "least 6 characters long", type: "password", nameLabel: "New Password" },
    { id: "confirmation", placeholder: "least 6 characters long", type: "password", nameLabel: "Confirmation Password" }
]

function Account() {

    const userToken = useSession();  // گرفتن توکن کاربر از useSession

    const { data, error } = useSWR(
        userToken ? ['account-data', userToken] : null,
        ([_, token]) => fetcher(token) // ترتیب پارامترها مطابق تعریف
    );

    const [switchState, setSwitchState] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<null | string>(null)
    const [userData, setUserData] = useState<[] | Promise<void> | null>(null)

    useEffect(() => setFetchError(null), [fetchError])

    type FormData = z.infer<typeof formSchema>;
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            last_name: '',
            email: '',
            phone: '',
        },
    });

    const userAvatar = watch("image")
    const { preview, previewError } = useImagePreview(userAvatar);

    // get data from api
    useEffect(() => {
        console.log(error);
        if (data) {
            const { name, last_name, email, phone } = data;
            setSwitchState(data?.business_customer);  // به‌روزرسانی وضعیت سوییچ
            setUserData(data);  // ذخیره داده‌ها در وضعیت
            reset({
                ...data,
                image: data?.avatar,
            });
        }
    }, [data])


    //PUT User Data
    const onSubmit = async (data: FormData) => {
        // Create FormData instance
        const formData = new FormData();

        // Handle avatar upload
        if (userAvatar?.[0]) {
            formData.append("avatar", userAvatar[0]);
        }

        // Add form data fields
        Object.entries({
            name: data.name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            business_customer: switchState ? '1' : '0',
            is_administrator: '0'
        }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.append('_method', 'PUT');
        try {
            const res = await axios.put('http://app.api/api/profile', formData, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                }
            });

            console.log("🚀 ~ onSubmit ~ res:", res);

            // Show success message
            toast({
                description: res?.data?.message || "Profile updated successfully",
                className: "bg-green-300 text-green-950 font-semibold",
            });

            // Refresh data
            mutate(userToken);

        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Error updating profile";
            setFetchError(errorMessage);
            console.log("🚀 ~ onSubmit ~ error:", error?.response?.data);

            toast({
                description: errorMessage,
                className: "bg-red-300 text-red-950 font-semibold",
            });
        }
    };


    const errorMessages = [
        fetchError,
        previewError, // استفاده از پیام خطا از استیت مشترک
        errors?.name?.message,
        errors?.last_name?.message,
        errors?.email?.message,
        errors?.phone?.message,
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
                    {formFields?.map((field) => (
                        <FormInput
                            key={field?.id}
                            id={field?.id}
                            placeholder={field?.placeholder}
                            type={field?.type}
                            nameLabel={field?.nameLabel}
                            register={register(field?.id)}
                            className="w-full border-gray-400"
                        />
                    ))
                    }
                </div>

                <div className="flex items-center space-x-2">
                    <Switch
                        checked={switchState}
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
