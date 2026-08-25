import type { NextConfig } from "next";
import os from "os";

// This is a mobile-first app usually tested by opening the dev server's LAN
// IP on a phone — Next 16 blocks cross-origin dev-resource requests (HMR,
// Server Actions) by default unless the origin is explicitly allowlisted,
// which otherwise breaks things like the onboarding access-code redeem when
// testing that way. Auto-detect the machine's LAN IPs instead of hardcoding
// one, since it differs per developer.
function localNetworkOrigins(): string[] {
  const nets = os.networkInterfaces();
  const origins: string[] = [];
  for (const iface of Object.values(nets)) {
    for (const net of iface ?? []) {
      if (net.family === "IPv4" && !net.internal) {
        origins.push(net.address);
      }
    }
  }
  return origins;
}

const nextConfig: NextConfig = {
  allowedDevOrigins: localNetworkOrigins(),
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
