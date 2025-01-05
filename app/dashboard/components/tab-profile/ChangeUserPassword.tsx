"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import ErrorToast from "@/components/ErrorToast";
import FormInput from "@/components/FormInput";
import { formSchema, FormData } from "./passwordShema";

import { useToast } from "@/hooks/use-toast";
import { API_Backend } from "@/hooks/use-fetch";
import axios from "axios";
import { useSession } from "@/lib/auth/useSession";

const formFields = [
  { id: "oldPassword", nameLabel: "Old Password" },
  { id: "newPassword", nameLabel: "New Password" },
  { id: "confirmation", nameLabel: "Confirmation Password" },
];
export default function ChangePassword() {
  const { token } = useSession();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async ({
    confirmation: password_confirmation,
    newPassword: password,
    oldPassword: old_password,
  }: FormData) => {
    try {
      const res = await axios.put(
        `${API_Backend}/api/profile/change-password`,
        {
          old_password,
          password,
          password_confirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      reset();
      toast({
        description: res?.data?.message,
        duration: 3000,
        className: "bg-green-400 text-green-950",
      });
    } catch (error:any) {
      toast({
        description: error?.response?.data?.message,
        duration: 3000,
        className: "bg-red-200 text-red-800",
      });
    }
  };

  const errorMessages = [
    errors?.confirmation?.message,
    errors?.newPassword?.message,
    errors?.oldPassword?.message,
  ];
  return (
    <form className="py-5 " onSubmit={handleSubmit(onSubmit)}>
      <ErrorToast errorMessagesArray={errorMessages} dependency={errors} />

      <div className="size-full space-y-3">
        {formFields.map((field) => (
          <FormInput
            key={field?.id}
            id={field?.id}
            type="password"
            nameLabel={field?.nameLabel}
            register={register(field?.id as "oldPassword" | "newPassword" | "confirmation")}
            className="border-none"
            placeholder="least 6 characters long"
            classNameParentPasswordInput="w-full lg:w-1/2"
          />
        ))}
      </div>

      <Button
        type="submit"
        variant="default"
        className="mt-5"
        disabled={isSubmitting}
      >
        Save Changes
      </Button>
    </form>
  );
}
