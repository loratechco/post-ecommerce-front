import UserList from '@/app/dashboard/users-management/UsersList'
import getSession from "@/lib/auth/getSession";

const getUserList = async (token: string | null) => {

    try {
        const res = await fetch("http://app.api/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            cache: "no-cache"
        })

        console.log("this res ====>", res);

        const result = await res.json();

        if (res.status === 500) {
            console.log(res);
            return [];
        }

        console.log("🚀 ~ getUserList ~ result:", result)
        return result;

    } catch (error) {
        console.log("===>> getUserList ~ error:", error)

    }
}

export default async function UserManagementPage() {
    const token = await getSession()
    const res = await getUserList(token);
    console.log("🚀 ~ UserManagementPage ~ res:", res?.data)

    return (
        <div className="w-full">
            <UserList
                userData={res?.data}
            />
        </div>
    )
}