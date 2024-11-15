"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import ErrorToast from "@/components/ErrorToast";
import FormInput from "@/components/FormInput";
import { formSchema } from "./passwordShema";

export default function ChangePassword() {
    type FormData = z.infer<typeof formSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const formFields = [
        { id: "oldPassword", register: register("oldPassword"), nameLabel: "Old Password" },
        { id: "newPassword", register: register("newPassword"), nameLabel: "New Password" },
        { id: "confirmation", register: register("confirmation"), nameLabel: "Confirmation Password" },
    ]

    const onSubmit = (data: FormData) => {
       
        console.log("🚀 ~ onSubmit ~ userData:", data)

    };

    const errorMessages = [
        errors?.oldPassword?.message,
        errors?.newPassword?.message,
        errors?.confirmation?.message,
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
                        className="w-full lg:w-1/2 border-gray-400"
                        placeholder=""
                    />
                ))}
            </div>

            <Button type="submit" variant='default' className="mt-5">
                Save Changes
            </Button>
        </form>
    )
}
