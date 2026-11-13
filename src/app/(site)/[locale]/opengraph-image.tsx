import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Uborka Navoiy — Navoiyda professional tozalash";

export default async function OgImage() {
  const photo = await readFile(join(process.cwd(), "public", "images", "hero.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#0e2038" }}>
        <img src={src} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0, objectFit: "cover", objectPosition: "60% 50%" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(90deg, rgba(14,32,56,.95) 0%, rgba(14,32,56,.75) 45%, rgba(14,32,56,0) 75%)" }} />
        <div style={{ position: "absolute", left: 72, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", color: "#fff" }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#ff6a72", letterSpacing: 4 }}>UBORKA NAVOIY</div>
          <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 1, marginTop: 10 }}>TOZA UY</div>
          <div style={{ fontSize: 34, marginTop: 26 }}>+998 93 344 42 42 · uborkanavoi.uz</div>
        </div>
      </div>
    ),
    size,
  );
}
