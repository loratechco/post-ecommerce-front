import { useForm } from "react-hook-form";
import {loginSchema , LoginFormData} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

function useLogin() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    return { register, handleSubmit, formState: { errors, isSubmitting } }
}

export default useLogin;