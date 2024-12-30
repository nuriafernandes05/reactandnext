import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};


// next.config.js
module.exports = {
  images: {
    domains: ['upload.wikimedia.org', 'deisishop.pythonanywhere.com'], // Adicione o domínio do seu servidor de imagens
  },
};

export default nextConfig;
