/** Kalkulyator natijasini buyurtma formasiga uzatish */
export type Prefill = { service: string; note: string };
export const PREFILL_EVENT = "uborka:prefill";

export function sendPrefill(detail: Prefill) {
  window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail }));
  document.getElementById("buyurtma")?.scrollIntoView({ behavior: "smooth" });
}
