"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Aylantirishda paydo bo'lish, raqamlarni sanash, parallaks va tugma effekti */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // Aylantirish chizig'i va bosh rasm parallaksi
    const bar = document.getElementById("progress");
    const heroMedia = document.querySelector<HTMLElement>(".hero__media");
    let queued = false;
    const update = () => {
      queued = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (!calm && heroMedia && y < window.innerHeight * 1.2) {
        heroMedia.style.translate = `0 ${Math.min(y * 0.1, heroMedia.offsetHeight * 0.06)}px`;
      }
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    if (!calm && "IntersectionObserver" in window) {
      const items = [...document.querySelectorAll<HTMLElement>("[data-r]:not(.is-in)")];
      const media = [...document.querySelectorAll<HTMLElement>(".media:not(.is-in)")];
      items.forEach((el) => {
        const index = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
        el.classList.add("r");
        el.style.setProperty("--d", `${Math.min(Math.max(index, 0), 5) * 80}ms`);
      });
      media.forEach((el) => el.classList.add("r-clip"));

      const seen = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.classList.add("is-in");
            seen.unobserve(el);
            window.setTimeout(() => el.style.removeProperty("--d"), 1300);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      [...items, ...media].forEach((el) => seen.observe(el));
      cleanups.push(() => seen.disconnect());

      const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      const counted = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            counted.unobserve(entry.target);
            const el = entry.target as HTMLElement;
            const to = Number(el.dataset.count);
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / 1600, 1);
              el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - t, 4))));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        },
        { threshold: 0.6 },
      );
      document.querySelectorAll("[data-count]").forEach((el) => counted.observe(el));
      cleanups.push(() => counted.disconnect());
    }

    if (!calm && window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.14}px, ${(e.clientY - r.top - r.height / 2) * 0.24}px)`;
        };
        const leave = () => (btn.style.transform = "");
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
