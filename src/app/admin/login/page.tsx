"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IconEye, IconEyeOff, IconLock, IconMail, IconAlertCircle } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSupabase } from "@/hooks/use-supabase"

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? "/admin/hero"

  const { supabase, configured } = useSupabase()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)

  // Redirect if already authenticated
  useEffect(() => {
    if (!supabase) { setCheckingSession(false); return }
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace(redirectTo)
      else setCheckingSession(false)
    })
  }, [supabase, redirectTo, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return

    setError(null)
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Incorrect email or password. Please try again."
          : authError.message
      )
      setLoading(false)
    } else {
      router.replace(redirectTo)
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 rounded-lg bg-[#d67653] flex items-center justify-center text-white font-bold text-sm">PB</div>
          <p className="text-sm text-muted-foreground animate-pulse">Checking session…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Subtle top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#d67653] via-[#ff9261] to-[#d67653]" />

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-sm">

          {/* Logo & title */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#d67653] text-white font-bold text-xl shadow-lg shadow-[#d67653]/20 mb-4">
              PB
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">itsprobono.org</p>
          </div>

          {/* Not-configured notice */}
          {!configured && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20 p-3.5 text-sm">
              <IconAlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-amber-700 dark:text-amber-300">
                <p className="font-medium">Supabase not configured</p>
                <p className="text-xs mt-0.5">Add your credentials to <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">.env.local</code> to enable login.</p>
              </div>
            </div>
          )}

          {/* Login card */}
          <div className="rounded-2xl border bg-card shadow-sm p-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                <div className="relative">
                  <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@itsprobono.org"
                    required
                    disabled={loading || !configured}
                    className="pl-9"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    disabled={loading || !configured}
                    className="pl-9 pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword
                      ? <IconEyeOff className="size-4" />
                      : <IconEye className="size-4" />
                    }
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2.5 rounded-lg bg-destructive/10 border border-destructive/20 px-3.5 py-2.5 text-sm text-destructive">
                  <IconAlertCircle className="size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#d67653] hover:bg-[#c06540] text-white font-semibold h-10 shadow-sm shadow-[#d67653]/30 transition-all"
                disabled={loading || !configured}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : "Sign in"}
              </Button>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-5">
            Access restricted to authorised administrators only.
          </p>
        </div>
      </div>
    </div>
  )
}
