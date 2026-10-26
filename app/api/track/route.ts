import { NextResponse, type NextRequest } from "next/server";
import { ROUTE, type TrackResult } from "@/lib/tracking";

// Где живёт WordPress с контейнерами. Если старый сайт переедет
// (например, на поддомен), поменяйте WP_URL в переменных окружения.
const WP_URL = (process.env.WP_URL ?? "https://kimmotors.kg").replace(/\/$/, "");
const LOGISTICS_CATEGORY = 1; // рубрика «Логистика» в WordPress
const CACHE_SECONDS = 300; // менеджеры обновляют статусы редко — кэшируем на 5 минут

interface WpPost {
  title: { rendered: string };
  link: string;
  modified_gmt: string;
}

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: status === 200 ? { "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=600` } : {},
  });

export async function GET(request: NextRequest) {
  const number = (request.nextUrl.searchParams.get("number") ?? "").trim().toUpperCase();
  if (!/^[A-Z0-9-]{4,20}$/.test(number)) {
    return json({ error: "invalid" }, 400);
  }

  try {
    // 1. Ищем запись контейнера. Поиск WordPress находит и частичные совпадения,
    //    поэтому сверяем заголовок с номером точно.
    const searchUrl = `${WP_URL}/wp-json/wp/v2/posts?search=${encodeURIComponent(number)}&categories=${LOGISTICS_CATEGORY}&per_page=20&_fields=title,link,modified_gmt`;
    const searchResponse = await fetch(searchUrl, { next: { revalidate: CACHE_SECONDS } });
    if (!searchResponse.ok) throw new Error(`search ${searchResponse.status}`);
    const posts = (await searchResponse.json()) as WpPost[];
    const post = posts.find((item) => item.title.rendered.trim().toUpperCase() === number);
    if (!post) return json({ error: "not_found" }, 404);

    // 2. Точка и текст есть только в HTML записи (их выводит тема сайта
    //    в переменные selectedPoint и pointText) — достаём их оттуда.
    const pageResponse = await fetch(post.link, { next: { revalidate: CACHE_SECONDS } });
    if (!pageResponse.ok) throw new Error(`page ${pageResponse.status}`);
    const html = await pageResponse.text();

    const point = Number(html.match(/var selectedPoint\s*=\s*"(\d+)"/)?.[1]);
    const rawText = html.match(/var pointText\s*=\s*("(?:[^"\\\n]|\\.)*")/)?.[1];
    if (!ROUTE.some((stop) => stop.id === point) || !rawText) throw new Error("unexpected page format");

    const result: TrackResult = {
      number,
      point,
      text: (JSON.parse(rawText) as string).replace(/\s+([.,])/g, "$1").trim(),
      updatedAt: `${post.modified_gmt}Z`,
    };
    return json(result);
  } catch (error) {
    console.error("[track]", number, error);
    return json({ error: "upstream" }, 502);
  }
}
