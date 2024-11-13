"use client"
import { usePathname } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    title: string;

}

function AuthCardheader({ title }: Props) {

    const path = usePathname();

    return (
        <CardHeader>

            <CardTitle className="text-2xl">
                {title}
            </CardTitle>

            <CardDescription>
                {
                    !path.startsWith("/forgot-password")
                        ? (
                            `Pleas Enter Email and password`
                        )
                        : (
                            `Please enter your email`
                        )
                }
            </CardDescription>

        </CardHeader>
    );
}

export default AuthCardheader;