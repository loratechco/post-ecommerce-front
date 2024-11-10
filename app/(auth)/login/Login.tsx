"use client";
import AuthInput from "@/components/auth-componetns/AuthInput";
import { CardContent } from "@/components/ui/card";
import AuthToggle from "@/components/auth-componetns/AuthToggle ";
import Link from "next/link";
import ErrorToast from "./ErrorToast";
import useLogin from "./useLoginForm";
import { LoginFormData } from "./schema";
import AuthBtnList from "../components/AuthBtnList";
import useFetch from "./useFetch";
import { useAuth } from "@/app/context/SessionProviderWrapper";

export default function Login() {
  const { token } = useAuth();
  console.log("🚀 ~ Login ~ token:", token)
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useLogin();
  // saver cookie

  const formSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    await useFetch({ email, password });
  };

  ErrorToast(errors);

  return (
    <CardContent>
      <form onSubmit={handleSubmit(formSubmit)} className="space-y-3">
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

        <div className="flex items-center">
          <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
            Forgot your password?
          </Link>
        </div>

        <AuthBtnList isSubmitting={isSubmitting} />

        <AuthToggle href="/registr" title="Sign Up" />
      </form>
    </CardContent>
  );
}
