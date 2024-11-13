// ErrorToast.tsx
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ErrorToastProps {
    errorMessagesArray: (string | null | undefined)[];
    dependency: any;
    dependencyOption?: any;
}

//(errorMessagesArray) This should be given an array of errors with string indices
const ErrorToast: React.FC<ErrorToastProps> = ({ errorMessagesArray, dependency, dependencyOption = null }) => {
    const { toast } = useToast();
    useEffect(() => {
        const firstError = errorMessagesArray.find((error) => error);

        if (firstError) {
            toast({
                description: firstError,
                duration: 3000,
                className: "bg-red-200 text-red-800",
            });
        }
    }, [dependency, toast, dependencyOption]);

    return null;
};

export default React.memo(ErrorToast);
