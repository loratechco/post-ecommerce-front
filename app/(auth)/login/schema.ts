import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("لطفاً یک ایمیل معتبر وارد کنید").min(1, "ایمیل الزامی است"),
    password: z.string().min(6, "پسورد باید حداقل 6 کاراکتر باشد").min(1, "پسورد الزامی است"),
});

type LoginFormData = z.infer<typeof loginSchema>;
export { loginSchema };
export type { LoginFormData };
