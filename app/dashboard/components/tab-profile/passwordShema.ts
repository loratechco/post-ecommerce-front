import { UserPasswordSchema } from "@/app/types/field-schemas";
import { z } from "zod";

const formSchema = z.object({
    oldPassword: UserPasswordSchema,
    newPassword: UserPasswordSchema,
    confirmation: UserPasswordSchema,

}).refine((data) => data.newPassword === data.confirmation, {
    message: "Confirmation Password does not match New Password.",
    path: ["confirmation"],
}).refine((data) => data.oldPassword !== data.newPassword, {
    message: "You have already registered this password",
    path: ["newPassword"],
});

export type FormData = z.infer<typeof formSchema>; 
export { formSchema };
