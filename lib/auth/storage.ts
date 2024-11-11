import { cookies } from "next/headers"

export const cookieName = "USER_SESSION"

export async function saveSession(
    accessToken: string
) {
    const coockie = await cookies()
    coockie.set(
        cookieName,
        accessToken,
        {
            httpOnly: true,
            secure:
                process.env.NODE_ENV ===
                "production",
        }
    )
}

export async function removeSession() {
    const coockie = await cookies()
    coockie.delete(cookieName)
}