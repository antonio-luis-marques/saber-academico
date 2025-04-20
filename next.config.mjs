/** @type {import('next').NextConfig} */
// import withPlaiceholder from '@plaiceholder/next';

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Adicione os domínios permitidos aqui
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora erros do ESLint no build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignora erros do TypeScript no build
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
  swcMinify: false,
};

// Envolvendo o nextConfig com withPlaiceholder
// export default withPlaiceholder(nextConfig);
export default nextConfig;