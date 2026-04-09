"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconStar, IconDeviceFloppy } from "@tabler/icons-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { SupabaseNotConfigured } from "@/components/supabase-not-configured"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSupabase } from "@/hooks/use-supabase"
import { ImageUpload } from "@/components/image-upload"
import type { HeroContent } from "@/lib/supabase/types"

type HeroForm = Omit<HeroContent, "id" | "updated_at">

const DEFAULT: HeroForm = {
  title: "Empowering Communities Inspiring Change",
  subtitle: "Join us in empowering communities and transforming lives",
  cta_text: "Learn More",
  cta_url: "/about",
  image_url: null,
  is_active: true,
}

export default function HeroPage() {
  const { supabase, configured } = useSupabase()
  const [form, setForm] = useState<HeroForm>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heroId, setHeroId] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase
      .from("hero_content")
      .select("*")
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) {
          setHeroId(data.id)
          setForm({
            title: data.title,
            subtitle: data.subtitle,
            cta_text: data.cta_text,
            cta_url: data.cta_url,
            image_url: data.image_url,
            is_active: data.is_active,
          })
        }
        setLoading(false)
      })
  }, [supabase])

  const handleSave = async () => {
    if (!supabase) return
    setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = heroId
      ? await supabase.from("hero_content").update(payload).eq("id", heroId)
      : await supabase.from("hero_content").insert(payload)

    if (error) toast.error("Failed to save: " + error.message)
    else toast.success("Hero section saved successfully!")
    setSaving(false)
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="Hero Section"
        breadcrumb="Hero Section"
        action={
          configured ? (
            <Button onClick={handleSave} disabled={saving || loading} className="bg-[#d67653] hover:bg-[#c06540]">
              <IconDeviceFloppy className="size-4 mr-2" />
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          ) : undefined
        }
      />

      {!configured ? (
        <SupabaseNotConfigured />
      ) : loading ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">Loading…</div>
      ) : (
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-2xl space-y-6">
            {/* Info */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <IconStar className="size-5 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This section controls the main banner at the top of the homepage.
              </p>
            </div>

            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Banner Content</CardTitle>
                <CardDescription>Edit the headline, subtitle and call-to-action button.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Headline Title</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Empowering Communities Inspiring Change"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle / Tagline</Label>
                  <Textarea
                    id="subtitle"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    rows={3}
                    placeholder="Join us in empowering communities and transforming lives"
                  />
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card>
              <CardHeader>
                <CardTitle>Call-to-Action Button</CardTitle>
                <CardDescription>The button shown below the hero tagline.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cta_text">Button Label</Label>
                  <Input
                    id="cta_text"
                    value={form.cta_text}
                    onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
                    placeholder="Learn More"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta_url">Button URL</Label>
                  <Input
                    id="cta_url"
                    value={form.cta_url ?? ""}
                    onChange={(e) => setForm({ ...form, cta_url: e.target.value })}
                    placeholder="/about"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Background Image */}
            <Card>
              <CardHeader>
                <CardTitle>Background Image</CardTitle>
                <CardDescription>Upload the hero background image (max 5 MB).</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  bucket="hero"
                  aspect="banner"
                />
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>How the hero will appear on the website.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div
                  className="relative flex flex-col items-center justify-center text-center p-10 min-h-40 rounded-b-lg"
                  style={{
                    background: form.image_url
                      ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${form.image_url}) center/cover`
                      : "linear-gradient(135deg, #d67653 0%, #ff9261 100%)",
                  }}
                >
                  <h2 className="text-xl font-bold text-white mb-2">{form.title || "Your Title Here"}</h2>
                  <p className="text-white/80 text-sm mb-4">{form.subtitle || "Your subtitle here"}</p>
                  <span className="inline-block bg-white text-[#d67653] font-semibold text-sm px-4 py-2 rounded-full">
                    {form.cta_text || "Button Label"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}
    </div>
  )
}
