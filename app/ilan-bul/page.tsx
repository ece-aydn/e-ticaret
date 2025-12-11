"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../components/ThemeProvider";
import { useAuth } from "../contexts/AuthContext";

// Mock ilanlar - tüm kategorilerden
const allJobs = [
  {
    id: "1",
    company: "TechCorp",
    role: "Frontend Stajyeri",
    category: "Yazılım & Veri",
    type: "Yarı zamanlı • Hibrit",
    tags: ["React", "TypeScript", "Tailwind", "Staj"],
    salary: "₺8.000-12.000",
    location: "İstanbul",
    urgent: true,
    description: "Frontend geliştirme ekibinde staj yapacak, React ve TypeScript ile modern web uygulamaları geliştirecek öğrenci arıyoruz.",
    requirements: ["React bilgisi", "TypeScript", "Git"],
    experience: "Başlangıç seviyesi",
  },
  {
    id: "2",
    company: "Design Studio",
    role: "UI/UX Tasarım Stajyeri",
    category: "Ürün & Tasarım",
    type: "Yarı zamanlı • Remote",
    tags: ["Figma", "UI/UX", "Tasarım", "Staj"],
    salary: "₺7.000-10.000",
    location: "Remote",
    urgent: false,
    description: "UI/UX tasarım ekibinde çalışacak, kullanıcı deneyimi tasarımları yapacak ve prototipleme yapacak tasarım odaklı öğrenci arıyoruz.",
    requirements: ["Figma bilgisi", "Tasarım portföyü", "Yaratıcılık"],
    experience: "Başlangıç seviyesi",
  },
  {
    id: "3",
    company: "Marketing Pro",
    role: "Dijital Pazarlama Asistanı",
    category: "Pazarlama & Büyüme",
    type: "Yarı zamanlı • Hibrit",
    tags: ["Sosyal Medya", "İçerik", "Pazarlama", "Staj"],
    salary: "₺6.000-9.000",
    location: "Ankara",
    urgent: true,
    description: "Dijital pazarlama ekibinde sosyal medya yönetimi ve içerik üretimi yapacak pazarlama odaklı öğrenci arıyoruz.",
    requirements: ["Sosyal medya deneyimi", "İçerik üretimi", "Yaratıcı düşünme"],
    experience: "Başlangıç seviyesi",
  },
  {
    id: "4",
    company: "FinanceHub",
    role: "Finansal Analiz Stajyeri",
    category: "Finans & Analiz",
    type: "Yarı zamanlı • Hibrit",
    tags: ["Excel", "Finans", "Analiz", "Staj"],
    salary: "₺8.000-12.000",
    location: "İzmir",
    urgent: false,
    description: "Finansal analiz ekibinde çalışacak, Excel ile raporlama yapacak ve finansal verileri analiz edecek öğrenci arıyoruz.",
    requirements: ["Excel ileri seviye", "Finansal analiz", "Raporlama"],
    experience: "Orta seviye",
  },
  {
    id: "5",
    company: "DataLab",
    role: "Veri Bilimi Stajyeri",
    category: "Yazılım & Veri",
    type: "Tam zamanlı • Remote",
    tags: ["Python", "Machine Learning", "Veri", "Staj"],
    salary: "₺10.000-15.000",
    location: "Remote",
    urgent: true,
    description: "Veri bilimi ekibinde Python ve machine learning projelerinde çalışacak veri bilimi öğrencisi arıyoruz.",
    requirements: ["Python bilgisi", "Machine Learning", "Veri analizi"],
    experience: "Orta seviye",
  },
  {
    id: "6",
    company: "Architect Studio",
    role: "Mimari Çizim Stajyeri",
    category: "Mimarlık & Çizim",
    type: "Yarı zamanlı • Hibrit",
    tags: ["AutoCAD", "Mimari", "Çizim", "Staj"],
    salary: "₺7.000-11.000",
    location: "Bursa",
    urgent: false,
    description: "Mimari projeler için teknik çizimler yapacak, AutoCAD kullanarak plan ve kesit çizimleri hazırlayacak mimarlık öğrencisi arıyoruz.",
    requirements: ["AutoCAD bilgisi", "Mimari çizim", "Teknik çizim"],
    experience: "Başlangıç seviyesi",
  },
  {
    id: "7",
    company: "EduCenter",
    role: "Matematik Öğretmeni (Online)",
    category: "Online Ders",
    type: "Yarı zamanlı • Remote",
    tags: ["Matematik", "Öğretmenlik", "Online", "Ders"],
    salary: "₺150-250/saat",
    location: "Remote",
    urgent: true,
    description: "Lise öğrencilerine matematik dersi vermek, konu anlatımı yapmak ve soru çözümü yapmak için matematik alanında başarılı öğrenci arıyoruz.",
    requirements: ["Matematik bilgisi", "Öğretme becerisi", "Online platform"],
    experience: "Başlangıç seviyesi",
  },
  {
    id: "8",
    company: "SalesForce",
    role: "Müşteri İlişkileri Stajyeri",
    category: "Operasyon & Satış",
    type: "Yarı zamanlı • Hibrit",
    tags: ["Satış", "Müşteri", "CRM", "Staj"],
    salary: "₺6.000-9.000",
    location: "İstanbul",
    urgent: false,
    description: "Müşteri ilişkileri ekibinde çalışacak, CRM sistemleri kullanacak ve müşteri yönetimi yapacak öğrenci arıyoruz.",
    requirements: ["İletişim becerileri", "CRM bilgisi", "Müşteri hizmetleri"],
    experience: "Başlangıç seviyesi",
  },
];

const categories = [
  "Tümü",
  "Yazılım & Veri",
  "Ürün & Tasarım",
  "Pazarlama & Büyüme",
  "Finans & Analiz",
  "Mimarlık & Çizim",
  "Online Ders",
  "Operasyon & Satış",
];

const workTypes = ["Tümü", "Remote", "Hibrit", "Kampüs", "Yarı Zamanlı", "Tam Zamanlı"];
const experienceLevels = ["Tümü", "Başlangıç seviyesi", "Orta seviye", "İleri seviye"];

export default function IlanBulPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [activeWorkType, setActiveWorkType] = useState("Tümü");
  const [activeExperience, setActiveExperience] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme, mounted } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  // Türkçe karakterleri normalize eden fonksiyon
  const normalizeText = (text: string) => {
    return text
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
      .trim();
  };

  const filteredJobs = allJobs.filter((job) => {
    if (activeCategory !== "Tümü" && job.category !== activeCategory) return false;
    if (activeWorkType !== "Tümü") {
      if (activeWorkType === "Remote" && !job.type.includes("Remote")) return false;
      if (activeWorkType === "Hibrit" && !job.type.includes("Hibrit")) return false;
      if (activeWorkType === "Kampüs" && !job.type.includes("Kampüs")) return false;
      if (activeWorkType === "Yarı Zamanlı" && !job.type.includes("Yarı zamanlı")) return false;
      if (activeWorkType === "Tam Zamanlı" && !job.type.includes("Tam zamanlı")) return false;
    }
    if (activeExperience !== "Tümü" && job.experience !== activeExperience) return false;
    
    // Arama - tüm kelimelere bak
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeText(searchQuery);
      const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);
      
      const searchableText = [
        job.company,
        job.role,
        job.category,
        job.type,
        job.location,
        job.description,
        ...job.tags,
      ].join(" ");
      
      const normalizedText = normalizeText(searchableText);
      
      // Her kelime için kontrol et (AND mantığı)
      if (!queryWords.every((word) => normalizedText.includes(word))) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
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
              className="relative text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Ana Sayfa
            </Link>
            {user && (
              <Link
                href="/profile"
                className="relative text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
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

        <main className="flex flex-1 flex-col gap-8">
          {/* Hero Section */}
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-br from-cyan-100/50 to-blue-100/50 dark:from-cyan-500/10 dark:to-blue-500/10 p-8 lg:p-12 backdrop-blur-xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 backdrop-blur-sm mb-4">
                <span className="text-2xl">🎯</span>
                İlk İlanını Bul
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Senin için en uygun ilanı bul
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                Yeteneklerine, müsaitlik durumuna ve hedeflerine göre kişiselleştirilmiş ilan önerileri. 
                Hemen başla ve kariyerine ilk adımı at.
              </p>
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pozisyon, şirket veya beceri ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-2 border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900/80 px-6 py-4 pl-12 text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{allJobs.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Toplam İlan</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{filteredJobs.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Uygun İlan</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">24s</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Ortalama Başvuru</p>
            </div>
          </section>

          {/* Filters */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  İlanlar
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {filteredJobs.length} ilan bulundu
                </p>
              </div>
            </div>

            {/* Category Filters */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Kategori</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                        activeCategory === category
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                          : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work Type Filters */}
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Çalışma Şekli</p>
                <div className="flex flex-wrap gap-2">
                  {workTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveWorkType(type)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                        activeWorkType === type
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                          : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level Filters */}
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Deneyim Seviyesi</p>
                <div className="flex flex-wrap gap-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setActiveExperience(level)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                        activeExperience === level
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                          : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <article
                    key={job.id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-950/60 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10"
                  >
                    {job.urgent && (
                      <div className="absolute top-4 right-4 rounded-full bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-300">
                        Acil
                      </div>
                    )}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-1">
                        {job.company}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {job.role}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                          {job.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mb-2">
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <span>📊</span>
                        <span>{job.experience}</span>
                      </div>
                      <p className="text-base font-bold text-cyan-600 dark:text-cyan-400 mb-3">
                        {job.salary}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 mb-3">
                        {job.description}
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Gereksinimler:
                        </p>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          {job.requirements.slice(0, 2).map((req, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-cyan-500">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 px-3 py-1 text-xs text-cyan-700 dark:text-cyan-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/ilan/${job.id}`}
                      className="block w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-slate-700 text-center"
                    >
                      Detayları Gör
                    </Link>
                  </article>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    İlan bulunamadı
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Filtreleri değiştirerek tekrar deneyin
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Tips Section */}
          <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-cyan-500/10 dark:to-blue-500/10 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">💡 İpuçları</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Profilini Tamamla</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Profilini tamamlayarak daha uygun ilan önerileri alabilirsin.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📝</span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">CV'ni Güncelle</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Güncel CV'n ile başvuru şansını artırabilirsin.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Filtreleri Kullan</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Kategori, çalışma şekli ve deneyim seviyesine göre filtrele.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Hızlı Başvur</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    İlanlara hızlı başvuru yaparak zaman kazan.
                  </p>
                </div>
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
            <p>© {new Date().getFullYear()} KariyerKöprü. İlan bulma platformu.</p>
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






