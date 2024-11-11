"use server";

import "server-only";

import { redirect } from "next/navigation";
import { saveSession } from "./storage";

const BACKEND_URL = "https://post-eco-api.liara.run";

export async function singIn({
    redirectTo = "/dashboard",
    ...credentials
}: {
    email: string;
    password: string;
    redirectTo?: string;
}) {
    const res = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    
    console.log("🚀 ~ res:", res)
    
    if (!res.ok) {
        return null;
    }

    const { token } = await res.json();

    saveSession(token);

    redirect(redirectTo);
}