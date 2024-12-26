import { PhoneNumberSchema, UserEmailSchema, UserLastNameSchema, UserNameSchema } from "@/app/types/field-schemas";
import { z } from "zod";

const formSchema = z.object({
    name: UserNameSchema,
    last_name: UserLastNameSchema,
    email:UserEmailSchema,
    phone: PhoneNumberSchema,
    newPassword: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
        .optional()
        .or(z.literal('')),

    confirmation: z.string()
        .min(6, { message: "Confirmation password must be at least 6 characters" })
        .optional()
        .or(z.literal(''))
}).refine((data) => {
    if (data.newPassword || data.confirmation) {
        return data.newPassword === data.confirmation;
    }
    return true;
}, {
    message: "Password and confirmation must be the same",
    path: ["confirmation"]
});

export default formSchema;