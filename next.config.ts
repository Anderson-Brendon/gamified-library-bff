import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/400x600/**',
     }
    ] 
  },
};

export default nextConfig;
//[new URL('https://placehold.co/400x600**?text=**')]