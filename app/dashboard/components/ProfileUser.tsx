import { Avatar } from "@radix-ui/react-avatar";
import { Session } from "inspector/promises";

function ProfileUser({ userData }: { userData: Session }) {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Avatar />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userData?.name}</span>
            </div>
        </>
    );
}

export default ProfileUser;