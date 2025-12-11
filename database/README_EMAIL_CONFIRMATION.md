# Email Onay Durumu Migration Rehberi

Bu dosya, email onay durumunu takip etmek için gerekli migration'ı açıklar.

## Migration Dosyası

`database/migration_add_email_confirmed.sql` dosyası aşağıdaki işlemleri yapar:

1. **Yeni Kolon Ekleme**: `profiles` tablosuna `email_confirmed` (BOOLEAN) kolonu ekler
2. **Mevcut Verileri Güncelleme**: Mevcut kullanıcıların email onay durumunu `auth.users` tablosundan alır
3. **Trigger Oluşturma**: Email onaylandığında otomatik güncelleme için trigger ekler
4. **İndeks Ekleme**: Performans için indeks ekler

## Kurulum Adımları

### 1. SQL Migration'ı Çalıştırma

1. Supabase Dashboard'a gidin
2. SQL Editor bölümüne gidin
3. `database/migration_add_email_confirmed.sql` dosyasındaki tüm SQL komutlarını kopyalayın
4. SQL Editor'de çalıştırın

### 2. Email Onay Durumunu Kontrol Etme

Migration çalıştırıldıktan sonra:

- Yeni kayıt olan kullanıcılar için `email_confirmed = false` olacak
- Email onay linkine tıklayan kullanıcılar için otomatik olarak `email_confirmed = true` olacak
- Mevcut kullanıcılar için `auth.users` tablosundaki duruma göre güncellenecek

## Kullanım

### Profil Tablosunda Email Onay Durumu

```sql
-- Email onaylı kullanıcıları sorgula
SELECT * FROM profiles WHERE email_confirmed = true;

-- Email onayı bekleyen kullanıcıları sorgula
SELECT * FROM profiles WHERE email_confirmed = false;
```

### Kod İçinde Kullanım

AuthContext'te email onay durumu otomatik olarak:
- Kayıt sırasında `email_confirmed` durumu kaydedilir
- Email onaylandığında otomatik olarak güncellenir

## Trigger Çalışma Mantığı

1. Kullanıcı kayıt olur → `email_confirmed = false`
2. Email onay linkine tıklar → `auth.users.email_confirmed = true` olur
3. Trigger tetiklenir → `profiles.email_confirmed = true` güncellenir

## Sorun Giderme

### Trigger çalışmıyor

Eğer trigger çalışmıyorsa, manuel olarak güncelleyebilirsiniz:

```sql
-- Tüm email onaylı kullanıcıları güncelle
UPDATE public.profiles
SET email_confirmed = true
WHERE id IN (
  SELECT id FROM auth.users WHERE email_confirmed_at IS NOT NULL
);
```

### Mevcut kullanıcılar için durum yanlış

Migration'ı tekrar çalıştırabilirsiniz veya manuel güncelleme yapabilirsiniz:

```sql
-- Mevcut kullanıcıların email onay durumunu güncelle
UPDATE public.profiles p
SET email_confirmed = COALESCE(
  (SELECT email_confirmed FROM auth.users u WHERE u.id = p.id),
  false
);
```

## Notlar

- `email_confirmed` kolonu `NOT NULL` ve varsayılan değeri `false`'dur
- Yeni kullanıcılar için otomatik olarak `false` olarak başlar
- Email onaylandığında trigger otomatik olarak `true` yapar
- AuthContext'te email onay durumu otomatik olarak takip edilir
