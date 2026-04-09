"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconPlus, IconTrash, IconEdit, IconDeviceFloppy, IconGripVertical } from "@tabler/icons-react"
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
import type { FAQ } from "@/lib/supabase/types"

type FAQForm = Omit<FAQ, "id" | "created_at" | "updated_at">
const EMPTY_FORM: FAQForm = { question: "", answer: "", order: 0, is_active: true }

export default function FAQPage() {
  const { supabase, configured } = useSupabase()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<FAQ | null>(null)
  const [form, setForm] = useState<FAQForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchFaqs = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from("faqs").select("*").order("order")
    setFaqs(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchFaqs() }, [supabase])

  const openCreate = () => { setEditItem(null); setForm({ ...EMPTY_FORM, order: faqs.length + 1 }); setDialogOpen(true) }
  const openEdit = (faq: FAQ) => {
    setEditItem(faq)
    setForm({ question: faq.question, answer: faq.answer, order: faq.order, is_active: faq.is_active })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!supabase) return
    if (!form.question.trim() || !form.answer.trim()) { toast.error("Question and answer are required"); return }
    setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = editItem
      ? await supabase.from("faqs").update(payload).eq("id", editItem.id)
      : await supabase.from("faqs").insert(payload)
    if (error) toast.error(error.message)
    else { toast.success(editItem ? "FAQ updated!" : "FAQ added!"); setDialogOpen(false); fetchFaqs() }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!supabase || !deleteId) return
    const { error } = await supabase.from("faqs").delete().eq("id", deleteId)
    if (error) toast.error(error.message)
    else { toast.success("FAQ deleted"); fetchFaqs() }
    setDeleteId(null)
  }

  const toggleActive = async (faq: FAQ) => {
    if (!supabase) return
    const { error } = await supabase.from("faqs").update({ is_active: !faq.is_active }).eq("id", faq.id)
    if (!error) { toast.success("Status updated"); fetchFaqs() }
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="FAQs"
        breadcrumb="FAQs"
        action={configured ? (
          <Button onClick={openCreate} className="bg-[#d67653] hover:bg-[#c06540]">
            <IconPlus className="size-4 mr-2" /> Add FAQ
          </Button>
        ) : undefined}
      />

      {!configured ? <SupabaseNotConfigured /> : (
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-3xl space-y-3">
            {loading ? <p className="text-muted-foreground">Loading…</p> : faqs.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                No FAQs yet. <button onClick={openCreate} className="underline">Add one</button>.
              </div>
            ) : (
              faqs.map((faq) => (
                <Card key={faq.id} className={!faq.is_active ? "opacity-60" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <IconGripVertical className="size-4 text-muted-foreground mt-1 shrink-0 cursor-grab" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground">#{faq.order}</span>
                          <Badge
                            variant={faq.is_active ? "default" : "secondary"}
                            className="text-xs cursor-pointer"
                            onClick={() => toggleActive(faq)}
                          >
                            {faq.is_active ? "Visible" : "Hidden"}
                          </Badge>
                        </div>
                        <p className="font-semibold text-sm">{faq.question}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{faq.answer}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button size="icon" variant="ghost" className="size-8" onClick={() => openEdit(faq)}><IconEdit className="size-4" /></Button>
                        <Button size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(faq.id)}><IconTrash className="size-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
            <DialogDescription>Enter the question and answer below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label>Question *</Label><Input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="How can I volunteer?" /></div>
            <div className="space-y-2"><Label>Answer *</Label><Textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} placeholder="You can apply through our website…" /></div>
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
              <IconDeviceFloppy className="size-4 mr-2" />{saving ? "Saving…" : "Save FAQ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete FAQ?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
