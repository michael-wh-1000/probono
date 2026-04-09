"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconPlus, IconTrash, IconEdit, IconDeviceFloppy } from "@tabler/icons-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { SupabaseNotConfigured } from "@/components/supabase-not-configured"
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
import type { GalleryItem } from "@/lib/supabase/types"

type GalleryForm = Omit<GalleryItem, "id" | "created_at" | "updated_at" | "image_url"> & { image_url: string | null }
const EMPTY_FORM: GalleryForm = { title: null, description: null, image_url: null, category: null, order: 0, is_active: true }
const CATEGORIES = ["All", "Femmes", "Educators", "Health", "Environment", "Events", "Team"]

export default function GalleryPage() {
  const { supabase, configured } = useSupabase()
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<GalleryItem | null>(null)
  const [form, setForm] = useState<GalleryForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchItems = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from("gallery").select("*").order("order")
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [supabase])

  const filtered = activeCategory === "All" ? items : items.filter((i) => i.category === activeCategory)

  const openCreate = () => { setEditItem(null); setForm(EMPTY_FORM); setDialogOpen(true) }
  const openEdit = (item: GalleryItem) => {
    setEditItem(item)
    setForm({ title: item.title, description: item.description, image_url: item.image_url, category: item.category, order: item.order, is_active: item.is_active })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!supabase) return
    if (!form.image_url) { toast.error("Please upload an image first"); return }
    setSaving(true)
    // image_url is guaranteed non-null by the check above
    const payload = { ...form, image_url: form.image_url as string, updated_at: new Date().toISOString() }
    const { error } = editItem
      ? await supabase.from("gallery").update(payload).eq("id", editItem.id)
      : await supabase.from("gallery").insert(payload)
    if (error) toast.error(error.message)
    else { toast.success(editItem ? "Photo updated!" : "Photo added!"); setDialogOpen(false); fetchItems() }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!supabase || !deleteId) return
    const { error } = await supabase.from("gallery").delete().eq("id", deleteId)
    if (error) toast.error(error.message)
    else { toast.success("Photo deleted"); fetchItems() }
    setDeleteId(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="Gallery"
        breadcrumb="Gallery"
        action={configured ? (
          <Button onClick={openCreate} className="bg-[#d67653] hover:bg-[#c06540]">
            <IconPlus className="size-4 mr-2" /> Add Photo
          </Button>
        ) : undefined}
      />

      {!configured ? <SupabaseNotConfigured /> : (
        <main className="flex-1 p-4 lg:p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${activeCategory === cat ? "bg-[#d67653] text-white border-[#d67653]" : "border-border text-muted-foreground hover:border-[#d67653] hover:text-[#d67653]"}`}>
                {cat}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{filtered.length} photo{filtered.length !== 1 ? "s" : ""}</p>
          {loading ? <div className="text-muted-foreground">Loading…</div> : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((item) => (
                <div key={item.id} className="group relative rounded-lg overflow-hidden border aspect-square bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image_url ?? "https://placehold.co/300x300?text=No+Image"} alt={item.title ?? "Gallery image"} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/300x300?text=No+Image" }} />
                  {!item.is_active && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary" className="text-xs">Hidden</Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" className="size-8" onClick={() => openEdit(item)}><IconEdit className="size-4" /></Button>
                    <Button size="icon" variant="destructive" className="size-8" onClick={() => setDeleteId(item.id)}><IconTrash className="size-4" /></Button>
                  </div>
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1.5">
                      <p className="text-white text-xs truncate">{item.title}</p>
                    </div>
                  )}
                </div>
              ))}
              <button onClick={openCreate} className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-[#d67653] hover:text-[#d67653] transition-colors">
                <IconPlus className="size-6" /><span className="text-xs">Add Photo</span>
              </button>
              {filtered.length === 0 && items.length === 0 && (
                <div className="col-span-full text-center py-16 text-muted-foreground">No photos yet.</div>
              )}
            </div>
          )}
        </main>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Photo" : "Add Photo"}</DialogTitle>
            <DialogDescription>Enter the photo details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <ImageUpload
              value={form.image_url}
              onChange={(url) => setForm({ ...form, image_url: url })}
              bucket="gallery"
              label="Photo"
              aspect="video"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Title</Label><Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value || null })} placeholder="Photo title" /></div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={form.category ?? ""} onChange={(e) => setForm({ ...form, category: e.target.value || null })} placeholder="Femmes, Events…" list="gallery-categories" />
                <datalist id="gallery-categories">{CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c} />)}</datalist>
              </div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value || null })} rows={2} placeholder="Optional description…" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} /></div>
              <div className="space-y-2">
                <Label>Visibility</Label>
                <div className="flex gap-2 mt-1">
                  {["Visible", "Hidden"].map((s) => (
                    <Button key={s} size="sm" variant={(s === "Visible" && form.is_active) || (s === "Hidden" && !form.is_active) ? "default" : "outline"} onClick={() => setForm({ ...form, is_active: s === "Visible" })}>{s}</Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-[#d67653] hover:bg-[#c06540]">
              <IconDeviceFloppy className="size-4 mr-2" />{saving ? "Saving…" : "Save Photo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Photo?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
