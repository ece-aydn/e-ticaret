"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../../components/ThemeProvider";
import { useAuth } from "../../contexts/AuthContext";

// Mock iş ilanları - Ürün & Tasarım kategorisi için
const designJobs = [
  {
    id: "1",
    company: "Pixel Studio",
    role: "UI/UX Tasarım Stajyeri",
    type: "Yarı zamanlı • Hibrit",
    tags: ["Figma", "Adobe XD", "Prototipleme", "User Research"],
    salary: "₺8.000-12.000",
    location: "İstanbul",
    urgent: true,
    description: "Dijital ürünler için kullanıcı arayüzü ve kullanıcı deneyimi tasarımları yapacak, prototipleme ve kullanıcı testleri gerçekleştirecek tasarım odaklı öğrenci arıyoruz.",
    requirements: ["Figma veya Adobe XD bilgisi", "Tasarım portföyü", "Kullanıcı odaklı düşünme"],
  },
  {
    id: "2",
    company: "Creative Labs",
    role: "Görsel Tasarım Asistanı",
    type: "Yarı zamanlı • Remote",
    tags: ["Photoshop", "Illustrator", "Branding", "Grafik Tasarım"],
    salary: "₺6.000-9.000",
    location: "Remote",
    urgent: false,
    description: "Marka kimliği, sosyal medya içerikleri ve pazarlama materyalleri tasarımında görev alacak yaratıcı öğrenci arıyoruz.",
    requirements: ["Adobe Creative Suite", "Görsel tasarım deneyimi", "Yaratıcı portföy"],
  },
  {
    id: "3",
    company: "Design System Co.",
    role: "Prototipleme Uzmanı",
    type: "Tam zamanlı • Kampüs",
    tags: ["Figma", "Principle", "Interaction Design", "Design Systems"],
    salary: "₺10.000-15.000",
    location: "Ankara",
    urgent: true,
    description: "Tasarım sistemleri oluşturma ve interaktif prototipler geliştirme konusunda deneyimli öğrenci arıyoruz.",
    requirements: ["Prototipleme araçları", "Design system bilgisi", "Interaction design"],
  },
  {
    id: "4",
    company: "Startup Design Hub",
    role: "Product Designer",
    type: "Yarı zamanlı • Remote",
    tags: ["Product Design", "User Journey", "Wireframing", "Usability Testing"],
    salary: "₺9.000-13.000",
    location: "Remote",
    urgent: false,
    description: "Yeni başlayan startup'lar için ürün tasarımı yapacak, kullanıcı yolculuğu haritalama ve wireframe oluşturma konularında çalışacak öğrenci arıyoruz.",
    requirements: ["Ürün tasarımı deneyimi", "User journey mapping", "Wireframing"],
  },
  {
    id: "5",
    company: "Digital Agency",
    role: "UI Designer",
    type: "Yarı zamanlı • Hibrit",
    tags: ["UI Design", "Mobile Design", "Web Design", "Responsive Design"],
    salary: "₺7.000-11.000",
    location: "İzmir",
    urgent: false,
    description: "Web ve mobil uygulamalar için arayüz tasarımları yapacak, responsive tasarım prensiplerini uygulayacak öğrenci arıyoruz.",
    requirements: ["UI tasarım portföyü", "Responsive design bilgisi", "Mobile-first yaklaşım"],
  },
  {
    id: "6",
    company: "UX Research Lab",
    role: "UX Research Asistanı",
    type: "Proje bazlı • Kampüs",
    tags: ["User Research", "Usability Testing", "Analytics", "Data Analysis"],
    salary: "₺5.000-8.000",
    location: "Bursa",
    urgent: true,
    description: "Kullanıcı araştırmaları yürütecek, usability testleri organize edecek ve veri analizi yapacak araştırma odaklı öğrenci arıyoruz.",
    requirements: ["User research metodolojisi", "Analitik düşünme", "Veri analizi"],
  },
  {
    id: "7",
    company: "Brand Identity Studio",
    role: "Brand Designer",
    type: "Yarı zamanlı • Remote",
    tags: ["Branding", "Logo Design", "Visual Identity", "Typography"],
    salary: "₺6.000-10.000",
    location: "Remote",
    urgent: false,
    description: "Marka kimliği tasarımları, logo tasarımları ve görsel kimlik çalışmalarında görev alacak öğrenci arıyoruz.",
    requirements: ["Branding deneyimi", "Logo tasarım portföyü", "Tipografi bilgisi"],
  },
  {
    id: "8",
    company: "App Design Studio",
    role: "Mobile UI/UX Designer",
    type: "Tam zamanlı • Hibrit",
    tags: ["Mobile Design", "iOS Design", "Android Design", "App Prototyping"],
    salary: "₺11.000-16.000",
    location: "İstanbul",
    urgent: true,
    description: "Mobil uygulamalar için UI/UX tasarımları yapacak, iOS ve Android platformları için özel tasarımlar geliştirecek öğrenci arıyoruz.",
    requirements: ["Mobil tasarım deneyimi", "Platform guidelines bilgisi", "App prototyping"],
  },
];

const filters = ["Tümü", "Remote", "Hibrit", "Kampüs", "Yarı Zamanlı", "Tam Zamanlı"];

// Türkçe karakterleri normalize eden fonksiyon
const normalizeText = (text: string) => {
  if (!text) return "";
  return text
    .replace(/İ/g, "i")
    .replace(/ı/g, "i")
    .replace(/Ğ/g, "g")
    .replace(/ğ/g, "g")
    .replace(/Ü/g, "u")
    .replace(/ü/g, "u")
    .replace(/Ş/g, "s")
    .replace(/ş/g, "s")
    .replace(/Ö/g, "o")
    .replace(/ö/g, "o")
    .replace(/Ç/g, "c")
    .replace(/ç/g, "c")
    .toLowerCase()
    .trim();
};

export default function UrunTasarimPage() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("sehir");
  const workTypeParam = searchParams.get("calisma-turu");

  // Çalışma şartı parametresinden filtre değerine dönüştür
  const getFilterFromWorkType = (workTypeSlug: string | null): string => {
    if (!workTypeSlug) return "Tümü";
    const normalizedSlug = normalizeText(workTypeSlug).replace(/-/g, " ");
    // Slug'dan filtre değerine dönüştür
    if (normalizedSlug.includes("hibrit")) return "Hibrit";
    if (normalizedSlug.includes("remote")) return "Remote";
    if (normalizedSlug.includes("kampus")) return "Kampüs";
    if (normalizedSlug.includes("yari") && normalizedSlug.includes("zamanli")) return "Yarı Zamanlı";
    if (normalizedSlug.includes("tam") && normalizedSlug.includes("zamanli")) return "Tam Zamanlı";
    if (normalizedSlug.includes("proje") && normalizedSlug.includes("bazli")) return "Proje bazlı";
    return "Tümü";
  };

  // Çoklu filtre seçimi için array state
  const initialFilter = getFilterFromWorkType(workTypeParam);
  const [activeFilters, setActiveFilters] = useState<string[]>(() => 
    initialFilter !== "Tümü" ? [initialFilter] : []
  );

  // Filtre toggle fonksiyonu
  const toggleFilter = (filter: string) => {
    if (filter === "Tümü") {
      setActiveFilters([]);
    } else {
      setActiveFilters(prev => {
        if (prev.includes(filter)) {
          return prev.filter(f => f !== filter);
        } else {
          return [...prev, filter];
        }
      });
    }
  };

  // Şehir ve çalışma şartı filtrelerini uygula (AND mantığı - hem şehir hem çalışma şartına uyanlar)
  let jobsToFilter = designJobs;
  
  // Eğer hem şehir hem çalışma şartı parametresi varsa, AND mantığı uygula
  if (cityParam && workTypeParam) {
    const normalizedCityParam = normalizeText(cityParam).replace(/-/g, " ");
    const workTypeFilter = getFilterFromWorkType(workTypeParam);
    
    jobsToFilter = designJobs.filter((job) => {
      // Şehir kontrolü
      const normalizedJobLocation = normalizeText(job.location);
      const cityParamClean = normalizedCityParam.replace(/\s+/g, "");
      const jobLocationClean = normalizedJobLocation.replace(/\s+/g, "");
      const matchesCity = jobLocationClean === cityParamClean || 
                         jobLocationClean.includes(cityParamClean) ||
                         cityParamClean.includes(jobLocationClean);
      
      // Çalışma şartı kontrolü
      let matchesWorkType = false;
      if (workTypeFilter === "Remote") matchesWorkType = job.type.includes("Remote");
      else if (workTypeFilter === "Hibrit") matchesWorkType = job.type.includes("Hibrit");
      else if (workTypeFilter === "Kampüs") matchesWorkType = job.type.includes("Kampüs");
      else if (workTypeFilter === "Yarı Zamanlı") matchesWorkType = job.type.includes("Yarı zamanlı");
      else if (workTypeFilter === "Tam Zamanlı") matchesWorkType = job.type.includes("Tam zamanlı");
      else if (workTypeFilter === "Proje bazlı") matchesWorkType = job.type.includes("Proje bazlı");
      
      // AND mantığı: Hem şehir hem çalışma şartına uyanlar
      return matchesCity && matchesWorkType;
    });
  } else if (cityParam) {
    // Sadece şehir filtresi
    const normalizedCityParam = normalizeText(cityParam).replace(/-/g, " ");
    jobsToFilter = designJobs.filter((job) => {
      const normalizedJobLocation = normalizeText(job.location);
      const cityParamClean = normalizedCityParam.replace(/\s+/g, "");
      const jobLocationClean = normalizedJobLocation.replace(/\s+/g, "");
      return jobLocationClean === cityParamClean || 
             jobLocationClean.includes(cityParamClean) ||
             cityParamClean.includes(jobLocationClean);
    });
  }

  // OR mantığı ile filtreleme - seçilen filtrelerden herhangi birine uyanlar
  const filteredJobs = activeFilters.length === 0
    ? jobsToFilter
    : jobsToFilter.filter((job) => {
        return activeFilters.some(filter => {
          if (filter === "Remote") return job.type.includes("Remote");
          if (filter === "Hibrit") return job.type.includes("Hibrit");
          if (filter === "Kampüs") return job.type.includes("Kampüs");
          if (filter === "Yarı Zamanlı") return job.type.includes("Yarı zamanlı");
          if (filter === "Tam Zamanlı") return job.type.includes("Tam zamanlı");
          if (filter === "Proje bazlı") return job.type.includes("Proje bazlı");
          return false;
        });
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
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
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-purple-500/10 dark:to-pink-500/10 p-8 lg:p-12 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-50 dark:bg-purple-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300 backdrop-blur-sm mb-4">
                  <span className="text-2xl">🎨</span>
                  Ürün & Tasarım
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Tasarım ve Ürün Geliştirme Fırsatları
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                  UI/UX tasarımı, görsel tasarım ve prototipleme alanlarında kariyer yapmak isteyen öğrenciler için özel fırsatlar. 
                  Yaratıcılığınızı kullanın ve portföyünüzü geliştirin.
                </p>
              </div>
              <Link
                href="/"
                className="hidden md:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Ana Sayfa
              </Link>
            </div>
          </section>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">🎨</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">32</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Aktif İlan</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">💼</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">248</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Toplam Başvuru</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">4.9</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Ortalama Puan</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">92%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Başarı Oranı</p>
            </div>
          </section>

          {/* Popular Skills */}
          <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Popüler Yetenekler</h3>
            <div className="flex flex-wrap gap-2">
              {["Figma", "Adobe XD", "Photoshop", "Illustrator", "Prototipleme", "User Research", "UI Design", "UX Design", "Wireframing", "Design Systems"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 px-4 py-2 text-sm text-purple-700 dark:text-purple-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Filters */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Mevcut Fırsatlar
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {filteredJobs.length} ilan bulundu
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    filter === "Tümü" 
                      ? activeFilters.length === 0
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                        : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                      : activeFilters.includes(filter)
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                        : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Job Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <article
                  key={job.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-950/60 p-6 backdrop-blur-xl transition-all hover:border-purple-400/50 dark:hover:border-purple-400/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {job.urgent && (
                    <div className="absolute top-4 right-4 rounded-full bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-300">
                      Acil
                    </div>
                  )}
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-300 mb-1">
                      {job.company}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {job.role}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mb-3">
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                    <p className="text-base font-bold text-purple-600 dark:text-purple-400 mb-3">
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
                            <span className="text-purple-500">•</span>
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
                        className="rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 px-3 py-1 text-xs text-purple-700 dark:text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/ilan/urun-tasarim-${job.id}`}
                    className="block w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-slate-700 text-center"
                  >
                    Detayları Gör
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10 pt-8 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white">
              K
            </div>
            <p>© {new Date().getFullYear()} KariyerKöprü. Ürün & Tasarım fırsatları.</p>
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








