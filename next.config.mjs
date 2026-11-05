/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirige las URLs antiguas de Canva a las nuevas, por si alguien las tiene guardadas.
  async redirects() {
    return [
      { source: '/orculos', destination: '/suenos', permanent: true },
      { source: '/orculos-2', destination: '/tarot', permanent: true },
      { source: '/orculos-3', destination: '/astrologia', permanent: true },
      { source: '/page-2', destination: '/oraculos', permanent: true },
      { source: '/page-6', destination: '/aprende', permanent: true },
      { source: '/page-7', destination: '/cursos', permanent: true },
    ];
  },
};

export default nextConfig;
