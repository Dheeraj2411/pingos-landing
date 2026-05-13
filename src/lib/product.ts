const DEFAULT_PRODUCT_URL = "https://app.pingos.me";

export function getProductBaseUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_PRODUCT_URL || DEFAULT_PRODUCT_URL;

  if (!rawUrl || rawUrl === "#") {
    return DEFAULT_PRODUCT_URL;
  }

  return rawUrl.replace(/\/$/, "");
}

export function getProductUrl(path: string) {
  const baseUrl = getProductBaseUrl();

  if (!path) {
    return baseUrl;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}