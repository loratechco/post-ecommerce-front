import CreateNewGroup from "../../groups/CreateNewGroup";
import SearchComponent from "../../ticketing/components/SearchComponent";

import TableDesc, { TbodyDesc, TdDesc, ThDesc, TheadDesc, TrDesc } from "@/components/table-responsive/TableDesc";
import TableCardsMobile, { ActionBtn, CardTable, ContentTable, WrapContent } from "@/components/table-responsive/TableCardsMobile";
import Link from "next/link";
import { PaginationComponent } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
    OptionalComponentNextToInput?: ReactNode;
    headerItems: string[];
    tablebodyChildren: ReactNode;
    cardBodyChildren: ReactNode;
    lastPageForPagination: number;
    searchInput: boolean;
}

/**
 * ⚠️ Note: In this component, you must use `TdDesc Component` to render the `tablebodyChildren`.
 *
 * Example:
 * `tablebodyChildren={
 *  array.map((items)=>{
 *    <TrDesc>
 *      <TdDesc>
 *          items
 *      <TdDesc/>
 *     <TrDesc/>
 *  })
 * }`
 * 
 * 
 * ⚠️Note: In this component, you must use `CardTable>WrapContent>ContentTable Components` to render the `cardBodyChildren`.
 *   
 * Example:
 * `
 * Array.map(items=>(
 * <CardTable className="">
 * <WrapContent>
 * <ContentTable
 * content={'hi'}
 * />
 * <ContentTable
 * className="max-w-[120px]"
 * content={name}
 * />
 * </WrapContent>
 * </CardTable>
 * ))
 * `
 */

function MyDatatTable({
    OptionalComponentNextToInput,
    tablebodyChildren,
    cardBodyChildren,
    headerItems,
    lastPageForPagination,
    searchInput = true
}: Props) {
    return (
        <div className='size-full'>
            {searchInput && <SearchComponent>
                {OptionalComponentNextToInput}
            </SearchComponent>
            }

            <div className='pt-5 w-full'>
                <TableDesc>
                    <TheadDesc>
                        <TrDesc>
                            {
                                headerItems || headerItems?.length > 1 ?

                                    headerItems?.map((title: string, index) => (
                                        <ThDesc title={title} key={index} />
                                    ))
                                    : <ThDesc title="There is no title" />
                            }
                        </TrDesc>
                    </TheadDesc>

                    <TbodyDesc>
                        {
                            tablebodyChildren
                        }
                    </TbodyDesc>
                </TableDesc>

                {/* card box for mobile size  */}
                <TableCardsMobile >
                    {
                        cardBodyChildren
                    }
                </TableCardsMobile>

            </div>

            <div className="py-7">
                <PaginationComponent
                    pages={lastPageForPagination || 1}
                />
            </div>
        </div>
    );
}

const calculateIndexListItems = (
    index: number,
    page: string
) => {
    return ((+page - 1) * 10 + index + 1);
};

export { MyDatatTable, calculateIndexListItems };