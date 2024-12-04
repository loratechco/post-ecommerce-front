'use client'
// import { handleDelete } from "@/app/actions/userListActions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserListDropDown({ person, page, token }: { person: any, page: string, token: string }) {
    const router = useRouter();

    // const handelDeleteUser = async () => {
    //     const res = await handleDelete({ id: person?.id, pageQuery: page, token: token });
    //     if (res.success) {
    //         router.refresh();
    //     }
    //     return res;
    // }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <button type='button' className="h-8 w-8 p-0 ">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4 bg-transparent" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link href={`/dashboard/users-management/${person?.id}`}>
                    <DropdownMenuItem className='cursor-pointer'>Edit</DropdownMenuItem>
                </Link>
                {/* <DropdownMenuItem className='cursor-pointer' onClick={handelDeleteUser}>Delete</DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}