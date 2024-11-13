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
    register: UseFormRegisterReturn;
}

function FormInput(
    {
        id,
        type,
        placeholder,
        className = '',
        nameLabel,
        disabled,
        register
    }: Props
) {
    return (
        <div className="grid gap-2">

            <Label

                key={(id + "lable")}
                htmlFor={id}>{nameLabel}</Label>
            <Input
                key={(id + "Input")}

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

export default FormInput;
