import { useCallback, useState, useEffect } from "react";

export type DemoUser = {
  id: number;
  username: string;
  role: "user" | "moderator" | "admin";
  bio: string;
  email?: string;
  isListener?: boolean;
};

const DEMO_STORAGE_KEY = "divorcetalk_demo_mode";
const DEMO_USER_KEY = "divorcetalk_demo_user";

export function useDemoMode() {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem(DEMO_STORAGE_KEY) === "true";
  });

  const [demoUser, setDemoUser] = useState<DemoUser | null>(() => {
    const stored = localStorage.getItem(DEMO_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem("divorcetalk_demo_notifications");
    return stored ? JSON.parse(stored) : [];
  });

  const enterDemo = useCallback((user: DemoUser) => {
    localStorage.setItem(DEMO_STORAGE_KEY, "true");
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
    localStorage.removeItem("local_auth_token");
    setIsDemoMode(true);
    setDemoUser(user);
  }, []);

  const exitDemo = useCallback(() => {
    localStorage.removeItem(DEMO_STORAGE_KEY);
    localStorage.removeItem(DEMO_USER_KEY);
    localStorage.removeItem("divorcetalk_demo_notifications");
    setIsDemoMode(false);
    setDemoUser(null);
    window.location.reload();
  }, []);

  const resetDemo = useCallback(() => {
    localStorage.removeItem("divorcetalk_demo_notifications");
    window.location.reload();
  }, []);

  const isDemoAdmin = demoUser?.role === "admin";
  const isDemoModerator = demoUser?.role === "moderator";
  const isDemoListener = !!demoUser?.isListener;

  return {
    isDemoMode,
    demoUser,
    isDemoAdmin,
    isDemoModerator,
    isDemoListener,
    notifications,
    enterDemo,
    exitDemo,
    resetDemo,
  };
}
