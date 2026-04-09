import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type Database } from "./types"

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || supabaseUrl === "your_supabase_project_url" ||
      !supabaseKey || supabaseKey === "your_supabase_anon_key") {
    throw new Error("SUPABASE_NOT_CONFIGURED")
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Called from a Server Component — safe to ignore,
          // middleware handles session refresh.
        }
      },
    },
  })
}
