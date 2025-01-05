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

import { toast } from "@/hooks/use-toast";
import { useUploadImg } from "@/app/dashboard/components/tab-profile/accountTab/useUploadImg";
import { API_Backend } from "@/hooks/use-fetch";
import { UserData } from "@/app/types/api-data";

const formFields = [
  { id: "name", placeholder: "Json", type: "text", nameLabel: "Name" },
  {
    id: "last_name",
    placeholder: "Json",
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
  { id: "newPassword", nameLabel: "Password", type: "password" },
  { id: "confirmation", nameLabel: "Confirmation", type: "password" },
];

function Account({ userId, userToken }: { userId: string; userToken: string }) {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [fileSaver, setFileSaver] = useState<File | null>(null);

  useEffect(() => setFetchError(null), [fetchError]);

  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      phone: "",
      newPassword: "",
      confirmation: "",
    },
  });

  // get user data
  useEffect(() => {
    if (userId === "create-user") {
      setUserData(null);
      return;
    }
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${API_Backend}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const { business_customer } = data?.data;

        setSwitchState((business_customer == 1 && true) || false);

        setUserData(data);
        reset({
          ...data?.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [userId, userToken, reset]);

  const idCondition = userId.includes("create-user");

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    // Handle avatar upload
    if (fileSaver) {
      formData.append("avatar", fileSaver as File);
    }

    // Add form data fields
    Object.entries({
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      business_customer: switchState ? "1" : "0",
      is_administrator: "0",
      password: data.newPassword,
      password_confirmation: data.confirmation,
    }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    console.info("🚀 ~ onSubmit ~ formData:", formData, userId, userToken);
    const apis = idCondition ? "api/users" : `/api/users/${userId}`;
    try {
      const res = await axios.post(`${API_Backend}/${apis}`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      console.info(res);
      // Show success message
      toast({
        title: "Success",
        description: res?.data?.message || "Profile updated successfully",
        className: "toaster-successfuls",
      });
    } catch (error: any) {
      console.info(error);
      const errorMessage = Object.values(error?.response?.data?.errors || {})
        .flat()
        .find((message): message is string => typeof message === "string");

      console.log(
        "error?.response ==>",
        error?.response?.data?.errors,
        "Object.values ==>",
        Object.values(error?.response?.data || {})
      );
      toast({
        title: "Error",
        description: (errorMessage as string) || "Error updating profile",
        className: "bg-red-300 text-red-950 font-semibold",
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
          errors?.newPassword?.message,
          errors?.confirmation?.message,
        ]}
        dependency={errors}
        dependencyOption={fetchError}
      />
      <form className="py-5 space-y-7" onSubmit={handleSubmit(onSubmit)}>
        {idCondition && (
          <div className="">
            <h1 className="text-2xl font-semibold">Create new User</h1>
          </div>
        )}
        <div className="relative size-14 ">
          {useUploadImg({
            sizeFile: 1,
            API_IMG_URL: API_Backend,
            thereAvatar: true,
            userData: userData as UserData,
            fileSubmit: (file: File) => setFileSaver(file),
          })}
        </div>

        <div className="grid gap-7 grid-cols-2 max-lg:grid-cols-1">
          {formFields.map((field) => (
            <FormInput
              key={field?.id}
              id={field?.id}
              placeholder={field?.placeholder}
              type={field?.type}
              nameLabel={field?.nameLabel}
              register={register(
                field?.id as "name" | "last_name" | "email" | "phone"
              )}
              className="!input-primary w-full"
            />
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            // defaultChecked={switchState}
            checked={switchState}
            // disabled={true}
            onCheckedChange={(checked) => {
              setSwitchState(checked);
              console.log("🚀 ~ Account ~ checked:", switchState);
            }}
            id="busines-customer"
            className="data-[state=unchecked]:!bg-gray-400 data-[state=checked]:!bg-gray-800"
          />
          <Label htmlFor="busines-customer" className="cursor-pointer">
            Busines Customer
          </Label>
        </div>

        <div className="">
          <label className="block pb-2 text-sm">
            Save {idCondition ? "new user" : "profile changes"}
          </label>
          <Button
            className="px-5  font-semibold"
            type="submit"
            disabled={isSubmitting}
          >
            {idCondition ? "Create" : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default React.memo(Account);
