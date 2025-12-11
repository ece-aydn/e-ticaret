-- Kullanıcı Profil Tablosu
-- Bu SQL sorgusunu Supabase SQL Editor'de çalıştırın

-- Önce auth.users tablosu zaten Supabase tarafından oluşturulmuş olacak
-- Profil tablosunu oluşturuyoruz

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  surname TEXT,
  phone TEXT,
  location TEXT,
  bio TEXT,
  profile_image_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('student', 'company')),
  website TEXT,
  skills TEXT[], -- Array olarak yetenekler
  -- İstatistikler (Öğrenci için)
  total_applications INTEGER DEFAULT 0,
  interviews INTEGER DEFAULT 0,
  accepted INTEGER DEFAULT 0,
  profile_views INTEGER DEFAULT 0,
  -- İstatistikler (Şirket için)
  active_jobs INTEGER DEFAULT 0,
  total_applications_received INTEGER DEFAULT 0,
  evaluations INTEGER DEFAULT 0,
  hired INTEGER DEFAULT 0,
  -- Zaman damgaları
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) devre dışı bırakıldı
-- Tüm kullanıcılar profillere erişebilir (geliştirme/test için)

-- Önce mevcut politikaları kaldır (eğer varsa)
DROP POLICY IF EXISTS "Kullanıcılar kendi profillerini görebilir" ON public.profiles;
DROP POLICY IF EXISTS "Kullanıcılar kendi profillerini güncelleyebilir" ON public.profiles;
DROP POLICY IF EXISTS "Kullanıcılar kendi profillerini oluşturabilir" ON public.profiles;
DROP POLICY IF EXISTS "Herkes profilleri görüntüleyebilir (sınırlı)" ON public.profiles;
DROP POLICY IF EXISTS "Herkes profilleri görüntüleyebilir" ON public.profiles;

-- RLS'yi devre dışı bırak
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Not: RLS devre dışı olduğu için politikalar gerekli değil
-- Eğer daha sonra RLS'yi etkinleştirmek isterseniz, aşağıdaki politikaları kullanabilirsiniz:

-- Kullanıcılar kendi profillerini görebilir
-- CREATE POLICY "Kullanıcılar kendi profillerini görebilir"
--   ON public.profiles
--   FOR SELECT
--   USING (auth.uid() = id);

-- Kullanıcılar kendi profillerini güncelleyebilir
-- CREATE POLICY "Kullanıcılar kendi profillerini güncelleyebilir"
--   ON public.profiles
--   FOR UPDATE
--   USING (auth.uid() = id);

-- Kullanıcılar kendi profillerini oluşturabilir
-- CREATE POLICY "Kullanıcılar kendi profillerini oluşturabilir"
--   ON public.profiles
--   FOR INSERT
--   WITH CHECK (auth.uid() = id);

-- Herkese açık profil görüntüleme
-- CREATE POLICY "Herkes profilleri görüntüleyebilir"
--   ON public.profiles
--   FOR SELECT
--   USING (true);

-- updated_at otomatik güncelleme için trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Yeni kullanıcı kaydı olduğunda otomatik profil oluşturma (isteğe bağlı)
-- Bu fonksiyon auth.users tablosuna trigger ile bağlanabilir
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Kullanıcı'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger'ı oluştur (auth.users tablosu için)
-- Not: Bu trigger'ı oluşturmak için Supabase dashboard'dan SQL Editor'de çalıştırmanız gerekebilir
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- İndeksler (performans için)
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles(role);
CREATE INDEX IF NOT EXISTS profiles_location_idx ON public.profiles(location);

-- Storage Bucket Oluşturma (Profil Fotoğrafları için)
-- Not: Bu komutları Supabase Dashboard > Storage bölümünden de yapabilirsiniz
-- Storage > Create bucket > bucket name: "profile-images" > Public bucket: true

-- Alternatif olarak SQL ile:
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('profile-images', 'profile-images', true)
-- ON CONFLICT (id) DO NOTHING;

-- Storage Policy (Herkes profil fotoğraflarını görebilir)
-- CREATE POLICY "Public Access"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'profile-images');

-- Storage Policy (Kullanıcılar kendi fotoğraflarını yükleyebilir)
-- CREATE POLICY "Authenticated users can upload"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'profile-images' AND
--     auth.role() = 'authenticated' AND
--     (storage.foldername(name))[1] = auth.uid()::text
--   );

-- Storage Policy (Kullanıcılar kendi fotoğraflarını silebilir)
-- CREATE POLICY "Users can delete own images"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'profile-images' AND
--     auth.role() = 'authenticated' AND
--     (storage.foldername(name))[1] = auth.uid()::text
--   );

