/* eslint-disable react-hooks/exhaustive-deps */
'use client'
// ErrorToast.tsx
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ErrorToastProps {
    errorMessagesArray: (string | null | undefined)[];
    dependency?: any;
    dependencyOption?: any;
    disableDefaultDeps?: boolean; 
}

//(errorMessagesArray) This should be given an array of errors with string indices
const ErrorToast: React.FC<ErrorToastProps> = ({disableDefaultDeps= false, errorMessagesArray, dependency, dependencyOption = null }) => {
    const { toast } = useToast();
    const dependencyValue = dependencyOption ?? null;
    const disableDeps = disableDefaultDeps? null: errorMessagesArray; 
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
    }, [dependency, toast, dependencyValue, disableDeps]);

    return null;
};

export default React.memo(ErrorToast);
