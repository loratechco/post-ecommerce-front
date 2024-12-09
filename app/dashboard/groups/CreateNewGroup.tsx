'use client'

import ErrorToast from "@/components/ErrorToast";
import FormInput from "@/components/FormInput";
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
import { Label } from "@/components/ui/label";
import { TextareaAutosize } from "@/components/ui/textarea-autosize";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, 'The group name is required').max(80, 'The length of the name field is 80 characters'),
    description: z.string().min(1, 'The group description is required').max(800, 'The length of the name field is 800 characters'),
})

type Sumbit = z.infer<typeof schema>;

function CreateNewGroup({ token }: { token: string }) {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: { errors }, reset } = useForm<Sumbit>({
            resolver: zodResolver(schema),
        });


    const sumbitHandler = async (data: Sumbit) => {
        console.log(data);

        try {
            const res = await axios.post('http://app.api/api/groups', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(res);
            toast({
                className: 'bg-green-300 text-green-950 border-none',
                title: 'Successful',
                description: 'Your group was temporarily registered'
            })
            reset({
                name: '',
                description: ''
            })
            router.refresh()
        } catch (error) {
            console.log(error);
            toast({
                className: 'bg-red-300 text-red-950 border-none z-50',
                title: 'Unsuccessful',
                description: 'The group could not be registered'
            })
        }
    }


    return (
        <div className="z-40 relative">
            <Dialog>
                <ErrorToast
                    dependency={errors}
                    errorMessagesArray={
                        [errors?.name?.message, errors?.description?.message]
                    }
                />
                <DialogTrigger className="btn-outline py-2 px-1.5 text-sm">
                    Create Group
                </DialogTrigger>

                <DialogContent className="rounded-xl max-sm:max-w-md sm:max-w-lg" >
                    <DialogHeader>
                        <DialogTitle>Creat New Group</DialogTitle>
                        <DialogDescription>Fill in the title and description fields to create a new group</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(sumbitHandler)} className="space-y-3">
                        <FormInput
                            id="name"
                            nameLabel="Name"
                            register={register('name')}
                            type="text"
                            className="text-black border border-zinc-400"
                            maxLength={80}
                        />

                        <div className="space-y-2">
                            <Label htmlFor='description'>Description</Label>
                            <TextareaAutosize
                                {...register('description')}
                                id="description"
                                className="text-black border border-zinc-400"
                                maxRows={6}
                                maxLength={800}
                            />
                        </div>

                        <DialogFooter className="sm:justify-start w-full">
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateNewGroup;