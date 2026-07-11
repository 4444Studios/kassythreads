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
      <footer id="contact" style={{ background: "var(--color-text)", padding: "56px 24px 48px", textAlign: "center" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-impact)", fontSize: 28, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-white)" }}>
          {STUDIO.wordmark}
        </p>
        <p style={{ margin: "6px 0 0", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.5)" }}>
          Stronger than it looks. Smoother than it feels.
        </p>
        <p style={{ margin: "20px 0 0", fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
          {STUDIO.address}
        </p>
        <p style={{ margin: "20px 0 0", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          <a href={STUDIO.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)", textDecoration: "none" }}>
            {STUDIO.instagramHandle}
          </a>
          <span style={{ margin: "0 12px", color: "rgba(255,255,255,0.2)" }}>·</span>
          <a href={STUDIO.booksyUrl} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
            Book on Booksy
          </a>
        </p>
        <p style={{ margin: "32px 0 0", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.2)" }}>
          © {new Date().getFullYear()} Kassy Threads LLC · El Monte, CA
        </p>
      </footer>
    </>
  );
}
