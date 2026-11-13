import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Uborka Navoiy",
    short_name: "Uborka",
    description: "Navoiyda professional tozalash xizmati",
    start_url: "/uz",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0e2038",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
