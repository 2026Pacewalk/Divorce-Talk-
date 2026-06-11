import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, X } from "lucide-react";

type State =
  | { kind: "idle" }
  | { kind: "ready"; registration: ServiceWorkerRegistration };

/**
 * Watches the service worker for a waiting update and shows a soft toast.
 * - Polls registration.update() every 60s while the tab is visible
 * - When a new SW reaches the "waiting" state, surfaces the prompt
 * - Refresh button posts SKIP_WAITING to the SW, then reloads on controllerchange
 *
 * Renders nothing in dev — main.tsx only registers the SW in production.
 */
export default function UpdateToast() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    let cancelled = false;
    let poll: number | undefined;

    const watch = (reg: ServiceWorkerRegistration) => {
      if (cancelled) return;

      const considerWaiting = () => {
        if (reg.waiting && navigator.serviceWorker.controller) {
          setState({ kind: "ready", registration: reg });
          setDismissed(false);
        }
      };

      // Catch the moment a new worker finishes installing.
      reg.addEventListener("updatefound", () => {
        const next = reg.installing;
        if (!next) return;
        next.addEventListener("statechange", () => {
          if (next.state === "installed" && navigator.serviceWorker.controller) {
            setState({ kind: "ready", registration: reg });
            setDismissed(false);
          }
        });
      });

      // If a waiting worker already exists (tab opened after deploy).
      considerWaiting();

      // Gentle background check every 60s while tab is visible.
      const tick = () => {
        if (document.visibilityState === "visible") reg.update().catch(() => {});
      };
      poll = window.setInterval(tick, 60_000);
      document.addEventListener("visibilitychange", tick);
    };

    navigator.serviceWorker.getRegistration().then((reg) => reg && watch(reg));

    // When the new SW takes control, reload to use it.
    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });

    return () => {
      cancelled = true;
      if (poll) window.clearInterval(poll);
    };
  }, []);

  const refresh = () => {
    if (state.kind !== "ready") return;
    state.registration.waiting?.postMessage({ type: "SKIP_WAITING" });
  };

  const visible = state.kind === "ready" && !dismissed;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          className="fixed bottom-28 lg:bottom-6 right-4 left-4 lg:left-auto z-[150] max-w-[420px] lg:max-w-[380px] mx-auto lg:mx-0"
          role="status"
          aria-live="polite"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[var(--dt-border-light)] bg-[var(--dt-card)] shadow-2xl ring-1 ring-[var(--dt-text)]/5">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.10] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 0% 0%, rgba(200,143,122,0.6), transparent 55%), radial-gradient(circle at 100% 100%, rgba(167,178,159,0.55), transparent 55%)",
              }}
            />
            <div className="relative flex items-start gap-3 p-4">
              <span className="grid place-items-center shrink-0 w-9 h-9 rounded-xl bg-[var(--dt-primary-light)] text-[var(--dt-primary)]">
                <Sparkles size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-[var(--dt-text)] leading-snug">
                  A gentle update is ready
                </p>
                <p className="text-[12px] text-[var(--dt-text-secondary)] mt-0.5 leading-snug">
                  New version of DivorceTalk is available. Refresh to use it —
                  your work is safe.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={refresh}
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-2 rounded-full bg-[var(--dt-primary)] text-white hover:bg-[var(--dt-primary-hover)] active:scale-95 transition-all shadow-dt-sm"
                  >
                    <RefreshCw size={12} />
                    Refresh
                  </button>
                  <button
                    type="button"
                    onClick={() => setDismissed(true)}
                    className="text-[12px] font-medium px-3 py-2 rounded-full text-[var(--dt-text-muted)] hover:text-[var(--dt-text)] hover:bg-[var(--dt-bg)] transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss update notice"
                className="grid place-items-center w-7 h-7 rounded-full text-[var(--dt-text-muted)] hover:text-[var(--dt-text)] hover:bg-[var(--dt-bg)] transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
