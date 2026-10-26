import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — авто из Кореи и Китая`,
    short_name: SITE_NAME,
    description: "Подбор и доставка автомобилей из Южной Кореи и Китая в Кыргызстан под ключ.",
    start_url: "/",
    display: "standalone",
    background_color: "#101213",
    theme_color: "#101213",
    lang: "ru",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
    ],
  };
}
