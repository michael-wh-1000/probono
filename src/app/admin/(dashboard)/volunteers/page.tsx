"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconPlus, IconTrash, IconEdit, IconDeviceFloppy, IconExternalLink } from "@tabler/icons-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSupabase } from "@/hooks/use-supabase"
import type { VolunteerOpportunity } from "@/lib/supabase/types"

type OpForm = Omit<VolunteerOpportunity, "id" | "created_at" | "updated_at">
const EMPTY_FORM: OpForm = { title: "", description: "", sector: null, requirements: null, application_url: null, is_active: true }
const SECTORS = ["Femmes", "Educators", "Health", "Environment", "General"]

const SECTOR_COLORS: Record<string, string> = {
  Femmes: "bg-pink-100 text-pink-700 dark:bg-pink-900/30",
  Educators: "bg-amber-100 text-amber-700 dark:bg-amber-900/30",
  Health: "bg-blue-100 text-blue-700 dark:bg-blue-900/30",
  Environment: "bg-green-100 text-green-700 dark:bg-green-900/30",
  General: "bg-gray-100 text-gray-700 dark:bg-gray-800",
}

export default function VolunteersPage() {
  const { supabase, configured } = useSupabase()
  const [opps, setOpps] = useState<VolunteerOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<VolunteerOpportunity | null>(null)
  const [form, setForm] = useState<OpForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchOpps = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from("volunteer_opportunities").select("*").order("created_at")
    setOpps(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchOpps() }, [supabase])

  const openCreate = () => { setEditItem(null); setForm(EMPTY_FORM); setDialogOpen(true) }
  const openEdit = (op: VolunteerOpportunity) => {
    setEditItem(op)
    setForm({ title: op.title, description: op.description, sector: op.sector, requirements: op.requirements, application_url: op.application_url, is_active: op.is_active })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!supabase) return
    if (!form.title.trim() || !form.description.trim()) { toast.error("Title and description are required"); return }
    setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = editItem
      ? await supabase.from("volunteer_opportunities").update(payload).eq("id", editItem.id)
      : await supabase.from("volunteer_opportunities").insert(payload)
    if (error) toast.error(error.message)
    else { toast.success(editItem ? "Opportunity updated!" : "Opportunity added!"); setDialogOpen(false); fetchOpps() }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!supabase || !deleteId) return
    const { error } = await supabase.from("volunteer_opportunities").delete().eq("id", deleteId)
    if (error) toast.error(error.message)
    else { toast.success("Opportunity deleted"); fetchOpps() }
    setDeleteId(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="Volunteer Opportunities"
        breadcrumb="Volunteers"
        action={configured ? (
          <Button onClick={openCreate} className="bg-[#d67653] hover:bg-[#c06540]">
            <IconPlus className="size-4 mr-2" /> Add Opportunity
          </Button>
        ) : undefined}
      />

      {!configured ? <SupabaseNotConfigured /> : (
        <main className="flex-1 p-4 lg:p-6 space-y-4">
          {loading ? <div className="text-muted-foreground">Loading…</div> : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {opps.map((op) => (
                <Card key={op.id} className={`flex flex-col ${!op.is_active ? "opacity-60" : ""}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {op.sector && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SECTOR_COLORS[op.sector] ?? SECTOR_COLORS.General}`}>{op.sector}</span>
                      )}
                      <Badge variant={op.is_active ? "default" : "secondary"} className="text-xs">{op.is_active ? "Open" : "Closed"}</Badge>
                    </div>
                    <CardTitle className="text-base mt-1">{op.title}</CardTitle>
                    <CardDescription className="text-sm">{op.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0 space-y-3">
                    {op.requirements && <div className="text-xs text-muted-foreground"><span className="font-medium">Requirements: </span>{op.requirements}</div>}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => openEdit(op)}><IconEdit className="size-3 mr-1" /> Edit</Button>
                      {op.application_url && (
                        <Button size="sm" variant="ghost" asChild>
                          <a href={op.application_url} target="_blank" rel="noopener noreferrer"><IconExternalLink className="size-3" /></a>
                        </Button>
                      )}
                      <Button size="sm" variant="destructive" onClick={() => setDeleteId(op.id)}><IconTrash className="size-3" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {opps.length === 0 && (
                <div className="col-span-full text-center py-16 text-muted-foreground">
                  No opportunities yet. <button onClick={openCreate} className="underline">Add one</button>.
                </div>
              )}
            </div>
          )}
        </main>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editItem ? "Edit Opportunity" : "Add Volunteer Opportunity"}</DialogTitle><DialogDescription>Fill in the opportunity details.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Teaching & Community Support" /></div>
            <div className="space-y-2"><Label>Description *</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="What will the volunteer do?" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sector</Label>
                <Select value={form.sector ?? ""} onValueChange={(v) => setForm({ ...form, sector: v || null })}>
                  <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                  <SelectContent>{SECTORS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex gap-2 mt-1">
                  {["Open", "Closed"].map((s) => (
                    <Button key={s} size="sm" variant={(s === "Open" && form.is_active) || (s === "Closed" && !form.is_active) ? "default" : "outline"} onClick={() => setForm({ ...form, is_active: s === "Open" })}>{s}</Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2"><Label>Requirements</Label><Textarea value={form.requirements ?? ""} onChange={(e) => setForm({ ...form, requirements: e.target.value || null })} rows={2} placeholder="Skills or qualifications needed…" /></div>
            <div className="space-y-2"><Label>Application URL</Label><Input value={form.application_url ?? ""} onChange={(e) => setForm({ ...form, application_url: e.target.value || null })} placeholder="https://forms.gle/…" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-[#d67653] hover:bg-[#c06540]">
              <IconDeviceFloppy className="size-4 mr-2" />{saving ? "Saving…" : "Save Opportunity"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Opportunity?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
