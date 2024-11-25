'use client'
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";


function AddTicketing() {


    const dialogHandler = () => {
        console.log('clicked');
    }

    return (
        <span className="absolute block top-1 right-1 ">
            <Button
                onClick={dialogHandler}
                variant="outline"
                className='size-9 rounded-full bg-zinc-200/90 hover:bg-zinc-50 scale-125'
            >
                <Plus className='text-black stroke-black' />
            </Button>
        </span>
    );
}

export default AddTicketing;