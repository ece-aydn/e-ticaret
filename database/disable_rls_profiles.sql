-- Profiles Tablosu RLS (Row Level Security) Devre Dışı Bırakma
-- Bu SQL sorgusunu Supabase SQL Editor'de çalıştırın

-- Önce mevcut tüm politikaları kaldır
DROP POLICY IF EXISTS "Kullanıcılar kendi profillerini görebilir" ON public.profiles;
DROP POLICY IF EXISTS "Kullanıcılar kendi profillerini güncelleyebilir" ON public.profiles;
DROP POLICY IF EXISTS "Kullanıcılar kendi profillerini oluşturabilir" ON public.profiles;
DROP POLICY IF EXISTS "Herkes profilleri görüntüleyebilir (sınırlı)" ON public.profiles;
DROP POLICY IF EXISTS "Herkes profilleri görüntüleyebilir" ON public.profiles;

-- RLS'yi devre dışı bırak
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Kontrol sorgusu (RLS'nin devre dışı olduğunu doğrulamak için)
-- Bu sorguyu çalıştırdığınızda 'f' (false) dönmeli
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'profiles';
