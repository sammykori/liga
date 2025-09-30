import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        urlImports: ["https://jkpwiprizwwfzqaavnbh.supabase.co/**"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "jkpwiprizwwfzqaavnbh.supabase.co",
                pathname: "/storage/v1/object/**", // allow all objects in storage
            },
        ],
    },
};

export default nextConfig;
