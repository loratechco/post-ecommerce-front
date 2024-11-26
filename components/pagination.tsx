"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
    pages: object[];
}

export function PaginationComponent({ pages = 1, }: Props) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber === currentPage) return;
        router.push(`${pathname}?page=${pageNumber}`);
    };
    const maxPages = Math.min(Number(pages), 3);
    const totalPages = Array.from({ length: maxPages }, (_, index) => index + 1);
    const pagesIndex = Array.from({ length: pages }, (_, index) => index + 1);

    console.log(pagesIndex);

    return (
        <Pagination className="mb-6">
            <PaginationContent>
                <PaginationItem className="cursor-pointer">
                    {/* By pressing this button, the current value of the page is reduced by one,
                    and it is given to the function as the page requested by the user*/}
                    <PaginationPrevious
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage <= 1 ? " opacity-60" : ""}
                    />
                </PaginationItem>

                {totalPages?.map((_, page) => (
                    <PaginationItem key={page} className="cursor-pointer">
                        <PaginationLink
                            className={cn(
                                'font-semibold',
                                { 'border-zinc-500': currentPage === page + 1 }
                            )}
                            onClick={() => handlePageChange(page + 1)}
                            isActive={currentPage === page + 1}
                        >
                            {page + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {
                    pagesIndex.length > 2 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )
                }


                <PaginationItem className="cursor-pointer">
                    <PaginationLink
                        className={cn(
                            'font-semibold',
                            { 'border-zinc-500': currentPage === pages }
                        )}
                        onClick={() => handlePageChange(pages)}
                        isActive={currentPage === pages}
                    >
                        {pages}
                    </PaginationLink>
                </PaginationItem>

                <PaginationItem className="cursor-pointer">
                    <PaginationNext
                        onClick={() => currentPage < pagesIndex.length && handlePageChange(currentPage + 1)}
                        className={currentPage >= pagesIndex.length ? " opacity-60" : ""}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}
