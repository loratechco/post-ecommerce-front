"use client";
import AuthInput from "@/components/auth-componetns/AuthInput";
import { CardContent } from "@/components/ui/card";
import AuthToggle from "@/components/auth-componetns/AuthToggle ";
import Link from "next/link";
import ErrorToaster from "./ErrorToast";
import useLogin from "./useLoginForm";
import { LoginFormData } from "./schema";
import useFetch from "./useFetch";
import { useAuth } from "@/app/context/SessionProviderWrapper";// get token
import AuthBtn from "@/components/auth-componetns/AuthBtn";
import { singIn } from "@/lib/auth/login";

export default function Login() {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useLogin();

  const formSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    // await useFetch({ email, password });
   await singIn({email,password})
  };

  return (
    <CardContent>

      <ErrorToaster
        errors={errors}
        description={'Your password or email is incorrect'}
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

        <AuthToggle href="/registr" title="Sign Up" />
      </form>
    </CardContent>
  );
}
