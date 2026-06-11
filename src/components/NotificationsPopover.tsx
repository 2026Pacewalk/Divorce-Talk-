import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Heart, MessageCircle, BookOpen, Users, Sparkles, Check } from "lucide-react";
import { useDemoMode } from "@/hooks/useDemoMode";

type Notif = {
  id: string;
  type: "support" | "comment" | "journal" | "listener" | "community";
  title: string;
  body: string;
  time: string;
  read?: boolean;
};

const seed: Notif[] = [
  {
    id: "n1",
    type: "support",
    title: "Someone sent you support",
    body: "Your story moved 12 people in the Starting Over circle.",
    time: "2m",
  },
  {
    id: "n2",
    type: "comment",
    title: "New reply on your post",
    body: "“Reading this felt like reading my own diary. Thank you for writing it.”",
    time: "1h",
  },
  {
    id: "n3",
    type: "journal",
    title: "Time to check in with yourself",
    body: "Tonight's prompt: what is one small thing that softened today?",
    time: "today",
    read: true,
  },
  {
    id: "n4",
    type: "listener",
    title: "A listener is available",
    body: "Sage is online and open to hold space for 20 minutes.",
    time: "3h",
    read: true,
  },
  {
    id: "n5",
    type: "community",
    title: "Silent Marriages room is live",
    body: "A new gentle circle just opened. Drop in if it calls you.",
    time: "yesterday",
    read: true,
  },
];

const iconFor: Record<Notif["type"], React.ComponentType<{ size?: number; className?: string }>> = {
  support: Heart,
  comment: MessageCircle,
  journal: BookOpen,
  listener: Users,
  community: Sparkles,
};

const tintFor: Record<Notif["type"], string> = {
  support: "bg-[var(--dt-primary-light)] text-[var(--dt-primary)]",
  comment: "bg-[#FFF3E0] text-[#B5835A]",
  journal: "bg-[var(--dt-secondary-light)] text-[var(--dt-secondary)]",
  listener: "bg-[#E8F5E9] text-[#4A7C59]",
  community: "bg-[#F3E5F5] text-[#9E7CB1]",
};

// Pool of on-tone notifications we drip in over time to make the demo feel
// alive. They're deliberately gentle and never aggressive.
const dripPool: Omit<Notif, "id" | "time" | "read">[] = [
  {
    type: "support",
    title: "Three new hearts on your post",
    body: "QuietRiver, HealingSoul and StillBreathing sent you support.",
  },
  {
    type: "comment",
    title: "Someone replied to you",
    body: "“Reading your words made me feel less alone tonight. Thank you.”",
  },
  {
    type: "listener",
    title: "A listener just came online",
    body: "Wren has 30 minutes open and is happy to hold space.",
  },
  {
    type: "community",
    title: "A new room just opened",
    body: "“After the first holiday alone” is live for the next hour.",
  },
  {
    type: "journal",
    title: "Tonight's gentle prompt",
    body: "What is something you didn't have words for last year that you do now?",
  },
];

export default function NotificationsPopover() {
  const [items, setItems] = useState<Notif[]>(seed);
  const { isDemoMode } = useDemoMode();
  const dripIndex = useRef(0);
  const unread = items.filter((n) => !n.read).length;

  // Drip a new notification every ~45s while in demo mode so the inbox
  // feels alive. Stops once 8 notifications are in the list.
  useEffect(() => {
    if (!isDemoMode) return;
    const tick = () => {
      setItems((prev) => {
        if (prev.length >= 8) return prev;
        const tmpl = dripPool[dripIndex.current % dripPool.length];
        dripIndex.current += 1;
        const next: Notif = {
          ...tmpl,
          id: `live-${Date.now()}`,
          time: "just now",
        };
        return [next, ...prev];
      });
    };
    const id = window.setInterval(tick, 45000);
    return () => window.clearInterval(id);
  }, [isDemoMode]);

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const clearAll = () => setItems([]);
  const markRead = (id: string) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid place-items-center w-10 h-10 rounded-full text-[var(--dt-text-secondary)] hover:text-[var(--dt-text)] hover:bg-[var(--dt-bg)]/70 transition-all duration-200"
        >
          <Bell size={17} />
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1.5 right-1.5 grid place-items-center min-w-[16px] h-[16px] px-1 rounded-full bg-[var(--dt-primary)] text-white text-[10px] font-semibold leading-none"
            >
              {unread}
            </motion.span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={12}
        className="z-[110] w-[360px] p-0 overflow-hidden rounded-2xl border-[var(--dt-border-light)] bg-[var(--dt-card)] shadow-2xl ring-1 ring-[var(--dt-text)]/5"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--dt-border-light)]">
          <div>
            <p className="font-serif text-[16px] text-[var(--dt-text)]">Quiet inbox</p>
            <p className="text-[11px] text-[var(--dt-text-muted)]">
              {unread > 0
                ? `${unread} new ${unread === 1 ? "moment" : "moments"} for you`
                : "All caught up"}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-[11px] font-medium text-[var(--dt-text-secondary)] hover:text-[var(--dt-primary)] px-2 py-1 rounded-full hover:bg-[var(--dt-bg)] transition-colors"
            >
              <Check size={11} />
              Mark read
            </button>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto py-1">
          <AnimatePresence initial={false}>
            {items.length === 0 && (
              <div className="px-6 py-10 text-center">
                <Bell
                  size={28}
                  className="mx-auto text-[var(--dt-text-muted)] opacity-60"
                />
                <p className="mt-3 text-sm text-[var(--dt-text-secondary)]">
                  Nothing waiting on you.
                </p>
                <p className="mt-1 text-xs text-[var(--dt-text-muted)]">
                  This is a calm place. Stay as long as you'd like.
                </p>
              </div>
            )}
            {items.map((n) => {
              const Icon = iconFor[n.type];
              return (
                <motion.button
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  onClick={() => markRead(n.id)}
                  className="w-full text-left flex gap-3 px-4 py-3 hover:bg-[var(--dt-bg)]/60 transition-colors group"
                >
                  <span
                    className={`relative grid place-items-center shrink-0 w-9 h-9 rounded-full ${tintFor[n.type]}`}
                  >
                    <Icon size={15} />
                    {!n.read && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--dt-primary)] ring-2 ring-[var(--dt-card)]" />
                    )}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-[13px] font-semibold text-[var(--dt-text)] truncate">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-[var(--dt-text-muted)] shrink-0">
                        {n.time}
                      </span>
                    </span>
                    <span className="block mt-0.5 text-[12px] leading-snug text-[var(--dt-text-secondary)] line-clamp-2">
                      {n.body}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--dt-border-light)] bg-[var(--dt-bg)]/40">
            <button
              onClick={clearAll}
              className="text-[11px] font-medium text-[var(--dt-text-muted)] hover:text-[var(--dt-primary)] transition-colors"
            >
              Clear all
            </button>
            <span className="text-[10px] text-[var(--dt-text-muted)]">
              Real-time updates are coming soon
            </span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
