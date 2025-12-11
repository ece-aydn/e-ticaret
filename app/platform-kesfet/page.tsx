"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../components/ThemeProvider";
import { useAuth } from "../contexts/AuthContext";

const features = [
  {
    icon: "🎯",
    title: "AI Destekli Akıllı Eşleştirme",
    description: "Yapay zeka destekli algoritma seni en uygun ilanlarla eşleştirir. Yeteneklerine, müsaitlik durumuna ve kariyer hedeflerine göre kişiselleştirilmiş öneriler al.",
    color: "from-purple-500/20 to-pink-500/20",
    darkColor: "dark:from-purple-500/20 dark:to-pink-500/20",
  },
  {
    icon: "📅",
    title: "Ders Programı Entegrasyonu",
    description: "Ders programını yükle, platform sana ders saatlerine uygun ilanları otomatik önersin. Hiçbir dersini kaçırma, esnek çalışma saatleri ile uyumlu ilanlar bul.",
    color: "from-blue-500/20 to-cyan-500/20",
    darkColor: "dark:from-blue-500/20 dark:to-cyan-500/20",
  },
  {
    icon: "👨‍🏫",
    title: "Profesyonel Mentor Desteği",
    description: "Sektör mentorları ile görüşme provası yap, CV'ni geliştir ve kendini daha iyi ifade et. İlk görüşmenden önce hazır ol, başarı şansını artır.",
    color: "from-green-500/20 to-emerald-500/20",
    darkColor: "dark:from-green-500/20 dark:to-emerald-500/20",
  },
  {
    icon: "⚡",
    title: "Hızlı ve Kolay Başvuru",
    description: "Kaydırmalı başvuru akışıyla sadece 3 soruya cevap ver. Başvurularını tek panelde yönet, geri bildirimleri takip et ve kariyer yolculuğunu izle.",
    color: "from-orange-500/20 to-red-500/20",
    darkColor: "dark:from-orange-500/20 dark:to-red-500/20",
  },
  {
    icon: "💼",
    title: "Etkileyici Proje Portföyü",
    description: "CV yerine etkileyici proje kartları kullan. Kulüp geçmişini, proje dosyalarını ve portföy linklerini bağla. Fark yarat ve öne çık.",
    color: "from-yellow-500/20 to-amber-500/20",
    darkColor: "dark:from-yellow-500/20 dark:to-amber-500/20",
  },
  {
    icon: "💰",
    title: "Hızlı ve Güvenli Ödeme",
    description: "Üçüncü günden itibaren ödeme almaya başla. Şeffaf ücret yapısı ve güvenli ödeme sistemi ile paranı zamanında al.",
    color: "from-indigo-500/20 to-purple-500/20",
    darkColor: "dark:from-indigo-500/20 dark:to-purple-500/20",
  },
];

const steps = [
  {
    number: "1",
    title: "Profilini Oluştur",
    description: "Birkaç dakikada yeteneklerini, müsaitlik durumunu ve hedeflerini paylaş. Profilini ne kadar detaylı doldurursan, o kadar iyi eşleşmeler alırsın.",
    icon: "📝",
    duration: "2 dakika",
  },
  {
    number: "2",
    title: "Ders Programını Yükle",
    description: "Ders programını sisteme yükle. Platform sana ders saatlerine uygun ilanları otomatik önersin. Hiçbir dersini kaçırma.",
    icon: "📅",
    duration: "1 dakika",
  },
  {
    number: "3",
    title: "Projelerini Ekle",
    description: "CV yerine etkileyici proje kartları kullan. Kulüp geçmişini, proje dosyalarını ve portföy linklerini bağla. Fark yarat.",
    icon: "🚀",
    duration: "5 dakika",
  },
  {
    number: "4",
    title: "Mentor Eşleşmesi Al",
    description: "Sektör mentorları ile görüşme provası yap. CV'ni geliştir ve kendini daha iyi ifade et. İlk görüşmenden önce hazır ol.",
    icon: "👨‍🏫",
    duration: "30 dakika",
  },
  {
    number: "5",
    title: "İlanları Keşfet",
    description: "Kişiselleştirilmiş ilan önerilerini görüntüle. Kategori, çalışma şekli ve deneyim seviyesine göre filtrele. Senin için özel hazırlanmış ilanları gör.",
    icon: "🔍",
    duration: "Anında",
  },
  {
    number: "6",
    title: "Hızlı Başvur",
    description: "Kaydırmalı başvuru akışıyla sadece 3 soruya cevap ver. Başvurularını tek panelde yönet ve geri bildirimleri takip et.",
    icon: "⚡",
    duration: "30 saniye",
  },
];

const benefits = [
  {
    icon: "🎓",
    title: "Öğrenci Odaklı Tasarım",
    description: "Tamamen öğrenciler için tasarlandı. Ders programına uygun, esnek çalışma saatleri ve öğrenci dostu ücretler. Senin için özel.",
    stat: "24.500+ öğrenci",
  },
  {
    icon: "🏢",
    title: "Güvenilir Şirketler",
    description: "Tüm şirketler doğrulanmış ve güvenilir. Öğrenci haklarını koruyan şeffaf bir sistem. Güvenle başvur.",
    stat: "180 doğrulanmış şirket",
  },
  {
    icon: "📊",
    title: "Detaylı İstatistikler",
    description: "Başvuru geçmişini, başarı oranını ve gelir istatistiklerini takip et. Kariyer gelişimini görselleştir ve ilerlemeni izle.",
    stat: "%87 başarı oranı",
  },
  {
    icon: "🔔",
    title: "Anlık Bildirimler",
    description: "Yeni ilanlar, başvuru durumları ve önemli güncellemeler için anlık bildirimler al. Hiçbir fırsatı kaçırma.",
    stat: "7/24 bildirim",
  },
  {
    icon: "💬",
    title: "Topluluk Desteği",
    description: "Diğer öğrencilerle deneyimlerini paylaş, sorular sor ve topluluktan destek al. Birlikte büyüyelim.",
    stat: "Aktif topluluk",
  },
  {
    icon: "🛡️",
    title: "Güvenli Platform",
    description: "Verilerin güvende. SSL şifreleme, gizlilik koruması ve güvenli ödeme sistemi. Senin güvenliğin önceliğimiz.",
    stat: "100% güvenli",
  },
];

const categories = [
  { name: "Yazılım & Veri", count: 156, icon: "💻", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "Ürün & Tasarım", count: 89, icon: "🎨", color: "from-purple-500/20 to-pink-500/20" },
  { name: "Pazarlama & Büyüme", count: 124, icon: "📈", color: "from-green-500/20 to-emerald-500/20" },
  { name: "Finans & Analiz", count: 67, icon: "📊", color: "from-yellow-500/20 to-amber-500/20" },
  { name: "Mimarlık & Çizim", count: 45, icon: "🏗️", color: "from-rose-500/20 to-orange-500/20" },
  { name: "Online Ders", count: 78, icon: "📚", color: "from-emerald-500/20 to-teal-500/20" },
  { name: "Operasyon & Satış", count: 92, icon: "🤝", color: "from-orange-500/20 to-red-500/20" },
  { name: "Dil Eğitimi", count: 56, icon: "🌍", color: "from-teal-500/20 to-cyan-500/20" },
  { name: "Staj İlanları", count: 142, icon: "💼", color: "from-violet-500/20 to-fuchsia-500/20" },
];

const testimonials = [
  {
    name: "Selin Demir",
    role: "Endüstri Mühendisliği 3. sınıf",
    quote: "İlk hibrit stajımı iki hafta içinde buldum. KariyerKöprü mentorumla görüşme prova etmek kaygımı neredeyse bitirdi. Şimdi çok daha özgüvenliyim!",
    avatar: "👩‍💼",
    rating: 5,
    company: "TechCorp",
  },
  {
    name: "Mertcan Yıldız",
    role: "Bilgisayar Mühendisliği 2. sınıf",
    quote: "Takvim entegrasyonu sayesinde ders programıma göre ilanlara filtre uygulayabiliyorum. Başvurular tek panelde toplandı, çok pratik!",
    avatar: "👨‍💻",
    rating: 5,
    company: "DevStudio",
  },
  {
    name: "Ayşe Kaya",
    role: "İşletme 4. sınıf",
    quote: "Mentor desteği sayesinde kendimi çok daha iyi ifade edebiliyorum. Artık görüşmelerden korkmuyorum! Platform gerçekten harika.",
    avatar: "👩‍🎓",
    rating: 5,
    company: "BusinessHub",
  },
];

const faqs = [
  {
    question: "KariyerKöprü'ye katılmak ücretsiz mi?",
    answer: "Evet, tamamen ücretsiz! Öğrenciler için özel olarak tasarlanmış platformumuza kayıt olmak ve kullanmak tamamen ücretsizdir.",
  },
  {
    question: "Hangi üniversitelerden öğrenciler katılabilir?",
    answer: "Tüm üniversitelerden öğrenciler katılabilir. Platformumuz Türkiye'deki tüm üniversitelerden öğrencilere açıktır.",
  },
  {
    question: "Ne kadar sürede ilan bulabilirim?",
    answer: "Profilini tamamladıktan sonra, AI algoritmamız sana uygun ilanları hemen önerecek. Ortalama 1-2 hafta içinde uygun bir ilan bulabilirsin.",
  },
  {
    question: "Ödeme nasıl yapılıyor?",
    answer: "Üçüncü günden itibaren ödeme almaya başlayabilirsin. Ödemeler güvenli bir şekilde banka hesabına veya dijital cüzdana yapılır.",
  },
  {
    question: "Mentor desteği nasıl çalışıyor?",
    answer: "Platform üzerinden sektör mentorları ile eşleşirsin. Mentorlar görüşme provası yapmanı, CV'ni geliştirmeni ve kendini daha iyi ifade etmeni sağlar.",
  },
];

export default function PlatformKesfetPage() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8 pb-16 pt-6">
        {/* Header */}
        <header className="sticky top-4 z-50 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl px-6 py-4 shadow-lg dark:shadow-2xl transition-all hover:border-slate-300 dark:hover:border-white/20 mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-xl font-bold text-white shadow-lg">
              K
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                KariyerKöprü
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Öğrenci iş platformu</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="relative text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-500 after:transition-all hover:after:w-full"
            >
              Ana Sayfa
            </Link>
            {user && (
              <Link
                href="/profile"
                className="relative text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-500 after:transition-all hover:after:w-full"
              >
                Profilim
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="rounded-full bg-slate-100 dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            {!user ? (
              <Link
                href="/login"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
              >
                Giriş Yap
              </Link>
            ) : (
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
              >
                <span className="text-lg">{user.role === "student" ? "👨‍🎓" : "🏢"}</span>
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
            )}
          </nav>
        </header>

        <main className="flex flex-1 flex-col gap-20">
          {/* Hero Section */}
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-br from-cyan-100/50 via-blue-100/50 to-purple-100/50 dark:from-cyan-500/10 dark:via-blue-500/10 dark:to-purple-500/10 p-8 lg:p-16 backdrop-blur-xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 backdrop-blur-sm mb-6">
                <span className="text-xl">🚀</span>
                Platformu Keşfet
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 bg-gradient-to-r from-slate-900 via-cyan-700 to-blue-700 dark:from-white dark:via-cyan-100 dark:to-blue-200 bg-clip-text text-transparent">
                Öğrenciden Profesyonele
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                KariyerKöprü, öğrencileri projelere, stajlara ve güvenilir şirketlere bağlayan köprüdür. 
                Tüm süreci tek panelde yönet, ders programına uygun ilanları keşfet ve kariyerine başla.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
                >
                  <span className="relative z-10">Hemen Başla</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </Link>
                <Link
                  href="/ilan-bul"
                  className="rounded-full border-2 border-slate-300 dark:border-white/20 bg-white/50 dark:bg-white/5 px-8 py-4 text-base font-semibold text-slate-900 dark:text-white backdrop-blur-sm transition-all hover:border-slate-400 dark:hover:border-white/40 hover:bg-white/80 dark:hover:bg-white/10"
                >
                  İlanları Görüntüle
                </Link>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/30 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl mb-3">👥</div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">24.500+</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Aktif Öğrenci</p>
            </div>
            <div className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/30 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl mb-3">🏢</div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">180</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Şirket İş Birliği</p>
            </div>
            <div className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/30 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">430</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Aylık Yeni İlan</p>
            </div>
            <div className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/30 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">%87</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Başarı Oranı</p>
            </div>
          </section>

          {/* Features Section */}
          <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-2">
                Platform Özellikleri
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                KariyerKöprü'nün Güçlü Özellikleri
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Kariyerine hızlı başlaman için tasarlanmış özellikler
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-br ${feature.color} ${feature.darkColor} p-6 backdrop-blur-xl transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:scale-105 hover:shadow-xl`}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="space-y-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-gradient-to-br dark:from-slate-900/40 dark:to-slate-950/40 p-8 lg:p-12 backdrop-blur-xl">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-2">
                Nasıl Çalışır?
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                6 Basit Adımda Kariyerine Başla
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Hızlı ve kolay bir şekilde ilk ilanını bul
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-950/60 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-500/20 dark:to-blue-500/20 border border-cyan-300 dark:border-cyan-400/30 text-2xl">
                      {step.icon}
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-lg font-bold text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-400/30">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    ⏱️ {step.duration}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-2">
                Neden KariyerKöprü?
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Öğrenciler İçin Özel Avantajlar
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Senin için özel olarak tasarlanmış avantajlar
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-950/60 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:scale-105 hover:shadow-xl"
                >
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {benefit.description}
                  </p>
                  <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    {benefit.stat}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section className="space-y-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 p-8 lg:p-12 backdrop-blur-xl">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-2">
                Kategoriler
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Geniş Kategori Yelpazesi
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Her alanda fırsat bul, kariyerini istediğin yönde geliştir
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => {
                const categorySlug = category.name
                  .toLowerCase()
                  .replace(/ı/g, "i")
                  .replace(/İ/g, "i")
                  .replace(/ğ/g, "g")
                  .replace(/Ğ/g, "g")
                  .replace(/ü/g, "u")
                  .replace(/Ü/g, "u")
                  .replace(/ş/g, "s")
                  .replace(/Ş/g, "s")
                  .replace(/ö/g, "o")
                  .replace(/Ö/g, "o")
                  .replace(/ç/g, "c")
                  .replace(/Ç/g, "c")
                  .replace(/ & /g, "-")
                  .replace(/ /g, "-");
                
                return (
                  <Link
                    key={index}
                    href={`/kategori/${categorySlug}`}
                    className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-br ${category.color} p-6 backdrop-blur-sm transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:scale-105 hover:shadow-xl`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-4xl">{category.icon}</div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 px-3 py-1 rounded-full">
                        {category.count} ilan
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Kategoriyi görüntüle →
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="space-y-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-gradient-to-br dark:from-slate-900/40 dark:to-slate-950/40 p-8 lg:p-12 backdrop-blur-xl">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-2">
                Öğrenci Deneyimleri
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Binlerce Öğrenciye İlham Veriyoruz
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Gerçek öğrenci deneyimleri ve başarı hikayeleri
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <article
                  key={index}
                  className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-950/60 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{testimonial.avatar}</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                      {testimonial.company}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 p-8 lg:p-12 backdrop-blur-xl">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-2">
                Sık Sorulan Sorular
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Merak Ettiklerin
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Platform hakkında en çok sorulan sorular ve cevapları
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 overflow-hidden transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/30"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between group"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform flex-shrink-0 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 p-8 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Hemen Başla
              </h2>
              <p className="text-lg mb-8 text-cyan-50 max-w-2xl mx-auto">
                KariyerKöprü'ye katıl, ilk ilanını bul ve kariyerine başla. 
                Binlerce öğrenci gibi sen de profesyonel deneyim kazan.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="rounded-full bg-white px-8 py-4 text-base font-semibold text-cyan-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                >
                  Ücretsiz Kayıt Ol
                </Link>
                <Link
                  href="/ilan-bul"
                  className="rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/20 hover:scale-105"
                >
                  İlanları Görüntüle
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10 pt-8 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white">
              K
            </div>
            <p>© {new Date().getFullYear()} KariyerKöprü. Platform keşfet sayfası.</p>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Ana Sayfa
            </Link>
            <Link href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Destek
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
