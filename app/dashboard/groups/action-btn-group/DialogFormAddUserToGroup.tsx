import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { API_Backend, useGEt } from "@/hooks/use-fetch";
import axios from "axios";
import React, { useState } from "react";
import clsx from "clsx";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
    alertState: any;
    dispatch: any;
    lastPage: number;
    groupId: string;
    token: string;
}

function DialogFormAddUserToGroup(
    {
        alertState,
        dispatch,
        lastPage = 1,
        groupId = '',
        token = ''
    }: Props
) {

    // const [pervChecked, setPervChecked] = useState<number | null>(null)


    // const checkPreviouslySelectedItems = (
    //     isChecked: boolean,
    //     checkIds: number
    // ) => {

    //     if (isChecked) {
    //         setPervChecked(checkIds)
    //         return isChecked;
    //     }
    //     return false;
    // }


    //react-hook-form
    const form = useForm();
    const router = useRouter();
    const [pageUserListAlert, setPageUserListAlert] = useState('1')

    //get user list data
    const { data: userListData = [], errorMessage, loading } = useGEt({
        endpoint: `api/users/group/${groupId}?page=${pageUserListAlert}`,
        token: token,
    })

    const onSubmit = async (data: Record<string, string>) => {

        //Get user IDs from selected users
        const selectedUsers = {
            user_ids: Object.entries(data)
                .filter(([_, item]) => item)
                .map(([item, _]) => item)
        };

        console.log('selectedUsers=>>>', selectedUsers, groupId);

        try {
            const res = await axios.post(`${API_Backend}/api/groups/${groupId}/users`,
                selectedUsers,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            dispatch({ type: 'ADD_USER_TO_GROUP', data: false });

            toast({
                title: 'Successful',
                description: 'Users have been added to the group',
                className: "toaster-successfuls"
            })

            router.refresh();
            console.log('response=>>', res, 'id=>>', groupId);

        } catch (error) {
            console.log(error, 'id=>>', groupId);
            toast({
                title: 'Unsuccessful',
                description: 'Something went wrong, please try again later.',
                className: "toaster-errors"
            })
        }
    }

    const returnUsersNotAddedToGroup =
        userListData?.users.filter(
            (person: object) => !person?.inGroup
        ) || [];


    return (
        <Dialog
            open={alertState.addUser}
            onOpenChange={(isOpen) =>
                dispatch({ type: 'ADD_USER_TO_GROUP', data: isOpen })
            }>

            <DialogContent className="max-sm:max-w-sm sm:max-w-lg rounded-lg space-y-2">

                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                        By selecting any of the users, you can add them to the desired group.
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3">

                        {
                            !loading ? (
                                <ScrollArea>
                                    <div className="w-full py-3 max-sm:divide-y divide-zinc-300 *:py-5 max-h-64 *:flex *:w-full *:items-center *:gap-3">
                                        {
                                            returnUsersNotAddedToGroup?.length > 0
                                                ? returnUsersNotAddedToGroup?.map((person: object) => (

                                                    <FormField
                                                        key={person?.id}
                                                        control={form.control}
                                                        name={String(person?.id)}

                                                        render={({ field }) => (

                                                            <FormItem>
                                                                <FormControl>

                                                                    <Checkbox
                                                                        id={person?.id}
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />

                                                                </FormControl>
                                                                <div className="ps-2 flex w-full items-center gap-2">

                                                                    <Avatar className="max-sm:hidden">
                                                                        <AvatarImage src={`${API_Backend}${person?.avatar}`} />
                                                                        <AvatarFallback className="text-sm bg-zinc-300">
                                                                            {(!person?.avatar || person?.avatar == 0)
                                                                                && person?.name?.slice(0, 2).toUpperCase() || 'AV'
                                                                            }
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <Label
                                                                        className="cursor-pointer select-none"
                                                                        htmlFor={person?.id}
                                                                    >
                                                                        {person?.email}
                                                                    </Label>

                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                )) : (
                                                    <div className="size-full mx-auto text-center">
                                                        <p className="text-zinc-600 w-full">No users found</p>
                                                    </div>
                                                )
                                        }
                                    </div>
                                </ScrollArea>
                            ) : (
                                <ul className="w-full *:w-full *:rounded-lg *:bg-zinc-200 *:h-12 space-y-2 *:animate-pulse">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            )
                        }

                        <DialogFooter className="sm:justify-start border-t border-t-zinc-400 pt-5 w-full flex items-center justify-between">
                            <div className="sm:space-x-3 max-sm:space-y-3  w-full max-sm:*:w-full">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        className="border border-zinc-500 bg-transparent font-semibold"
                                        onClick={() => dispatch({ type: 'ADD_USER_TO_GROUP', data: false })}
                                    >
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={loading || form.formState.isSubmitting}>
                                    Submit
                                </Button>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <svg
                                    onClick={() => {
                                        setPageUserListAlert((perv) => {
                                            if (+perv <= 1) return '1';
                                            return String(+perv - 1)
                                        })
                                    }}
                                    className={clsx(
                                        'size-6',
                                        +pageUserListAlert <= 1 && 'opacity-50'
                                    )}
                                    xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>

                                <span className="block px-3 py-1 rounded-lg bg-zinc-300">
                                    {pageUserListAlert || 1}
                                </span>

                                <svg
                                    onClick={() => {
                                        setPageUserListAlert((perv) => {
                                            if (+perv === lastPage) return perv;
                                            return String(+perv + 1)
                                        })
                                    }}
                                    className={clsx(
                                        "size-6",
                                        pageUserListAlert === String(lastPage) && 'opacity-50'
                                    )}
                                    xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                        </DialogFooter>
                    </form>
                </FormProvider>

            </DialogContent>
        </Dialog >
    );
}

export default React.memo(DialogFormAddUserToGroup);