-- ============================================================
-- Create Admin User for Pro Bono Dashboard
-- ============================================================
-- Run this in your Supabase SQL editor AFTER running schema.sql
--
-- ⚠️  IMPORTANT: Change the email and password before running!
-- ============================================================

DO $$
DECLARE
  admin_email    TEXT := 'admin@itsprobono.org';   -- ← CHANGE THIS
  admin_password TEXT := 'ChangeMe123!';            -- ← CHANGE THIS (min 8 chars)
  admin_name     TEXT := 'Pro Bono Admin';          -- ← Optional display name
  new_user_id    UUID := gen_random_uuid();
BEGIN

  -- Check if user already exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = admin_email) THEN
    RAISE NOTICE 'User % already exists — skipping creation.', admin_email;
    RETURN;
  END IF;

  -- Insert the admin user into Supabase Auth
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    NOW(),  -- email already confirmed
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    json_build_object('full_name', admin_name),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );

  -- Insert into auth.identities (required for email/password login)
  INSERT INTO auth.identities (
    id,
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    admin_email,
    new_user_id,
    json_build_object('sub', new_user_id::text, 'email', admin_email),
    'email',
    NOW(),
    NOW(),
    NOW()
  );

  RAISE NOTICE '✅ Admin user created successfully!';
  RAISE NOTICE '   Email:    %', admin_email;
  RAISE NOTICE '   User ID:  %', new_user_id;
  RAISE NOTICE '   Login at: /admin/login';

END $$;
