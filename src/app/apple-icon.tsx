import { ImageResponse } from "next/og";

/**
 * Apple touch icon (180x180) — generated at build time from JSX so it stays
 * in sync with the SVG favicon. Next automatically serves this as
 * /apple-icon.png and injects the correct <link rel="apple-touch-icon"> tag.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="120"
          height="120"
          xmlns="http://www.w3.org/2000/svg"
        >
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
    ),
    size,
  );
}
