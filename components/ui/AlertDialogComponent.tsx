"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MouseEvent, useState } from "react";

export type PropsAlertComponent = {
  tilte: string;
  description: string;
  nameFirstBtn: string;
  cancelBtn: string;
  btnValue: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
};

//This is the prop value that should be given to this component when using it
//Example:
// const PROPS_VALUE_ALERT_DELETE: PropsAlertComponent = {
//  tilte: "Are you absolutely sure?",
//  description: "Release the continue button and you will delete this group.",
//  nameFirstBtn: "continue",
//  cancelBtn: "cancel",//

//  btnValue: (value: string) => {
//    if (value === "continue") {
//      deleteUserFromGroupHandler();
//    }
//  },
//  open,
//  setOpen: () => {
//    setOpen(false);
//  },
//};

export function AlertComponent({
  description,
  nameFirstBtn = "Continue",
  cancelBtn = "Cancel",
  tilte,
  btnValue,
  open,
  setOpen,
}: PropsAlertComponent) {
  const setCloseAlertAndGetValue = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    btnValue(e?.target?.textContent);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="min-h-44 flex items-end justify-between flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>{tilte}</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-600">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>

          <AlertDialogCancel
            className="!border border-zinc-800"
            onClick={setCloseAlertAndGetValue}
          >
            {cancelBtn}
          </AlertDialogCancel>

          <AlertDialogAction onClick={setCloseAlertAndGetValue}>
            {nameFirstBtn}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
