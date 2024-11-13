import AuthInput from "./AuthInput";
import AuthBtn from "../../app/(auth)/components/AuthBtn";
import Link from "next/link";

interface Props {
    path: string;
    titleBtn: string;
}

function AuthForm({ path, titleBtn }: Props) {



    return (
        <div className="grid gap-4">

            <AuthInput
                id="email"
                type="email"
                placeholder="example@gmail.com"
                nameLabel="Email"
            />

            {
                !path.startsWith("/forgot-password")
                && (
                    <AuthInput
                        id="password"
                        type="password"
                        placeholder="#Az123"
                        nameLabel="Password"
                    />
                )
            }

            {
                path.startsWith("/registr")
                && (
                    <AuthInput
                        id="confirmation-password"
                        type="password"
                        placeholder="#Az123"
                        nameLabel="Password Confirmation"
                    />
                )
            }

            {
                path.startsWith("/login") &&
                (<div className="flex items-center">
                    <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                    </Link>
                </div>
                )
            }

            <AuthBtn
                nameBtn={titleBtn}
                variant="default"
                className="!bg-black dark:bg-gray-200 hover:!bg-zinc-900"
                type="submit"
            />

            {
                path.startsWith("/login") &&
                (
                    <AuthBtn
                        nameBtn="Login with Google"
                        className="!border-zinc-400"
                        variant="outline"
                        type="button"
                    />
                )
            }

        </div>
    );
}

export default AuthForm;