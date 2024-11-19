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
const fetcher = (token) => getUserAccount(token);

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

    const formFields = [
        { id: "name", register: register("name"), placeholder: "Json", type: "text", nameLabel: "Name" },
        { id: "last_name", register: register("last_name"), placeholder: "Json", type: "text", nameLabel: "Last Name" },
        { id: "email", register: register("email"), placeholder: "exam@gmail.com", type: "email", nameLabel: "Email" },
        { id: "phone", register: register("phone"), placeholder: "092500002524", type: "tel", nameLabel: "Phone Number" }
    ]

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
        // ایجاد یک FormData برای ارسال داده‌ها
        const formData = new FormData();

        // افزودن تصویر (در صورت وجود) به FormData
        if (userAvatar?.[0]) {
            formData.append("avatar", userAvatar[0]);
        }

        // افزودن سایر داده‌های فرم به صورت جداگانه
        formData.append("name", data?.name);
        formData.append("last_name", data?.last_name);
        formData.append("email", data?.email);
        formData.append("phone", data?.phone);
        formData.append("business_customer", '0');
        formData.append("is_administrator", '0');

        // چاپ محتویات FormData برای بررسی
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        // console.log(formData);
        try {
            console.log(userToken);

            // ارسال درخواست به بک‌اند
            const res = await axios.put(
                "http://app.api/api/profile",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${userToken}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            console.log("🚀 ~ onSubmit ~ res:", res);

            // پاک‌سازی کش و دریافت دوباره اطلاعات
            mutate(userToken);

            if (res.status !== 200) throw res;
        } catch (error) {
            // مدیریت خطاها
            setFetchError(error?.response?.data?.message);
            console.log(error?.response);
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
    );
}

export default React.memo(Account);
