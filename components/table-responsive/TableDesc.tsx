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

export function TheadDesc({ children }: Child) {
    return (

        <thead className="border-b font-medium bg-zinc-300 dark:border-neutral-500 border-zinc-400 rounded-t-lg">

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
        <tr className={cn(
            className
        )}>{children}</tr>
    )
}

// title in THeader 
export function ThDesc({ title }: Omit<TbodyProps, 'content'>) {
    return (
        <th scope="col" className="px-6 py-4 first-letter:uppercase">{title}</th>
    )
}

// wrap content 
export function TbodyDesc({ children }: Child) {
    return (
        <tbody className="divide-y divide-[#bcbcc5] bg-zinc-200">
            {children}
        </tbody>
    )
}

// content table in TBody 
export function TdDesc({ children }: Child) {

    return (
        <td className="text-center first:w-full max-w-[130px] first:sm:w-auto whitespace-nowrap p-4 first:max-sm:max-w-0 first:truncate">
            {children}

            {/* <dl className='lg:hidden hidden first:block font-normal text-gray-700'>
                <dt className='sr-only sm:hidden'>
                    {title}
                </dt>
                <dd className='py-0.5 sm:hidden truncate'>
                    {content}
                </dd>
            </dl> */}
        </td>)
}

// table wrapper 

export default function TableDesc({ children }: Child) {
    return (
        <div className="hidden lg:flex lg:flex-col overflow-x-auto w-full pt-5 ">

            <ScrollArea className=' rounded-lg overflow-hidden ' >
                <div className="sm:-mx-6 lg:-mx-8 overflow-hidden rounded-lg">
                    <div className="inline-block min-w-full sm:px-5 lg:px-4 overflow-hidden rounded-lg">
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full text-center text-sm overflow-hidden font-light bg-[#e2e2e7] rounded-lg">
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
