import { trpc } from "@/providers/trpc";
import { useCallback, useMemo } from "react";
import { useDemoMode } from "./useDemoMode";

export type UnifiedUser = {
  id: number;
  username: string;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  bio?: string | null;
  role: string;
  isAnonymous?: boolean;
  createdAt?: Date;
};

export function useAuth() {
  const { isDemoMode, demoUser } = useDemoMode();

  const {
    data: localUser,
    isLoading: localLoading,
  } = trpc.localAuth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !!localStorage.getItem("local_auth_token"),
  });

  // Build user from demo mode or local auth.
  const user: UnifiedUser | null = useMemo(() => {
    if (isDemoMode && demoUser) {
      return {
        id: demoUser.id,
        username: demoUser.username,
        name: demoUser.username,
        email: demoUser.email ?? `${demoUser.username.toLowerCase()}@divorcetalk.in`,
        bio: demoUser.bio,
        role: demoUser.role,
        isAnonymous: true,
        createdAt: new Date("2025-01-15"),
      };
    }
    if (localUser) {
      return {
        id: localUser.id,
        username: localUser.username,
        name: localUser.username,
        email: localUser.email,
        avatar: localUser.avatar,
        bio: localUser.bio,
        role: localUser.role,
        isAnonymous: localUser.isAnonymous,
        createdAt: localUser.createdAt,
      };
    }
    return null;
  }, [isDemoMode, demoUser, localUser]);

  const isLoading = localLoading;
  const isAuthenticated = !!user || isDemoMode;
  const isAdmin = user?.role === "admin";
  const isModerator = user?.role === "moderator" || isAdmin;
  const isListener = (isDemoMode && !!demoUser?.isListener) || isModerator;

  const logout = useCallback(() => {
    localStorage.removeItem("local_auth_token");
    localStorage.removeItem("divorcetalk_demo_mode");
    localStorage.removeItem("divorcetalk_demo_user");
    localStorage.removeItem("divorcetalk_demo_notifications");
    window.location.reload();
  }, []);

  return useMemo(
    () => ({
      user,
      isAuthenticated,
      isAdmin,
      isModerator,
      isListener,
      isLoading,
      logout,
    }),
    [user, isAuthenticated, isAdmin, isModerator, isListener, isLoading, logout]
  );
}
