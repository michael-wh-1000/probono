"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { format } from "date-fns"
import { IconPlus, IconTrash, IconEdit, IconDeviceFloppy, IconSearch } from "@tabler/icons-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { SupabaseNotConfigured } from "@/components/supabase-not-configured"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import type { BlogPost } from "@/lib/supabase/types"

type PostForm = Omit<BlogPost, "id" | "created_at" | "updated_at">

const EMPTY_FORM: PostForm = {
  title: "", slug: "", content: "", excerpt: null, cover_image_url: null,
  author_name: "Pro Bono Team", category: null, tags: null, status: "draft", published_at: null,
}

const STATUS_COLORS: Record<BlogPost["status"], string> = {
  published: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  archived: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
}

function toSlug(t: string) {
  return t.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

export default function BlogPage() {
  const { supabase, configured } = useSupabase()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | BlogPost["status"]>("all")
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<BlogPost | null>(null)
  const [form, setForm] = useState<PostForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchPosts = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })
    setPosts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [supabase])

  const visible = posts.filter((p) => {
    const matchFilter = filter === "all" || p.status === filter
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.author_name ?? "").toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const openCreate = () => { setEditItem(null); setForm(EMPTY_FORM); setDialogOpen(true) }
  const openEdit = (post: BlogPost) => {
    setEditItem(post)
    setForm({
      title: post.title, slug: post.slug, content: post.content, excerpt: post.excerpt,
      cover_image_url: post.cover_image_url, author_name: post.author_name,
      category: post.category, tags: post.tags, status: post.status, published_at: post.published_at,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!supabase) return
    if (!form.title.trim()) { toast.error("Title is required"); return }
    setSaving(true)
    const payload = {
      ...form,
      updated_at: new Date().toISOString(),
      published_at: form.status === "published" && !form.published_at ? new Date().toISOString() : form.published_at,
    }
    const { error } = editItem
      ? await supabase.from("blog_posts").update(payload).eq("id", editItem.id)
      : await supabase.from("blog_posts").insert(payload)
    if (error) toast.error(error.message)
    else { toast.success(editItem ? "Post updated!" : "Post created!"); setDialogOpen(false); fetchPosts() }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!supabase || !deleteId) return
    const { error } = await supabase.from("blog_posts").delete().eq("id", deleteId)
    if (error) toast.error(error.message)
    else { toast.success("Post deleted"); fetchPosts() }
    setDeleteId(null)
  }

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
    archived: posts.filter((p) => p.status === "archived").length,
  }

  return (
    <div className="flex flex-1 flex-col">
      <AdminPageHeader
        title="Blog Posts"
        breadcrumb="Blog Posts"
        action={configured ? (
          <Button onClick={openCreate} className="bg-[#d67653] hover:bg-[#c06540]">
            <IconPlus className="size-4 mr-2" /> New Post
          </Button>
        ) : undefined}
      />

      {!configured ? <SupabaseNotConfigured /> : (
        <main className="flex-1 p-4 lg:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
              <TabsList>
                <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
                <TabsTrigger value="published">Published ({counts.published})</TabsTrigger>
                <TabsTrigger value="draft">Drafts ({counts.draft})</TabsTrigger>
                <TabsTrigger value="archived">Archived ({counts.archived})</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative flex-1 max-w-xs">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search posts…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Loading…</TableCell></TableRow>
                ) : visible.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">No posts found. <button onClick={openCreate} className="underline">Create one</button>.</TableCell></TableRow>
                ) : (
                  visible.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{post.title}</p>
                          <p className="text-xs text-muted-foreground font-mono">/{post.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{post.author_name}</TableCell>
                      <TableCell>{post.category && <Badge variant="outline" className="text-xs">{post.category}</Badge>}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[post.status]}`}>{post.status}</span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {format(new Date(post.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="size-8" onClick={() => openEdit(post)}><IconEdit className="size-4" /></Button>
                          <Button size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(post.id)}><IconTrash className="size-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Post" : "New Blog Post"}</DialogTitle>
            <DialogDescription>Fill in the post details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: toSlug(e.target.value) })} placeholder="Post title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="post-slug" /></div>
              <div className="space-y-2"><Label>Author</Label><Input value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} placeholder="Pro Bono Team" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Category</Label><Input value={form.category ?? ""} onChange={(e) => setForm({ ...form, category: e.target.value || null })} placeholder="Community, Health…" /></div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as BlogPost["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ImageUpload
              value={form.cover_image_url}
              onChange={(url) => setForm({ ...form, cover_image_url: url })}
              bucket="blog"
              label="Cover Image"
              aspect="video"
            />
            <div className="space-y-2"><Label>Excerpt</Label><Textarea value={form.excerpt ?? ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value || null })} rows={2} placeholder="Brief summary shown in listings…" /></div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} placeholder="Full post content (Markdown supported)…" className="font-mono text-sm" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-[#d67653] hover:bg-[#c06540]">
              <IconDeviceFloppy className="size-4 mr-2" />{saving ? "Saving…" : "Save Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Post?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
