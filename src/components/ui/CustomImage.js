"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * CustomImage Component
 *
 * This component wraps Next.js's Image component to provide a client-side
 * fallback mechanism using useState.
 *
 * Why:
 * - Next/Image does not automatically handle broken or missing image URLs.
 * - By using useState, we can dynamically switch to a placeholder image
 *   if the original image fails to load.
 * - Makes UI more resilient and avoids broken images in the layout.
 * - Keeps the component reusable: you can provide any fallback image,
 *   alt text, and additional Image props.
 *
 * Usage:
 * <CustomImage src={imageUrl} fallback="/images/placeholder.png" width={600} height={600} />
 */

export default function CustomImage({
  src,
  alt = "",
  fallback = "",
  className = "",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc || fallback}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      className={className}
    />
  );
}
