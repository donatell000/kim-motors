import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kim Motors — Заказ авто из Кореи и Китая | Доставка машин под ключ",
  description: "Профессиональный подбор и доставка автомобилей из Южной Кореи и Китая. Лучшие цены, полная проверка авто, таможенное оформление. Закажите машину мечты в Kim Motors!",
  keywords: ["заказ авто из кореи", "купить машину в китае", "доставка авто из кореи", "авто из китая под заказ", "подбор автомобилей", "Kim Motors"],
  authors: [{ name: "Kim Motors" }],
  openGraph: {
    title: "Kim Motors — Заказ авто из Кореи и Китая",
    description: "Профессиональный подбор и доставка автомобилей из Южной Кореи и Китая под ключ.",
    url: "https://kimmotors.ru", // Замените на реальный URL позже
    siteName: "Kim Motors",
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
