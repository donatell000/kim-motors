"use client";

import Image, { type ImageProps } from "next/image";

/**
 * `next/image`, который мягко проявляется после загрузки (стили — `.fade-image`
 * в globals.css). Пока фото грузится, видно фон под ним, а не пустую дыру.
 * Не используйте для фото первого экрана: оно должно показаться сразу.
 */
export default function FadeImage({ className, onLoad, alt, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      className={className ? `fade-image ${className}` : "fade-image"}
      onLoad={(event) => {
        event.currentTarget.dataset.loaded = "true";
        onLoad?.(event);
      }}
    />
  );
}
