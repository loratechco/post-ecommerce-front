import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Child {
    children: ReactNode;
}

export function CardTable({ children, className }: Child & { className?: string }) {

    return (
        <div className={
            cn(
                'w-full flex items-center justify-between rounded-lg min-h-20 py-2 px-4 bg-gray-300 shadow-md',
                className
            )
        }>
            {children}
        </div>
    )
}


export function WrapContent({ children }: Child) {
    return (
        <span className="block text-gray-600 truncate">
            {children}
        </span>
    )
}

export function ContentTable({ content }: { content: string }) {
    return (
        <p className='first:text-gray-800'>
            {content}
        </p>
    )
}

export function ActionBtn({
    handleDelete,
    hrefEdit,
    userId,
}: {
    userId: string | number;
    handleDelete: (value: any) => void;
    hrefEdit: string;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link href={`${hrefEdit}/${userId}`}>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(userId)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function TableCardsMobile({ children }: Child) {
    return (
        <div className="lg:hidden flex flex-col gap-3 items-center w-full justify-center pt-5">
            {children}
        </div>
    );
}
