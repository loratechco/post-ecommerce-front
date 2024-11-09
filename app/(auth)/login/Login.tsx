"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthInput from "@/components/auth-componetns/AuthInput";
import AuthBtn from "@/components/auth-componetns/AuthBtn";
import { Card, CardContent } from "@/components/ui/card"
import AuthCardheader from "@/components/auth-componetns/AuthCardHeader";
import AuthToggle from "@/components/auth-componetns/AuthToggle ";
import Link from "next/link";

import { useToast } from "../../../hooks/use-toast";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email("لطفاً یک ایمیل معتبر وارد کنید").min(1, "ایمیل الزامی است"),
  password: z.string().min(6, "پسورد باید حداقل 6 کاراکتر باشد").min(1, "پسورد الزامی است"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const formSubmit = (data: LoginFormData) => {
    console.log(data);
    console.log(isSubmitting);

    
  };
  
  useEffect(() => {
    if (!isValid) {
      toast({
        description: "Your password or email is incorrect",
      });
    }
  }, [errors, isValid]);

  return (
    <Card className="mx-auto !border-zinc-400 max-w-screen-md max-sm:min-w-72 sm:min-w-96">

      {/* Form Title */}
      <AuthCardheader
        title="Login"
      />
      <CardContent>
        <form onSubmit={handleSubmit(formSubmit)}>

          <AuthInput
            id="email"
            type="email"
            placeholder="example@gmail.com"
            nameLabel="Email"
            className="mb-5"
            register={register("email")}
          />

          <AuthInput
            id="password"
            type="password"
            placeholder="#Az123"
            nameLabel="Password"
            className="mb-5"
            register={register("password")}
          />

          <div className="flex items-center">
            <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>

          <div className="space-y-3 mt-3">
            <AuthBtn
              nameBtn="Login"
              variant="default"
              className="!bg-black dark:bg-gray-200 hover:!bg-zinc-900"
              type="submit"
              disabled={isSubmitting}
            />

            <AuthBtn
              nameBtn="Login with Google"
              className="!border-zinc-400"
              disabled={isSubmitting}
              variant="outline"
              type="button"
            />
          </div>

          {/* Switch between login and sign in */}
          <AuthToggle
            href="/registr"
            title="Sign Up"
          />
        </form>
      </CardContent>
    </Card>
  );
}
