"use client"

import { CardContent } from "@/components/ui/card";
import AuthToggle from "@/components/auth-componetns/AuthToggle ";
import AuthBtn from "@/components/auth-componetns/AuthBtn";
import Link from "next/link";
import AuthInput from "@/components/auth-componetns/AuthInput";
import { useSession } from "@/lib/auth/useSession";
import useSignUp from "./useSignUp";
import { SignUpFormData, SignUpSchema } from "./schema";
import ErrorToaster from "../login/ErrorToast";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

function SignUp() {
    // const user = useSession();
    // console.log("🚀 ~ SignUp ~ user:", user);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useSignUp();

    console.log("🚀 ~ SignUp ~ errors:", errors)
    const formSubmit = async (data: SignUpFormData) => {
        const { email, password, name, passwordConfirmation } = data;
        console.log(data);
    };

    const errorMessages = {
        name: errors?.name?.message,
        email: errors?.email?.message,
        password: errors?.password?.message,
        passwordConfirmation: errors?.passwordConfirmation?.message
    };

    const firstError = Object.values(errorMessages).find(error => error);
    
    return (
        <form onSubmit={handleSubmit(formSubmit)}>

            {firstError && (
                <ErrorToaster
                    description={firstError}
                    errors={errors}  
                />
            )}

            <CardContent className="space-y-3">
                <AuthInput
                    id="name"
                    type="text"
                    placeholder="Michael"
                    nameLabel="Name"
                    register={register("name")}
                />

                <AuthInput
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    nameLabel="Email"
                    register={register("email")}
                />

                <AuthInput
                    id="password"
                    type="password"
                    placeholder="#Az123"
                    nameLabel="Password"
                    register={register("password")}
                />

                <AuthInput
                    id="password-confirmation"
                    type="password"
                    placeholder="#Az123"
                    nameLabel="Password Confirmation"
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
                    />
                </div>

                <AuthToggle href="/login" title="Login" />
            </CardContent>
        </form>
    );
}

export default SignUp;
