function Skeleton() {
    return ( 
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 animate-pulse duration-1000">
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3 items-center">
                <div role="status" className="h-56 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
                <div role="status" className="h-56 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
                <div role="status" className="h-56  bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
            </div>
            <div role="status" className="h-96 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
        </div>
     );
}

export default Skeleton;