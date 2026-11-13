"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, isAdmin } from "@/lib/auth";
import { normalizeContent } from "@/lib/normalize";
import { writeStoredContent } from "@/lib/storage";

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    // Parol terish hujumlarini sekinlashtirish
    await new Promise((r) => setTimeout(r, 800));
    return { error: "Parol noto‘g‘ri." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

export async function saveContent(json: string): Promise<{ ok: boolean; error?: string; updatedAt?: string }> {
  if (!(await isAdmin())) return { ok: false, error: "Sessiya tugagan. Qaytadan kiring." };
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, error: "Ma’lumot buzilgan." };
  }
  const content = normalizeContent(parsed);
  content.updatedAt = new Date().toISOString();
  try {
    await writeStoredContent(content);
  } catch (err) {
    if (err instanceof Error && err.message === "STORAGE_READONLY") {
      return { ok: false, error: "Saqlash joyi ulanmagan. Vercel’da Blob storage’ni ulang (README’ga qarang)." };
    }
    console.error("Saqlashda xato:", err);
    return { ok: false, error: "Saqlab bo‘lmadi. Birozdan keyin qayta urinib ko‘ring." };
  }
  revalidatePath("/", "layout");
  return { ok: true, updatedAt: content.updatedAt };
}
