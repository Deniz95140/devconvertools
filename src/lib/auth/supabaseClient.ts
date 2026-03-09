import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

export function isValidSupabaseConfig(url: string | undefined, anonKey: string | undefined): boolean {
  if (!url || !anonKey) {
    return false;
  }

  const normalizedUrl = url.trim();
  const normalizedAnonKey = anonKey.trim();

  const hasPlaceholder =
    normalizedUrl.includes("YOUR_PROJECT_REF") ||
    normalizedAnonKey.includes("YOUR_SUPABASE_ANON_KEY") ||
    normalizedAnonKey.includes("your_supabase_anon_key");

  if (hasPlaceholder) {
    return false;
  }

  const isHttpUrl = normalizedUrl.startsWith("https://") || normalizedUrl.startsWith("http://");

  return isHttpUrl && normalizedAnonKey.length > 20;
}

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (typeof window === "undefined") {
    return null;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!isValidSupabaseConfig(url, anonKey)) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(url!.trim(), anonKey!.trim(), {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }

  return supabaseClient;
}

