import "server-only"

import { cookies } from "next/headers"
import { Session } from "./types"
import { cookieName } from "./storage"

// const BACKEND_URL = "https://post-eco-api.liara.run"


export default async function getToken(): Promise<string | null> {
    const coockie = await cookies()
    const accessToken = coockie.get(cookieName)?.value
    console.log("🚀 ~ getToken ~ accessToken:", accessToken)
    
    return accessToken || null;
}