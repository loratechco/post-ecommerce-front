"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    id: string;
    type: string;
    nameLabel?: string;
    register?: UseFormRegisterReturn;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    classNameParentPasswordInput?: string
}

const FormInput: React.FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = (
    {
        id,
        type,
        placeholder,
        className = '',
        nameLabel,
        disabled,
        register,
        classNameParentPasswordInput,
        ...props
    },
) => {

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
                    'mt-1',
                    { "flex items-center justify-between border rounded-md px-2 border-gray-400 input-primary": isPasswordType },
                )}>
                <Input
                    key={(id + "Input")}
                    {...props}
                    {...register}
                    className={cn(
                        className,
                        { " focus-visible:ring-0 border-none !input-primary": isPasswordType },
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
                            <EyeOff size={19} className="opacity-70"/>
                        ) : (
                            <Eye  size={19} />
                        )}

                    </button>
                }
            </div>
        </div>
    );
}

export default FormInput;
