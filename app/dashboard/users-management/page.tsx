import UserList from '@/app/dashboard/users-management/UsersList'
import getSession from "@/lib/auth/getSession";

export default async function UserManagementPage() {
    const token = await getSession();

    return (
        <div className="w-full">
            <UserList />
        </div>
    )
}