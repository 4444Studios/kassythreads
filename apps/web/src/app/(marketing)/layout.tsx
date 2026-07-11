import { SiteHeader } from "@/components/client/SiteHeader";
import { STUDIO } from "@/lib/studio";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {children}
      <footer
        id="contact"
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-body)",
            fontSize: 14,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--color-text)",
          }}
        >
          {STUDIO.wordmark}
        </p>
        <p
          style={{
            margin: "14px 0 0",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--color-muted)",
          }}
        >
          {STUDIO.address}
        </p>
        <p
          style={{
            margin: "8px 0 0",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <a
            href={STUDIO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-accent-dark)", textDecoration: "none" }}
          >
            {STUDIO.instagramHandle}
          </a>
        </p>
      </footer>
    </>
  );
}
