import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client instance
 * Lazy initialization with environment variables
 */

let supabaseInstance = null;

/**
 * Get or create Supabase client
 * Returns null if environment variables are not configured
 */
export function getSupabaseClient() {
  // Check if environment variables are set
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.warn("Supabase environment variables not configured");
    return null;
  }

  // Create instance if it doesn't exist
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
  }

  return supabaseInstance;
}

/**
 * Export Supabase client for browser use only
 * Returns null during server-side rendering
 */
export const supabase =
  typeof window !== "undefined" ? getSupabaseClient() : null;
