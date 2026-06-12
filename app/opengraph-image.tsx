import { ImageResponse } from "next/og";
import { SocialPreviewImage } from "./components/SocialPreviewImage";

export const alt = "Nicholas Fortune - Full Stack, Frontend, and Backend Engineer";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  return new ImageResponse(<SocialPreviewImage />, size);
}
