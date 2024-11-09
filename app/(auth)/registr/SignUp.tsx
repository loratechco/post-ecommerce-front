"use client"
import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card"
import AuthCardheader from "../../../components/auth-componetns/AuthCardHeader"
import AuthToggle from "../../../components/auth-componetns/AuthToggle "
import AuthBtn from "@/components/auth-componetns/AuthBtn";
import Link from "next/link";
import AuthInput from "@/components/auth-componetns/AuthInput";

function SignUp() {

    return ( 
        <Card className="mx-auto !border-zinc-400 max-w-screen-md max-sm:min-w-72 sm:min-w-96">

            {/* Form Title */}
            <AuthCardheader
                title="Sign Up"
            />

            <CardContent>

                <AuthInput
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    nameLabel="Email"
                    className="mb-3"
                />

                <AuthInput
                    id="password"
                    type="password"
                    placeholder="#Az123"
                    nameLabel="Password"
                    className="mb-3"
                />

                <AuthInput
                    id="password-confirmation"
                    type="password"
                    placeholder="#Az123"
                    nameLabel="Password Confirmation"
                    className="mb-3"
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
        </Card>
     );
}

export default SignUp;