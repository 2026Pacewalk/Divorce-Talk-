// Per-route SEO metadata. The Hono server reads the request path, looks up the
// matching record here, and rewrites <title>, meta description, OG/Twitter tags,
// and the canonical URL inside dist/public/index.html before sending it back.
//
// This is what makes SEO work for an SPA — Google, Bing, GPTBot, PerplexityBot,
// and ClaudeBot all see route-specific metadata at fetch time, no JS required.

export type RouteMeta = {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
};

const SITE = "https://divorcetalk.in";

const BREADCRUMB = (segments: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: segments.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    item: `${SITE}${s.path}`,
  })),
});

export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "DivorceTalk.in — Anonymous Support for Divorce, Silent Marriages & Healing",
    description:
      "A safe, anonymous community for people navigating divorce, separation, silent marriages and emotional healing. Free, judgment-free, India. Join in seconds.",
    keywords:
      "anonymous divorce support, divorce community India, silent marriage support, emotional healing, separation help, marriage problems anonymous",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE}/#organization`,
          name: "DivorceTalk.in",
          url: SITE,
          description:
            "An anonymous emotional support community for people navigating relationship distress, separation fears and emotional healing.",
          areaServed: { "@type": "Country", name: "India" },
          knowsAbout: [
            "Anonymous emotional support",
            "Divorce recovery",
            "Silent marriages",
            "Co-parenting after separation",
            "Betrayal recovery",
            "Emotional neglect",
          ],
        },
        {
          "@type": "WebSite",
          "@id": `${SITE}/#website`,
          url: SITE,
          name: "DivorceTalk.in",
          description:
            "Anonymous support community for divorce, silent marriages and emotional healing.",
          publisher: { "@id": `${SITE}/#organization` },
          inLanguage: "en-IN",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE}/community?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ],
    },
  },

  "/community": {
    title: "Heart Out — Anonymous Stories from People Navigating Marriage Pain",
    description:
      "Read and share what you're going through. An anonymous, gentle, judgment-free feed. Real people, real heartbreaks, no advice unless asked.",
    keywords:
      "anonymous community, share marriage problems, divorce stories India, emotional support feed",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      headline: "Anonymous heart-out community for divorce and silent marriages",
      url: `${SITE}/community`,
      isPartOf: { "@id": `${SITE}/#website` },
      breadcrumb: BREADCRUMB([
        { name: "Home", path: "/" },
        { name: "Community", path: "/community" },
      ]),
    },
  },

  "/rooms": {
    title: "Listening Rooms — Group Spaces for Marriage & Divorce Pain",
    description:
      "Step into gentle group rooms held by trained listeners. Silent marriages, co-parenting, betrayal recovery — find people who actually understand.",
    keywords: "support group online, divorce group chat, anonymous group support",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Listening Rooms",
      url: `${SITE}/rooms`,
      isPartOf: { "@id": `${SITE}/#website` },
      breadcrumb: BREADCRUMB([
        { name: "Home", path: "/" },
        { name: "Listening Rooms", path: "/rooms" },
      ]),
    },
  },

  "/journal": {
    title: "Private Journal — A Locked Diary Only You Can Read",
    description:
      "Track your healing privately. Encrypted journal entries, mood tracking, daily prompts. Your words never leave your account.",
    keywords:
      "private journal app, anonymous diary online, mood tracker free, healing journal",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "DivorceTalk Private Journal",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      url: `${SITE}/journal`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  },

  "/check-in": {
    title: "Relationship Check-In — Free 2-Minute Self-Reflection",
    description:
      "A gentle 2-minute self-assessment for your relationship. No judgment, no signup, just clarity. Backed by emotional wellness research.",
    keywords:
      "relationship quiz free, marriage health check, am I in a healthy relationship",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: "Relationship Check-In",
      description:
        "Two-minute self-reflection to help you see your relationship more clearly.",
      url: `${SITE}/check-in`,
    },
  },

  "/stories": {
    title: "Real Stories of Divorce, Silent Marriages and Starting Over",
    description:
      "Real anonymous stories from people navigating divorce, silent marriages, and emotional rebuilding. If you're feeling alone tonight — you're not.",
    keywords:
      "divorce stories, silent marriage stories, real separation stories, emotional healing stories",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Stories of Divorce and Healing",
      url: `${SITE}/stories`,
      isPartOf: { "@id": `${SITE}/#website` },
      breadcrumb: BREADCRUMB([
        { name: "Home", path: "/" },
        { name: "Stories", path: "/stories" },
      ]),
    },
  },

  "/hear-me": {
    title: "Hear Me — Request an Anonymous Listener (Free, Confidential)",
    description:
      "Need someone to listen, not advise? Request a trained volunteer listener. Free, confidential, anonymous. Available across India.",
    keywords:
      "anonymous listener, emotional support volunteer, talk to someone online free India",
    ogType: "website",
  },

  "/safety": {
    title: "Safety Policy — How We Keep DivorceTalk a Soft Place",
    description:
      "How we protect your anonymity, moderate content, handle crisis situations, and partner with mental health services in India.",
    keywords: "safety policy, anonymous safety, crisis support India",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "DivorceTalk.in Safety Policy",
      datePublished: "2026-06-11",
      dateModified: "2026-06-11",
      author: { "@type": "Organization", name: "DivorceTalk.in" },
      publisher: { "@id": `${SITE}/#organization` },
    },
  },

  "/guidelines": {
    title: "Community Guidelines — How We Speak to Each Other Here",
    description:
      "The five gentle rules that keep DivorceTalk safe: be gentle, ask before advising, never share another's story, no promotion, no abuse.",
    keywords: "community guidelines, support community rules",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "DivorceTalk.in Community Guidelines",
      datePublished: "2026-06-11",
      dateModified: "2026-06-11",
      author: { "@type": "Organization", name: "DivorceTalk.in" },
      publisher: { "@id": `${SITE}/#organization` },
    },
  },

  "/privacy": {
    title: "Privacy Policy — Your Identity Never Leaves DivorceTalk",
    description:
      "We never collect your real name, phone, or location. End-to-end encrypted journal entries. No advertisers, no data brokers.",
    keywords: "privacy policy, anonymous platform, GDPR India",
    ogType: "article",
  },

  "/emergency": {
    title: "Crisis Support — Get Help Right Now (India)",
    description:
      "If you're in crisis right now, professional helplines available 24×7 across India. iCall, Vandrevala Foundation, NIMHANS Helpline.",
    keywords:
      "crisis helpline India, mental health emergency, suicide prevention India, iCall, Vandrevala Foundation",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      name: "DivorceTalk Crisis Support",
      areaServed: { "@type": "Country", name: "India" },
      availableLanguage: ["en", "hi"],
      hoursAvailable: "Mo-Su 00:00-23:59",
      description:
        "Curated 24×7 crisis support helplines for people in emotional crisis in India.",
    },
  },

  "/about": {
    title: "About DivorceTalk.in — Why We Built a Softer Place on the Internet",
    description:
      "DivorceTalk was built because people in emotional pain were posting on Instagram stories and WhatsApp statuses. They deserved better.",
    keywords: "about DivorceTalk, anonymous support mission, divorce support India",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      url: `${SITE}/about`,
      mainEntity: { "@id": `${SITE}/#organization` },
    },
  },

  "/contact": {
    title: "Contact DivorceTalk.in — We Read Every Message",
    description:
      "Reach the team behind DivorceTalk. Support, partnerships, press, or quiet questions. We respond within 24–48 hours.",
    ogType: "website",
  },

  "/login": {
    title: "Join DivorceTalk Anonymously — Free, 10 Seconds",
    description:
      "Sign in or join anonymously in 10 seconds. No real names. No advertisers. Your privacy is the point.",
    ogType: "website",
  },
};

/**
 * Returns the meta record for a given path, falling back to home.
 * Strips query strings and trailing slashes.
 */
export function metaForPath(rawPath: string): RouteMeta {
  const path = rawPath.split("?")[0].replace(/\/+$/, "") || "/";
  return routeMeta[path] ?? routeMeta["/"];
}

/**
 * Rewrites the static index.html shell with the per-route metadata.
 * Looks for sentinel tags and replaces them; if absent, injects before </head>.
 */
export function injectMeta(html: string, path: string): string {
  const meta = metaForPath(path);
  const canonical = `https://divorcetalk.in${path === "/" ? "" : path}`;

  let out = html;

  // <title> swap
  out = out.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(meta.title)}</title>`,
  );

  // description swap or inject
  if (/<meta\s+name=["']description["']/i.test(out)) {
    out = out.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    );
  }

  // Swap (not duplicate) any existing canonical / og:url / og:title / og:description
  // / og:type / twitter:title / twitter:description / keywords tags. The original
  // index.html ships defaults for the homepage; per-route requests overwrite them
  // in-place. Anything that doesn't already exist is collected here and injected
  // before </head> below.
  const pendingInjects: string[] = [];
  const swapTag = (pattern: RegExp, replacement: string) => {
    if (pattern.test(out)) {
      out = out.replace(pattern, replacement);
    } else {
      pendingInjects.push(replacement);
    }
  };

  swapTag(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}" />`,
  );
  swapTag(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  swapTag(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
  );
  swapTag(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
  );
  swapTag(
    /<meta\s+property=["']og:type["'][^>]*>/i,
    `<meta property="og:type" content="${meta.ogType ?? "website"}" />`,
  );
  swapTag(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
  );
  swapTag(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
  );
  if (meta.keywords) {
    swapTag(
      /<meta\s+name=["']keywords["'][^>]*>/i,
      `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />`,
    );
  }

  // Per-route JSON-LD is always additive (homepage's WebSite+Organization stays;
  // each route's specific schema adds alongside).
  const head = [
    ...pendingInjects,
    meta.jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  // strip any old per-route block we injected last time, then inject the fresh one
  out = out.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/g, "");
  out = out.replace(
    /<\/head>/i,
    `    <!--seo:start-->\n    ${head}\n    <!--seo:end-->\n  </head>`,
  );

  return out;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
