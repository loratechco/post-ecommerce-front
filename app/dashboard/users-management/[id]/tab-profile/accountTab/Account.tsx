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
import { toast } from "@/hooks/use-toast";

const formFields = [
    { id: "name", placeholder: "Json", type: "text", nameLabel: "Name" },
    { id: "last_name", placeholder: "Json", type: "text", nameLabel: "Last Name" },
    { id: "email", placeholder: "exam@gmail.com", type: "email", nameLabel: "Email" },
    { id: "phone", placeholder: "092500002524", type: "tel", nameLabel: "Phone Number" },
    { id: "newPassword", nameLabel: "New Password", type: 'password' },
    { id: "confirmation", nameLabel: "Confirmation Password", type: 'password' },
]

function Account({ userId, userToken }: { userId: string, userToken: string }) {

    const [switchState, setSwitchState] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<null | string>(null)
    const [userData, setUserData] = useState<[] | Promise<void> | null>([])

    const idCondition = (userId === 'create-user')
    useEffect(() => setFetchError(null), [fetchError])

    type FormData = z.infer<typeof formSchema>;
    const { register, handleSubmit, watch, reset, getValues, formState: { errors, isSubmitting }, control } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            last_name: '',
            email: '',
            phone: '',
            newPassword: '',
            confirmation: '',
        },
    });

    const userAvatar = watch("image")
    const { preview, previewError } = useImagePreview(userAvatar);

    console.log("🚀 ~ useEffect ~ userId:", userId)

    // get user data
    useEffect(() => {
        if (userId === 'create-user') {
            setUserData([]);
            return
        };
        const getUser = async () => {

            try {
                const { data } = await axios.get(`http://app.api/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                })

                console.log("🚀 ~ getUser ~ res:", data)

                const { business_customer } = data?.data;

                setSwitchState(business_customer == 1 && true || false);  // به‌روزرسانی وضعیت سوییچ

                setUserData(data);  // ذخیره داده‌ها در وضعیت
                reset({
                    ...data?.data
                });

            } catch (error) {
                console.log(error);
                console.log("🚀 ~ getUser ~ error:", error.response.data.message)
            }
        }
        getUser();
    }, [])

    console.log(getValues("newPassword"));

    const onSubmit = async (data: FormData) => {
        console.log("فرم سابمیت شد:", data);
        const formData = new FormData();

        console.log("آواتار:", userAvatar);
        // افزودن آواتار
        if (userAvatar?.[0]) {
            formData.append("avatar", userAvatar[0]);
        }

        // ایجاد آبجکت اولیه با فیلدهای اجباری
        const formDataObject: Record<string, string> = {
            name: data.name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            business_customer: switchState ? '1' : '0',
            is_administrator: '0',
        };

        // فقط اگر پسورد جدید وارد شده و خالی نباشد، آن را اضافه کن
        if (data.newPassword && data.confirmation) {
            console.log("پسورد اضافه شد به فرم");
            formDataObject.password = data.newPassword;
            formDataObject.password_confirmation = data.confirmation;
        }

        console.log(formDataObject);
        // افزودن داده‌ها به formData
        Object.entries(formDataObject).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                formData.append(key, value);
            }
        });

        // برای دیباگ
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        console.log("پسورد:", data.newPassword);
        console.log("تایید پسورد:", data.confirmation);

        try {
            const endpoint = (idCondition ? '' : `/${userId}`);
            console.log("🚀 ~ onSubmit ~ endpoint:", endpoint)
            const res = await axios.post(
                `http://app.api/api/users${endpoint}`,
                formData,
                {
                    headers: {
                        method: 'POST',
                        "Authorization": `Bearer ${userToken}`,
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json"
                    }
                }
            );

            toast({
                title: "Successfully",
                description: res?.data?.message || "Profile updated successfully",
                className: "bg-green-300 text-green-950 font-semibold",
            });

            console.log(res);

        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "خطا در بروزرسانی پروفایل";
            setFetchError(errorMessage);
            console.error("خطای دریافتی:", error.response?.data);

            toast({
                description: errorMessage,
                className: "bg-red-300 text-red-950 font-semibold",
            });
        }
    };

    console.log(userData?.data?.avatar);

    return (
        <>
            <ErrorToast
                errorMessagesArray={[
                    previewError,
                    errors?.name?.message,
                    errors?.last_name?.message,
                    errors?.email?.message,
                    errors?.phone?.message,
                    errors?.newPassword?.message,
                    errors?.confirmation?.message,
                ]}
                dependency={errors}
                dependencyOption={previewError || fetchError}
            />
            <form className="py-5 space-y-7" onSubmit={handleSubmit(onSubmit)}>

                {
                    idCondition && (
                        <div className="">
                            <h1 className="text-2xl font-semibold">Create new User</h1>
                        </div>
                    )
                }
                {!idCondition && (
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
                                    `${userData?.data?.avatar || preview || 'https://github.com/shadcn.png'}`
                                }
                                className="object-cover" />
                            <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                    </div>)}

                <div className="grid gap-7 grid-cols-2 max-lg:grid-cols-1">
                    {formFields.map((field) => (
                        <FormInput
                            key={field?.id}
                            id={field?.id}
                            placeholder={field?.placeholder}
                            type={field?.type}
                            nameLabel={field?.nameLabel}
                            register={register(field?.id as "name" | "last_name" | "email" | "phone")}
                            className="w-full"
                        />
                    ))
                    }
                </div>

                <div className="flex items-center space-x-2">
                    <Switch
                        // defaultChecked={switchState}
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
