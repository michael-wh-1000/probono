"use server"

import { redirect } from "next/navigation"

export async function signOut() {
  try {
    const { createClient } = await import("@/lib/supabase/server")
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch {
    // Supabase not configured — just redirect
  }
  redirect("/admin/login")
}
