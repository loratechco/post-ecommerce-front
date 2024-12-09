'use client'
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

} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { MouseEvent, useState } from "react";

export type PropsAlertComponent = {
  tilte: string;
  description: string;
  nameFirstBtn: string;
  cancelBtn: string;
  btnValue: (vlue: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function AlertComponent({
  description,
  nameFirstBtn = 'Continue',
  cancelBtn = 'Cancel',
  tilte,
  btnValue,
  open,
  setOpen,
}: PropsAlertComponent) {

  const setBtnValue = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    btnValue(e?.target?.textContent);
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{tilte}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>

          <AlertDialogCancel
            onClick={(e) => {
              setOpen(false)
              setBtnValue(e)
            }}>
            {nameFirstBtn}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              setOpen(false)
              setBtnValue(e)
            }}>
            {cancelBtn}
          </AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

