"use client"
import FormInput from "@/components/FormInput";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import ErrorToast from "@/components/ErrorToast";
import React, { useEffect, useState } from "react";
import useImagePreview from "./useImagePrwie";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



function Account() {



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

        // image: z.instanceof(File).optional(),
    });

    type FormData = z.infer<typeof formSchema>;
    const { register, handleSubmit, watch, formState: { errors  } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const { preview, error } = useImagePreview(watch("image"));

    const DataInputs = {
        formFields: [
            { id: "name", register: register("name"), placeholder: "Json", type: "text", nameLabel: "Name" },
            { id: "lastname", register: register("lastname"), placeholder: "Json", type: "text", nameLabel: "Last Name" },
            { id: "email", register: register("email"), placeholder: "exam@gmail.com", type: "email", nameLabel: "Email" },
            { id: "phoneNumber", register: register("phone-number"), placeholder: "092500002524", type: "tel", nameLabel: "Phone Number" }
        ],
        passwordFields: [
            { id: "old-password", label: "Old Password", defaultValue: "Pedro Duarte" },
            { id: "new-password", label: "New Password", defaultValue: "@peduarte" },
            { id: "confirmation", label: "Confirmation", defaultValue: "@peduarte" }
        ]
    };

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);
        if (!(data?.image[0])) return;
        const file = data?.image[0];

        if (file && file.size <= 1024 * 1024) {
            console.log("File uploaded successfully:", file);
        }
    };

    const errorMessages = [
        error, // استفاده از پیام خطا از استیت مشترک
        errors?.image?.message,
    ];

    console.log("🚀 ~ Account ~ errorMessages:", errorMessages)

    return (
        <form className="py-5 space-y-7" onSubmit={handleSubmit(onSubmit)}>

            <ErrorToast
                errorMessagesArray={errorMessages}
                dependency={errors}
                dependencyOption={error}
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
                {DataInputs?.formFields.map((field) => (
                    <FormInput
                        key={field?.id}
                        id={field?.id}
                        placeholder={field?.placeholder}
                        type={field?.type}
                        nameLabel={field?.nameLabel}
                        register={field?.register}
                        className="w-full border-gray-400"
                    />
                ))}
            </div>

            <div className="flex items-center space-x-2">
                <Switch id="busines-customer" className=" data-[state=unchecked]:!bg-gray-400 data-[state=checked]:!bg-gray-800" />
                <Label htmlFor="busines-customer" className="cursor-pointer">Busines Customer</Label>
            </div>

            <div className="">
                <Dialog >
                    <DialogTrigger asChild>
                        <Button className="bg-gray-400 text-black hover:bg-gray-500">Change Password</Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px] p-5">
                        <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {DataInputs?.passwordFields.map((field) => (
                                <div key={field?.id} className="grid grid-cols-4 items-center gap-2">
                                    <Label htmlFor={field?.id} className="text-right">
                                        {field?.label}
                                    </Label>
                                    <Input
                                        {...field?.register}
                                        id={field?.id}
                                        defaultValue={field?.defaultValue}
                                        className="col-span-3"
                                    />
                                </div>
                            ))}
                        </div>

                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="">
                <label className="block pb-2 text-sm">Save profile changes</label>
                <Button className="px-5 border border-gray-400 bg-gray-300 hover:bg-gray-400 text-black font-semibold"
                    type="submit"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}

export default React.memo(Account);
