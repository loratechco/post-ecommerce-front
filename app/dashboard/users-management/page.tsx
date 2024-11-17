import UserList from '@/app/dashboard/users-management/UsersList'
import getSession from "@/lib/auth/getSession"
import { error } from 'console';

const getUserList = async (token: string | null) => {


    try {
        const res = await fetch("http://app.api/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!res.ok) return;

        const result = await res.json();
        console.log("🚀 ~ getUserList ~ result:", result)
        return result;

    } catch (error) {
        console.log("===>> getUserList ~ error:", error)

    }
}

export default async function UserManagementPage() {
    const token = await getSession()
    const res = await getUserList(token);


    return (
        <div className="w-full px-3 overflow-x-hidden">
            <UserList

            />
        </div>
    )
}