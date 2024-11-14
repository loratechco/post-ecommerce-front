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

        <form className="py-5 space-y-7" onSubmit={handleSubmit(onSubmit)}>

            <ErrorToast
                errorMessagesArray={errorMessages}
                dependency={errors}
            />

            <div className="grid gap-7 grid-cols-2 max-lg:grid-cols-1">
                {formFields.map((field) => (
                    <FormInput
                        key={field?.id}
                        id={field?.id}
                        type='password'
                        nameLabel={field?.nameLabel}
                        register={field?.register}
                        className="w-full border-gray-400"
                        placeholder=""
                    />
                ))}
            </div>

            <Button type="submit" variant='default'>
                Save Changes
            </Button>
        </form>
    )
}
