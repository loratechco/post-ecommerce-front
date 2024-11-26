import UserList from '@/app/dashboard/users-management/UsersList'
import getSession from "@/lib/auth/getSession";

export default async function UserManagementPage({ searchParams }: { searchParams: string }) {
    const token = await getSession();

    const { page = '1' } = searchParams as { page?: string };
    return (
        <div className="w-full">
            <UserList pageQuery={page} />
        </div>
    )
}