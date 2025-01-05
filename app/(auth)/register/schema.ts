import { UserEmailSchema, UserNameSchema, UserPasswordSchema } from "@/app/types/field-schemas";
import { z } from "zod";

const SignUpSchema = z.object({
    name:UserNameSchema,
    email: UserEmailSchema,
    password: UserPasswordSchema,

    passwordConfirmation:UserPasswordSchema,
}).refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Passwords do not match",
});

type SignUpFormData = z.infer<typeof SignUpSchema>;

export type { SignUpFormData };
export {SignUpSchema};