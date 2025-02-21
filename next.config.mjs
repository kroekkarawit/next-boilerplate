/** @type {import('next').NextConfig} */
import { config } from "dotenv";

config({ path: ".env.local" });

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
