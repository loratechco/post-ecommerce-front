"use server";

import "server-only";

import { redirect } from "next/navigation";
import { saveSession } from "./storage";
import { refreshPermissionCookie } from "@/lib/user-permissions/fetchPermissions";

const BACKEND_URL = "http://app.api";



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

    const { status, statusText } = res;

    if (!res.ok) {
        return { status, statusText, res: res.json() };
    }

    const { token } = await res.json();

    if (!token) {
        return { status, statusText };
    }

    const initData = await initUserData({ token });
    saveSession({ sessionData: { token, initData } });

    const { success, error } = await refreshPermissionCookie(token);
    if (!success) {
        console.error('Failed to set permission cookie:', error);
    }

    redirect(redirectTo);

}

export async function initUserData({ token }: { token: string }) {
    const res = await fetch(`${BACKEND_URL}/api/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        console.error('Failed to set permission cookie:', res.statusText);
    }

    return res.json();
}