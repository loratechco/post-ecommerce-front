'use client'

import { useState, useEffect, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Search, ArrowRight, MoreHorizontal, Plus, } from 'lucide-react'
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
import { addUserFields } from './formFields'
import ErrorToast from '@/components/ErrorToast'
import { object } from 'zod'

export default function UserList({ pageQuery }: { pageQuery: string }) {
    const { token } = useSession();
    console.log('token=>>>', token);
    const [userListData, setUserListData] = useState<{ data: object[], totalPages: number }>({
        data: [],
        totalPages: 1,
    })

    const fetchUsers = React.useCallback(async (params: { pageQuery?: string, query?: string }) => {
        try {
            const { success, data, error } = await userListFetch({ ...params, token });

            if (error) {
                toast({
                    title: 'خطا',
                    description: error || 'خطا در دریافت کاربران',
                    className: 'bg-red-300 text-red-900'
                });
                return;
            }

            setUserListData({
                data: data?.data,
                totalPages: data?.last_page,
            });
        } catch (error) {
            toast({
                description: error?.data?.message || 'خطا',
                className: 'bg-red-300 text-red-950',
                duration
            });
        }
    }, []);

    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });
    const query = watch('search');

    React.useEffect(() => {
        if (!token) return;
        fetchUsers({ pageQuery });
    }, [pageQuery, token, fetchUsers]);

    // مدیریت جستجو
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (!query) return;
            fetchUsers({ query });
        }, 1000);

        return () => clearTimeout(timeOutId);
    }, [query, fetchUsers]);

    // toast value
    const { duration, successClass, errorClass } = {
        successClass: "bg-green-300 text-green-950 font-semibold",
        errorClass: "bg-red-300 text-red-950 font-semibold",
        duration: 3000,
    }

    const deleteUser = async (person: any) => {
        try {
            const {
                success,
                error,
                data
            } = await handleDelete({ id: person?.id, pageQuery, token });

            if (!success)
                throw new Error(error)
            setUserListData({
                data: data?.data,
                totalPages: userListData?.totalPages,
            });

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
        }
    }

    const validData = userListData?.data && userListData?.data.length > 0;

    const handleSearchReset = async () => {
        setValue("search", ''); // پاک کردن مقدار سرچ
        // دریافت مجدد لیست کاربران
        try {
            const { success, data, error } = await userListFetch({ pageQuery, token });

            if (error) {
                toast({
                    title: 'Error',
                    description: error || 'users invalid',
                    className: 'bg-red-300 text-red-900'
                });
                return;
            }

            setUserListData({
                data: data?.data,
                totalPages: data?.last_page,
            });
        } catch (error) {
            toast({
                description: error?.message || 'error',
                className: 'bg-red-300 text-red-950',
                duration
            });
        }
    };

    return (
        <section className="w-full">

            <ErrorToast
                dependency={errors}
                errorMessagesArray={[
                    errors?.name?.message,
                    errors?.last_name?.message,
                    errors?.email?.message,
                    errors?.phone?.message,
                ]}
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
                                className="items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Reset search"
                                type="button"
                                onClick={handleSearchReset}
                            >
                                <ArrowRight
                                    size={16}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                {/* create new user */}
                <Link href={'/dashboard/users-management/create-user'}>
                    <Button className='btn-outline'>Add User <Plus /></Button>
                </Link>

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
                    {
                        validData ?
                            userListData?.data?.map((person) => (
                                <TrDesc key={person?.id}>
                                    <TdDesc>
                                        <p className='table-text'>{person?.name}</p>
                                    </TdDesc>
                                    <TdDesc>
                                        <p className='table-text'>{person?.email}</p>
                                    </TdDesc>
                                    <TdDesc>
                                        <p className='table-text'>{person?.phone}</p>
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
                                                    <DropdownMenuItem className='cursor-pointer'>Edit</DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem className='cursor-pointer' onClick={() => deleteUser(person)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TdDesc>
                                </TrDesc>
                            )) :

                            (<TrDesc>
                                <TdDesc></TdDesc>
                                <TdDesc>
                                    <p className='font-semibold table-text p-3'></p>
                                </TdDesc>
                            </TrDesc>)
                    }
                </TbodyDesc>
            </TableDesc>

            {/* card box for mobile size  */}
            <TableCardsMobile >
                {validData && userListData?.data?.map((person) => (
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
                )) || (
                        <CardTable >
                            <WrapContent>
                                <ContentTable
                                    content={''}
                                />
                            </WrapContent>
                        </CardTable>
                    )
                }
            </TableCardsMobile>

            {/* Pagination */}

            <div className="pt-7">
                <PaginationComponent
                    pages={userListData?.totalPages || 1}
                />
            </div>
        </section >
    )
}