'use client'
import { useForm } from "react-hook-form";

import { schemaEditGroupAndCreatGroup, Submit } from "../type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { TextareaAutosize } from "@/components/ui/textarea-autosize";
import { DialogContent, Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import React from "react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { API_Backend } from "@/hooks/use-fetch";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ErrorToast from "@/components/ErrorToast";

interface Props {
    dispatch: React.Dispatch<any>;
    alertState: any
    id: string;
    token: string
}

function DialogFormEditGroup({ dispatch, alertState, id, token }: Props) {

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<Submit>({
        resolver: zodResolver(schemaEditGroupAndCreatGroup),
    });
    const submitEditData = async (data: Submit) => {
        console.log(data);

        try {
            const res = await axios.put(`${API_Backend}/api/groups/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            dispatch({ type: 'Edit_GROUP', data: false })

            toast({
                title: 'Success',
                description: 'Changes were successfully saved',
                className: "toaser-successfuls "
            })

            router.refresh()

            console.log('sucsessfuly', res);
        } catch (error) {
            console.log(error);
            toast({
                title: 'Unsuccess',
                description: 'Changes were not applied',
                className: "toaser-errors"
            })
        }
    }

    return (
        <>
            <ErrorToast
                dependency={errors}
                errorMessagesArray={[errors?.name?.message, errors?.description?.message]}
            />
            <Dialog
                open={alertState.editUser}

                onOpenChange={(isOpen) => {
                    dispatch({ type: 'Edit_GROUP', data: isOpen })
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Group</DialogTitle>
                        <DialogDescription>
                            You can edit the name and description of the group here.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(submitEditData)} className="space-y-3">
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

                        <DialogFooter className="pt-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    dispatch({ type: 'Edit_GROUP', data: false })
                                }}>
                                close
                            </Button>

                            <Button type="submit">save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default React.memo(DialogFormEditGroup);