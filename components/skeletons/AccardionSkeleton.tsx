import { cn } from "@/lib/utils";

function AccardionSkeleton({ numberItems = 7, perrentClassName= 'h-14' }: { numberItems?: number, perrentClassName?: string }) {

    const number = Array.from({ length: numberItems,  }, (index) => index)
    return (
        <ul className={cn(
            perrentClassName,
            "size-full space-y-3 *:w-full *:h-14 *:animate-pulse *:bg-gray-200 *:rounded-xl"
        )}>
            {number.map((_,index) => <li key={index}></li>)}
        </ul>
    );
}

export {
    AccardionSkeleton
};