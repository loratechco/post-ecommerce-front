import { z } from "zod";

const formSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(30, { message: "Name must be less than 30 characters" }),

    last_name: z.string()
        .min(2, { message: "Last name must be at least 2 characters long" })
        .max(30, { message: "Last name must be less than 30 characters" }),

    email: z.string()
        .email({ message: "Please enter a valid email address" }),

    phone: z.string()
        .regex(/^09\d{9}$/, { message: "Phone number must be in the format 09XXXXXXXXX" }),
    search: z.string(),

    password: z
        .string()
        .min(6, { message: "New Password must be at least 6 characters long." })
        .regex(/^[^,/\\]+$/, {
            message: "New Password contains invalid characters.",
        }),

    confirmation: z
        .string()
        .min(6, { message: "Confirmation Password must be at least 6 characters long." })
        .regex(/^[^,/\\]+$/, {
            message: "Confirmation Password contains invalid characters.",
        }),
}).refine((data) => data.password === data.confirmation, {
    message: "Confirmation Password does not match New Password.",
    path: ["confirmation"],
})

export type FormData = z.infer<typeof formSchema>;
export default formSchema; 