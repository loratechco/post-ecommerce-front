'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MoreHorizontal, Search, Filter, ArrowRight, CloudCog } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { useSession } from '@/lib/auth/useSession'

type FilterType = 'recent' | 'older' | 'a-m' | 'n-z' | null

export default function UserList({ userData }: { userData: object[] }) {
    const [userListData, setUserListData] = useState<object[]>([])
    const token = useSession();

    useEffect(() => setUserListData(userData), [])

    const [searchTerm, setSearchTerm] = useState('')
    const [editingUser, setEditingUser] = useState<null>(null)
    const [filterType, setFilterType] = useState<FilterType>(null)

    // const filteredUsers = useMemo(() => {
    //     return userListData.filter(user => {
    //         const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             user.lastName.toLowerCase().includes(searchTerm.toLowerCase())

    //         const loginDate = new Date(user.lastLogin)
    //         const oneWeekAgo = new Date()
    //         oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    //         const matchesFilter =
    //             !filterType ||
    //             (filterType === 'recent' && loginDate > oneWeekAgo) ||
    //             (filterType === 'older' && loginDate <= oneWeekAgo) ||
    //             (filterType === 'a-m' && user.lastName.toLowerCase() < 'n') ||
    //             (filterType === 'n-z' && user.lastName.toLowerCase() >= 'n')

    //         return matchesSearch && matchesFilter
    //     })
    // }, [userListData, searchTerm, filterType])

    const handleDelete = async (id: string) => {
        // In a real application, you would delete the user from the backend here

        try {
            const res = await axios.delete(`http://app.api/api/users/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log(res);
            const newUserList = userListData.filter((item) => item?.id !== id);

            setUserListData(newUserList);
            console.log(userListData);
        } catch (error) {
            console.log("🚀 ~ handleDelete ~ error:", error?.response?.data?.message)
        }
    }

    const handleEdit = (user) => {
        setEditingUser(user)
    }

    const handleSaveEdit = (editedUser) => {
        // In a real application, you would update the user in the backend here
        console.log('Saving edited user:', editedUser)
        setEditingUser(null)
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                <div className="relative w-full sm:w-64">

                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                id="input-26"
                                className="peer pe-9 ps-9"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="search" />
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Search size={16} strokeWidth={2}
                                />
                            </div>
                            <button
                                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Login Date</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setFilterType('recent')}>
                            Recent Login (Last 7 days)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterType('older')}>
                            Older Login (More than 7 days)
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Username</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setFilterType('a-m')}>
                            Last Name A-M
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterType('n-z')}>
                            Last Name N-Z
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setFilterType(null)}>
                            Clear Filters
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    {/* Caption */}
                    <TableCaption>A list of your users.</TableCaption>

                    {/* Header */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Login
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {/* Body */}
                    <tbody>
                        {userListData?.map((user) => (
                            <tr key={user?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user?.email}
                                </th>
                                <td className="px-6 py-4">
                                    {user?.firstName}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.lastName}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.lastLogin}
                                </td>
                                <td className="px-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                            <Link href={`/dashboard/users-management/${user?.id}`}>
                                                <DropdownMenuItem >Edit</DropdownMenuItem>
                                            </Link>

                                            <DropdownMenuItem onClick={() => handleDelete(user?.id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Dialog open={editingUser !== null} onOpenChange={() => setEditingUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Make changes to the user's information.
                        </DialogDescription>
                    </DialogHeader>
                    {editingUser && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="edit-email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-firstName" className="text-right">
                                    First Name
                                </Label>
                                <Input
                                    id="edit-firstName"
                                    value={editingUser?.firstName}
                                    onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-lastName" className="text-right">
                                    Last Name
                                </Label>
                                <Input
                                    id="edit-lastName"
                                    value={editingUser?.lastName}
                                    onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={() => editingUser && handleSaveEdit(editingUser)}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}