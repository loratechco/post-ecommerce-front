function AccardionSkeleton({ numberItems = 7 }: { numberItems?: number }) {

    const number = Array.from({ length: numberItems }, (index) => index)
    return (
        <ul className="size-full space-y-3  *:w-full *:h-14 *:animate-pulse *:bg-gray-300 *:rounded-xl">
            {number.map(() => <li></li>)}
        </ul>
    );
}

export {
    AccardionSkeleton
};