import { PhoneNumberSchema, UserEmailSchema, UserLastNameSchema, UserNameSchema, UserPasswordSchema } from "@/app/types/field-schemas";
import { ValidationMessages } from "@/app/types/validation-message";
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
  .string()
  .min(6, ValidationMessages.passwordMinLength)
  .min(1, ValidationMessages.passwordRequired).optional(),
    confirmation: z
  .string()
  .min(6, ValidationMessages.passwordMinLength)
  .min(1, ValidationMessages.passwordRequired).optional(),
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