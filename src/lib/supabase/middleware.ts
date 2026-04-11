import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"
import { type Database } from "./types"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase isn't configured, allow through to let pages show setup guide
  if (!supabaseUrl || supabaseUrl === "your_supabase_project_url" ||
      !supabaseKey || supabaseKey === "your_supabase_anon_key") {
    return supabaseResponse
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // Refresh session — required for Server Components to pick up the latest auth state
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Redirect bare /admin to /admin/hero
  if (pathname === "/admin") {
    const heroUrl = request.nextUrl.clone()
    heroUrl.pathname = "/admin/hero"
    heroUrl.search = ""
    return NextResponse.redirect(heroUrl)
  }

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = "/admin/login"
      loginUrl.searchParams.set("redirectTo", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // If already logged in and visiting /admin/login, redirect to hero
  if (pathname === "/admin/login" && user) {
    const heroUrl = request.nextUrl.clone()
    heroUrl.pathname = "/admin/hero"
    heroUrl.search = ""
    return NextResponse.redirect(heroUrl)
  }

  return supabaseResponse
}
