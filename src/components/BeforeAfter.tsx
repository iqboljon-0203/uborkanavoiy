"use client";

import Image from "next/image";
import { useState } from "react";

type Props = { before: string; after: string; title: string; labels: { before: string; after: string } };

export default function BeforeAfter({ before, after, title, labels }: Props) {
  const [p, setP] = useState(50);
  return (
    <figure data-r>
      <div className="ba" style={{ "--p": `${p}%` } as React.CSSProperties}>
        <div className="ba__img">
          <Image src={after} alt={`${title}: ${labels.after}`} fill sizes="(max-width: 1000px) 100vw, 50vw" />
        </div>
        <div className="ba__img ba__img--before">
          <Image src={before} alt={`${title}: ${labels.before}`} fill sizes="(max-width: 1000px) 100vw, 50vw" />
        </div>
        <span className="ba__label">{labels.before}</span>
        <span className="ba__label ba__label--r">{labels.after}</span>
        <div className="ba__line" aria-hidden="true" />
        <input
          className="ba__range"
          type="range"
          min={0}
          max={100}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          aria-label={`${title}: ${labels.before} / ${labels.after}`}
        />
      </div>
      {title && <figcaption className="ba__title">{title}</figcaption>}
    </figure>
  );
}
