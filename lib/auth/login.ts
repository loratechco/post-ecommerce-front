"use server";

import "server-only";

import { redirect } from "next/navigation";
import { saveSession } from "./storage";
import { fetchPermissions } from "../user-permissions/fetchPermissions";

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

    if (res.ok) {
        const { token } = await res.json();

        if (!token) {
            return { status, statusText };
        }

        const permissions = await fetchPermissions(token);
        console.log('Permissions:', permissions);
        saveSession(token);
        redirect(redirectTo);
    }

    if (!res.ok)
        return { status, statusText, res: res.json() };
}
