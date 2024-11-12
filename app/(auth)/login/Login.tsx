"use client";
import AuthInput from "@/components/auth-componetns/AuthInput";
import { CardContent } from "@/components/ui/card";
import AuthToggle from "@/components/auth-componetns/AuthToggle ";
import Link from "next/link";
import ErrorToaster from "./ErrorToast";
import useLogin from "./useLoginForm";
import { LoginFormData } from "./schema";
import AuthBtn from "@/components/auth-componetns/AuthBtn";
import { singIn } from "@/lib/auth/login";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ErrorToast from "./ErrorToast";

export default function Login() {
  const { toast } = useToast();

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

    const singInResult: { status: number; statusText: string; } = await singIn({ email, password });

    if (singInResult?.status === 401) {
      setUserMissingError('No email or password')
      return;
    } else if (singInResult?.status === 500) {
      setUserMissingError('The server is not responding')
      return;

    } else {
      setUserMissingError("There is a problem");
      return;
    }

  };

  // useEffect(() => {
  //   //find first error
  //   const { email, password } = errors
  //   const error = userMissingError || email?.message || password?.message;
  //   console.log("🚀 ~ useEffect ~ error:", error)

  //   if (error) {
  //     toast({

  //       description: error,
  //       duration: 3000,
  //       className: "bg-red-200 text-red-800",
  //     });
  //   }
  // }, [userMissingError, errors, toast]);
  console.log("🚀 ~ Login ~ errors:", errors)


  const errorMessages = [
    userMissingError,
    errors?.email?.message,
    errors?.password?.message,
  ];

  return (
    <CardContent>

      <ErrorToast
        errorMessages={errorMessages}
        dependency={errors}
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
