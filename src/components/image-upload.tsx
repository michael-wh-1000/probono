"use client"

import { useRef, useState } from "react"
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react"
import { toast } from "sonner"
import { useSupabase } from "@/hooks/use-supabase"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  /** Current public URL (stored in DB). Null = no image. */
  value: string | null
  /** Called with the new public URL after upload, or null when cleared. */
  onChange: (url: string | null) => void
  /** Supabase Storage bucket name */
  bucket: string
  label?: string
  /** Hint that controls the preview aspect ratio */
  aspect?: "square" | "video" | "banner" | "logo"
  className?: string
  /** Whether the field is required */
  required?: boolean
}

const ASPECT_CLASSES: Record<NonNullable<ImageUploadProps["aspect"]>, string> = {
  square: "aspect-square",
  video:  "aspect-video",
  banner: "h-36 w-full",
  logo:   "h-24 w-full",
}

export function ImageUpload({
  value,
  onChange,
  bucket,
  label,
  aspect = "video",
  className,
  required,
}: ImageUploadProps) {
  const { supabase } = useSupabase()
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const trigger = () => inputRef.current?.click()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !supabase) return

    // Validate type client-side
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.")
      return
    }

    setUploading(true)

    // Delete old file from storage if it came from the same bucket
    if (value) {
      try {
        const url = new URL(value)
        // Supabase storage URLs end with /storage/v1/object/public/{bucket}/{path}
        const prefix = `/storage/v1/object/public/${bucket}/`
        if (url.pathname.startsWith(prefix)) {
          const oldPath = url.pathname.slice(prefix.length)
          await supabase.storage.from(bucket).remove([decodeURIComponent(oldPath)])
        }
      } catch {
        // Non-Supabase URL — ignore
      }
    }

    const ext = file.name.split(".").pop() ?? "jpg"
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: false })

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    onChange(data.publicUrl)
    setUploading(false)

    // Reset so the same file can be re-selected if needed
    if (inputRef.current) inputRef.current.value = ""
  }

  const handleClear = async () => {
    if (value && supabase) {
      try {
        const url = new URL(value)
        const prefix = `/storage/v1/object/public/${bucket}/`
        if (url.pathname.startsWith(prefix)) {
          const oldPath = url.pathname.slice(prefix.length)
          await supabase.storage.from(bucket).remove([decodeURIComponent(oldPath)])
        }
      } catch {
        // ignore
      }
    }
    onChange(null)
  }

  const previewClass = ASPECT_CLASSES[aspect]

  return (
    <div className={className}>
      {label && (
        <Label className="mb-2 block">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={handleFileChange}
      />

      {value ? (
        /* ── Preview with actions overlay ── */
        <div className={cn("relative group rounded-lg overflow-hidden border bg-muted", previewClass)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={trigger}
              disabled={uploading}
            >
              <IconUpload className="size-3.5 mr-1.5" />
              {uploading ? "Uploading…" : "Replace"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleClear}
              disabled={uploading}
            >
              <IconX className="size-3.5" />
            </Button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="size-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
            </div>
          )}
        </div>
      ) : (
        /* ── Empty drop-zone ── */
        <button
          type="button"
          onClick={trigger}
          disabled={uploading}
          className={cn(
            "w-full rounded-lg border-2 border-dashed border-border",
            "flex flex-col items-center justify-center gap-2",
            "text-muted-foreground transition-colors",
            "hover:border-[#d67653] hover:text-[#d67653]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            previewClass,
            "min-h-[8rem]",
          )}
        >
          {uploading ? (
            <>
              <div className="size-6 rounded-full border-2 border-current border-t-transparent animate-spin" />
              <span className="text-sm">Uploading…</span>
            </>
          ) : (
            <>
              <IconPhoto className="size-7" />
              <span className="text-sm font-medium">Click to upload</span>
              <span className="text-xs opacity-70">PNG, JPG, WebP, GIF, SVG</span>
            </>
          )}
        </button>
      )}
    </div>
  )
}
