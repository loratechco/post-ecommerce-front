'use client'
import { AlertComponent, PropsAlertComponent } from "@/components/ui/AlertDialogComponent";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useReducer, useState } from "react";

import { ActionReducerFunc, initialState } from "./action-btn-reducer";
import DialogFormEditGroup from "./DialogFormEditGroup";
import DialogFormAddUserToGroup from "./DialogFormAddUserToGroup";

interface Props {
    id: string;
    token: string
}

function ActionBtnGroup(props: Props) {

    const router = useRouter()

    //Activator of action button alerts
    const [alertState, dispatch] = useReducer(ActionReducerFunc, initialState);

    const deletGroupHandler = async () => {
        console.log('this worked');
        try {
            await axios.delete(`http://app.api/api/groups/${props?.id || ''}`, {
                headers: {
                    Authorization: `Bearer ${props?.token || ''}`
                }
            })

            // To show new items after successful deletion
            router?.refresh();
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

    const PROPS_VALUE_ALERT_DELETE: PropsAlertComponent = {
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
                type: 'DELETE_GROUP',
                data: false,
            })
        },
    }

    return (
        <>
            {/* this is alert for delete group  */}
            <AlertComponent {...PROPS_VALUE_ALERT_DELETE} />

            <DialogFormAddUserToGroup
                alertState={alertState}
                dispatch={dispatch}
                groupId={props?.id}
                token={props?.token}
                lastPage={1}
            />

            <DialogFormEditGroup
                alertState={alertState}
                dispatch={dispatch}
                id={props?.id}
                token={props?.token}
            />

            <DropdownMenu>

                <DropdownMenuTrigger>
                    <MoreHorizontal size={20} />
                </DropdownMenuTrigger>

                <DropdownMenuContent>

                    <DropdownMenuLabel
                        className="pb-1 font-bold !cursor-default border-b border-b-zinc-300 mb-1.5"
                    >
                        Acctions
                    </DropdownMenuLabel>

                    <div
                        className="*:cursor-pointer hover:*:!bg-zinc-200"
                    >

                        <DropdownMenuItem
                            onClick={() => {
                                dispatch({ type: "ADD_USER_TO_GROUP", data: true })
                            }}>
                            Add User
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => {
                                dispatch({ type: 'Edit_GROUP', data: true })
                                console.log(alertState.editUser);
                            }}>
                            Edit Group
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => {
                                dispatch({ type: "DELETE_GROUP", data: true })
                            }}>
                            Delete Group
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>

            </DropdownMenu>
        </>
    );
}

export default React.memo(ActionBtnGroup);