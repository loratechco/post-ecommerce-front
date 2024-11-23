import UserList from '@/app/dashboard/users-management/UsersList'
import getSession from "@/lib/auth/getSession";
import { toast } from 'sonner';
import axios from 'axios';


export default async function UserManagementPage() {
    const token = await getSession();

    return (
        <div className="w-full">
            <UserList />
        </div>
    )
}