import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

/**
 * OG image (1200x630) served at /opengraph-image. Same wordmark glyph as
 * the favicon so social scrapers, chat previews, and the browser tab tell
 * the same story.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F8F8F6",
          padding: 96,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#0A0A0A",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 32 32" width="34" height="34">
              <path
                d="M11 9 L5 16 L11 23 M21 9 L27 16 L21 23"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#0A0A0A",
            }}
          >
            {siteConfig.name}
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
              color: "#0A0A0A",
              maxWidth: 940,
            }}
          >
            Where code battles are won.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: "#525252",
              maxWidth: 780,
            }}
          >
            Practice in the Arena. Warm up in the Playground. Throw down in
            live Battlegrounds with real-time leaderboards.
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#525252",
          }}
        >
          <span>compilex.dev</span>
          <span style={{ display: "flex", gap: 24 }}>
            <span>Arena</span>
            <span style={{ color: "#D4D4D4" }}>·</span>
            <span>Playground</span>
            <span style={{ color: "#D4D4D4" }}>·</span>
            <span>Battleground</span>
          </span>
        </div>
      </div>
    ),
    size,
  );
}
