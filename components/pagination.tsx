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

    const DOTS = "...";

    // محاسبه محدوده صفحات قابل نمایش
    const getVisiblePages = () => {
        const siblingCount = 1;
        const totalPageNumbers = siblingCount + 5;

        // اگر تعداد کل صفحات کمتر از محدوده مورد نیاز است
        if (pages <= totalPageNumbers) {
            return Array.from({ length: pages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, pages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < pages - 2;

        // حالت‌های مختلف نمایش
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftRange = Array.from({ length: 3 }, (_, i) => i + 1);
            return [...leftRange, DOTS, pages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightRange = Array.from(
                { length: 3 },
                (_, i) => pages - 2 + i
            );
            return [1, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = Array.from(
                { length: rightSiblingIndex - leftSiblingIndex + 1 },
                (_, i) => leftSiblingIndex + i
            );
            return [1, DOTS, ...middleRange, DOTS, pages];
        }
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
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={cn(
                            "cursor-pointer",
                            currentPage <= 1 && "opacity-50 pointer-events-none",

                        )}
                    />
                </PaginationItem>

                {getVisiblePages()?.map((pageNumber, idx) => (
                    <PaginationItem key={idx} >
                        {pageNumber === DOTS ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                onClick={() => handlePageChange(Number(pageNumber))}
                                isActive={currentPage === pageNumber}
                                className={cn(
                                    "cursor-pointer",
                                    currentPage === pageNumber && "border-zinc-400"
                                )}
                            >
                                {pageNumber}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

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
