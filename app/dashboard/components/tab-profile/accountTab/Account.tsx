"use client";
import FormInput from "@/components/FormInput";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import ErrorToast from "@/components/ErrorToast";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import formSchema from "./schemaEditProfile";

import { useSession } from "@/lib/auth/useSession"; // وارد کردن useSession
import { toast } from "@/hooks/use-toast";
import { useImageUpload } from "./useImagePrwie";
import { useUploadImg } from "./useUploadImg";
import { API_Backend, useGEt } from "@/hooks/use-fetch";
import { AccardionSkeleton } from "@/components/skeletons/AccardionSkeleton";

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
  const [userData, setUserData] = useState<[] | Promise<void> | null>(null);

  const { data, errorMessage, loading } = useGEt({
    token,
    endpoint: `api/profile`,
  });

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

  // get data from api
  useEffect(() => {
    if (data) {
      setSwitchState(data?.business_customer);
      setUserData(data);
      reset({
        ...data,
        image: data?.avatar,
      });
    }
  }, [data]);

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

      console.log("🚀 ~ onSubmit ~ error:", error);
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
            API_IMG_URL: API_Backend,
            thereAvatar: true,
            userData: userData as any,
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
