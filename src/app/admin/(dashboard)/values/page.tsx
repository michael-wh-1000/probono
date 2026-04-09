"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconPlus, IconTrash, IconEdit, IconDeviceFloppy } from "@tabler/icons-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { SupabaseNotConfigured } from "@/components/supabase-not-configured"
import { Card, CardContent } from "@/components/ui/card"
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
import type { CoreValue } from "@/lib/supabase/types"

type ValueForm = Omit<CoreValue, "id" | "created_at" | "updated_at">
const EMPTY_FORM: ValueForm = { title: "", description: "", icon: null, order: 0, is_active: true }
const VALUE_ICONS = ["🎯", "🔍", "🤝", "💡", "🌍", "❤️", "⚡", "🌟", "🏆", "🔑"]

export default function ValuesPage() {
  const { supabase, configured } = useSupabase()
  const [values, setValues] = useState<CoreValue[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<CoreValue | null>(null)
  const [form, setForm] = useState<ValueForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchValues = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from("core_values").select("*").order("order")
    setValues(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchValues() }, [supabase])

  const openCreate = () => { setEditItem(null); setForm({ ...EMPTY_FORM, order: values.length + 1 }); setDialogOpen(true) }
  const openEdit = (v: CoreValue) => {
    setEditItem(v)
    setForm({ title: v.title, description: v.description, icon: v.icon, order: v.order, is_active: v.is_active })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!supabase) return
    if (!form.title.trim()) { toast.error("Title is required"); return }
    setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = editItem
      ? await supabase.from("core_values").update(payload).eq("id", editItem.id)
      : await supabase.from("core_values").insert(payload)
    if (error) toast.error(error.message)
    else { toast.success(editItem ? "Value updated!" : "Value added!"); setDialogOpen(false); fetchValues() }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!supabase || !deleteId) return
    const { error } = await supabase.from("core_values").delete().eq("id", deleteId)
    if (error) toast.error(error.message)
    else { toast.success("Value deleted"); fetchValues() }
    setDeleteId(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="Core Values"
        breadcrumb="Core Values"
        action={configured ? (
          <Button onClick={openCreate} className="bg-[#d67653] hover:bg-[#c06540]">
            <IconPlus className="size-4 mr-2" /> Add Value
          </Button>
        ) : undefined}
      />

      {!configured ? <SupabaseNotConfigured /> : (
        <main className="flex-1 p-4 lg:p-6 space-y-4">
          <p className="text-sm text-muted-foreground">These are displayed in the "Our Values" section of the website.</p>
          {loading ? <div className="text-muted-foreground">Loading…</div> : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
              {values.map((value) => (
                <Card key={value.id} className={`group ${!value.is_active ? "opacity-60" : ""}`}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#d67653]/10 text-xl shrink-0">
                      {value.icon ?? "✨"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{value.title}</p>
                        <Badge variant={value.is_active ? "outline" : "secondary"} className="text-xs">
                          {value.is_active ? "Visible" : "Hidden"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{value.description}</p>
                      <div className="flex gap-1 mt-3">
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => openEdit(value)}>
                          <IconEdit className="size-3 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:text-destructive" onClick={() => setDeleteId(value.id)}>
                          <IconTrash className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {values.length === 0 && (
                <div className="col-span-full text-center py-16 text-muted-foreground">No values yet.</div>
              )}
            </div>
          )}
        </main>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editItem ? "Edit Value" : "Add Core Value"}</DialogTitle><DialogDescription>Define a value that guides Pro Bono's work.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Icon (Emoji)</Label>
              <div className="flex gap-2 flex-wrap">
                {VALUE_ICONS.map((emoji) => (
                  <button key={emoji} onClick={() => setForm({ ...form, icon: emoji })}
                    className={`text-xl p-1.5 rounded-lg border transition-colors ${form.icon === emoji ? "border-[#d67653] bg-[#d67653]/10" : "border-border hover:border-[#d67653]"}`}>
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Results Driven" /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Brief description of this value…" /></div>
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
              <IconDeviceFloppy className="size-4 mr-2" />{saving ? "Saving…" : "Save Value"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Value?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
