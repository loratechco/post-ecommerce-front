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
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    mapData: object[];
}

export function PaginationComponent({ mapData }: Props) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const router = useRouter();
    const pathname = usePathname();

    console.log(currentPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber === currentPage) return;
        router.push(`${pathname}?page=${pageNumber}`);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {/* By pressing this button, the current value of the page is reduced by one,
                    and it is given to the function as the page requested by the user*/}
                    <PaginationPrevious
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage <= 1 ? " opacity-60" : ""}
                    />
                </PaginationItem>

                {mapData?.map((_, page) => (
                    <PaginationItem key={page}>
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

                {currentPage > 3 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => currentPage < mapData.length && handlePageChange(currentPage + 1)}
                        className={currentPage >= mapData.length ? " opacity-60" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
