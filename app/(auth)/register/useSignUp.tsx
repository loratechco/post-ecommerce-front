import { useForm } from "react-hook-form";
import { SignUpFormData, SignUpSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

function useSignUp() {

    const { register, handleSubmit, formState: { errors, isSubmitting , isSubmitted } } = useForm<SignUpFormData>({
        resolver: zodResolver(SignUpSchema),
    });

    return { register, handleSubmit, formState: { errors, isSubmitting ,isSubmitted} }
}

export default useSignUp;