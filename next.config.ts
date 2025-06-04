import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.youtube.com",
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
            },
        ],
    },
    /* config options here */
};

export default nextConfig;
