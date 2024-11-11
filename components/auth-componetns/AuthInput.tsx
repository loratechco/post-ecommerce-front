import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    id: string;
    type: string;
    placeholder: string;
    nameLabel: string;
    className?: string;
    disabled?: boolean;
    register?: UseFormRegisterReturn;
    key?: string | number;
}

function AuthInput(
    {
        id,
        type,
        placeholder,
        className = '',
        nameLabel,
        disabled,
        key,
        register
    }: Props
) {
    return (
        <div className="grid gap-2">

            <Label htmlFor={id} key={`${key}-lable`}>{nameLabel}</Label>
            <Input key={`${key}-input`}
                {...register}
                className={clsx(
                    className,
                    { "pointer-events-none cursor-not-allowed": disabled }
                )}

                id={id}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
}

export default AuthInput;
