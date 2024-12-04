'use client'
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
        const errorMsg = errorMessagesArray.find((error) => error);

        if (errorMsg) {
            toast({
                description: errorMsg,
                title: "Unsuccessful",
                duration: 3000,
                className: "bg-red-300 text-red-950 border-none",
            });
        }
    }, [dependency, toast, dependencyOption]);

    return null;
};

export default React.memo(ErrorToast);
