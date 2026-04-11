import { createBrowserClient } from "@supabase/ssr"
import { type Database } from "./types"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || supabaseUrl === "your_supabase_project_url" ||
      !supabaseKey || supabaseKey === "your_supabase_anon_key") {
    throw new Error("SUPABASE_NOT_CONFIGURED")
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(
    url && url !== "your_supabase_project_url" &&
    key && key !== "your_supabase_anon_key"
  )
}
