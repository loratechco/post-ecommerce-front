"use client"
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

function ErrorToast(errors:{}) {

    // Convert object keys to strings in the array by this Object.keys(errors)
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast({
                description: "Your password or email is incorrect",
                duration: 3000,
            });
        }
    }, [errors]);
}

export default ErrorToast;