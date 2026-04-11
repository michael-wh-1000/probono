"use client"

import { useMemo } from "react"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client"

export function useSupabase() {
  const configured = isSupabaseConfigured()

  const client = useMemo(() => {
    if (!configured) return null
    try {
      return createClient()
    } catch {
      return null
    }
  }, [configured])

  return { supabase: client, configured }
}
