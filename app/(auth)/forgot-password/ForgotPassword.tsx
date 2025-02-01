"use client"
import { Card, CardContent } from "@/components/ui/card"
import AuthCardheader from "@/app/(auth)/components/AuthCardHeader"
import AuthToggle from "@/app/(auth)/components/AuthToggle "
import AuthBtn from "@/app/(auth)/components/AuthBtn";
import AuthInput from "@/components/FormInput";

import { useForm } from "react-hook-form";
function ForgotPassword() {
    const { register} = useForm();

    return (
        <Card className="mx-auto !border-secondary/70 max-w-screen-md max-sm:min-w-72 sm:min-w-96 ">

            {/* Form Title */}
            <AuthCardheader
                title={"forgot Password"}
            />

            <CardContent>

                <AuthInput
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    nameLabel="Email"
                    className="mb-3"
                    register={register("email")}
                />

                <div className="space-y-3 mt-3">

                    <AuthBtn
                        nameBtn="Login"
                        variant="default"
                        className="bg-secondary dark:bg-gray-200 hover:bg-secondary/90"
                        type="submit"
                    />
                </div>

                {/* Switch between login and sign in */}
                <AuthToggle
                    // descriptionAuthToggle=""
                    href={"/login"}
                    title="Login"
                />

            </CardContent>
        </Card>
    );
}

export default ForgotPassword;