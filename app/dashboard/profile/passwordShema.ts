import { z } from "zod";

const formSchema = z.object({
    oldPassword: z
        .string()
        .min(6, { message: "Old Password must be at least 6 characters long." })
        .regex(/^[^,/\\]+$/, {
            message: "Old Password contains invalid characters.",
        }),

    newPassword: z
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
}).refine((data) => data.newPassword === data.confirmation, {
    message: "Confirmation Password does not match New Password.",
    path: ["confirmation"],
}).refine((data) => data.oldPassword !== data.newPassword, {
    message: "You have already registered this password",
    path: ["newPassword"],
});

export { formSchema };
