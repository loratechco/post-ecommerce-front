"use client";
import {
  AlertComponent,
  PropsAlertComponent,
} from "@/components/ui/AlertDialogComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { API_Backend, useGEt } from "@/hooks/use-fetch";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

import { Ellipsis, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  userId: string;
  groupId: string;
  token: string;
}

function ActionTableGroupBtn({ userId, groupId, token }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  
  const deleteUserFromGroupHandler = async () => {
    console.log(userId, groupId);
    try {
      const res = await axios.delete(
        `${API_Backend}/api/groups/${groupId}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.info(res);

      toast({
        title: "successfull",
        description: "Delete successfully",
        className: "toaster-successfuls",
      });
      router.refresh();
    } catch (error) {
      console.info(error);

      toast({
        title: "Unsuccessfull",
        description: "Something went wrong, please try again later",
        className: "toaster-errors",
      });
    }
  };

  const PROPS_VALUE_ALERT_DELETE: PropsAlertComponent = {
    tilte: "Are you absolutely sure?",
    description: "You can remove the user from the group by pressing the continue button.",
    nameFirstBtn: "continue",
    cancelBtn: "cancel",

    btnValue: (value: string) => {
      if (value === "continue") {
        deleteUserFromGroupHandler();
      }
    },
    open,
    setOpen,
  };

  return (
    <>
      <AlertComponent {...PROPS_VALUE_ALERT_DELETE} />
      
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal size={22} />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel className="pb-1 font-bold !cursor-default border-b border-b-zinc-300 mb-1.5">
            Acctions
          </DropdownMenuLabel>

          <div className="*:cursor-pointer hover:*:!bg-zinc-200">
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Delete
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ActionTableGroupBtn;
