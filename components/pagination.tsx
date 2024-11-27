"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";

interface Props {
    pages: number;
}

export function PaginationComponent({ pages = 1 }: Props) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    // تولید آرایه شماره صفحات برای نمایش
    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(pages, start + maxPagesToShow - 1);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handlePageChange = (page: number) => {
        if (page === currentPage || page < 1 || page > pages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };


    return (
        <Pagination>
            <PaginationContent>
                {/* دکمه قبلی */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={cn(
                            "cursor-pointer",
                            currentPage <= 1 && "opacity-50 pointer-events-none"
                        )}
                    />
                </PaginationItem>

                {/* صفحه اول */}
                {currentPage > 3 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => handlePageChange(1)}
                                className="cursor-pointer"
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationEllipsis />
                    </>
                )}

                {/* شماره صفحات */}
                {getPageNumbers().map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            onClick={() => handlePageChange(pageNumber)}
                            isActive={currentPage === pageNumber}
                            className={cn(
                                "cursor-pointer",
                                currentPage === pageNumber && "border-primary"
                            )}
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* صفحه آخر */}
                {currentPage < pages - 2 && (
                    <>
                        <PaginationEllipsis />
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => handlePageChange(pages)}
                                className="cursor-pointer"
                            >
                                {pages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {/* دکمه بعدی */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={cn(
                            "cursor-pointer",
                            currentPage >= pages && "opacity-50 pointer-events-none"
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
