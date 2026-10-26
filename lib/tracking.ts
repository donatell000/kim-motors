// Отслеживание контейнеров. Данные ведут менеджеры в старом WordPress
// (kimmotors.kg, рубрика «Логистика»): у каждого контейнера своя запись,
// где выбрана точка маршрута (1–7) и написан текст статуса.

/** Точки маршрута. Номер совпадает с `selectedPoint` в WordPress. */
export const ROUTE = [
  { id: 1, name: "Инчхон", country: "Корея", lat: 37.4583, lng: 126.7052 },
  { id: 2, name: "Чжунчао", country: "Китай", lat: 39.257, lng: 118.5447 },
  { id: 3, name: "Вэйхай", country: "Китай", lat: 37.5131, lng: 122.1204 },
  { id: 4, name: "Ланьчжоу", country: "Китай", lat: 36.0611, lng: 103.8343 },
  { id: 5, name: "Урумчи", country: "Китай", lat: 43.8256, lng: 87.6168 },
  { id: 6, name: "Кашгар", country: "Китай", lat: 39.4704, lng: 75.9898 },
  { id: 7, name: "Бишкек", country: "Кыргызстан", lat: 42.8746, lng: 74.5698 },
] as const;

export type RoutePoint = (typeof ROUTE)[number];

/** Ответ /api/track. */
export interface TrackResult {
  number: string;
  /** Номер точки маршрута (1–7). */
  point: number;
  /** Текст статуса от менеджера. */
  text: string;
  /** Когда запись последний раз обновляли (ISO). */
  updatedAt: string;
}
