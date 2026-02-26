import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="18" viewBox="0 0 130 60" fill="none">
          <path
            d="M10 15 H40 C50 15 50 30 40 30 H20 C10 30 10 45 20 45 H50"
            stroke="#818cf8"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M60 15 V45 M80 15 V45 M60 30 H80"
            stroke="#818cf8"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M95 45 V15 L110 35 L125 15 V45"
            stroke="#818cf8"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}