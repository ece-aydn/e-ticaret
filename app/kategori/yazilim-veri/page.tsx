"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../../components/ThemeProvider";
import { useAuth } from "../../contexts/AuthContext";

// Mock iş ilanları - Yazılım & Veri kategorisi için
const softwareJobs = [
  {
    id: "1",
    company: "TechStart Solutions",
    role: "Frontend Developer Stajyeri",
    type: "Yarı zamanlı • Remote",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    salary: "₺10.000-15.000",
    location: "Remote",
    urgent: true,
    description: "Modern web uygulamaları geliştirmek için React ve Next.js kullanarak frontend geliştirme yapacak öğrenci arıyoruz.",
    requirements: ["React/Next.js bilgisi", "TypeScript", "Git kullanımı"],
  },
  {
    id: "2",
    company: "MobileDev Inc.",
    role: "Mobile App Developer",
    type: "Yarı zamanlı • Hibrit",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    salary: "₺12.000-18.000",
    location: "İstanbul",
    urgent: false,
    description: "Mobil uygulama geliştirme konusunda deneyimli, React Native veya Flutter ile çalışabilecek öğrenci arıyoruz.",
    requirements: ["Mobil geliştirme deneyimi", "React Native/Flutter", "API entegrasyonu"],
  },
  {
    id: "3",
    company: "DataScience Labs",
    role: "Data Science Intern",
    type: "Tam zamanlı • Kampüs",
    tags: ["Python", "Machine Learning", "Pandas", "Data Analysis"],
    salary: "₺8.000-12.000",
    location: "Ankara",
    urgent: true,
    description: "Veri analizi ve makine öğrenmesi projelerinde görev alacak, Python ve veri bilimi kütüphaneleri konusunda bilgili öğrenci arıyoruz.",
    requirements: ["Python programlama", "Veri analizi", "Machine Learning temelleri"],
  },
  {
    id: "4",
    company: "Backend Systems",
    role: "Backend Developer",
    type: "Yarı zamanlı • Remote",
    tags: ["Node.js", "PostgreSQL", "REST API", "AWS"],
    salary: "₺11.000-16.000",
    location: "Remote",
    urgent: false,
    description: "Backend API geliştirme, veritabanı tasarımı ve cloud servisleri konularında çalışacak öğrenci arıyoruz.",
    requirements: ["Node.js/Express", "Veritabanı bilgisi", "API tasarımı"],
  },
  {
    id: "5",
    company: "QA Testing Hub",
    role: "QA Test Engineer",
    type: "Yarı zamanlı • Hibrit",
    tags: ["Testing", "Automation", "Selenium", "Jest"],
    salary: "₺7.000-10.000",
    location: "İzmir",
    urgent: false,
    description: "Yazılım test süreçlerinde görev alacak, otomasyon testleri yazabilecek kalite güvence odaklı öğrenci arıyoruz.",
    requirements: ["Test metodolojileri", "Otomasyon testleri", "Test araçları"],
  },
  {
    id: "6",
    company: "FullStack Studio",
    role: "Full Stack Developer",
    type: "Tam zamanlı • Remote",
    tags: ["React", "Node.js", "MongoDB", "Full Stack"],
    salary: "₺13.000-20.000",
    location: "Remote",
    urgent: true,
    description: "Hem frontend hem backend geliştirme yapabilecek, full stack projelerde çalışacak deneyimli öğrenci arıyoruz.",
    requirements: ["Full stack deneyimi", "React & Node.js", "Veritabanı bilgisi"],
  },
  {
    id: "7",
    company: "DevOps Solutions",
    role: "DevOps Intern",
    type: "Yarı zamanlı • Remote",
    tags: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    salary: "₺9.000-13.000",
    location: "Remote",
    urgent: false,
    description: "CI/CD pipeline'ları kurma, containerization ve cloud infrastructure yönetimi konularında çalışacak öğrenci arıyoruz.",
    requirements: ["Docker/Kubernetes", "CI/CD bilgisi", "Cloud servisleri"],
  },
  {
    id: "8",
    company: "AI Research Lab",
    role: "AI/ML Developer",
    type: "Tam zamanlı • Kampüs",
    tags: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
    salary: "₺10.000-15.000",
    location: "Bursa",
    urgent: true,
    description: "Yapay zeka ve makine öğrenmesi modelleri geliştirecek, TensorFlow veya PyTorch kullanabilecek öğrenci arıyoruz.",
    requirements: ["AI/ML bilgisi", "TensorFlow/PyTorch", "Deep Learning"],
  },
  {
    id: "9",
    company: "Web3 Startup",
    role: "Blockchain Developer",
    type: "Yarı zamanlı • Remote",
    tags: ["Solidity", "Web3", "Ethereum", "Smart Contracts"],
    salary: "₺12.000-18.000",
    location: "Remote",
    urgent: false,
    description: "Blockchain teknolojileri ve smart contract geliştirme konularında çalışacak, Web3 ekosistemine ilgili öğrenci arıyoruz.",
    requirements: ["Blockchain bilgisi", "Solidity", "Web3.js"],
  },
  {
    id: "10",
    company: "GameDev Studio",
    role: "Game Developer",
    type: "Yarı zamanlı • Hibrit",
    tags: ["Unity", "C#", "Game Development", "3D"],
    salary: "₺8.000-12.000",
    location: "İstanbul",
    urgent: false,
    description: "Unity oyun motoru kullanarak oyun geliştirme yapacak, C# programlama bilgisi olan öğrenci arıyoruz.",
    requirements: ["Unity bilgisi", "C# programlama", "Oyun geliştirme deneyimi"],
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

export default function YazilimVeriPage() {
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
  let jobsToFilter = softwareJobs;
  
  // Eğer hem şehir hem çalışma şartı parametresi varsa, AND mantığı uygula
  if (cityParam && workTypeParam) {
    const normalizedCityParam = normalizeText(cityParam).replace(/-/g, " ");
    const workTypeFilter = getFilterFromWorkType(workTypeParam);
    
    jobsToFilter = softwareJobs.filter((job) => {
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
    jobsToFilter = softwareJobs.filter((job) => {
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
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
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 dark:from-blue-500/10 dark:to-cyan-500/10 p-8 lg:p-12 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-50 dark:bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300 backdrop-blur-sm mb-4">
                  <span className="text-2xl">💻</span>
                  Yazılım & Veri
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Yazılım Geliştirme ve Veri Bilimi Fırsatları
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                  Web, mobil, veri bilimi ve QA alanlarında kariyer yapmak isteyen öğrenciler için özel fırsatlar. 
                  En güncel teknolojilerle çalışın ve deneyim kazanın.
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
              <div className="text-3xl mb-2">💻</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">48</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Aktif İlan</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">👨‍💻</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">412</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Toplam Başvuru</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">4.7</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Ortalama Puan</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">94%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Başarı Oranı</p>
            </div>
          </section>

          {/* Popular Skills */}
          <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Popüler Teknolojiler</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "Python", "JavaScript", "TypeScript", "Next.js", "MongoDB", "PostgreSQL", "AWS", "Docker", "Git", "Machine Learning"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-4 py-2 text-sm text-blue-700 dark:text-blue-300 font-medium"
                >
                  {tech}
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
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                      : activeFilters.includes(filter)
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
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
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-950/60 p-6 backdrop-blur-xl transition-all hover:border-blue-400/50 dark:hover:border-blue-400/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  {job.urgent && (
                    <div className="absolute top-4 right-4 rounded-full bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-300">
                      Acil
                    </div>
                  )}
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-300 mb-1">
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
                    <p className="text-base font-bold text-blue-600 dark:text-blue-400 mb-3">
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
                            <span className="text-blue-500">•</span>
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
                        className="rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-3 py-1 text-xs text-blue-700 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/ilan/yazilim-veri-${job.id}`}
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
            <p>© {new Date().getFullYear()} KariyerKöprü. Yazılım & Veri fırsatları.</p>
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








