'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
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
import { MoreHorizontal, Search, Filter } from 'lucide-react'

type User = {
    id: string
    email: string
    firstName: string
    lastName: string
    lastLogin: string
}

const initialUsers: User[] = [
    { id: '1', email: 'john@example.com', firstName: 'John', lastName: 'Doe', lastLogin: '2023-05-01 10:30 AM' },
    { id: '2', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', lastLogin: '2023-05-02 2:45 PM' },
    { id: '3', email: 'bob@example.com', firstName: 'Bob', lastName: 'Johnson', lastLogin: '2023-05-03 9:15 AM' },
    { id: '4', email: 'alice@example.com', firstName: 'Alice', lastName: 'Williams', lastLogin: '2023-05-04 11:20 AM' },
    { id: '5', email: 'charlie@example.com', firstName: 'Charlie', lastName: 'Brown', lastLogin: '2023-05-05 3:00 PM' },
]

type FilterType = 'recent' | 'older' | 'a-m' | 'n-z' | null

export default function UserList() {
    const [users] = useState<User[]>(initialUsers)
    const [searchTerm, setSearchTerm] = useState('')
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [filterType, setFilterType] = useState<FilterType>(null)

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase())

            const loginDate = new Date(user.lastLogin)
            const oneWeekAgo = new Date()
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

            const matchesFilter =
                !filterType ||
                (filterType === 'recent' && loginDate > oneWeekAgo) ||
                (filterType === 'older' && loginDate <= oneWeekAgo) ||
                (filterType === 'a-m' && user.lastName.toLowerCase() < 'n') ||
                (filterType === 'n-z' && user.lastName.toLowerCase() >= 'n')

            return matchesSearch && matchesFilter
        })
    }, [users, searchTerm, filterType])

    const handleDelete = (id: string) => {
        // In a real application, you would delete the user from the backend here
        console.log(`Deleting user with id: ${id}`)
    }

    const handleEdit = (user: User) => {
        setEditingUser(user)
    }

    const handleSaveEdit = (editedUser: User) => {
        // In a real application, you would update the user in the backend here
        console.log('Saving edited user:', editedUser)
        setEditingUser(null)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
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
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Last Login</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.email}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.lastLogin}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => handleEdit(user)}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(user.id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
                                    value={editingUser.firstName}
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
                                    value={editingUser.lastName}
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