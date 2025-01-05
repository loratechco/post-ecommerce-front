"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { API_Backend, useGEt } from "@/hooks/use-fetch";
import { useSession } from "@/lib/auth/useSession";
import { User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { UserData } from "@/app/types/api-data";

function ProfileBadge() {
  const { token } = useSession();

  console.info(token);
  const { data } = useGEt({
    endpoint: "api/profile",
    token,
  }) as { data: UserData };
  const [isValidAvatar, setIsValidAvatar] = useState(false);
  useEffect(() => {
    if (data?.avatar) {
      setIsValidAvatar(true);
    }
  }, [data?.avatar]);

  return (
    <div className="flex items-center justify-center gap-4 p-1">
      <div className="flex aspect-square size-9 bg-zinc-200 items-center justify-center rounded-full bg-transparent text-sidebar-primary-foreground">
        <Avatar>
          {isValidAvatar ? (
            <AvatarImage src={`${API_Backend}${data?.avatar}`} />
          ) : (
            <User2Icon className="size-11/12 text-zinc-800 p-1 mx-auto" />
          )}
          {/* <AvatarFallback className="text-xs">Profile</AvatarFallback> */}
        </Avatar>
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <p className="truncate font-semibold first-letter:uppercase">
          {data?.name || "Name"}
        </p>
      </div>
    </div>
  );
}

export default ProfileBadge;
