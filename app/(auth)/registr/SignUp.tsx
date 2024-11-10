"use client"
import { CardContent } from "@/components/ui/card"
import AuthToggle from "../../../components/auth-componetns/AuthToggle "
import AuthBtn from "@/components/auth-componetns/AuthBtn";
import Link from "next/link";
import AuthInput from "@/components/auth-componetns/AuthInput";
import { z } from "zod";

function SignUp() {

    


    return (
        <form action="">

            <CardContent className="space-y-3">

                <AuthInput
                    id="name"
                    type="text"
                    placeholder="Json"
                    nameLabel="Name"
                />

                <AuthInput
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    nameLabel="Email"
                />

                <AuthInput
                    id="password"
                    type="password"
                    placeholder="#Az123"
                    nameLabel="Password"
                />

                <AuthInput
                    id="password-confirmation"
                    type="password"
                    placeholder="#Az123"
                    nameLabel="Password Confirmation"
                />

                <div className="flex items-center">
                    <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                    </Link>
                </div>

                <div className="space-y-3 mt-3">

                    <AuthBtn
                        nameBtn="Loigin"
                        variant="default"
                        className="!bg-black dark:bg-gray-200 hover:!bg-zinc-900"
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
        </form>

    );
}

export default SignUp;