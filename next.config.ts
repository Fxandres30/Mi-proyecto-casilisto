import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 🔥 Desactiva la optimización de imágenes en modo estático
  },
};

export default nextConfig;
