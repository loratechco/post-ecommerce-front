'use client'
import { createContext, ReactNode } from "react";

const PermissionsContext = createContext<null>(null);
function PermissioinsProvider({ userPermissions, children }: { userPermissions: object[] | [], children: ReactNode }) {
    return (
        <PermissionsContext.Provider value={userPermissions} >
            {children}
        </PermissionsContext.Provider>
    );
}

export {
    PermissioinsProvider,
    PermissionsContext
};