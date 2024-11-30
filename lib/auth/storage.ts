import { cookies } from "next/headers";

export const cookieName = "USER_SESSION";

export async function saveSession({ sessionData }: { sessionData: object }) {
    const cookie = await cookies();
    const data = JSON.stringify(sessionData);

    cookie.set(cookieName, data, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 14 * 24 * 60 * 60, // 2 هفته بر حسب ثانیه
    });
}

export async function removeSession() {
    const cookie = await cookies();
    cookie.delete(cookieName);
}
