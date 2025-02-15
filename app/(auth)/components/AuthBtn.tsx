import clsx from "clsx";
import { Button } from "@/components/ui/button";

interface Props {
    nameBtn: string;
    type: "submit" | "button";
    onclick?: () => void;
    className?: string;
    disabled?: boolean;
    variant?: "outline" | "default" | "destructive" | "secondary" | "ghost" | "link";
}
function AuthBtn(
    {
        onclick,
        className,
        disabled = false,
        variant = "outline",
        nameBtn,
        type,
    }: Props
) {
    return (
        <Button
            variant={variant}
            type={type}
            className={clsx(
                className, // custom class
                "w-full",
                { "pointer-events-none cursor-not-allowed": disabled }
            )}
            disabled={disabled}
            onClick={onclick}
        >
            {nameBtn}
        </Button>
    );
}

export default AuthBtn;