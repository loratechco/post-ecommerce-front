"use client"

import { CardContent } from "@/components/ui/card";
import AuthToggle from "@/app/(auth)/components/AuthToggle ";
import AuthBtn from "@/app/(auth)/components/AuthBtn";
import Link from "next/link";
import AuthInput from "@/components/FormInput";
// this is token context
import useSignUp from "./useSignUp";
import { SignUpFormData } from "./schema";
import axios from "axios";
import ErrorToast from "@/components/ErrorToast";
import { useEffect, useState } from "react";
import { API_Backend } from "@/hooks/use-fetch";

function SignUp() {

    const [userMissingError, setUserMissingError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useSignUp();

    useEffect((() => setUserMissingError('')), [userMissingError])

    console.log("🚀 ~ SignUp ~ errors:", errors)
    const formSubmit = async (data: SignUpFormData) => {
        const { email, password, name, passwordConfirmation: password_confirmation } = data;

        try {
            const res = await axios.post(
               `${API_Backend}/api/register`,
                { email, password, name, password_confirmation }
            );

            if (res.status !== 201)
                return;

            console.log("🚀 ~ formSubmit ~ res:", res)
            window.location.href = "/login";

        } catch (error) {
            console.log("🚀 ~ formSubmit ~ error:", error)
            setUserMissingError(error?.response?.data?.message);

            console.log(error);
        }
    };

    const errorMessages =
        [
            userMissingError,
            errors?.name?.message,
            errors?.email?.message,
            errors?.password?.message,
            errors?.passwordConfirmation?.message,
        ];

    return (
        <form onSubmit={handleSubmit(formSubmit)}>

            <ErrorToast
                dependency={errors}
                errorMessagesArray={errorMessages}
                dependencyOption={userMissingError}
            />

            <CardContent className="space-y-3">
                <AuthInput
                    id="name"
                    type="text"
                    placeholder="Michael"
                    nameLabel="Name"
                    disabled={isSubmitting}
                    register={register("name")}
                />

                <AuthInput
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    nameLabel="Email"
                    disabled={isSubmitting}
                    register={register("email")}
                />

                <AuthInput
                    id="password"
                    type="password"
                    placeholder="#Az123"
                    nameLabel="Password"
                    disabled={isSubmitting}
                    register={register("password")}
                />

                <AuthInput
                    id="password-confirmation"
                    type="password"
                    placeholder="#Az123"
                    nameLabel="Password Confirmation"
                    disabled={isSubmitting}
                    register={register("passwordConfirmation")}
                />

                <div className="flex items-center">
                    <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                    </Link>
                </div>

                <div className="space-y-3 mt-3">
                    <AuthBtn
                        nameBtn="Sign Up"
                        variant="default"
                        className="!bg-black dark:bg-gray-200 hover:!bg-zinc-900"
                        type="submit"
                        disabled={isSubmitting}
                    />
                </div>

                <AuthToggle href="/login" title="Login" />
            </CardContent>
        </form>
    );
}

export default SignUp;
