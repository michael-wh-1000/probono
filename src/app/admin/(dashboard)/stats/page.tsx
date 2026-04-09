"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconPlus, IconTrash, IconEdit, IconDeviceFloppy } from "@tabler/icons-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { SupabaseNotConfigured } from "@/components/supabase-not-configured"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useSupabase } from "@/hooks/use-supabase"
import type { Stat } from "@/lib/supabase/types"

type StatForm = Omit<Stat, "id" | "updated_at">
const EMPTY_FORM: StatForm = { label: "", value: "", description: null, icon: null, order: 0 }

export default function StatsPage() {
  const { supabase, configured } = useSupabase()
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<Stat | null>(null)
  const [form, setForm] = useState<StatForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchStats = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from("stats").select("*").order("order")
    setStats(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchStats() }, [supabase])

  const openCreate = () => { setEditItem(null); setForm({ ...EMPTY_FORM, order: stats.length + 1 }); setDialogOpen(true) }
  const openEdit = (s: Stat) => {
    setEditItem(s)
    setForm({ label: s.label, value: s.value, description: s.description, icon: s.icon, order: s.order })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!supabase) return
    if (!form.label.trim() || !form.value.trim()) { toast.error("Label and value are required"); return }
    setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = editItem
      ? await supabase.from("stats").update(payload).eq("id", editItem.id)
      : await supabase.from("stats").insert(payload)
    if (error) toast.error(error.message)
    else { toast.success(editItem ? "Stat updated!" : "Stat added!"); setDialogOpen(false); fetchStats() }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!supabase || !deleteId) return
    const { error } = await supabase.from("stats").delete().eq("id", deleteId)
    if (error) toast.error(error.message)
    else { toast.success("Stat deleted"); fetchStats() }
    setDeleteId(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="Impact Stats"
        breadcrumb="Impact Stats"
        action={configured ? (
          <Button onClick={openCreate} className="bg-[#d67653] hover:bg-[#c06540]">
            <IconPlus className="size-4 mr-2" /> Add Stat
          </Button>
        ) : undefined}
      />

      {!configured ? <SupabaseNotConfigured /> : (
        <main className="flex-1 p-4 lg:p-6 space-y-4">
          <p className="text-sm text-muted-foreground">These numbers appear in the impact section of the homepage.</p>
          {loading ? <div className="text-muted-foreground">Loading…</div> : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-3xl">
              {stats.map((stat) => (
                <Card key={stat.id} className="bg-gradient-to-t from-[#d67653]/5 to-card text-center shadow-xs">
                  <CardHeader className="pb-1 pt-6">
                    <CardTitle className="text-4xl font-bold text-[#d67653]">{stat.value}</CardTitle>
                    <CardDescription className="text-base font-semibold text-foreground">{stat.label}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    {stat.description && <p className="text-xs text-muted-foreground">{stat.description}</p>}
                    <div className="flex gap-2 mt-3 justify-center">
                      <Button size="sm" variant="outline" onClick={() => openEdit(stat)}><IconEdit className="size-3 mr-1" /> Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => setDeleteId(stat.id)}><IconTrash className="size-3" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {stats.length === 0 && (
                <div className="col-span-full text-center py-16 text-muted-foreground">
                  No stats yet. <button onClick={openCreate} className="underline">Add one</button>.
                </div>
              )}
            </div>
          )}
        </main>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>{editItem ? "Edit Stat" : "Add Stat"}</DialogTitle><DialogDescription>e.g. "100+ Volunteers"</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label>Value *</Label><Input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="100+" /></div>
            <div className="space-y-2"><Label>Label *</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Volunteers" /></div>
            <div className="space-y-2"><Label>Description</Label><Input value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value || null })} placeholder="Active across all sectors" /></div>
            <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-[#d67653] hover:bg-[#c06540]">
              <IconDeviceFloppy className="size-4 mr-2" />{saving ? "Saving…" : "Save Stat"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Stat?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
