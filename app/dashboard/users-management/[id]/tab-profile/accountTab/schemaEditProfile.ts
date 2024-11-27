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

    "phone": z.string()
        .regex(/^09\d{9}$/, { message: "Phone number must be in the format 09XXXXXXXXX" }),

    newPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .optional(),

    confirmation: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .optional()
}).refine((data) => {
    if (data.newPassword || data.confirmation) {
        return data.newPassword === data.confirmation;
    }
    return true;
}, {
    message: "پسورد و تایید آن باید یکسان باشند",
    path: ["confirmation"]
});


export default formSchema;