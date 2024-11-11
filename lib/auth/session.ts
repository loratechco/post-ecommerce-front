import "server-only"

import { cookies } from "next/headers"
import { Session } from "./types"
import { cookieName } from "./storage"

const BACKEND_URL = "https://post-eco-api.liara.run"


export async function getSession(): Promise<Session | null> {
    const coockie = await cookies()
    const accessToken =
        coockie.get(cookieName)?.value

    if (!accessToken) {
        return null
    }

    const res = await fetch(
        `${BACKEND_URL}/api/login`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )

    if (!res.ok) {
        return null
    }

    const user = await res.json()

    return {
        user,
        accessToken,
    }
}