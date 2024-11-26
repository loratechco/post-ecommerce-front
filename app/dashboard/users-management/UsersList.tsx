'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Search, ArrowRight, MoreHorizontal, } from 'lucide-react'
import axios from 'axios'
import { useSession } from '@/lib/auth/useSession'
import TableDesc, { TbodyDesc, TdDesc, ThDesc, TheadDesc, TrDesc } from '@/components/table-responsive/TableDesc'
import TableCardsMobile, { ActionBtn, CardTable, ContentTable, WrapContent } from '@/components/table-responsive/TableCardsMobile'
import Link from 'next/link'
import { DrawerDialogAddUser } from "@/components/DialogDrawer"

import * as React from "react"
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaginationComponent } from '@/components/pagination'
import { handleDelete, userListFetch } from '@/app/actions/userListActions'
import formSchema, { FormData } from './schema'
import { addUserFields, FormField } from './formFields'
import ErrorToast from '@/components/ErrorToast'
import { object } from 'zod'

export default function UserList({ pageQuery }: { pageQuery: string }) {
    const token = useSession();
    const [userListData, setUserListData] = useState<{ data: object[], totalPages: number, totalUsers: number, firstPage: number }>({
        data: [],
        totalPages: 1,
        firstPage: 1,
        totalUsers: 0,
    })

    useEffect(() => {
        const fetchUsers = async () => {
            const { success, data, error } = await userListFetch({ pageQuery });
            // this structher user list data
            //     from: 1, …
            // }
            // current_page: 1
            // data: Array(10)[{… }, {… }, {… }, … ]
            // first_page_url: "http://app.api/api/users?page=1"
            // from: 1
            // last_page: 4
            // last_page_url: "http://app.api/api/users?page=4"
            // links: Array(6)[{… }, {… }, {… }, … ]
            // next_page_url: "http://app.api/api/users?page=2"
            // path: "http://app.api/api/users"
            // per_page: 10
            // prev_page_url: null
            // to: 10
            // total: 32
            console.log(data);
            if (success) {
                setUserListData({
                    data: data?.data,
                    totalPages: data?.last_page,
                    totalUsers: data?.total,
                    firstPage: data?.from,
                });
            }

            if (error) {
                console.log('error ==>', error);
                toast({
                    description: error || 'users invalid',
                    className: 'bg-red-300 text-red-950'
                });
            }
        };

        fetchUsers();
    }, [pageQuery]);

    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });
    // toast value
    const { duration, successClass, errorClass } = {
        successClass: "bg-green-300 text-green-950 font-semibold",
        errorClass: "bg-red-300 text-red-950 font-semibold",
        duration: 3000,
    }

    const query = watch('search');
    // search handler 
    useEffect(() => {
        if (!query) return;
        const timeOuteId = setTimeout(() => {
            const search = async () => {
                try {
                    const { data: { data } } = await userListFetch({ query });
                    setUserListData(data?.data)

                    console.log('data', data);

                } catch (error) {
                    toast({
                        description: error?.data?.message || 'error',
                        className: 'bg-red-300 text-red-950',
                        duration
                    })
                }
            }
            search();
        }, 1000)

        return () => clearTimeout(timeOuteId);
    }, [query])

    const handleAddUser = async ({ data, setUserListData }: { data: FormData, setUserListData: () => void }) => {
        try {
            const res = await axios.post(`http://app.api/api/users`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            setUserListData(prev => [...prev, res.data.user]);

            toast({
                description: "User added successfully",
                className: successClass,
                duration,
            });

        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error adding user";
            console.log("🚀 ~ handleAddUser ~ error:", error)
            toast({
                description: errorMessage,
                className: errorClass,
                duration,
            });
        }
    }

    const deleteUser = async (person: object) => {
        try {
            const {
                success,
                error,
                data
            } = await handleDelete({ id: person?.id });

            if (!success) throw new Error(error)
            setUserListData(data);

            toast({
                title: "Successful",
                description: "User deleted successfully",
                className: successClass,
                duration,
            });
        } catch (error) {
            toast({
                title: "Unsuccessful",
                description: error?.message || "An error occurred while deleting the user",
                className: errorClass,
                duration,
            });
            console.log("🚀 ~ deleteUser ~ error:", error);
        }
    }

    const errorArray = [
        errors?.name?.message,
        errors?.last_name?.message,
        errors?.email?.message,
        errors?.phone?.message,
    ]

    return (
        <section className="w-full">

            <ErrorToast
                dependency={errors}
                errorMessagesArray={errorArray}
            />

            <h1 className="text-2xl font-bold mb-4">Users Management</h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                <div className="relative w-full sm:w-64">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center border border-gray-400 overflow-hidden px-2 rounded-md w-full md:w-80">
                            <div className="text-muted-foreground/80 peer-disabled:opacity-50">
                                <Search size={16} strokeWidth={2} />
                            </div>
                            <Input
                                id="input-26"
                                className="peer border-none focus-visible:ring-0 w-full "
                                placeholder="Search..."
                                {...register('search')}
                                type="search"
                            />
                            <button
                                className="items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Submit search"
                                type="submit"
                            >
                                <ArrowRight
                                    size={16}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                    onClick={() => setValue("search", '')}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <DrawerDialogAddUser
                    onSubmit={handleSubmit((data) =>
                        handleAddUser({
                            data,
                            setUserListData,
                        }))}

                    fields={addUserFields}
                    register={register}
                    errors={errors}
                />
            </div>

            {/* table for desctop  */}
            <TableDesc>
                <TheadDesc>
                    <TrDesc>
                        <ThDesc title='Name' />
                        <ThDesc title='Email' />
                        <ThDesc title='Phone' />
                        <ThDesc title='actions' />
                    </TrDesc>
                </TheadDesc>

                <TbodyDesc>
                    {userListData?.data?.map((person) => (
                        <TrDesc key={person?.id}>
                            <TdDesc>
                                <p>{person?.name}</p>
                            </TdDesc>
                            <TdDesc>
                                <p>{person?.email}</p>
                            </TdDesc>
                            <TdDesc>
                                <p>{person?.phone}</p>
                            </TdDesc>
                            <TdDesc>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild >
                                        <button type='button' className="h-8 w-8 p-0 ">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4 bg-transparent" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <Link href={`/dashboard/users-management/${person?.id}`}>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem onClick={() => deleteUser(person)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TdDesc>
                        </TrDesc>
                    ))}
                </TbodyDesc>
            </TableDesc>

            {/* card box for mobile size  */}
            <TableCardsMobile >
                {userListData?.data?.map((person) => (
                    <CardTable key={person?.id}>
                        <WrapContent>
                            <ContentTable
                                content={person?.name}
                            />
                            <ContentTable
                                content={person?.email}
                            />
                        </WrapContent>
                        <ActionBtn
                            handleDelete={() => deleteUser(person)}
                            hrefEdit={'/dashboard/users-management'}
                            userId={person?.id}
                        />
                    </CardTable>
                ))}
            </TableCardsMobile>

            {/* Pagination */}

            <div className="pt-7">
                <PaginationComponent
                    pages={userListData?.totalPages || []}
                    firstPage={userListData?.firstPage}
                />
            </div>
        </section >
    )
}