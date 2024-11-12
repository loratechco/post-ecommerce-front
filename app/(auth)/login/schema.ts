import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Please enter email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long").min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;
export { loginSchema };
export type { LoginFormData };
