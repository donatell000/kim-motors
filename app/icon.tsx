import { ImageResponse } from "next/og";
import { iconDataUrl } from "@/lib/icon";

// Фавиконка и иконки для манифеста: Next соберёт PNG нужных размеров при сборке.
const SIZES = [32, 192, 512];

export function generateImageMetadata() {
  return SIZES.map((size) => ({ id: String(size), size: { width: size, height: size }, contentType: "image/png" }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const size = Number(await id);
  return new ImageResponse(<img src={iconDataUrl(size < 100)} width={size} height={size} alt="" />, { width: size, height: size });
}
