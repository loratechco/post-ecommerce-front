interface FormField {
    id: string;
    type?: string;
    nameLabel: string;
    placeholder: string;
}

export const addUserFields: FormField[] = [
    { id: "name", type: "text", nameLabel: "Name", placeholder: "John" },
    { id: "last_name", type: "text", nameLabel: "Last Name", placeholder: "Smith" },
    { id: "email", nameLabel: "Email", placeholder: "example@gmail.com" },
    { id: "phone", nameLabel: "Phone Number", placeholder: "090300048" },
    { id: "password", type: "password", nameLabel: "Password", placeholder: "******" },
    { id: "confirmation", type: "password", nameLabel: "Confirmation", placeholder: "******" }
];

export type { FormField }; 