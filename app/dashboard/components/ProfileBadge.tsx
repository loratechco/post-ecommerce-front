import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Session } from "inspector/promises";
import Link from "next/link";

function ProfileBadge({ userData }: { userData: Session }) {
    return (
        <Link href="/dashboard/profile" className="flex items-center justify-center gap-3">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Json</span>
            </div>
        </Link>
    );
}

export default ProfileBadge;