import { useServerApi } from "@/Hooks/useServerApi";

// =======================================================
//  CSR (Client Side Rendering)
// =======================================================

// All CSR here.....

// =======================================================
//  SSR (Server Side Rendering)
// =======================================================

// Hero Data
export async function getHeroData() {
  return useServerApi("/api/cms/home-banner", 3600);
}
