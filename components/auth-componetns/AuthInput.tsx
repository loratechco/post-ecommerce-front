import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    id: string;
    type: string;
    placeholder: string;
    nameLabel: string;
    className?: string;
    disabled?: boolean;
    register?: UseFormRegisterReturn;  // این ویژگی برای ثبت ورودی در فرم استفاده می‌شود
}

function AuthInput(
    { id,
        type,
        placeholder,
        className = '',
        nameLabel,
        disabled,
        register }: Props
) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{nameLabel}</Label>
            <Input
                {...register} // اینجا تمام اطلاعات مورد نیاز برای ثبت را پاس می‌دهیم
                className={className}
                id={id}
                type={type}
                placeholder={placeholder}
                disabled={false}
            />
        </div>
    );
}

export default AuthInput;
