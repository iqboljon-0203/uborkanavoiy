import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { storeImage } from "@/lib/storage";

export const runtime = "nodejs";
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "no_file" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413 });

  try {
    const url = await storeImage(file);
    return NextResponse.json({ url });
  } catch (err) {
    const code = err instanceof Error ? err.message : "error";
    if (code === "BAD_TYPE") return NextResponse.json({ error: "bad_type" }, { status: 415 });
    if (code === "STORAGE_READONLY") return NextResponse.json({ error: "storage_readonly" }, { status: 503 });
    console.error("Rasmni saqlab bo'lmadi:", err);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}
