function resolveApiBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // On Vercel, proxy /api to the Render backend via API_PROXY_TARGET in next.config.ts
  if (process.env.VERCEL) {
    return "/api";
  }

  return "http://localhost:4000/api";
}

export const env = {
  apiBaseUrl: resolveApiBaseUrl(),
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "BobaPos"
};
