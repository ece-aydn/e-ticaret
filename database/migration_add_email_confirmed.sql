-- Email Onay Durumu Kolonu Ekleme
-- Bu SQL sorgusunu Supabase SQL Editor'de çalıştırın

-- profiles tablosuna email_confirmed kolonu ekle
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email_confirmed BOOLEAN DEFAULT false NOT NULL;

-- Mevcut kullanıcılar için email_confirmed durumunu kontrol et
-- auth.users tablosundaki email_confirmed_at durumuna göre güncelle
UPDATE public.profiles
SET email_confirmed = COALESCE(
  (SELECT (email_confirmed_at IS NOT NULL) FROM auth.users WHERE auth.users.id = profiles.id),
  false
);

-- Email onaylandığında otomatik güncelleme için trigger oluştur
CREATE OR REPLACE FUNCTION public.handle_email_confirmation()
RETURNS TRIGGER AS $$
BEGIN
  -- Kullanıcının email'i onaylandığında profiles tablosunu güncelle
  -- email_confirmed_at NULL değilse ve önceden NULL ise email onaylanmış demektir
  IF NEW.email_confirmed_at IS NOT NULL AND (OLD.email_confirmed_at IS NULL OR OLD.email_confirmed_at IS DISTINCT FROM NEW.email_confirmed_at) THEN
    UPDATE public.profiles
    SET email_confirmed = true
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger'ı oluştur (auth.users tablosu için)
-- Not: Bu trigger'ı oluşturmak için Supabase dashboard'dan SQL Editor'de çalıştırmanız gerekebilir
DROP TRIGGER IF EXISTS on_email_confirmed ON auth.users;

CREATE TRIGGER on_email_confirmed
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW
  WHEN (NEW.email_confirmed_at IS NOT NULL AND (OLD.email_confirmed_at IS NULL OR OLD.email_confirmed_at IS DISTINCT FROM NEW.email_confirmed_at))
  EXECUTE FUNCTION public.handle_email_confirmation();

-- Yeni kullanıcı kaydı olduğunda email_confirmed durumunu ayarla
CREATE OR REPLACE FUNCTION public.handle_new_user_with_email_status()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role, email_confirmed)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Kullanıcı'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.email_confirmed_at IS NOT NULL, false)
  )
  ON CONFLICT (id) DO UPDATE
  SET email_confirmed = COALESCE(NEW.email_confirmed_at IS NOT NULL, false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- İndeks ekle (performans için)
CREATE INDEX IF NOT EXISTS profiles_email_confirmed_idx ON public.profiles(email_confirmed);

-- Açıklama ekle
COMMENT ON COLUMN public.profiles.email_confirmed IS 'Kullanıcının email adresinin onaylanıp onaylanmadığını gösterir';
