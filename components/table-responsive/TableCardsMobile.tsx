'use client'
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Child {
    children: ReactNode;
}

export function CardTable({ children, className }: Child & { className?: string }) {

    return (
        <div className={cn(className, )}>
            {children}
        </div>
    )
}

export function WrapContent({ children }: Child) {
    return (
        <span className="block text-zinc-700 w-full *:truncate *:overflow-hidden *:py-0.5 ">
            {children}
        </span>
    )
}

export function ContentTable({ content, className }: { content: string, className?: string }) {
    return (
        <p className={cn(className,'w-full')}>
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
            <DropdownMenuTrigger asChild className="hover:bg-zinc-100/30 p-0">
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <div className="*:cursor-pointer">
                    <Link href={`${hrefEdit}/${userId}`} >
                        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => handleDelete(userId)}>Delete</DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function TableCardsMobile({ children }: Child) {
    return (
        <div className="lg:hidden flex flex-col gap-3 items-center w-full justify-center pt-5  *:w-full *:flex *:items-center *:justify-between *:rounded-lg *:min-h-20 *:py-2 *:px-4 *:bg-zinc-100">
            {children}
        </div>
    );
}
