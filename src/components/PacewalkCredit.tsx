import { ExternalLink } from "lucide-react";

export default function PacewalkCredit() {
  return (
    <div className="bg-[var(--dt-bg)] border-t border-[var(--dt-border-light)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-4 sm:py-3">
        <p className="text-center text-[11.5px] sm:text-[12px] tracking-wide text-[var(--dt-text-muted)] leading-relaxed">
          <span className="block sm:inline">
            Designed &amp; Developed by
          </span>
          <span className="hidden sm:inline">&nbsp;</span>
          <a
            href="https://pacewalk.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Designed and developed by Pacewalk — opens in a new tab"
            className="group relative inline-flex items-center gap-1 mt-0.5 sm:mt-0 font-semibold tracking-[0.06em] text-[var(--dt-primary)] hover:text-[var(--dt-primary-hover)] focus-visible:text-[var(--dt-primary-hover)] transition-colors"
          >
            <span className="relative">
              PACEWALK
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-[1px] bg-[var(--dt-primary)] origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 ease-out"
              />
            </span>
            <ExternalLink
              size={11}
              strokeWidth={2.2}
              aria-hidden
              className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-200"
            />
          </a>
        </p>
      </div>
    </div>
  );
}
