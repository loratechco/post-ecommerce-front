import { z } from "zod";

const formSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(30, { message: "Name must be less than 30 characters" }),

    lastname: z.string()
        .min(2, { message: "Last name must be at least 2 characters long" })
        .max(30, { message: "Last name must be less than 30 characters" }),

    email: z.string()
        .email({ message: "Please enter a valid email address" }),

    "phoneNumber": z.string()
        .regex(/^09\d{9}$/, { message: "Phone number must be in the format 09XXXXXXXXX" }),

});


export default formSchema;