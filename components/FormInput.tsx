"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    id: string;
    type: string;
    nameLabel: string;
    register: UseFormRegisterReturn;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    classNameParentPasswordInput?: string
}

function FormInput(
    {
        id,
        type,
        placeholder,
        className = '',
        nameLabel,
        disabled,
        register,
        classNameParentPasswordInput

    }: Props
) {

    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type.includes("password");

    return (
        <div
            className={cn(
                { "grid gap-2 pointer-events-none cursor-not-allowed": disabled }
            )}
        >

            <Label

                key={(id + "lable")}
                htmlFor={id}>{nameLabel}</Label>

            <div
                className={cn(
                    classNameParentPasswordInput,
                    { "flex items-center justify-between border rounded-md px-2 border-gray-400": isPasswordType },
                )}>
                <Input
                    key={(id + "Input")}

                    {...register}
                    className={cn(
                        className,
                        { " focus-visible:ring-0 border-none": isPasswordType },
                        "w-full"
                    )}

                    id={id}
                    type={isPasswordType && showPassword ? 'text' : type}
                    placeholder={placeholder}
                />

                {isPasswordType &&
                    <button
                        className="cursor-pointer"
                        onClick={() => setShowPassword((perv) => !perv)}
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >

                        {!showPassword ? (
                            <EyeClosed size={22} />
                        ) : (
                            <Eye size={22} />
                        )}

                    </button>
                }
            </div>
        </div>
    );
}

export default FormInput;
