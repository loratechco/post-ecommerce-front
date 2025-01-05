import { ReactNode } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

// ScrollArea from ShadCn/ui

type TbodyProps = {
    content: string;
    title: string;
}

interface Child {
    children: ReactNode
}

export function TheadDesc({ children, className }: Child & { className?: string }) {
    return (

        <thead className={cn(
            className,
            'border-b  border-zinc-300 bg-zinc-100 px-3 rounded-t-lg'
        )}>

            {children}
            {/* This is for when mobile responsive card mode is not used  */}

            {/* <th scope="col" className="max-sm:hidden px-6  py-4">email</th>
                <th scope="col" className="hidden lg:table-cell px-6  py-4">phone</th> */}
        </thead>
    )
}

// TRow for wrap all content
export function TrDesc({ children, className }: Child & { className?: string }) {

    return (
        <tr className={cn('even:bg-white',
            className
        )}>{children}</tr>
    )
}

// title in THeader 
export function ThDesc({ title }: Omit<TbodyProps, 'content'>) {
    return (
        <th scope="col" className="px-6 py-4 first-letter:uppercase text-zinc-500 ">{title}</th>
    )
}

// wrap content 
export function TbodyDesc({ children }: Child) {
    return (
        <tbody className="divide-y divide-zinc-300 bg-zinc-50">
            {children}
        </tbody>
    )
}

// content table in TBody 
export function TdDesc({ children }: Child) {

    return (
        <td className="text-center max-w-[130px] font-semibold  whitespace-nowrap p-4 truncate">
            {children}

            {/* <dl className='lg:hidden hidden first:block font-normal text-gray-700'>
                <dt className='sr-only sm:hidden'>
                    {title}
                </dt>
                <dd className='py-0.5 sm:hidden truncate'>
                    {content}
                </dd>
            </dl> */}
        </td>
        )
}

// table wrapper 
export default function TableDesc({ children }: Child) {
    return (
        <div className="hidden lg:flex lg:flex-col overflow-x-auto w-full pt-5">

            <ScrollArea className=' rounded-lg overflow-hidden ' >
                <div className="sm:-mx-6 lg:-mx-8 overflow-hidden rounded-lg">
                    <div className="inline-block min-w-full sm:px-5 lg:px-4 overflow-hidden rounded-lg">
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full text-center text-sm overflow-hidden rounded-lg">
                                {children}
                            </table>
                        </div>
                    </div>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
