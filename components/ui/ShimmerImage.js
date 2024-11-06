import Image from "next/image";

const shimmer = (w = 100, h = 100) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const ShimmerImage = ({ src, alt, isHovered }) => {
  return (
    <Image
      alt={alt}
      src={src}
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer())}`}
      fill
      style={{
        filter: isHovered ? "brightness(1)" : "brightness(0.9)",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        objectFit: "cover",
        objectPosition: "top",
        transition: "transform 0.5s ease-in-out, filter 0.5s ease-in-out",
      }}
    />
  );
};

export default ShimmerImage;
