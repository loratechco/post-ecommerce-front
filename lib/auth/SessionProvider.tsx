"use client";

import { createContext } from "react";

export const SessionContext = createContext<any>(
    undefined
);

export function SessionProvider({
    children,
    session,
}: {
    children: React.ReactNode;
    session: string | null;
}) {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}