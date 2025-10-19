interface FetchOptions {
  endpoint: string;
  mode: "SSG" | "ISR" | "SSR";
  revalidate?: number;
}

export async function useServerApi({
  endpoint,
  mode = "SSG",
  revalidate = 3600,
}: FetchOptions) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${endpoint}`;

  const fetchOptions: RequestInit & { next?: { revalidate?: number } } =
    mode === "SSR"
      ? { cache: "no-store" }
      : mode === "ISR"
      ? { cache: "force-cache", next: { revalidate } }
      : { cache: "force-cache" };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);

  return res.json();
}
