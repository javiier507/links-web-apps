/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["@libsql/client", "libsql"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
        ],
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push(({ request }, callback) => {
                if (/^@libsql\/|^libsql$/.test(request)) {
                    return callback(null, `commonjs ${request}`);
                }
                callback();
            });
        }
        return config;
    },
};

export default nextConfig;
