import { toast } from "@/hooks/use-toast";
import axios from "axios";

export const handleAddUser = async ({
    data,
    setUserListData,
    token
}: {
    data: FormData,
    setUserListData: (fn: (prev: any[]) => any[]) => void,
    token: string
}) => {

    console.log(data);
    try {
        const res = await axios.post(`http://app.api/api/users`, data, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        toast({
            description: "کاربر با موفقیت اضافه شد",
            className: "bg-green-300 text-green-950 font-semibold",
        });
        return res?.data;


    } catch (error) {
        const errorMessage = error?.response?.data?.message || "خطا در افزودن کاربر";
        console.log("🚀 ~ handleAddUser ~ error:", error)
        toast({
            description: errorMessage,
            className: "bg-red-300 text-red-950 font-semibold",
        });
    }
}

export const handleDelete = async ({
    id,
    token
}: {
    id: string,
    token: string
}) => {
    try {
        const res = await axios.delete(`http://app.api/api/users/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });


        toast({
            description: "کاربر با موفقیت حذف شد",
            className: "bg-green-300 text-green-950 font-semibold",
        });

        console.log(res);
        return res?.data;
    } catch (error) {
        toast({
            description: error?.response?.data?.message,
            className: "bg-red-300 text-red-950 font-semibold",
        })
        console.log("🚀 ~ handleDelete ~ error:", error?.response?.data?.message)
    }
}
