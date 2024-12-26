"use client";
import FormInput from "@/components/FormInput";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import ErrorToast from "@/components/ErrorToast";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import formSchema from "./schemaEditProfile";

import { useSession } from "@/lib/auth/useSession";
import { toast } from "@/hooks/use-toast";
import { useUploadImg } from "./useUploadImg";
import { API_Backend, useGEt } from "@/hooks/use-fetch";

const formFields = [
  { id: "name", placeholder: "Emily", type: "text", nameLabel: "Name" },
  {
    id: "last_name",
    placeholder: "Carter",
    type: "text",
    nameLabel: "Last Name",
  },
  {
    id: "email",
    placeholder: "exam@gmail.com",
    type: "email",
    nameLabel: "Email",
  },
  {
    id: "phone",
    placeholder: "092500002524",
    type: "tel",
    nameLabel: "Phone Number",
  },
];

type FormData = z.infer<typeof formSchema> & {
  image: FileList | null;
};

function Account() {
  const { token } = useSession();
  const [fileSaver, setFileSaver] = useState<File | null>(null);
  const [switchState, setSwitchState] = useState<boolean>(false);

  // fetch profile data
  const { data: userData } = useGEt({
    token,
    endpoint: `api/profile`,
  });

  //react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      phone: "",
      image: null,
    },
    shouldUseNativeValidation: true,
  });

  useEffect(() => {
    if (userData) {
      setSwitchState(userData?.business_customer);
      reset({
        ...userData,
        image: userData?.avatar,
      });
    }
  }, [userData]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();

    if (fileSaver) {
      formData.append("avatar", fileSaver);
    }

    // Add form data fields
    Object.entries({
      name: data?.name,
      last_name: data?.last_name,
      email: data?.email,
      phone: data?.phone,
      business_customer: switchState ? "1" : "0",
      is_administrator: "0",
    }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post(`${API_Backend}/api/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      toast({
        title: "Successfully",
        description: res?.data?.message || "The profile has been updated",
        className: "toaster-successfuls",
      });
    } catch (error: any) {
      toast({
        title: "Unsuccessful",
        description: "Something went wrong. Please try again",
        className: "toaster-errors",
      });
    }
  };

  return (
    <>
      <ErrorToast
        errorMessagesArray={[
          errors?.name?.message,
          errors?.last_name?.message,
          errors?.email?.message,
          errors?.phone?.message,
          errors?.image?.message,
        ]}
        dependency={errors}
      />
      <form className="py-5 space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative size-14 ">
          {useUploadImg({
            sizeFile: 1,
            userData,
            API_IMG_URL: API_Backend,
            thereAvatar: true,
            fileSubmit: setFileSaver,
          })}
        </div>

        <div className="grid gap-7 grid-cols-2 max-lg:grid-cols-1">
          {formFields?.map(({ id, placeholder, type, nameLabel }) => (
            <FormInput
              key={id}
              id={id}
              placeholder={placeholder}
              type={type}
              nameLabel={nameLabel}
              register={register(id)}
              className="input-primary w-full"
            />
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={switchState}
            onCheckedChange={setSwitchState}
            id="busines-customer"
            className="data-[state=unchecked]:!bg-gray-400 data-[state=checked]:!bg-gray-800"
          />
          <Label htmlFor="busines-customer" className="cursor-pointer">
            Busines Customer
          </Label>
        </div>

        <Button
          className="px-5 border text-white font-semibold "
          type="submit"
          variant="default"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default React.memo(Account);
