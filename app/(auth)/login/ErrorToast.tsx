import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface ErrorToastProps {
    errors: Record<string, any>;
    description: string;
}

const ErrorToaster = ({ errors, description }: ErrorToastProps) => {
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast({
                className:"bg-gray-100",
                description,
                duration: 3000,
            });
        }
    }, [errors]);

    return null;
};

export default ErrorToaster;
