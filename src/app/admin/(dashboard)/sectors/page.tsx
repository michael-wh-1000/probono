"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  IconPlus, IconTrash, IconEdit, IconDeviceFloppy,
} from "@tabler/icons-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { SupabaseNotConfigured } from "@/components/supabase-not-configured"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import type { Sector } from "@/lib/supabase/types"

type SectorForm = Omit<Sector, "id" | "created_at" | "updated_at">

const EMPTY_FORM: SectorForm = {
  name: "", slug: "", description: "", icon_url: null,
  image_url: null, color: "#d67653", order: 0, is_active: true,
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

export default function SectorsPage() {
  const { supabase, configured } = useSupabase()
  const [sectors, setSectors] = useState<Sector[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<Sector | null>(null)
  const [form, setForm] = useState<SectorForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchSectors = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from("sectors").select("*").order("order")
    setSectors(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchSectors() }, [supabase])

  const openCreate = () => { setEditItem(null); setForm(EMPTY_FORM); setDialogOpen(true) }
  const openEdit = (sector: Sector) => {
    setEditItem(sector)
    setForm({
      name: sector.name, slug: sector.slug, description: sector.description,
      icon_url: sector.icon_url, image_url: sector.image_url,
      color: sector.color, order: sector.order, is_active: sector.is_active,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!supabase) return
    if (!form.name.trim() || !form.slug.trim()) { toast.error("Name and slug are required"); return }
    setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = editItem
      ? await supabase.from("sectors").update(payload).eq("id", editItem.id)
      : await supabase.from("sectors").insert(payload)
    if (error) toast.error(error.message)
    else { toast.success(editItem ? "Sector updated!" : "Sector created!"); setDialogOpen(false); fetchSectors() }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!supabase || !deleteId) return
    const { error } = await supabase.from("sectors").delete().eq("id", deleteId)
    if (error) toast.error(error.message)
    else { toast.success("Sector deleted"); fetchSectors() }
    setDeleteId(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="Sectors"
        breadcrumb="Sectors"
        action={
          configured ? (
            <Button onClick={openCreate} className="bg-[#d67653] hover:bg-[#c06540]">
              <IconPlus className="size-4 mr-2" /> Add Sector
            </Button>
          ) : undefined
        }
      />

      {!configured ? <SupabaseNotConfigured /> : (
        <main className="flex-1 p-4 lg:p-6">
          {loading ? (
            <div className="text-muted-foreground">Loading…</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {sectors.map((sector) => (
                <Card key={sector.id} className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: sector.color ?? "#d67653" }} />
                  <CardHeader className="pt-5">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{sector.name}</CardTitle>
                      <Badge variant={sector.is_active ? "default" : "secondary"} className="text-xs shrink-0">
                        {sector.is_active ? "Active" : "Hidden"}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs font-mono">/{sector.slug}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">{sector.description}</p>
                    {sector.image_url && (
                      <img src={sector.image_url} alt={sector.name} className="w-full h-32 object-cover rounded-md" />
                    )}
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => openEdit(sector)}>
                        <IconEdit className="size-3 mr-1" /> Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setDeleteId(sector.id)}>
                        <IconTrash className="size-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {sectors.length === 0 && (
                <div className="col-span-full text-center py-16 text-muted-foreground">
                  No sectors found. <button onClick={openCreate} className="underline">Add one</button>.
                </div>
              )}
            </div>
          )}
        </main>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Sector" : "Add Sector"}</DialogTitle>
            <DialogDescription>Fill in the sector details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: toSlug(e.target.value) })} placeholder="Pro Bono Femmes" />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="femmes" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Brief description…" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageUpload
                value={form.image_url}
                onChange={(url) => setForm({ ...form, image_url: url })}
                bucket="sectors"
                label="Sector Image"
                aspect="video"
              />
              <div className="space-y-2">
                <Label>Accent Colour</Label>
                <div className="flex gap-2">
                  <input type="color" value={form.color ?? "#d67653"} onChange={(e) => setForm({ ...form, color: e.target.value })} className="h-9 w-12 rounded border cursor-pointer" />
                  <Input value={form.color ?? ""} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="#d67653" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex gap-2 mt-1">
                  {(["Active", "Hidden"] as const).map((s) => (
                    <Button key={s} size="sm" variant={(s === "Active" && form.is_active) || (s === "Hidden" && !form.is_active) ? "default" : "outline"} onClick={() => setForm({ ...form, is_active: s === "Active" })}>{s}</Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-[#d67653] hover:bg-[#c06540]">
              <IconDeviceFloppy className="size-4 mr-2" />{saving ? "Saving…" : "Save Sector"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Sector?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
