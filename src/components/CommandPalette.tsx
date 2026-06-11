import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Heart,
  Headphones,
  BookOpen,
  Sparkles,
  ShieldCheck,
  LifeBuoy,
  Home,
  Users,
  Quote,
  Phone,
  Settings,
  User,
} from "lucide-react";

type PaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type PaletteItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  hint?: string;
};

const sections: { heading: string; items: PaletteItem[] }[] = [
  {
    heading: "Pages",
    items: [
      { label: "Home", path: "/", icon: Home, hint: "the landing page" },
      { label: "Heart Out", path: "/community", icon: Heart, hint: "community feed" },
      { label: "Listening Rooms", path: "/rooms", icon: Headphones, hint: "live group spaces" },
      { label: "Private Journal", path: "/journal", icon: BookOpen, hint: "your private space" },
      { label: "Relationship Check-In", path: "/check-in", icon: Sparkles, hint: "guided self-reflection" },
      { label: "Stories", path: "/stories", icon: Quote, hint: "real journeys" },
      { label: "Hear Me", path: "/hear-me", icon: Users, hint: "request a listener" },
    ],
  },
  {
    heading: "Safety",
    items: [
      { label: "Community Guidelines", path: "/guidelines", icon: ShieldCheck, hint: "house rules" },
      { label: "Safety Resources", path: "/safety", icon: LifeBuoy, hint: "how we protect you" },
      { label: "Crisis Support", path: "/emergency", icon: Phone, hint: "if you need help now" },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "Dashboard", path: "/profile", icon: User },
      { label: "Settings", path: "/profile", icon: Settings },
    ],
  },
];

export default function CommandPalette({ open, onOpenChange }: PaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "/" && document.activeElement === document.body) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const go = (path: string) => {
    onOpenChange(false);
    setQuery("");
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search pages, stories, rooms…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          <div className="py-6 text-center">
            <p className="text-sm text-[var(--dt-text-secondary)]">
              Nothing found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-[var(--dt-text-muted)] mt-1">
              Try &ldquo;rooms&rdquo;, &ldquo;journal&rdquo;, or &ldquo;safety&rdquo;
            </p>
          </div>
        </CommandEmpty>
        {sections.map((section, i) => (
          <div key={section.heading}>
            {i > 0 && <CommandSeparator />}
            <CommandGroup heading={section.heading}>
              {section.items.map(({ label, path, icon: Icon, hint }) => (
                <CommandItem
                  key={label + path}
                  value={`${label} ${hint ?? ""}`}
                  onSelect={() => go(path)}
                  className="cursor-pointer"
                >
                  <Icon size={15} className="text-[var(--dt-primary)]" />
                  <span className="font-medium">{label}</span>
                  {hint && (
                    <span className="ml-auto text-[11px] text-[var(--dt-text-muted)]">
                      {hint}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
