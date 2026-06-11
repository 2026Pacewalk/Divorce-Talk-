import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { useDemoMode } from "@/hooks/useDemoMode";
import {
  demoAdminStats, demoMoodTrends, demoGrowthData,
  demoTopCategories, demoRecentActivity, demoListenerRequests,
} from "@/lib/demoData";
import {
  LayoutDashboard, Users, FileText, Flag, Ear,
  Ban, CheckCircle, XCircle, Eye, ArrowLeft,
  Shield, TrendingUp, AlertTriangle, Heart,
  Activity, BarChart3, MessageCircle, Clock,
  Headphones,
} from "lucide-react";

const adminTabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "posts", label: "Posts", icon: FileText },
  { id: "reports", label: "Reports", icon: Flag },
  { id: "listeners", label: "Listeners", icon: Ear },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

function StatCard({ label, value, color, icon: Icon }: { label: string; value: number | string; color: string; icon: any }) {
  return (
    <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-5 shadow-dt-sm">
      <div className="flex items-center justify-between mb-3">
        <Icon size={18} style={{ color }} />
        <span className="text-[10px] text-[var(--dt-text-muted)] uppercase tracking-wider">{label}</span>
      </div>
      <p className="font-serif text-[28px]" style={{ color }}>{value}</p>
    </div>
  );
}

function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-10">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all"
          style={{
            height: `${(v / max) * 100}%`,
            backgroundColor: color,
            opacity: 0.3 + (v / max) * 0.7,
          }}
        />
      ))}
    </div>
  );
}

function DashboardTab({ isDemo }: { isDemo: boolean }) {
  const { data: realStats } = trpc.admin.stats.useQuery(undefined, { enabled: !isDemo });
  // Demo stats have richer keys (activeToday, crisisAlerts, etc.) that the
  // real admin.stats query doesn't return. Cast to a unified shape so
  // missing keys cleanly fall back to the defaults below.
  const stats = (isDemo ? demoAdminStats : realStats) as
    | (Partial<typeof demoAdminStats> & {
        totalUsers?: number;
        activeUsers?: number;
        postsToday?: number;
        pendingReports?: number;
      })
    | undefined;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats?.totalUsers || 0} color="var(--dt-primary)" icon={Users} />
        <StatCard label="Active Today" value={stats?.activeToday || stats?.activeUsers || 0} color="var(--dt-secondary)" icon={Activity} />
        <StatCard label="Posts Today" value={stats?.postsToday || 0} color="#8FBF7A" icon={FileText} />
        <StatCard label="Pending Reports" value={stats?.pendingReports || 0} color="#BF8F9E" icon={Flag} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-5 shadow-dt-sm">
          <div className="flex items-center gap-2 mb-3">
            <Heart size={16} className="text-[var(--dt-primary)]" />
            <span className="text-[12px] font-medium text-[var(--dt-text)]">Active Listeners</span>
          </div>
          <p className="font-serif text-[24px] text-[var(--dt-primary)]">{stats?.activeListeners || 18}</p>
          <p className="text-[11px] text-[var(--dt-text-muted)] mt-1">{stats?.listenerRequests || 34} pending requests</p>
        </div>
        <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-5 shadow-dt-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-[#C85A5A]" />
            <span className="text-[12px] font-medium text-[var(--dt-text)]">Crisis Alerts</span>
          </div>
          <p className="font-serif text-[24px] text-[#C85A5A]">{stats?.crisisAlerts || 2}</p>
          <p className="text-[11px] text-[var(--dt-text-muted)] mt-1">Require immediate attention</p>
        </div>
        <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-5 shadow-dt-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-[#8FBF7A]" />
            <span className="text-[12px] font-medium text-[var(--dt-text)]">Growth (7d)</span>
          </div>
          <p className="font-serif text-[24px] text-[#8FBF7A]">+{isDemo ? "89" : "12"}%</p>
          <MiniBarChart data={isDemo ? [12, 15, 18, 14, 20, 22, 25] : [5, 8, 6, 10, 7, 9, 12]} color="#8FBF7A" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-5 shadow-dt-sm">
        <h3 className="text-[14px] font-medium text-[var(--dt-text)] mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {(isDemo ? demoRecentActivity : []).map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-[13px]">
              <div className="w-7 h-7 rounded-full bg-[var(--dt-primary-light)] flex items-center justify-center text-[10px] text-[var(--dt-primary)] font-semibold flex-shrink-0">
                {item.user.charAt(0)}
              </div>
              <span className="text-[var(--dt-text)] font-medium">{item.user}</span>
              <span className="text-[var(--dt-text-secondary)]">{item.action}</span>
              <span className="text-[var(--dt-text-muted)]">{item.target}</span>
              <span className="ml-auto text-[11px] text-[var(--dt-text-muted)]">{item.time}</span>
            </div>
          ))}
          {!isDemo && <p className="text-[13px] text-[var(--dt-text-muted)]">Connect to database for real activity data.</p>}
        </div>
      </div>
    </div>
  );
}

type UserRow = {
  id: number;
  username: string;
  role: string;
  status: string;
  createdAt: Date | string;
};

function roleClass(role: string) {
  return role === "admin"
    ? "bg-[var(--dt-primary-light)] text-[var(--dt-primary)]"
    : role === "moderator"
      ? "bg-[var(--dt-secondary-light)] text-[var(--dt-secondary)]"
      : "bg-[var(--dt-border-light)] text-[var(--dt-text-muted)]";
}
function statusClass(status: string) {
  return status === "active"
    ? "bg-[#E8F5E9] text-[#4A7C59]"
    : status === "muted"
      ? "bg-[#FFF3E0] text-[#B5835A]"
      : "bg-[#FFEBEE] text-[#B57171]";
}

function UserMobileCard({
  user,
  onBan,
  onUnban,
}: {
  user: UserRow;
  onBan?: () => void;
  onUnban?: () => void;
}) {
  return (
    <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-4 shadow-dt-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-[var(--dt-text)] truncate">u/{user.username}</p>
          <p className="text-[11px] text-[var(--dt-text-muted)] mt-0.5">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-medium ${roleClass(user.role)}`}>
              {user.role}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-medium ${statusClass(user.status)}`}>
              {user.status}
            </span>
          </div>
        </div>
        {user.status === "active" ? (
          <button
            onClick={onBan}
            aria-label="Ban user"
            className="grid place-items-center shrink-0 w-10 h-10 rounded-xl hover:bg-[#FFEBEE] text-[var(--dt-text-muted)] hover:text-[#B57171] transition-colors"
          >
            <Ban size={16} />
          </button>
        ) : (
          <button
            onClick={onUnban}
            aria-label="Unban user"
            className="grid place-items-center shrink-0 w-10 h-10 rounded-xl hover:bg-[#E8F5E9] text-[var(--dt-text-muted)] hover:text-[#4A7C59] transition-colors"
          >
            <CheckCircle size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function UsersTab({ isDemo }: { isDemo: boolean }) {
  const { data, fetchNextPage, hasNextPage } = trpc.admin.userList.useInfiniteQuery(
    { limit: 20 },
    { getNextPageParam: (last) => last.nextCursor, enabled: !isDemo }
  );
  const utils = trpc.useUtils();
  const users = data?.pages.flatMap((p) => p.items) || [];

  const updateUser = trpc.admin.userUpdate.useMutation({
    onSuccess: () => utils.admin.userList.invalidate(),
  });

  const demoUsersList: UserRow[] = [
    "HealingSoul92", "QuietListener", "SafeSpaceMod", "AdminDivorceTalk",
    "StillBreathing", "RebuildingSlowly", "QuietWarrior", "BetterDaysAhead",
  ].map((u, i) => ({
    id: i + 1,
    username: u,
    role: i === 3 ? "admin" : i < 3 ? "moderator" : "user",
    status: "active",
    createdAt: "2025-05-01",
  }));

  const rows: UserRow[] = isDemo
    ? demoUsersList
    : users.map((u) => ({
        id: u.id,
        username: u.username,
        role: u.role,
        status: u.status,
        createdAt: u.createdAt,
      }));

  return (
    <div>
      {/* Mobile: cards */}
      <div className="md:hidden space-y-3">
        {rows.map((u) => (
          <UserMobileCard
            key={u.id}
            user={u}
            onBan={!isDemo ? () => updateUser.mutate({ userId: u.id, status: "banned" }) : undefined}
            onUnban={!isDemo ? () => updateUser.mutate({ userId: u.id, status: "active" }) : undefined}
          />
        ))}
      </div>

      {/* Tablet+ : table */}
      <div className="hidden md:block bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl shadow-dt-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--dt-border-light)]">
              <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)]">Username</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)]">Role</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)]">Status</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)]">Joined</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((user) => (
              <tr key={user.id} className="border-b border-[var(--dt-border-light)] hover:bg-[var(--dt-bg)]/50">
                <td className="px-5 py-3 text-[14px] text-[var(--dt-text)]">u/{user.username}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${roleClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${statusClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-[13px] text-[var(--dt-text-muted)]">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-3">
                  {user.status === "active" ? (
                    <button onClick={!isDemo ? () => updateUser.mutate({ userId: user.id, status: "banned" }) : undefined} aria-label="Ban user" className="grid place-items-center w-9 h-9 rounded-lg hover:bg-[#FFEBEE] text-[var(--dt-text-muted)] hover:text-[#B57171] transition-colors" title="Ban user"><Ban size={15} /></button>
                  ) : (
                    <button onClick={!isDemo ? () => updateUser.mutate({ userId: user.id, status: "active" }) : undefined} aria-label="Unban user" className="grid place-items-center w-9 h-9 rounded-lg hover:bg-[#E8F5E9] text-[var(--dt-text-muted)] hover:text-[#4A7C59] transition-colors" title="Unban user"><CheckCircle size={15} /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasNextPage && !isDemo && (
        <button onClick={() => fetchNextPage()} className="w-full py-3 text-[13px] text-[var(--dt-primary)] hover:bg-[var(--dt-bg)] transition-colors">Load more...</button>
      )}
    </div>
  );
}

function PostsTab({ isDemo }: { isDemo: boolean }) {
  return (
    <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl shadow-dt-sm overflow-hidden">
      {isDemo ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--dt-border-light)]">
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)]">Content</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)]">Author</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)]">Status</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--dt-text-muted)]">Reactions</th>
              </tr>
            </thead>
            <tbody>
              {["I sleep next to someone who hasn't spoken to me in months.", "I stayed for my children but I lost myself.", "I finally told my parents my marriage is failing.", "My wife says we are roommates now.", "I don't know if I want divorce or peace."].map((content, i) => (
                <tr key={i} className="border-b border-[var(--dt-border-light)] hover:bg-[var(--dt-bg)]/50">
                  <td className="px-5 py-3 text-[14px] text-[var(--dt-text)] max-w-[300px] truncate">{content}</td>
                  <td className="px-5 py-3 text-[13px] text-[var(--dt-text-muted)]">u/{["LostInSilence", "MotherFirst", "BraveHeart22", "RoommateHusband", "ConfusedSoul"][i]}</td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F5E9] text-[#4A7C59]">active</span></td>
                  <td className="px-5 py-3 text-[12px] text-[var(--dt-text-muted)]">{[189, 234, 178, 145, 312][i]} support</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-10 text-center">
          <FileText size={28} className="mx-auto text-[var(--dt-text-muted)] opacity-50 mb-3" />
          <p className="text-[14px] text-[var(--dt-text-secondary)] font-medium">
            Live post moderation
          </p>
          <p className="text-[12px] text-[var(--dt-text-muted)] mt-1 max-w-[420px] mx-auto">
            Connect a MySQL instance via <code className="text-[var(--dt-text)] bg-[var(--dt-bg)] px-1.5 py-0.5 rounded">DATABASE_URL</code> and run <code className="text-[var(--dt-text)] bg-[var(--dt-bg)] px-1.5 py-0.5 rounded">npm run db:push</code> to see real posts here. Switch on demo mode anytime to walk through the moderation flow.
          </p>
        </div>
      )}
    </div>
  );
}

type ReportRow = {
  id: number;
  reason: string;
  details: string;
  status: "pending" | "reviewed" | "resolved" | "dismissed";
  reporter: string;
};

function ReportsTab({ isDemo }: { isDemo: boolean }) {
  const seed: ReportRow[] = isDemo
    ? [
        { id: 1, reason: "harassment", details: "User making inappropriate comments on vulnerable posts", status: "pending", reporter: "QuietRiver" },
        { id: 2, reason: "spam", details: "Repeated promotional content in multiple rooms", status: "pending", reporter: "HealingSoul" },
        { id: 3, reason: "harmful", details: "Post contains potentially triggering content without warning", status: "reviewed", reporter: "BetterDaysAhead" },
        { id: 4, reason: "other", details: "Someone using their real name — could be unsafe for them.", status: "pending", reporter: "GentleStrength" },
      ]
    : [];
  const [rows, setRows] = useState<ReportRow[]>(seed);

  const update = (id: number, status: ReportRow["status"]) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  if (rows.length === 0) {
    return (
      <div className="text-center py-16">
        <AlertTriangle size={28} className="mx-auto text-[var(--dt-text-muted)] opacity-50 mb-3" />
        <p className="text-[14px] text-[var(--dt-text-secondary)]">No reports awaiting your gentle eye. That's a good day.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rows.map((report) => {
        const isClosed = report.status === "resolved" || report.status === "dismissed";
        return (
          <div key={report.id} className={`bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-4 sm:p-5 shadow-dt-sm transition-opacity ${isClosed ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <AlertTriangle size={16} className="text-[#B5835A]" />
                <span className="text-[13px] font-medium text-[var(--dt-text)] capitalize">{report.reason}</span>
                <span className="text-[11px] text-[var(--dt-text-muted)]">by u/{report.reporter}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${
                report.status === "pending" ? "bg-[#FFF3E0] text-[#B5835A]" :
                report.status === "reviewed" ? "bg-[#E3F2FD] text-[#5A7A9B]" :
                report.status === "resolved" ? "bg-[#E8F5E9] text-[#4A7C59]" :
                "bg-[var(--dt-border-light)] text-[var(--dt-text-muted)]"
              }`}>
                {report.status}
              </span>
            </div>
            <p className="text-[13px] text-[var(--dt-text-secondary)] mt-2">{report.details}</p>
            {!isClosed && (
              <div className="flex flex-wrap gap-2 mt-3">
                {report.status === "pending" && (
                  <button
                    onClick={() => update(report.id, "reviewed")}
                    className="px-3 py-1.5 rounded-full bg-[#E3F2FD] text-[#5A7A9B] text-[12px] font-medium hover:bg-[#BBDEFB] transition-colors"
                  >
                    Mark reviewed
                  </button>
                )}
                <button
                  onClick={() => update(report.id, "resolved")}
                  className="px-3 py-1.5 rounded-full bg-[#E8F5E9] text-[#4A7C59] text-[12px] font-medium hover:bg-[#C8E6C9] transition-colors"
                >
                  Resolve
                </button>
                <button
                  onClick={() => update(report.id, "dismissed")}
                  className="px-3 py-1.5 rounded-full bg-[var(--dt-border-light)] text-[var(--dt-text-muted)] text-[12px] font-medium hover:bg-[var(--dt-border)] transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

type ListenerStatus = "pending" | "matched" | "in_progress" | "resolved";
type ListenerRow = {
  id: number;
  username: string;
  urgency: string;
  feeling: string;
  communication?: string;
  status: ListenerStatus;
};

function ListenersTab({ isDemo }: { isDemo: boolean }) {
  const [rows, setRows] = useState<ListenerRow[]>(
    isDemo
      ? (demoListenerRequests as ListenerRow[])
      : []
  );

  const update = (id: number, status: ListenerStatus) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  const stats = [
    { label: "Pending", value: rows.filter((r) => r.status === "pending").length, color: "#B5835A" },
    { label: "Matched", value: rows.filter((r) => r.status === "matched").length, color: "var(--dt-primary)" },
    { label: "In Progress", value: rows.filter((r) => r.status === "in_progress").length, color: "#8FA3BF" },
    { label: "Resolved", value: rows.filter((r) => r.status === "resolved").length, color: "#8FBF7A" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-4 shadow-dt-sm text-center">
            <p className="font-serif text-[20px]" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-[var(--dt-text-muted)] uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="text-center py-16">
          <Headphones size={28} className="mx-auto text-[var(--dt-text-muted)] opacity-50 mb-3" />
          <p className="text-[14px] text-[var(--dt-text-secondary)]">No one is waiting for a listener right now. The room is calm.</p>
        </div>
      )}

      {rows.map((req) => {
        const isClosed = req.status === "resolved";
        return (
          <div key={req.id} className={`bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-4 sm:p-5 shadow-dt-sm ${isClosed ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`w-2 h-2 rounded-full ${req.urgency === "crisis" ? "bg-[#C85A5A]" : req.urgency === "high" ? "bg-[#B5835A]" : "bg-[#8FBF7A]"}`} />
                  <span className="text-[13px] font-medium text-[var(--dt-text)] capitalize">{req.urgency} urgency</span>
                  <span className="text-[11px] text-[var(--dt-text-muted)]">by u/{req.username}</span>
                </div>
                <p className="text-[13px] text-[var(--dt-text-secondary)] mt-2 leading-relaxed">{req.feeling}</p>
                {req.communication && <p className="text-[11px] text-[var(--dt-text-muted)] mt-1">Preferred: {req.communication}</p>}
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium capitalize whitespace-nowrap ${
                req.status === "pending" ? "bg-[#FFF3E0] text-[#B5835A]" :
                req.status === "matched" ? "bg-[var(--dt-primary-light)] text-[var(--dt-primary)]" :
                req.status === "in_progress" ? "bg-[#E3F2FD] text-[#5A7A9B]" :
                "bg-[#E8F5E9] text-[#4A7C59]"
              }`}>{req.status.replace("_", " ")}</span>
            </div>
            {!isClosed && (
              <div className="flex flex-wrap gap-2 mt-3">
                {req.status === "pending" && (
                  <button
                    onClick={() => update(req.id, "matched")}
                    className="px-3 py-1.5 rounded-full bg-[var(--dt-primary-light)] text-[var(--dt-primary)] text-[12px] font-medium hover:bg-[var(--dt-primary)] hover:text-white transition-colors"
                  >
                    Match a listener
                  </button>
                )}
                {req.status === "matched" && (
                  <button
                    onClick={() => update(req.id, "in_progress")}
                    className="px-3 py-1.5 rounded-full bg-[#E3F2FD] text-[#5A7A9B] text-[12px] font-medium hover:bg-[#BBDEFB] transition-colors"
                  >
                    Start conversation
                  </button>
                )}
                <button
                  onClick={() => update(req.id, "resolved")}
                  className="px-3 py-1.5 rounded-full bg-[#E8F5E9] text-[#4A7C59] text-[12px] font-medium hover:bg-[#C8E6C9] transition-colors"
                >
                  Mark resolved
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AnalyticsTab({ isDemo }: { isDemo: boolean }) {
  if (!isDemo) return <div className="text-center py-16 text-[var(--dt-text-muted)]">Analytics available in demo mode.</div>;

  return (
    <div className="space-y-6">
      {/* Mood Trends */}
      <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-6 shadow-dt-sm">
        <h3 className="text-[14px] font-medium text-[var(--dt-text)] mb-4">Emotional Mood Trends (7 Days)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--dt-border-light)]">
                <th className="text-left px-3 py-2 text-[11px] text-[var(--dt-text-muted)]">Day</th>
                {["Hopeful", "Lonely", "Anxious", "Healing", "Exhausted"].map(m => (
                  <th key={m} className="text-center px-3 py-2 text-[11px] text-[var(--dt-text-muted)]">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demoMoodTrends.map((d) => (
                <tr key={d.day} className="border-b border-[var(--dt-border-light)]/50">
                  <td className="px-3 py-2 text-[13px] text-[var(--dt-text)] font-medium">{d.day}</td>
                  <td className="px-3 py-2 text-center text-[13px] text-[#8FBF7A]">{d.hopeful}</td>
                  <td className="px-3 py-2 text-center text-[13px] text-[var(--dt-primary)]">{d.lonely}</td>
                  <td className="px-3 py-2 text-center text-[13px] text-[#B5835A]">{d.anxious}</td>
                  <td className="px-3 py-2 text-center text-[13px] text-[var(--dt-secondary)]">{d.healing}</td>
                  <td className="px-3 py-2 text-center text-[13px] text-[#9E7CB1]">{d.exhausted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-6 shadow-dt-sm">
        <h3 className="text-[14px] font-medium text-[var(--dt-text)] mb-4">Community Growth</h3>
        <div className="flex items-end gap-3 h-32">
          {demoGrowthData.map((d, i) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col items-center gap-0.5">
                <div className="w-full bg-[var(--dt-primary)] rounded-t-sm" style={{ height: `${((d.users - 900) / 400) * 80}px`, opacity: 0.8 }} />
                <div className="w-full bg-[var(--dt-secondary)] rounded-t-sm" style={{ height: `${((d.posts - 2500) / 1000) * 40}px`, opacity: 0.6 }} />
              </div>
              <span className="text-[9px] text-[var(--dt-text-muted)]">{d.date}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--dt-text-muted)]"><span className="w-2 h-2 rounded-sm bg-[var(--dt-primary)]" /> Users</span>
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--dt-text-muted)]"><span className="w-2 h-2 rounded-sm bg-[var(--dt-secondary)]" /> Posts</span>
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-xl p-6 shadow-dt-sm">
        <h3 className="text-[14px] font-medium text-[var(--dt-text)] mb-4">Most Discussed Topics</h3>
        <div className="space-y-3">
          {demoTopCategories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] text-[var(--dt-text)]">{cat.name}</span>
                <span className="text-[12px] text-[var(--dt-text-muted)]">{cat.count} posts</span>
              </div>
              <div className="h-2 bg-[var(--dt-bg)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--dt-primary)] rounded-full transition-all" style={{ width: `${cat.percentage}%`, opacity: 0.5 + (cat.percentage / 100) * 0.5 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const { isDemoMode, isDemoAdmin } = useDemoMode();
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const hasAccess = isAdmin || (isDemoMode && isDemoAdmin);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !hasAccess)) {
      const t = window.setTimeout(() => navigate("/", { replace: true }), 2200);
      return () => window.clearTimeout(t);
    }
  }, [isLoading, isAuthenticated, hasAccess, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--dt-bg)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--dt-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !hasAccess) {
    return (
      <div className="min-h-screen bg-[var(--dt-bg)] flex items-center justify-center px-6">
        <div className="text-center max-w-[420px]">
          <Shield size={32} className="mx-auto text-[var(--dt-text-muted)] mb-3" />
          <p className="font-serif text-[20px] text-[var(--dt-text)]">Admin access required</p>
          <p className="text-[13px] text-[var(--dt-text-secondary)] mt-2 leading-relaxed">
            This corner of the site is for the people keeping the lights on.
            We'll send you back home in a moment.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 mt-5 px-5 py-2.5 rounded-full bg-[var(--dt-primary)] text-white text-[13px] font-medium hover:bg-[var(--dt-primary-hover)] transition-colors"
          >
            <ArrowLeft size={13} />
            Go home now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--dt-bg)] flex">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[var(--dt-card)] border-r border-[var(--dt-border-light)] fixed h-full hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="font-serif text-[20px] text-[var(--dt-text)]">
            DivorceTalk<span className="text-[var(--dt-primary)]">.in</span>
          </Link>
          <p className="text-[11px] text-[var(--dt-text-muted)] mt-1 uppercase tracking-wider">Admin Panel</p>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {adminTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--dt-primary-light)] text-[var(--dt-primary)]"
                  : "text-[var(--dt-text-secondary)] hover:bg-[var(--dt-bg)]"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[var(--dt-border-light)]">
          <Link to="/" className="flex items-center gap-2 text-[13px] text-[var(--dt-text-muted)] hover:text-[var(--dt-text)] transition-colors">
            <ArrowLeft size={16} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-[260px] p-6 md:p-10">
        {/* Mobile nav */}
        <div className="md:hidden mb-6 flex flex-wrap gap-2">
          {adminTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--dt-primary)] text-white shadow-dt-sm"
                  : "bg-[var(--dt-card)] text-[var(--dt-text-secondary)] border border-[var(--dt-border)] hover:border-[var(--dt-primary)]/40"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <h1 className="font-serif text-[28px] text-[var(--dt-text)] mb-6 capitalize">
          {activeTab}
        </h1>

        {activeTab === "dashboard" && <DashboardTab isDemo={isDemoMode} />}
        {activeTab === "users" && <UsersTab isDemo={isDemoMode} />}
        {activeTab === "posts" && <PostsTab isDemo={isDemoMode} />}
        {activeTab === "reports" && <ReportsTab isDemo={isDemoMode} />}
        {activeTab === "listeners" && <ListenersTab isDemo={isDemoMode} />}
        {activeTab === "analytics" && <AnalyticsTab isDemo={isDemoMode} />}
      </main>
    </div>
  );
}
