-- ============================================================
-- Supabase Storage Buckets — Pro Bono Admin Dashboard
-- ============================================================
-- Run this in your Supabase SQL editor AFTER running schema.sql
--
-- Creates 6 public buckets (one per content type that has images)
-- and the RLS policies that allow:
--   • Anyone       → read / download
--   • Authenticated → upload, replace, delete
-- ============================================================

-- ─────────────────────────────────────────────
-- 1. Buckets
-- ─────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('hero',     'hero',     true, 5242880,  ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('sectors',  'sectors',  true, 5242880,  ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('team',     'team',     true, 3145728,  ARRAY['image/jpeg','image/png','image/webp']),
  ('blog',     'blog',     true, 5242880,  ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('gallery',  'gallery',  true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('partners', 'partners', true, 2097152,  ARRAY['image/jpeg','image/png','image/webp','image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────
-- 2. Public read policies (frontend website)
-- ─────────────────────────────────────────────
CREATE POLICY "Public read hero"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'hero');

CREATE POLICY "Public read sectors"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'sectors');

CREATE POLICY "Public read team"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'team');

CREATE POLICY "Public read blog"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog');

CREATE POLICY "Public read gallery"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "Public read partners"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'partners');

-- ─────────────────────────────────────────────
-- 3. Authenticated full-access policies (admin dashboard)
-- ─────────────────────────────────────────────
CREATE POLICY "Auth manage hero"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'hero')
  WITH CHECK (bucket_id = 'hero');

CREATE POLICY "Auth manage sectors"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'sectors')
  WITH CHECK (bucket_id = 'sectors');

CREATE POLICY "Auth manage team"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'team')
  WITH CHECK (bucket_id = 'team');

CREATE POLICY "Auth manage blog"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'blog')
  WITH CHECK (bucket_id = 'blog');

CREATE POLICY "Auth manage gallery"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'gallery')
  WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Auth manage partners"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'partners')
  WITH CHECK (bucket_id = 'partners');
