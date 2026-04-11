"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  IconPhone, IconMail, IconMapPin,
  IconBrandInstagram, IconBrandLinkedin, IconBrandX, IconDeviceFloppy,
} from "@tabler/icons-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { SupabaseNotConfigured } from "@/components/supabase-not-configured"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useSupabase } from "@/hooks/use-supabase"
import type { ContactInfo } from "@/lib/supabase/types"

type ContactForm = Omit<ContactInfo, "id" | "updated_at">

const DEFAULT: ContactForm = {
  phone: "+256 761237293",
  email: "itsprobono256@gmail.com",
  address: null,
  instagram_url: "https://www.instagram.com/its_probono",
  linkedin_url: null,
  twitter_url: "https://x.com/its_probono",
}

export default function ContactPage() {
  const { supabase, configured } = useSupabase()
  const [form, setForm] = useState<ContactForm>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [contactId, setContactId] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase.from("contact_info").select("*").limit(1).single().then(({ data }) => {
      if (data) {
        setContactId(data.id)
        setForm({
          phone: data.phone, email: data.email, address: data.address,
          instagram_url: data.instagram_url, linkedin_url: data.linkedin_url, twitter_url: data.twitter_url,
        })
      }
      setLoading(false)
    })
  }, [supabase])

  const handleSave = async () => {
    if (!supabase) return
    setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = contactId
      ? await supabase.from("contact_info").update(payload).eq("id", contactId)
      : await supabase.from("contact_info").insert(payload)
    if (error) toast.error("Failed to save: " + error.message)
    else toast.success("Contact information saved!")
    setSaving(false)
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="Contact Info"
        breadcrumb="Contact Info"
        action={configured && !loading ? (
          <Button onClick={handleSave} disabled={saving} className="bg-[#d67653] hover:bg-[#c06540]">
            <IconDeviceFloppy className="size-4 mr-2" />{saving ? "Saving…" : "Save Changes"}
          </Button>
        ) : undefined}
      />

      {!configured ? <SupabaseNotConfigured /> : loading ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">Loading…</div>
      ) : (
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-2xl space-y-6">
            {/* Direct Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Direct Contact</CardTitle>
                <CardDescription>Phone number, email and address displayed on the contact page.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><IconPhone className="size-4 text-muted-foreground" /> Phone Number</Label>
                  <Input value={form.phone ?? ""} onChange={(e) => setForm({ ...form, phone: e.target.value || null })} placeholder="+256 761237293" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><IconMail className="size-4 text-muted-foreground" /> Email Address</Label>
                  <Input type="email" value={form.email ?? ""} onChange={(e) => setForm({ ...form, email: e.target.value || null })} placeholder="itsprobono256@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><IconMapPin className="size-4 text-muted-foreground" /> Physical Address</Label>
                  <Input value={form.address ?? ""} onChange={(e) => setForm({ ...form, address: e.target.value || null })} placeholder="Kampala, Uganda" />
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Links shown in the footer and contact page.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><IconBrandInstagram className="size-4 text-pink-500" /> Instagram</Label>
                  <Input value={form.instagram_url ?? ""} onChange={(e) => setForm({ ...form, instagram_url: e.target.value || null })} placeholder="https://www.instagram.com/its_probono" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><IconBrandLinkedin className="size-4 text-blue-600" /> LinkedIn</Label>
                  <Input value={form.linkedin_url ?? ""} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value || null })} placeholder="https://linkedin.com/company/…" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><IconBrandX className="size-4" /> X (Twitter)</Label>
                  <Input value={form.twitter_url ?? ""} onChange={(e) => setForm({ ...form, twitter_url: e.target.value || null })} placeholder="https://x.com/its_probono" />
                </div>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>How your contact details will appear on the website.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 p-4 rounded-lg bg-muted/30">
                  {form.phone && <div className="flex items-center gap-3 text-sm"><IconPhone className="size-4 text-[#d67653]" /><span>{form.phone}</span></div>}
                  {form.email && <div className="flex items-center gap-3 text-sm"><IconMail className="size-4 text-[#d67653]" /><span>{form.email}</span></div>}
                  {form.address && <div className="flex items-center gap-3 text-sm"><IconMapPin className="size-4 text-[#d67653]" /><span>{form.address}</span></div>}
                  <Separator className="my-2" />
                  <div className="flex gap-4">
                    {form.instagram_url && <a href={form.instagram_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#d67653]"><IconBrandInstagram className="size-5" /></a>}
                    {form.linkedin_url && <a href={form.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#d67653]"><IconBrandLinkedin className="size-5" /></a>}
                    {form.twitter_url && <a href={form.twitter_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#d67653]"><IconBrandX className="size-5" /></a>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}
    </div>
  )
}
