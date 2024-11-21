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

import { Search, Filter, ArrowRight, MoreHorizontal, UserRoundPlusIcon, PlusIcon } from 'lucide-react'
import axios from 'axios'
import { useSession } from '@/lib/auth/useSession'
import TableDesc, { TbodyDesc, TdDesc, ThDesc, TheadDesc, TrDesc } from '@/components/table-responsive/TableDesc'
import TableCardsMobile, { ActionBtn, CardTable, ContentTable, WrapContent } from '@/components/table-responsive/TableCardsMobile'
import Link from 'next/link'
import { DrawerDialogAddUser } from "@/components/DialogDrawer"

type FilterType = 'recent' | 'older' | 'a-m' | 'n-z' | null

import * as React from "react"
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { handleDelete } from './api/fetch'
const formSchema = z.object({
    name: z.string().min(2, "نام باید حداقل 2 کاراکتر باشد"),
    last_name: z.string().min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد"),
    email: z.string().email("ایمیل نامعتبر است"),
    phone: z.string().min(10, "شماره تلفن باید حداقل 10 رقم باشد"),
    password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
});
type FormData = z.infer<typeof formSchema>;

const addUserFields: { id: string; type?: string; nameLabel: string; placeholder: string; }[] = [
    { id: "name", type: "text", nameLabel: "Name", placeholder: "John" },
    { id: "last_name", type: "text", nameLabel: "Last Name", placeholder: "Smith" },
    { id: "email", nameLabel: "Email", placeholder: "example@gmail.com" },
    { id: "phone", nameLabel: "Phone Number", placeholder: "090300048" },
    { id: "password", type: "password", nameLabel: "Password", placeholder: "******" }
]

export default function UserList({ userData }: { userData: object[] }) {
    const [userListData, setUserListData] = useState<object[]>([])
    const token = useSession();
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => setUserListData(userData), [])

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    const handleAddUser = async ({ data, setUserListData, token }: { data: FormData, setUserListData: () => void, token: string }) => {

        console.log(data);
        try {
            const res = await axios.post(`http://app.api/api/users`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            setUserListData(prev => [...prev, res.data.user]);

            toast({
                description: "کاربر با موفقیت اضافه شد",
                className: "bg-green-300 text-green-950 font-semibold",
            });

        } catch (error) {
            const errorMessage = error?.response?.data?.message || "خطا در افزودن کاربر";
            console.log("🚀 ~ handleAddUser ~ error:", error)
            toast({
                description: errorMessage,
                className: "bg-red-300 text-red-950 font-semibold",
            });
        }
    }

    return (
        <section className="w-full">
            <h1 className="text-2xl font-bold mb-4">مدیریت کاربران</h1>
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
                                placeholder="جستجو..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                                    onClick={() => setSearchTerm('')}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <DrawerDialogAddUser
                    onSubmit={handleSubmit((data) => handleAddUser({
                        data,
                        setUserListData,
                        token
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
                    {userListData?.map((person) => (
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
                                        <DropdownMenuItem onClick={() => handleDelete({
                                            id: person?.id,
                                            token
                                        })}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TdDesc>
                        </TrDesc>
                    ))}
                </TbodyDesc>
            </TableDesc>

            {/* card box for mobile size  */}
            <TableCardsMobile >
                {userListData?.map((person) => (
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
                            handleDelete={(id) => handleDelete({ id, token })}
                            hrefEdit={'/dashboard/users-management'}
                            userId={person?.id}
                        />
                    </CardTable>
                ))}
            </TableCardsMobile>
        </section >
    )
}