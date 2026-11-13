import "server-only";
import { cache } from "react";
import { normalizeContent } from "./normalize";
import { readStoredContent } from "./storage";
import type { Content } from "./types";

/** Saytning joriy kontenti (bitta so'rov ichida bir marta o'qiladi) */
export const getContent = cache(async (): Promise<Content> => {
  const stored = await readStoredContent();
  return normalizeContent(stored ?? {});
});
