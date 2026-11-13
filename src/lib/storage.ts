import "server-only";
import { del, list, put } from "@vercel/blob";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Admin panel ma'lumotlarini saqlash.
 * - Vercel'da: Vercel Blob (BLOB_READ_WRITE_TOKEN bo'lsa)
 * - Kompyuterda (npm run dev): data/content.json va public/uploads
 */
export type StorageMode = "blob" | "file" | "readonly";

export function storageMode(): StorageMode {
  if (process.env.BLOB_READ_WRITE_TOKEN) return "blob";
  if (process.env.VERCEL) return "readonly";
  return "file";
}

const CONTENT_PREFIX = "content/";
const KEEP_VERSIONS = 15;
const dataFile = () => join(process.cwd(), "data", "content.json");

export async function readStoredContent(): Promise<unknown | null> {
  const mode = storageMode();
  try {
    if (mode === "blob") {
      const { blobs } = await list({ prefix: CONTENT_PREFIX, limit: 1000 });
      if (!blobs.length) return null;
      const latest = blobs.reduce((a, b) => (new Date(a.uploadedAt) > new Date(b.uploadedAt) ? a : b));
      const res = await fetch(latest.url, { cache: "no-store" });
      return res.ok ? await res.json() : null;
    }
    if (mode === "file") {
      return JSON.parse(await readFile(dataFile(), "utf8"));
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code !== "ENOENT") console.error("Kontentni o‘qib bo‘lmadi:", err);
  }
  return null;
}

export async function writeStoredContent(content: unknown): Promise<void> {
  const mode = storageMode();
  const body = JSON.stringify(content, null, 2);
  if (mode === "blob") {
    // Har saqlashda yangi fayl: CDN keshi eski versiyani ko'rsatmasligi uchun
    await put(`${CONTENT_PREFIX}${Date.now()}.json`, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    const { blobs } = await list({ prefix: CONTENT_PREFIX, limit: 1000 });
    const old = blobs
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .slice(KEEP_VERSIONS);
    if (old.length) await del(old.map((b) => b.url));
    return;
  }
  if (mode === "file") {
    await mkdir(join(process.cwd(), "data"), { recursive: true });
    await writeFile(dataFile(), body, "utf8");
    return;
  }
  throw new Error("STORAGE_READONLY");
}

const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" };

export async function storeImage(file: File): Promise<string> {
  const ext = EXT[file.type];
  if (!ext) throw new Error("BAD_TYPE");
  const name = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const mode = storageMode();
  if (mode === "blob") {
    const blob = await put(`uploads/${name}`, file, { access: "public", contentType: file.type, addRandomSuffix: false });
    return blob.url;
  }
  if (mode === "file") {
    const dir = join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, name), Buffer.from(await file.arrayBuffer()));
    return `/uploads/${name}`;
  }
  throw new Error("STORAGE_READONLY");
}
