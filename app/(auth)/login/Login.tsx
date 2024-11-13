"use client";
import AuthInput from "@/components/FormInput";
import { CardContent } from "@/components/ui/card";
import AuthToggle from "@/app/(auth)/components/AuthToggle ";
import Link from "next/link";
import ErrorToaster from "../../../components/ErrorToast";
import useLogin from "./useLoginForm";
import { LoginFormData } from "./schema";
import AuthBtn from "@/app/(auth)/components/AuthBtn";
import { singIn } from "@/lib/auth/login";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ErrorToast from "../../../components/ErrorToast";

export default function Login() {
  const [userMissingError, setUserMissingError] = useState<string | null>(null)

  //login hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useLogin();

  useEffect((() => { setUserMissingError(null) }), [userMissingError])

  const formSubmit = async (data: LoginFormData) => {
    console.log("🚀 ~ Login ~ userMissingError:", userMissingError)
    const { email, password } = data;

    const singInResult:
      { status: number; statusText: string; } = await singIn({ email, password });

    console.log(singInResult?.status);
    if (singInResult?.status !== 200) {
      setUserMissingError(singInResult?.statusText)
      return;
    }
  };

  const errorMessages = [
    userMissingError,
    errors?.email?.message,
    errors?.password?.message,
  ];

  return (
    <CardContent>

      <ErrorToast
        errorMessagesArray={errorMessages}
        dependency={errors}
        dependencyOption={userMissingError}
      />
      <form onSubmit={handleSubmit(formSubmit)} className="space-y-3">

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

        <div className="flex items-center">
          <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
            Forgot your password?
          </Link>
        </div>

        <AuthBtn
          nameBtn="Login"
          variant="default"
          className="!bg-black dark:bg-gray-200 hover:!bg-zinc-900 mt-3"
          type="submit"
          disabled={isSubmitting}
        />

        <AuthToggle href="/register" title="Sign Up" />
      </form>
    </CardContent>
  );
}
