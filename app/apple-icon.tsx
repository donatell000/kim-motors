import { ImageResponse } from "next/og";
import { iconDataUrl } from "@/lib/icon";

// Иконка для iPhone/iPad (закладки, «На экран Домой»). iOS скругляет углы сама.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<img src={iconDataUrl(false)} width={180} height={180} alt="" />, size);
}
