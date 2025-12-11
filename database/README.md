# Supabase Veritabanı Kurulum Rehberi

Bu dosya, Supabase veritabanı kurulumu için gerekli adımları içerir.

## 1. Supabase Projesi Oluşturma

1. [Supabase](https://supabase.com) sitesine gidin ve hesabınızı oluşturun
2. Yeni bir proje oluşturun
3. Proje URL'inizi ve API anahtarlarınızı not edin

## 2. Environment Variables Ayarlama

Proje kök dizininde `.env.local` dosyası oluşturun ve aşağıdaki bilgileri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Supabase URL ve Key'i nereden bulabilirim?**
1. Supabase projenize giriş yapın
2. Settings > API bölümüne gidin
3. "Project URL" ve "anon public" key'i kopyalayın

## 3. SQL Sorgusunu Çalıştırma

1. Supabase Dashboard'a gidin
2. SQL Editor bölümüne gidin
3. `database/schema.sql` dosyasındaki tüm SQL komutlarını kopyalayın
4. SQL Editor'de çalıştırın

**Önemli:** Tüm komutları sırayla çalıştırdığınızdan emin olun.

## 4. Storage Bucket Oluşturma

Profil fotoğrafları için bir storage bucket oluşturmanız gerekiyor:

### Yöntem 1: Dashboard'dan
1. Supabase Dashboard > Storage bölümüne gidin
2. "Create bucket" butonuna tıklayın
3. Bucket name: `profile-images`
4. Public bucket: **Açık** (true)
5. Create butonuna tıklayın

### Yöntem 2: SQL ile
SQL Editor'de aşağıdaki komutu çalıştırın:

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;
```

## 5. Storage Policies (İzinler)

Storage bucket'ı oluşturduktan sonra, aşağıdaki politikaları ekleyin:

1. Supabase Dashboard > Storage > Policies bölümüne gidin
2. `profile-images` bucket'ını seçin
3. Aşağıdaki politikaları ekleyin:

**Public Access (Herkes görüntüleyebilir):**
- Policy name: "Public Access"
- Allowed operation: SELECT
- Policy definition: `bucket_id = 'profile-images'`

**Authenticated Upload (Giriş yapanlar yükleyebilir):**
- Policy name: "Authenticated users can upload"
- Allowed operation: INSERT
- Policy definition: `bucket_id = 'profile-images' AND auth.role() = 'authenticated'`

**Users can delete own images (Kullanıcılar kendi fotoğraflarını silebilir):**
- Policy name: "Users can delete own images"
- Allowed operation: DELETE
- Policy definition: `bucket_id = 'profile-images' AND auth.role() = 'authenticated'`

## 6. Test Etme

Kurulum tamamlandıktan sonra:

1. Uygulamayı çalıştırın: `npm run dev`
2. Kayıt ol sayfasına gidin ve yeni bir hesap oluşturun
3. Profil sayfasına gidin ve bilgileri doldurun
4. Profil fotoğrafı yüklemeyi deneyin

## Sorun Giderme

### "Profil bulunamadı" hatası
- Kullanıcı kaydı sırasında profil otomatik oluşturulmamış olabilir
- SQL Editor'de `handle_new_user` trigger'ını kontrol edin
- Manuel olarak profil oluşturabilirsiniz

### "Storage bucket bulunamadı" hatası
- Storage bucket'ın doğru oluşturulduğundan emin olun
- Bucket adının `profile-images` olduğunu kontrol edin
- Public bucket ayarının açık olduğunu kontrol edin

### "RLS policy" hatası
- Row Level Security politikalarının doğru oluşturulduğundan emin olun
- SQL sorgusundaki tüm policy komutlarını çalıştırdığınızdan emin olun

## Destek

Sorun yaşarsanız:
1. Supabase Dashboard > Logs bölümünden hataları kontrol edin
2. Browser Console'dan hataları kontrol edin
3. SQL Editor'de sorguları test edin

