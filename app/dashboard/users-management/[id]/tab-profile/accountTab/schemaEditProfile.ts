import { PhoneNumberSchema, UserEmailSchema, UserLastNameSchema, UserNameSchema, UserPasswordSchema } from "@/app/types/field-schemas";
import { z } from "zod";

const formSchemaCreateUser = z.object({
    name: UserNameSchema,
    last_name: UserLastNameSchema,
    email: UserEmailSchema,
    phone: PhoneNumberSchema,
    newPassword: UserPasswordSchema,
    confirmation: UserPasswordSchema,
}).refine((data) => {
    if (data.newPassword || data.confirmation) {
        return data.newPassword === data.confirmation;
    }
    return true;
}, {
    message: "Password and confirmation must be the same",
    path: ["confirmation"]
});
const formSchemaEditUser = z.object({
    name: UserNameSchema,
    last_name: UserLastNameSchema,
    email: UserEmailSchema,
    phone: PhoneNumberSchema,

    newPassword: z
        .string().optional(),
    confirmation: z
        .string().optional(),
}).refine((data) => {
    if (data.newPassword || data.confirmation) {
        return data.newPassword === data.confirmation;
    }
    return true;
}, {
    message: "Password and confirmation must be the same",
    path: ["confirmation"]
});

export {
    formSchemaCreateUser,
    formSchemaEditUser,
};