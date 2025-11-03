import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Agrega aquí otros dominios si subes tus propias imágenes
      // Por ejemplo, si usas Instagram o Cloudinary:
      // {
      //   protocol: 'https',
      //   hostname: 'scontent.cdninstagram.com',
      // },
    ],
  },
};

export default nextConfig;
