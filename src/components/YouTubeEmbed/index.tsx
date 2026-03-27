import React from "react";
import styles from "./styles.module.css";

interface Props {
  /** YouTube video ID (the part after ?v= or /embed/) */
  id: string;
  /** Accessible iframe title — required for screen readers */
  title?: string;
  /** Start playback at this time (seconds) */
  start?: number;
  /** Optional caption displayed below the video */
  caption?: string;
}

/**
 * Responsive 16:9 YouTube embed.
 *
 * Usage in any .md or .mdx doc (no import needed):
 *
 *   <YouTubeEmbed id="dQw4w9WgXcQ" title="NCRB Overview" />
 *
 *   <YouTubeEmbed
 *     id="dQw4w9WgXcQ"
 *     title="MetaMask setup"
 *     start={90}
 *     caption="Skip to 1:30 for the MetaMask wallet setup steps"
 *   />
 */
export default function YouTubeEmbed({
  id,
  title = "YouTube video",
  start,
  caption,
}: Props): React.ReactElement {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (start) params.set("start", String(start));

  const src = `https://www.youtube-nocookie.com/embed/${id}?${params}`;

  return (
    <figure className={styles.figure}>
      <div className={styles.wrapper}>
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className={styles.iframe}
        />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
