"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface ErrorToastProps {
    errors: Record<string, any>;
    description: string;
}

const ErrorToast = ({ errors, description }: ErrorToastProps) => {
    const { toast } = useToast();

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast({
                description,
                duration: 3000,
                className: "bg-red-100 text-red-800", // رنگ دلخواه برای پیام خطا
            });
        }
    }, [errors, toast]);

    return null;
};

export default ErrorToast;
