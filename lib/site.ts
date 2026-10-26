// Данные компании в одном месте: их используют метаданные, JSON-LD,
// sitemap/robots и блоки страницы. Меняйте контакты только здесь.

/** Адрес сайта без «/» в конце. На проде задайте NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kimmotors.ru").replace(/\/$/, "");

export const SITE_NAME = "Kim Motors";

export const PHONE = "+996500668685";
export const PHONE_DISPLAY = "+996 (500) 668 685";
export const WHATSAPP_URL = `https://wa.me/${PHONE.slice(1)}`;

export const SOCIALS = {
  instagram: "https://instagram.com/kim.motors.kg",
  youtube: "https://youtube.com/@Vladimir_Kim_PRO_Auto",
} as const;

/** Ссылка в WhatsApp с готовым текстом сообщения. */
export const whatsappWithText = (text: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
