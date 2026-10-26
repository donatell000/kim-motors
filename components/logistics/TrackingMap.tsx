"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { ROUTE } from "@/lib/tracking";
import styles from "./Logistics.module.css";

const RED = "#f32e23";
const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;

/**
 * Карта маршрута: пройденная часть — красная линия, оставшаяся — серый пунктир,
 * текущее положение контейнера — пульсирующая точка с подписью.
 * Leaflet грузится только здесь, а сам компонент — только после поиска.
 */
export default function TrackingMap({ point }: { point: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;
      const coords = ROUTE.map(({ lat, lng }) => L.latLng(lat, lng));
      const index = ROUTE.findIndex((stop) => stop.id === point);
      const current = ROUTE[index];

      map = L.map(containerRef.current, {
        zoomControl: false,
        scrollWheelZoom: false, // колесо мыши прокручивает страницу, а не карту
        dragging: !L.Browser.mobile, // на телефоне свайп листает страницу
        attributionControl: true,
      });
      map.attributionControl.setPrefix(false);
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Подложка MapTiler (светлый стиль positron). Без ключа карта рисуется
      // без подложки — маршрут и точки всё равно видны.
      if (MAPTILER_KEY) {
        L.tileLayer(`https://api.maptiler.com/maps/positron/256/{z}/{x}/{y}{r}.png?key=${MAPTILER_KEY}`, {
          attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank" rel="noopener noreferrer">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">&copy; OpenStreetMap</a>',
          maxZoom: 12,
        }).addTo(map);

        // Бесплатный тариф MapTiler требует показывать их логотип на карте.
        const Logo = L.Control.extend({
          onAdd: () => {
            const link = L.DomUtil.create("a", styles.mapLogo);
            link.href = "https://www.maptiler.com";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.innerHTML = '<img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler" width="67" height="20">';
            return link;
          },
        });
        new Logo({ position: "bottomleft" }).addTo(map);
      }

      L.polyline(coords.slice(index), { color: "#9a9a9a", weight: 3, dashArray: "6 8" }).addTo(map);
      L.polyline(coords.slice(0, index + 1), { color: RED, weight: 4 }).addTo(map);

      ROUTE.forEach((stop, stopIndex) => {
        if (stopIndex === index) return;
        L.circleMarker(coords[stopIndex], {
          radius: 5,
          color: stopIndex < index ? RED : "#9a9a9a",
          weight: 2,
          fillColor: "#fff",
          fillOpacity: 1,
        })
          .bindTooltip(stop.name, { direction: "top", offset: [0, -4] })
          .addTo(map!);
      });

      L.marker(coords[index], {
        icon: L.divIcon({ className: styles.marker, html: "<span></span>", iconSize: [22, 22] }),
        keyboard: false,
      })
        .bindTooltip(current.name, { permanent: true, direction: "right", offset: [12, 0], className: styles.markerLabel })
        .addTo(map);

      map.fitBounds(L.latLngBounds(coords), { padding: [32, 32] });
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [point]);

  const current = ROUTE.find((stop) => stop.id === point);
  return (
    <div
      ref={containerRef}
      className={styles.map}
      role="region"
      aria-label={`Карта маршрута Инчхон — Бишкек. Контейнер сейчас: ${current?.name ?? ""}`}
    />
  );
}
