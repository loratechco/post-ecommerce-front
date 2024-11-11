import { z } from "zod";
import { loginSchema } from "../login/schema";

const SignUpSchema = loginSchema.extend({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name can't be more than 50 characters" })
        .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),

    passwordConfirmation: z.string().min(1, { message: "Password confirmation is required" }),
}).refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Passwords do not match",
});

type SignUpFormData = z.infer<typeof SignUpSchema>;

export type { SignUpFormData };
export {SignUpSchema};