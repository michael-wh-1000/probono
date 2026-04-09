-- ============================================================
-- Pro Bono Admin Dashboard — Supabase Schema
-- Run this in your Supabase SQL editor to set up all tables
-- ============================================================
--
-- ⚡ STEP 1 — Create your admin user (run ONCE after schema setup)
--
-- Option A — Supabase Dashboard (recommended):
--   Go to Authentication → Users → "Add user" → fill in email + password
--   Tick "Auto Confirm User" so no email verification is needed.
--
-- Option B — SQL (replace placeholders before running):
--   SELECT * FROM auth.users; -- check existing users first
--
--   Run via Supabase SQL editor:
--   INSERT INTO auth.users (
--     instance_id, id, aud, role, email, encrypted_password,
--     email_confirmed_at, created_at, updated_at,
--     raw_app_meta_data, raw_user_meta_data, is_super_admin
--   ) VALUES (
--     '00000000-0000-0000-0000-000000000000',
--     gen_random_uuid(),
--     'authenticated',
--     'authenticated',
--     'admin@itsprobono.org',               -- ← change to your email
--     crypt('YourSecurePassword123!', gen_salt('bf')),  -- ← change password
--     NOW(), NOW(), NOW(),
--     '{"provider":"email","providers":["email"]}',
--     '{"full_name":"Pro Bono Admin"}',
--     false
--   );
--
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- 1. Hero Content
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hero_content (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL DEFAULT 'Empowering Communities Inspiring Change',
  subtitle    TEXT NOT NULL DEFAULT 'Join us in empowering communities and transforming lives',
  cta_text    TEXT NOT NULL DEFAULT 'Learn More',
  cta_url     TEXT NOT NULL DEFAULT '/about',
  image_url   TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- 2. Sectors
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sectors (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon_url    TEXT,
  image_url   TEXT,
  color       TEXT,
  "order"     INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed sectors
INSERT INTO sectors (name, slug, description, color, "order") VALUES
  ('Pro Bono Femmes',      'femmes',      'Women empowerment initiatives focusing on skills, leadership, and economic inclusion.', '#d67653', 1),
  ('Pro Bono Educators',   'educators',   'Education-focused programs connecting volunteers with learners across communities.',     '#ff9261', 2),
  ('Pro Bono Health',      'health',      'Healthcare access improvements for underserved and marginalised populations.',           '#4a90d9', 3),
  ('Pro Bono Environment', 'environment', 'Climate and sustainability projects including tree planting and conservation drives.',   '#5cb85c', 4)
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────
-- 3. Team Members
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL,
  role         TEXT NOT NULL,
  bio          TEXT,
  image_url    TEXT,
  linkedin_url TEXT,
  email        TEXT,
  department   TEXT,
  "order"      INT DEFAULT 0,
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Seed team members
INSERT INTO team_members (name, role, department, "order") VALUES
  ('Aiko Olwit',        'Founder',                        'Leadership',      1),
  ('Joel Atuhaire',     'Head, Educators',                'Educators',       2),
  ('Nishala Kirabo',    'Head, Finances',                 'Finance',         3),
  ('Matsiko Timothy',   'Co-Head, Femmes',                'Femmes',          4),
  ('Ana Dorrin',        'Co-Head, Femmes',                'Femmes',          5),
  ('Noella Karara',     'Co-Head, Environment',           'Environment',     6),
  ('Pendi Nyonyozi',    'Head, Environment',              'Environment',     7),
  ('Wokorach Isaac',    'Program Coordinator, Femmes',    'Femmes',          8),
  ('Jonan K Shema',     'Head, Human Resource',           'Human Resource',  9),
  ('Doreen Akeeza',     'Co-Head, Educators',             'Educators',       10),
  ('Angel Kisakye',     'Programme Coordinator, Femmes',  'Femmes',          11),
  ('Namara Yvonne',     'Partner Relations Head',         'Partnerships',    12),
  ('Samora Tumushabe',  'Media Lead, Educators',          'Media',           13),
  ('Emmanuel Kirabo',   'Head of Media Department',       'Media',           14),
  ('Natalie Katesi',    'Human Resource Lead',            'Human Resource',  15)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- 4. Blog Posts
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  content         TEXT NOT NULL DEFAULT '',
  excerpt         TEXT,
  cover_image_url TEXT,
  author_name     TEXT NOT NULL DEFAULT 'Pro Bono Team',
  category        TEXT,
  tags            TEXT[],
  status          TEXT CHECK (status IN ('draft','published','archived')) DEFAULT 'draft',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  published_at    TIMESTAMPTZ
);

-- ─────────────────────────────────────────────
-- 5. FAQs
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  "order"    INT DEFAULT 0,
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed FAQs
INSERT INTO faqs (question, answer, "order") VALUES
  ('How can I volunteer with Pro Bono?',          'You can apply through our website or contact us directly via email at itsprobono256@gmail.com.',  1),
  ('What sectors do you work in?',                'We work across four sectors: Femmes (women empowerment), Educators, Health, and Environment.',     2),
  ('Are there paid opportunities?',               'Most of our work is volunteer-based, however some project roles may include stipends.',            3),
  ('How can organisations partner with us?',      'Reach out to our Partner Relations team via itsprobono256@gmail.com to explore collaboration.',    4),
  ('Where is Pro Bono based?',                    'We are based in Uganda and operate primarily across East Africa.',                                  5)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- 6. Partners
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  logo_url    TEXT,
  website_url TEXT,
  "order"     INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- 7. Gallery
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT,
  description TEXT,
  image_url   TEXT NOT NULL,
  category    TEXT,
  "order"     INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- 8. Stats / Impact Numbers
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label       TEXT NOT NULL,
  value       TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  "order"     INT DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed stats
INSERT INTO stats (label, value, description, "order") VALUES
  ('Volunteers',           '100+', 'Active volunteers across all sectors',    1),
  ('Partner Organisations','10+',  'NGOs and institutions we work with',      2),
  ('Years of Impact',      '5',    'Years of community transformation',       3)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- 9. Core Values
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS core_values (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon        TEXT,
  "order"     INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed core values
INSERT INTO core_values (title, description, "order") VALUES
  ('Results Driven', 'We focus on measurable impact and outcomes in every project we undertake.',               1),
  ('Dive Deep',      'We go beyond surface-level solutions and tackle root causes of the issues we address.',   2),
  ('Earn Trust',     'We build lasting relationships through transparency, accountability and integrity.',       3),
  ('Think Big',      'We dream boldly and pursue ambitious goals to create transformational change.',            4),
  ('Inclusion',      'We champion diversity and ensure every voice is heard and every person is valued.',       5)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- 10. Volunteer Opportunities
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS volunteer_opportunities (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  description      TEXT NOT NULL,
  sector           TEXT,
  requirements     TEXT,
  application_url  TEXT,
  is_active        BOOLEAN DEFAULT TRUE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Seed volunteer opportunities
INSERT INTO volunteer_opportunities (title, description, sector) VALUES
  ('Teaching & Community Support',   'Empower communities through teaching, mentoring, and hands-on support programmes.',   'Educators'),
  ('Health Access Volunteer',        'Transform health access for underserved populations through outreach and advocacy.',   'Health'),
  ('Environmental Conservation',     'Combat climate change via tree planting, clean-up drives and conservation projects.',  'Environment'),
  ('Femmes Programme Coordinator',   'Execute bold empowerment initiatives with passionate teams across the country.',       'Femmes')
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- 11. Contact Information
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_info (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone         TEXT DEFAULT '+256 761237293',
  email         TEXT DEFAULT 'itsprobono256@gmail.com',
  address       TEXT,
  instagram_url TEXT DEFAULT 'https://www.instagram.com/its_probono',
  linkedin_url  TEXT,
  twitter_url   TEXT DEFAULT 'https://x.com/its_probono',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Seed contact info (single row)
INSERT INTO contact_info (phone, email, instagram_url, twitter_url)
VALUES ('+256 761237293', 'itsprobono256@gmail.com', 'https://www.instagram.com/its_probono', 'https://x.com/its_probono')
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- Updated_at triggers
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sectors_updated_at           BEFORE UPDATE ON sectors               FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at      BEFORE UPDATE ON team_members           FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at        BEFORE UPDATE ON blog_posts             FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at              BEFORE UPDATE ON faqs                   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partners_updated_at          BEFORE UPDATE ON partners               FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at           BEFORE UPDATE ON gallery                FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_core_values_updated_at       BEFORE UPDATE ON core_values            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_volunteer_opp_updated_at     BEFORE UPDATE ON volunteer_opportunities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at      BEFORE UPDATE ON contact_info           FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────
-- Row Level Security (RLS)
-- Enable RLS and allow authenticated users to manage all content
-- ─────────────────────────────────────────────
ALTER TABLE hero_content              ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members              ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts                ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs                      ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE core_values               ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_opportunities   ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info              ENABLE ROW LEVEL SECURITY;

-- Public read access (for the frontend website)
CREATE POLICY "Public can read hero_content"            ON hero_content            FOR SELECT USING (true);
CREATE POLICY "Public can read sectors"                 ON sectors                 FOR SELECT USING (true);
CREATE POLICY "Public can read team_members"            ON team_members            FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read blog_posts"              ON blog_posts              FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read faqs"                    ON faqs                    FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read partners"                ON partners                FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read gallery"                 ON gallery                 FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read stats"                   ON stats                   FOR SELECT USING (true);
CREATE POLICY "Public can read core_values"             ON core_values             FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read volunteer_opportunities" ON volunteer_opportunities FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read contact_info"            ON contact_info            FOR SELECT USING (true);

-- Authenticated (admin) full access
CREATE POLICY "Admins can manage hero_content"            ON hero_content            FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage sectors"                 ON sectors                 FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage team_members"            ON team_members            FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage blog_posts"              ON blog_posts              FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage faqs"                    ON faqs                    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage partners"                ON partners                FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage gallery"                 ON gallery                 FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage stats"                   ON stats                   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage core_values"             ON core_values             FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage volunteer_opportunities" ON volunteer_opportunities FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage contact_info"            ON contact_info            FOR ALL TO authenticated USING (true) WITH CHECK (true);
