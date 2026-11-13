import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const mark = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#D7141F"/><path d="M33 36V70a25 25 0 0 0 50 0V62" fill="none" stroke="#fff" stroke-width="17" stroke-linecap="round"/><path d="M83 15c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18Z" fill="#fff"/></svg>`,
);

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#D7141F" }}>
        <img src={`data:image/svg+xml,${mark}`} width={180} height={180} alt="" />
      </div>
    ),
    size,
  );
}
