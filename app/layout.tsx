import type { Metadata, Viewport } from "next";
import { PHONE, SITE_NAME, SITE_URL, SOCIALS, WHATSAPP_URL } from "@/lib/site";
import "./globals.css";

const title = "Авто из Кореи и Китая под заказ в Бишкек — Kim Motors";
const description =
  "Подбор и доставка автомобилей из Южной Кореи и Китая в Кыргызстан под ключ. Прямой доступ к аукционам Encar и K Car, проверка перед покупкой, таможенное оформление. Более 1500 довольных клиентов.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "авто из Кореи",
    "авто из Кореи в Бишкек",
    "авто из Кореи в Кыргызстан",
    "авто из Китая под заказ",
    "доставка авто из Кореи",
    "пригон авто из Кореи",
    "Encar",
    "Kim Motors",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: SITE_NAME,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  // Коды подтверждения из Google Search Console и Яндекс.Вебмастера
  // (метатег, значение content). Пока переменная не задана, тег не выводится.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#101213",
  colorScheme: "dark",
};

// Структурированные данные для Google/Яндекса: кто мы, где работаем, как связаться.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoDealer",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/kim-motors-logo.svg`,
      image: `${SITE_URL}/opengraph-image.jpg`,
      description,
      telephone: PHONE,
      address: { "@type": "PostalAddress", addressLocality: "Бишкек", addressCountry: "KG" },
      areaServed: { "@type": "Country", name: "Кыргызстан" },
      founder: { "@type": "Person", name: "Владимир Ким" },
      sameAs: [SOCIALS.instagram, SOCIALS.youtube, WHATSAPP_URL],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "sales",
        availableLanguage: ["ru"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "ru",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          // Экранируем «<», чтобы текст не мог закрыть тег script.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
