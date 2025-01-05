"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "@/lib/auth/useSession";
import axios from "axios";
import { API_Backend } from "@/hooks/use-fetch";

type PermissionsContextType = {
  permissions: any;
  refreshPermissions: () => Promise<void>;
  initUserData: object | null;
};

const PermissionsContext = createContext<PermissionsContextType>({
  permissions: null,
  refreshPermissions: async () => {},
  initUserData: null,
});

export function PermissioinsProvider({
  children,
  userPermissions,
  initUserData,
}: {
  children: React.ReactNode;
  userPermissions: any;
  initUserData: object | null;
}) {
  const [permissions, setPermissions] = useState(userPermissions);
  const token = useSession();

  const refreshPermissions = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        `${API_Backend}/api/permissions/my-permissions`,
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
      console.error("Failed to refresh permissions:", error);
    }
  }, [token]);

  // رفرش خودکار پرمیشن‌ها هر زمان که توکن تغییر کند
  useEffect(() => {
    if (token) {
      refreshPermissions();
    }
  }, [token, refreshPermissions]);

  // آپدیت state هر زمان که userPermissions از props تغییر کند
  useEffect(() => {
    if (userPermissions) {
      setPermissions(userPermissions);
    }
  }, [userPermissions]);

  return (
    <PermissionsContext.Provider
      value={{ permissions, refreshPermissions, initUserData }}
    >
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
}
