import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserEmailSchema, UserPasswordSchema } from "@/app/types/field-schemas";

const loginSchema = z.object({
    email: UserEmailSchema,
    password: UserPasswordSchema,
});
export type LoginFormData = z.infer<typeof loginSchema>;

export function useLogin() {
    console.warn("Schemas have changed");
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    return { register, handleSubmit, formState: { errors, isSubmitting } };
}