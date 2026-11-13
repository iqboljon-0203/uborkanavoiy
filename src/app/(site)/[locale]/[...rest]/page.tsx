import { notFound } from "next/navigation";

/** Mavjud bo'lmagan yo'llar sayt dizaynidagi 404 sahifasini ko'rsatadi */
export default function CatchAll() {
  notFound();
}
