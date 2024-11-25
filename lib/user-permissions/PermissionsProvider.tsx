'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from '@/lib/auth/useSession';
import axios from 'axios';

type PermissionsContextType = {
    permissions: any;
    refreshPermissions: () => Promise<void>;
}

const PermissionsContext = createContext<PermissionsContextType>({
    permissions: null,
    refreshPermissions: async () => { },
});

export function PermissioinsProvider({
    children,
    userPermissions
}: {
    children: React.ReactNode;
    userPermissions: any;
}) {
    const [permissions, setPermissions] = useState(userPermissions);
    const token = useSession();

    const refreshPermissions = async () => {
        if (!token) return;

        try {
            const response = await axios.get(
                'http://app.api/api/permissions/my-permissions',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response?.data) {
                setPermissions(response.data);
            }
        } catch (error) {
            console.error('Failed to refresh permissions:', error);
        }
    };

    // رفرش خودکار پرمیشن‌ها هر زمان که توکن تغییر کند
    useEffect(() => {
        if (token) {
            refreshPermissions();
        }
    }, [token]);

    // آپدیت state هر زمان که userPermissions از props تغییر کند
    useEffect(() => {
        if (userPermissions) {
            setPermissions(userPermissions);
        }
    }, [userPermissions]);

    return (
        <PermissionsContext.Provider value={{ permissions, refreshPermissions }}>
            {children}
        </PermissionsContext.Provider>
    );
}

export function usePermissions() {
    const context = useContext(PermissionsContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionsProvider');
    }
    return context;
}