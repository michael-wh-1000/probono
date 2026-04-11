"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconPlus, IconTrash, IconEdit, IconDeviceFloppy, IconSearch } from "@tabler/icons-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { SupabaseNotConfigured } from "@/components/supabase-not-configured"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSupabase } from "@/hooks/use-supabase"
import { ImageUpload } from "@/components/image-upload"
import type { TeamMember } from "@/lib/supabase/types"

type MemberForm = Omit<TeamMember, "id" | "created_at" | "updated_at">

const EMPTY_FORM: MemberForm = {
  name: "", role: "", bio: null, image_url: null,
  linkedin_url: null, email: null, department: null, order: 0, is_active: true,
}

const DEPARTMENTS = ["Leadership", "Femmes", "Educators", "Health", "Environment", "Media", "Human Resource", "Finance", "Partnerships"]

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
}

export default function TeamPage() {
  const { supabase, configured } = useSupabase()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<TeamMember | null>(null)
  const [form, setForm] = useState<MemberForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchMembers = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from("team_members").select("*").order("order")
    setMembers(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchMembers() }, [supabase])

  const filtered = members.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) ||
           m.role.toLowerCase().includes(search.toLowerCase()) ||
           (m.department ?? "").toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => { setEditItem(null); setForm(EMPTY_FORM); setDialogOpen(true) }
  const openEdit = (member: TeamMember) => {
    setEditItem(member)
    setForm({
      name: member.name, role: member.role, bio: member.bio, image_url: member.image_url,
      linkedin_url: member.linkedin_url, email: member.email, department: member.department,
      order: member.order, is_active: member.is_active,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!supabase) return
    if (!form.name.trim() || !form.role.trim()) { toast.error("Name and role are required"); return }
    setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = editItem
      ? await supabase.from("team_members").update(payload).eq("id", editItem.id)
      : await supabase.from("team_members").insert(payload)
    if (error) toast.error(error.message)
    else { toast.success(editItem ? "Member updated!" : "Member added!"); setDialogOpen(false); fetchMembers() }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!supabase || !deleteId) return
    const { error } = await supabase.from("team_members").delete().eq("id", deleteId)
    if (error) toast.error(error.message)
    else { toast.success("Member removed"); fetchMembers() }
    setDeleteId(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="Team Members"
        breadcrumb="Team Members"
        action={configured ? (
          <Button onClick={openCreate} className="bg-[#d67653] hover:bg-[#c06540]">
            <IconPlus className="size-4 mr-2" /> Add Member
          </Button>
        ) : undefined}
      />

      {!configured ? <SupabaseNotConfigured /> : (
        <main className="flex-1 p-4 lg:p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative max-w-sm flex-1">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search members…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <p className="text-sm text-muted-foreground shrink-0">{members.length} members · {members.filter(m => m.is_active).length} active</p>
          </div>

          {loading ? <div className="text-muted-foreground">Loading…</div> : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((member) => (
                <Card key={member.id} className="group overflow-hidden">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                    <Avatar className="size-16 border-2 border-border">
                      <AvatarImage src={member.image_url ?? ""} alt={member.name} />
                      <AvatarFallback className="bg-[#d67653]/10 text-[#d67653] font-semibold">{initials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm leading-tight">{member.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{member.role}</p>
                      {member.department && <Badge variant="outline" className="text-xs mt-1">{member.department}</Badge>}
                    </div>
                    <div className="flex gap-1 w-full">
                      <Button size="sm" variant="outline" className="flex-1 h-7 text-xs" onClick={() => openEdit(member)}>
                        <IconEdit className="size-3 mr-1" /> Edit
                      </Button>
                      <Button size="sm" variant="destructive" className="h-7 w-7 p-0" onClick={() => setDeleteId(member.id)}>
                        <IconTrash className="size-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16 text-muted-foreground">
                  {search ? "No members match your search." : "No members yet."}
                </div>
              )}
            </div>
          )}
        </main>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
            <DialogDescription>Enter the member's details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Full Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Aiko Olwit" /></div>
              <div className="space-y-2"><Label>Role / Title *</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Founder" /></div>
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={form.department ?? ""} onValueChange={(v) => setForm({ ...form, department: v || null })}>
                <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Bio</Label><Textarea value={form.bio ?? ""} onChange={(e) => setForm({ ...form, bio: e.target.value || null })} rows={2} placeholder="Short biography…" /></div>
            <div className="grid grid-cols-2 gap-4">
              <ImageUpload
                value={form.image_url}
                onChange={(url) => setForm({ ...form, image_url: url })}
                bucket="team"
                label="Photo"
                aspect="square"
              />
              <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email ?? ""} onChange={(e) => setForm({ ...form, email: e.target.value || null })} placeholder="name@probono.org" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>LinkedIn URL</Label><Input value={form.linkedin_url ?? ""} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value || null })} placeholder="https://linkedin.com/in/…" /></div>
              <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-[#d67653] hover:bg-[#c06540]">
              <IconDeviceFloppy className="size-4 mr-2" />{saving ? "Saving…" : "Save Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Remove Team Member?</AlertDialogTitle><AlertDialogDescription>This will permanently delete this member.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
