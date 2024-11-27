'use client'
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TextareaAutosize } from "@/components/ui/textarea-autosize";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { createTicket } from "@/app/actions/adminTicketingActions";

const schema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 5 characters long" })
        .max(100, { message: "Title must be less than 100 characters" }),
    description: z
        .string()
        .min(5, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description must be less than 500 characters" }),
});

function AddTicketing({ token }: { token: string }) {

    const [formError, setFormError] = useState<object>({
        title: '',
        description: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { title, description } = e.target as HTMLFormElement;


        const { success, error } = schema.safeParse({
            title: title.value,
            description: description.value
        });
        // error handling
        if (!success) {
            const zodError = error?.flatten().fieldErrors;
            setFormError({
                title: zodError?.title?.[0] || '',
                description: zodError?.description?.[0] || '',
            });
            return;
        }

        setFormError({
            title: '',
            description: '',
        });

        const { createTicketError, data } = await createTicket({
            token: token,
            title: title.value,
            description: description.value
        });

        if (createTicketError) {
            toast({
                title: 'Error',
                className: 'bg-red-300 text-950',
                duration: 3000,
                description: createTicketError || 'Something went wrong'
            })
            return;
        }

        console.log(data);
    }

    // toast error
    useEffect(() => {
        if (!formError.title && !formError.description) return;
        toast({
            title: 'Unsuccessful',
            className: 'bg-red-300 text-950 font-semibold',
            duration: 3000,
            description: formError?.title
                || formError?.description
                || 'Something went wrong',
        })
    }, [formError])

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <span className="absolute block top-1 right-1 ">
                        <Button
                            variant="outline"
                            className='rounded-md bg-zinc-200 hover:bg-zinc-100 px-2 hover:border-zinc-400'
                        >
                            <p>Add ticket</p>
                            <Plus className='text-black stroke-black' />
                        </Button>
                    </span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md max-sm:max-w-xs rounded-xl overflow-hidden">
                    <DialogHeader>
                        <DialogTitle>Write Ticket</DialogTitle>
                        <DialogDescription>
                            Here you can write your ticket and then press the submit button
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="title" className="block">
                                Title
                            </Label>
                            <Input
                                name="title"
                                id="title"
                                placeholder='Write your title'
                                className="ring-0 focus-visible:ring-0 col-span-3 outline-none outline-1 outline-zinc-400 focus-visible:outline-zinc-500 rounded-sm border-none"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="description" className="block">
                                Description
                            </Label>
                            <TextareaAutosize
                                name="description"
                                id="description"
                                className="p-2 col-span-3 outline-none outline-1 outline-zinc-400 focus-visible:outline-zinc-500 rounded-sm"
                                placeholder='Write your description'
                                maxRows={6}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </>
    );
}

export default AddTicketing;