import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { useDemoMode } from "@/hooks/useDemoMode";
import { demoRoomMessages } from "@/lib/demoData";
import Navbar from "@/sections/Navbar";
import {
  Flame,
  Wind,
  HeartCrack,
  Users,
  Moon,
  Baby,
  MessageCircle,
  Send,
  Lock,
  ArrowLeft,
  Shield,
} from "lucide-react";

const roomIcons: Record<string, any> = {
  "relationship-burnout": Flame,
  "separation-anxiety": Wind,
  "betrayal": HeartCrack,
  "toxic-family": Users,
  "silent-marriages": Moon,
  "co-parenting": Baby,
};

const roomColors: Record<string, string> = {
  "relationship-burnout": "#C88F7A",
  "separation-anxiety": "#A7B29F",
  "betrayal": "#BF8F9E",
  "toxic-family": "#BFB38F",
  "silent-marriages": "#9B8FBF",
  "co-parenting": "#8FA3BF",
};

function RoomList() {
  const { data: rooms } = trpc.room.list.useQuery();

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-serif text-[32px] md:text-[40px] text-[var(--dt-text)]">
          Listening Rooms
        </h1>
        <p className="text-[16px] text-[var(--dt-text-secondary)] mt-3 max-w-[500px] mx-auto">
          Join a room where people understand what you're going through. You're not alone in this.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rooms?.map((room, i) => {
          const Icon = roomIcons[room.slug] || MessageCircle;
          const color = roomColors[room.slug] || "var(--dt-primary)";
          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/rooms?room=${room.slug}`}
                className="group block bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-6 hover:shadow-dt-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${color}18` }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans text-[16px] font-medium text-[var(--dt-text)] group-hover:text-[var(--dt-primary)] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-[13px] text-[var(--dt-text-secondary)] mt-1 leading-relaxed">
                      {room.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[11px] text-[var(--dt-text-muted)]">
                        {room.memberCount || 0} members
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function RoomChat({ slug }: { slug: string }) {
  const { isDemoMode } = useDemoMode();
  const { data: room } = trpc.room.getBySlug.useQuery({ slug });
  const { data: serverMessages, refetch } = trpc.room.messages.useQuery(
    { roomId: room?.id || 0, limit: 30 },
    { enabled: !!room?.id && !isDemoMode, refetchInterval: 5000 }
  );
  const sendMessage = trpc.room.sendMessage.useMutation({
    onSuccess: () => { refetch(); setMsg(""); },
  });
  const { isAuthenticated } = useAuth();
  const [msg, setMsg] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use demo messages or server messages
  const messagesData = isDemoMode
    ? { items: demoRoomMessages[slug] || [] }
    : serverMessages;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messagesData?.items]);

  const handleSend = () => {
    if (!msg.trim() || !room) return;
    sendMessage.mutate({ roomId: room.id, content: msg, isAnonymous: true });
  };

  const color = roomColors[slug] || "var(--dt-primary)";
  const Icon = roomIcons[slug] || MessageCircle;

  return (
    <div className="max-w-[700px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/rooms"
          className="p-2 rounded-xl hover:bg-[var(--dt-card)] transition-colors"
        >
          <ArrowLeft size={20} className="text-[var(--dt-text-muted)]" />
        </Link>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <h2 className="font-sans text-[18px] font-medium text-[var(--dt-text)]">
            {room?.name || "Loading..."}
          </h2>
          <p className="text-[12px] text-[var(--dt-text-muted)]">
            {messagesData?.items?.length || 0} messages · Anonymous & safe
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="bg-[var(--dt-card)] border border-[var(--dt-border-light)] rounded-2xl p-5 h-[400px] overflow-y-auto space-y-4 shadow-dt-sm"
      >
        {messagesData?.items?.length === 0 && (
          <div className="text-center py-16">
            <Shield size={32} className="mx-auto text-[var(--dt-border)] mb-3" />
            <p className="text-[var(--dt-text-muted)] text-[14px]">
              This room is quiet. Be the first to share.
            </p>
          </div>
        )}
        {messagesData?.items?.map((m) => (
          <div key={m.id} className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
              style={{ backgroundColor: `${color}18`, color }}
            >
              {m.author.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-[var(--dt-text)]">
                  u/{m.author.username}
                </span>
                <span className="text-[11px] text-[var(--dt-text-muted)]">
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="text-[14px] text-[var(--dt-text)] mt-1 leading-relaxed">
                {m.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-3">
        <input
          type="text"
          placeholder="Share your thoughts..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-5 py-3.5 rounded-full bg-[var(--dt-card)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!msg.trim() || sendMessage.isPending || !isAuthenticated}
          className="w-12 h-12 rounded-full bg-[var(--dt-primary)] text-white flex items-center justify-center hover:bg-[var(--dt-primary-hover)] disabled:opacity-40 transition-all flex-shrink-0"
        >
          <Send size={18} />
        </button>
      </div>
      {!isAuthenticated && (
        <p className="text-[12px] text-[var(--dt-text-muted)] mt-2 text-center">
          <Link to="/login" className="text-[var(--dt-primary)] hover:underline">Sign in</Link> to participate
        </p>
      )}
    </div>
  );
}

export default function Rooms() {
  const [searchParams] = useSearchParams();
  const roomSlug = searchParams.get("room");

  return (
    <div className="min-h-screen bg-[var(--dt-bg)]">
      <Navbar />
      <main className="pt-[88px] px-4 sm:px-6 md:px-12 py-8 sm:py-12">
        {roomSlug ? <RoomChat slug={roomSlug} /> : <RoomList />}
      </main>
    </div>
  );
}
