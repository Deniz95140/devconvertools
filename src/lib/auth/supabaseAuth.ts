import type { User } from "@supabase/supabase-js";

import { getSupabaseBrowserClient, isValidSupabaseConfig } from "@/lib/auth/supabaseClient";

export type AccountUser = {
  email: string;
  username: string;
  createdAt: string;
};

function toAccountUser(user: User): AccountUser {
  const metadata = (user.user_metadata ?? {}) as { username?: string; pseudo?: string };

  return {
    email: user.email ?? "",
    username: metadata.username ?? metadata.pseudo ?? "",
    createdAt: user.created_at
  };
}

export function hasSupabaseConfig(): boolean {
  return isValidSupabaseConfig(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getCurrentUser(): Promise<AccountUser | null> {
  const client = getSupabaseBrowserClient();
  if (!client) {
    return null;
  }

  const { data, error } = await client.auth.getUser();
  if (error || !data.user) {
    return null;
  }

  return toAccountUser(data.user);
}

export async function signUpWithPassword(email: string, username: string, password: string): Promise<string> {
  const client = getSupabaseBrowserClient();
  if (!client) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const { error, data } = await client.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        username: username.trim(),
        pseudo: username.trim()
      }
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.session) {
    return "Account created. Check your email to confirm your account.";
  }

  return "Account created successfully.";
}

export async function signInWithPassword(email: string, password: string): Promise<void> {
  const client = getSupabaseBrowserClient();
  if (!client) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const { error } = await client.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signOutCurrentUser(): Promise<void> {
  const client = getSupabaseBrowserClient();
  if (!client) {
    return;
  }

  const { error } = await client.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function requestPasswordReset(email: string, locale: string): Promise<void> {
  const client = getSupabaseBrowserClient();
  if (!client) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const redirectTo = `${window.location.origin}/${locale}/account`;

  const { error } = await client.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo
  });

  if (error) {
    throw new Error(error.message);
  }
}
