"use client"
import FormInput from "@/components/FormInput";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form";
import ErrorToast from "@/components/ErrorToast";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import formSchema from "./schemaEditProfile";

import { getUserAccount } from './useFetch'; // وارد کردن تابع getUserAccount
import { useSession } from '@/lib/auth/useSession'; // وارد کردن useSession
import { toast } from "@/hooks/use-toast";
import { useImageUpload } from './useImagePrwie';

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
    const [data, setData] = useState<[] | null>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserAccount(userToken);
                setData(response);
            } catch (error) {
                toast({
                    description: error?.response?.data?.message || "خطا در دریافت اطلاعات",
                    className: "bg-red-300 text-red-950 font-semibold",
                });
            }
        };

        if (userToken) {
            fetchData();
        }
    }, [userToken]);

    const [switchState, setSwitchState] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<null | string>(null)
    const [userData, setUserData] = useState<[] | Promise<void> | null>(null)
    useEffect(() => setFetchError(null), [fetchError])

    // تعریف type برای فرم
    type FormData = z.infer<typeof formSchema> & {
        image: FileList | null;
    };

    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            last_name: '',
            email: '',
            phone: '',
            image: null,
        },
    });
    const userAvatar = watch("image");
    const { avatarPreview, handleImageUpload } = useImageUpload(userAvatar);

    // get data from api
    useEffect(() => {
        if (data) {
            setSwitchState(data?.business_customer);  // به‌روزرسانی وضعیت سوییچ
            setUserData(data);  // ذخیره داده‌ها در وضعیت
            reset({
                ...data,
                image: data?.avatar,
            });
        }
    }, [data])

    //Post User Data
    const onSubmit = async (data: FormData) => {
        const formData = new FormData();
        const selectedImg = handleImageUpload(userAvatar?.[0]);

        // Handle avatar upload
        if (!selectedImg?.error) {
            formData.append("avatar", selectedImg?.fileData as File)
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

        try {
            const res = await axios.post('http://app.api/api/profile', formData, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                }
            });

            // Show success message
            toast({
                description: res?.data?.message || "Profile updated successfully",
                className: "bg-green-300 text-green-950 font-semibold",
            });

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

    return (
        <>
            <ErrorToast
                errorMessagesArray={[
                    fetchError,
                    errors?.name?.message,
                    errors?.last_name?.message,
                    errors?.email?.message,
                    errors?.phone?.message,
                    errors?.image?.message,
                ]}
                dependency={errors}
                dependencyOption={fetchError}
            />
            <form className="py-5 space-y-7" onSubmit={handleSubmit(onSubmit)}>

                <div className="relative size-14 ">

                    <input
                        className="z-10 size-full appearance-none bg-transparent opacity-0 absolute inset-0 cursor-pointer"
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (file.size > 1 * 1024 * 1024) {
                                toast({
                                    title: "Unsuccessful",
                                    description: "Image size must be less than 1MB",
                                    className: "bg-red-300 text-red-950 font-semibold",
                                });
                                e.target.value = '';  // پاک کردن input
                                return;
                            }
                            register("image").onChange(e);

                        }}
                    />

                    <Avatar className="cursor-pointer relative z-0 size-full">
                        <AvatarImage
                            src={
                                `${avatarPreview || `http://app.api/${userData?.avatar}` || 'https://github.com/shadcn.png'}`
                            }

                            className="object-cover" />
                        <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                </div>

                <div className="grid gap-7 grid-cols-2 max-lg:grid-cols-1">
                    {formFields?.map(({
                        id,
                        placeholder,
                        type,
                        nameLabel
                    }) => (
                        <FormInput
                            key={id}
                            id={id}
                            placeholder={placeholder}
                            type={type}
                            nameLabel={nameLabel}
                            register={register(id as "name" | "last_name" | "email" | "phone")}
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
                    <Button className="px-5 border text-white font-semibold"
                        type="submit"
                        variant="default"
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
