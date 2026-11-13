"use client";

import { useState } from "react";
import { videoEmbed } from "@/lib/links";

/** Video faqat bosilganda yuklanadi: sahifa tez ochilishi uchun */
export default function VideoCard({ url, title, watch }: { url: string; title: string; watch: string }) {
  const [on, setOn] = useState(false);
  const embed = videoEmbed(url);
  const source = embed?.kind === "youtube" ? "YouTube" : "Instagram";

  return (
    <div className="video" data-r>
      {on && embed ? (
        <iframe src={embed.src} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" loading="lazy" />
      ) : embed ? (
        <button className="video__btn" type="button" onClick={() => setOn(true)} aria-label={`${watch}: ${title}`}>
          <span className="video__play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z" /></svg>
          </span>
          <span className="video__meta">
            <small>{source}</small>
            <strong>{title}</strong>
          </span>
        </button>
      ) : (
        <a className="video__btn" href={url} target="_blank" rel="noopener">
          <span className="video__meta">
            <strong>{title}</strong>
          </span>
        </a>
      )}
    </div>
  );
}
