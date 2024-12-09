'use client'
import { AlertComponent, PropsAlertComponent } from "@/components/ui/AlertDialogComponent";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useReducer, useState } from "react";
import { boolean } from "zod";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";



interface Props {
    id: string;
    token: string
}
type StateReducer = {
    delete: boolean;
    addUser: boolean;
};

type ActionReducer = {
    type: 'DELETE' | 'ADD_USER';
    data: boolean;
};
interface FormValues {
    [key: string]: boolean;
}

function ActionBtnGroup(props: Props) {

    const roter = useRouter()

    const alertReducer = (state: StateReducer, action: ActionReducer): StateReducer => {
        switch (action.type) {
            case 'DELETE':
                return { ...state, delete: action.data }; // فقط مقدار delete را تغییر می‌دهد
            case 'ADD_USER':
                return { ...state, addUser: action.data }; // فقط مقدار addUser را تغییر می‌دهد
            default:
                return state;
        }
    };

    const initialState: StateReducer = {
        delete: false,
        addUser: false,
    };

    const [alertState, dispatch] = useReducer(alertReducer, initialState);

    const deletGroupHandler = async () => {
        console.log('this worked');
        try {
            await axios.delete(`http://app.api/api/groups/${props?.id || ''}`, {
                headers: {
                    Authorization: `Bearer ${props?.token || ''}`
                }
            })

            // To show new items after successful deletion
            roter?.refresh();
            toast({
                title: 'Successful',
                description: 'The group was successfully deleted',
                className: 'toaser-successfuls',
            })

        } catch (error) {
            toast({
                title: 'Unsuccessful',
                description: 'The group could not be deleted, something went wrong.',
                className: 'toaser-errors',
            })
        }
    }

    const ALERT_CONFIG: PropsAlertComponent = {
        tilte: "Are you absolutely sure?",
        description: "Release the continue button and you will delete this group.",
        nameFirstBtn: "continue",
        cancelBtn: "cancel",

        btnValue: (value: string) => {
            if (value === 'continue') {
                deletGroupHandler()
            }
        },
        open: alertState.delete,
        setOpen: () => {
            dispatch({
                type: 'DELETE',
                data: false,
            })
        },
    }

    const { register, handleSubmit } = useForm()

    const onSubmit = (e) => {
        console.log(true);
        console.log(e.target);
    }

    return (
        <>
            {/* this is alert for delete group  */}
            <AlertComponent {...ALERT_CONFIG} />

            {/* دیالوگ */}
            <Dialog
                open={alertState.addUser}
                onOpenChange={(isOpen) =>
                    dispatch({
                        type: 'ADD_USER',
                        data: isOpen,
                    })
                }
            >
                <form onSubmit={onSubmit}>

                    <DialogContent className="max-sm:max-w-md sm:max-w-lg rounded-lg">
                        <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                            <DialogDescription>
                                By selecting any of the users, you can add them to the desired group.
                            </DialogDescription>
                        </DialogHeader>

                        <ScrollArea className="size-full">
                            <ul className="w-full space-y-5 py-3 *:flex *:w-full *:items-center *:gap-3 max-h-56">
                                {[
                                    { id: '1', email: 'example1@gmail.com' },
                                    { id: '2', email: 'example2@gmail.com' },
                                ].map((item) => (
                                    <li key={item.id}>
                                        <Checkbox id={item.id} {...register(item.id)} />
                                        <div className="ps-2 flex w-full items-center gap-2">
                                            <Avatar>
                                                <AvatarImage />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <Label htmlFor={item.id}>{item.email}</Label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>

                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => dispatch({ type: 'ADD_USER', data: false })}
                                >
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="pb-1 font-bold !cursor-default border-b border-b-zinc-300  mb-1.5">Acctions</DropdownMenuLabel>

                    <div className="*:cursor-pointer font-semibold hover:*:!bg-zinc-300/70">

                        <DropdownMenuItem
                            onClick={() => {
                                dispatch({ type: "ADD_USER", data: true })
                                console.log('this reducer state =>>', alertState.addUser);
                            }}>
                            Add User
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link
                                href={`/dashboard/groups/${props?.id || ''}`}
                                className="block size-full">
                                Edit Group
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => {
                                dispatch({ type: "DELETE", data: true })
                            }}>
                            Delete Group
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default ActionBtnGroup;