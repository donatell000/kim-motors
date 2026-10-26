import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Ссылки поиска контейнера со старого сайта: /category/logistika/?slog=НОМЕР
      {
        source: "/category/logistika",
        has: [{ type: "query", key: "slog", value: "(?<number>.+)" }],
        destination: "/?track=:number",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
