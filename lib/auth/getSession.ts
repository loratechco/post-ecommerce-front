'use server'

import { cookies } from "next/headers"
import { cookieName } from "./storage"

export type GetSession = {
    token: string;
    initData: string;
}


export default async function getToken(): Promise<string | null> {
    const coockie = await cookies()
    const accessToken = coockie.get(cookieName)?.value as string
    console.log("🚀 ~ getToken ~ accessToken:", accessToken)

    return accessToken || null;
}