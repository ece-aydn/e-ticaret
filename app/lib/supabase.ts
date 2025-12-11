import { createClient } from '@supabase/supabase-js';

// Supabase URL ve anon key'i environment variables'dan al
// .env.local dosyasında tanımlı olmalı
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL veya Anon Key tanımlanmamış! Lütfen .env.local dosyasını kontrol edin.');
  throw new Error('Supabase configuration is missing. Please check .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

