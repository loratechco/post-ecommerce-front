import { PhoneNumberSchema, UserEmailSchema, UserLastNameSchema, UserNameSchema } from "@/app/types/field-schemas";
import { z } from "zod";

const formSchema = z.object({
    name: UserNameSchema,
    last_name: UserLastNameSchema,
    email: UserEmailSchema,
    phone: PhoneNumberSchema,
});

export default formSchema;