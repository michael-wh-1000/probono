"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconPlus, IconTrash, IconEdit, IconDeviceFloppy, IconExternalLink } from "@tabler/icons-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { SupabaseNotConfigured } from "@/components/supabase-not-configured"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useSupabase } from "@/hooks/use-supabase"
import { ImageUpload } from "@/components/image-upload"
import type { Partner } from "@/lib/supabase/types"

type PartnerForm = Omit<Partner, "id" | "created_at" | "updated_at">
const EMPTY_FORM: PartnerForm = { name: "", logo_url: null, website_url: null, order: 0, is_active: true }

export default function PartnersPage() {
  const { supabase, configured } = useSupabase()
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<Partner | null>(null)
  const [form, setForm] = useState<PartnerForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchPartners = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from("partners").select("*").order("order")
    setPartners(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchPartners() }, [supabase])

  const openCreate = () => { setEditItem(null); setForm({ ...EMPTY_FORM, order: partners.length + 1 }); setDialogOpen(true) }
  const openEdit = (p: Partner) => {
    setEditItem(p)
    setForm({ name: p.name, logo_url: p.logo_url, website_url: p.website_url, order: p.order, is_active: p.is_active })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!supabase) return
    if (!form.name.trim()) { toast.error("Partner name is required"); return }
    setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = editItem
      ? await supabase.from("partners").update(payload).eq("id", editItem.id)
      : await supabase.from("partners").insert(payload)
    if (error) toast.error(error.message)
    else { toast.success(editItem ? "Partner updated!" : "Partner added!"); setDialogOpen(false); fetchPartners() }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!supabase || !deleteId) return
    const { error } = await supabase.from("partners").delete().eq("id", deleteId)
    if (error) toast.error(error.message)
    else { toast.success("Partner removed"); fetchPartners() }
    setDeleteId(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="Partners"
        breadcrumb="Partners"
        action={configured ? (
          <Button onClick={openCreate} className="bg-[#d67653] hover:bg-[#c06540]">
            <IconPlus className="size-4 mr-2" /> Add Partner
          </Button>
        ) : undefined}
      />

      {!configured ? <SupabaseNotConfigured /> : (
        <main className="flex-1 p-4 lg:p-6 space-y-4">
          <p className="text-sm text-muted-foreground">Partner logos displayed in the marquee section on the homepage.</p>
          {loading ? <div className="text-muted-foreground">Loading…</div> : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {partners.map((partner) => (
                <Card key={partner.id} className={`group ${!partner.is_active ? "opacity-50" : ""}`}>
                  <CardContent className="p-4 flex flex-col items-center gap-3 text-center">
                    {partner.logo_url ? (
                      <img src={partner.logo_url} alt={partner.name} className="h-12 w-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/120x48?text=" + encodeURIComponent(partner.name) }} />
                    ) : (
                      <div className="h-12 w-full flex items-center justify-center bg-muted rounded-lg text-sm font-semibold text-muted-foreground">
                        {partner.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{partner.name}</p>
                      <Badge variant={partner.is_active ? "outline" : "secondary"} className="text-xs mt-1">
                        {partner.is_active ? "Active" : "Hidden"}
                      </Badge>
                    </div>
                    <div className="flex gap-1 w-full">
                      <Button size="sm" variant="outline" className="flex-1 h-7 text-xs" onClick={() => openEdit(partner)}>
                        <IconEdit className="size-3 mr-1" /> Edit
                      </Button>
                      {partner.website_url && (
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" asChild>
                          <a href={partner.website_url} target="_blank" rel="noopener noreferrer"><IconExternalLink className="size-3" /></a>
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:text-destructive" onClick={() => setDeleteId(partner.id)}>
                        <IconTrash className="size-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {partners.length === 0 && (
                <div className="col-span-full text-center py-16 text-muted-foreground">
                  No partners yet. <button onClick={openCreate} className="underline">Add one</button>.
                </div>
              )}
            </div>
          )}
        </main>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editItem ? "Edit Partner" : "Add Partner"}</DialogTitle><DialogDescription>Enter partner details below.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label>Partner Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Organisation name" /></div>
            <ImageUpload
              value={form.logo_url}
              onChange={(url) => setForm({ ...form, logo_url: url })}
              bucket="partners"
              label="Logo"
              aspect="logo"
            />
            <div className="space-y-2"><Label>Website URL</Label><Input value={form.website_url ?? ""} onChange={(e) => setForm({ ...form, website_url: e.target.value || null })} placeholder="https://partner.org" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} /></div>
              <div className="space-y-2">
                <Label>Visibility</Label>
                <div className="flex gap-2 mt-1">
                  {["Active", "Hidden"].map((s) => (
                    <Button key={s} size="sm" variant={(s === "Active" && form.is_active) || (s === "Hidden" && !form.is_active) ? "default" : "outline"} onClick={() => setForm({ ...form, is_active: s === "Active" })}>{s}</Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-[#d67653] hover:bg-[#c06540]">
              <IconDeviceFloppy className="size-4 mr-2" />{saving ? "Saving…" : "Save Partner"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Remove Partner?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
