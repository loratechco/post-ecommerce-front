'use server'

export async function getUserList(token: string | null) {
    try {
        const res = await fetch("http://app.api/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            cache: "no-cache"
        });

        const result = await res.json();

        if (res.status === 500) {
            return { success: false, data: [], error: 'خطا در دریافت لیست کاربران' };
        }

        return { success: true, data: result.data };

    } catch (error) {
        console.log("===>> getUserList ~ error:", error);
        return { success: false, data: [], error: 'خطا در دریافت لیست کاربران' };
    }
}



export async function handleDelete({
    id,
    token
}: {
    id: string,
    token: string
}) {
    try {
        // حذف کاربر
        const res = await fetch(`http://app.api/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: data.message || 'خطا در حذف کاربر'
            };
        }

        // دریافت لیست به‌روز شده کاربران
        const updatedList = await getUserList(token);

        return {
            success: true,
            data: updatedList.data
        };
    } catch (error: any) {
        console.log("🚀 ~ handleDelete ~ error:", error);
        return {
            success: false,
            error: error.message || 'خطا در حذف کاربر'
        };
    }
} 