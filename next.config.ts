import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Esto ignora los errores de ESLint en producción
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

