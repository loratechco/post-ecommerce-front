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
} from "@/components/ui/alert-dialog";

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
  const setCloseAlertAndGetValue = (e: any) => {
    setOpen(false);
    btnValue(e?.target?.textContent);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="min-h-44 flex justify-between flex-col">
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
