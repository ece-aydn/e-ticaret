"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../components/ThemeProvider";
import { useAuth } from "../contexts/AuthContext";

// Tüm ilanlar - genişletilmiş liste
const allJobs = [
  {
    id: "1",
    company: "Lumina Tech",
    role: "Frontend Stajyeri",
    category: "Yazılım & Veri",
    type: "Yarı zamanlı • Hibrit",
    tags: ["React", "Tailwind", "Grafik API", "TypeScript"],
    salary: "₺8.000-12.000",
    location: "İstanbul",
    urgent: true,
    description: "Frontend geliştirme ekibinde staj yapacak, React ve TypeScript ile modern web uygulamaları geliştirecek öğrenci arıyoruz. Takım çalışması ve öğrenme odaklı bir ortamda deneyim kazanacaksınız.",
    requirements: ["React/Next.js bilgisi", "TypeScript", "Git kullanımı", "Takım çalışması"],
    experience: "Başlangıç seviyesi",
    postedDate: "2 gün önce",
    applicants: 24,
  },
  {
    id: "2",
    company: "Fable Studio",
    role: "İçerik & Büyüme Asistanı",
    category: "Pazarlama & Büyüme",
    type: "Proje bazlı • Remote",
    tags: ["KPI takibi", "Notion", "Adobe", "Sosyal Medya"],
    salary: "₺6.000-9.000",
    location: "Remote",
    urgent: false,
    description: "İçerik üretimi ve büyüme stratejilerinde görev alacak, sosyal medya yönetimi ve analitik takibi yapacak pazarlama odaklı öğrenci arıyoruz.",
    requirements: ["Sosyal medya deneyimi", "Analitik düşünme", "İçerik üretimi"],
    experience: "Başlangıç seviyesi",
    postedDate: "5 gün önce",
    applicants: 18,
  },
  {
    id: "3",
    company: "Northwind Labs",
    role: "Data Research Intern",
    category: "Yazılım & Veri",
    type: "Tam zamanlı • Kampüs",
    tags: ["Python", "GSheet", "PowerBI", "Data Analysis"],
    salary: "₺10.000-15.000",
    location: "Ankara",
    urgent: true,
    description: "Veri analizi ve araştırma projelerinde görev alacak, Python ve veri görselleştirme araçları kullanarak raporlama yapacak veri odaklı öğrenci arıyoruz.",
    requirements: ["Python programlama", "Veri analizi", "Excel/Google Sheets"],
    experience: "Orta seviye",
    postedDate: "1 gün önce",
    applicants: 32,
  },
  {
    id: "4",
    company: "CloudSync",
    role: "Backend Geliştirici",
    category: "Yazılım & Veri",
    type: "Yarı zamanlı • Remote",
    tags: ["Node.js", "PostgreSQL", "AWS", "REST API"],
    salary: "₺12.000-18.000",
    location: "Remote",
    urgent: false,
    description: "Backend API geliştirme, veritabanı tasarımı ve cloud servisleri konularında çalışacak backend odaklı öğrenci arıyoruz.",
    requirements: ["Node.js/Express", "Veritabanı bilgisi", "API tasarımı", "Cloud servisleri"],
    experience: "Orta seviye",
    postedDate: "3 gün önce",
    applicants: 15,
  },
  {
    id: "5",
    company: "Design Studio Pro",
    role: "UI/UX Tasarım Stajyeri",
    category: "Ürün & Tasarım",
    type: "Yarı zamanlı • Hibrit",
    tags: ["Figma", "User Research", "Prototyping", "Design Systems"],
    salary: "₺7.000-11.000",
    location: "İzmir",
    urgent: false,
    description: "UI/UX tasarım projelerinde görev alacak, kullanıcı araştırması ve prototipleme konularında deneyim kazanacak tasarım odaklı öğrenci arıyoruz.",
    requirements: ["Figma bilgisi", "Tasarım portföyü", "Kullanıcı odaklı düşünme"],
    experience: "Başlangıç seviyesi",
    postedDate: "4 gün önce",
    applicants: 28,
  },
  {
    id: "6",
    company: "Finance Solutions",
    role: "Finansal Analiz Stajyeri",
    category: "Finans & Analiz",
    type: "Tam zamanlı • Kampüs",
    tags: ["Excel", "Financial Modeling", "Data Analysis", "Reporting"],
    salary: "₺8.000-12.000",
    location: "Ankara",
    urgent: true,
    description: "Finansal raporlama ve analiz süreçlerinde görev alacak, Excel ve finansal modelleme konularında uzmanlaşacak finans odaklı öğrenci arıyoruz.",
    requirements: ["Excel ileri seviye", "Finansal analiz bilgisi", "Detay odaklı çalışma"],
    experience: "Başlangıç seviyesi",
    postedDate: "1 gün önce",
    applicants: 21,
  },
  {
    id: "7",
    company: "Marketing Hub",
    role: "Dijital Pazarlama Stajyeri",
    category: "Pazarlama & Büyüme",
    type: "Yarı zamanlı • Remote",
    tags: ["SEO", "Google Ads", "Social Media", "Content Marketing"],
    salary: "₺5.000-8.000",
    location: "Remote",
    urgent: false,
    description: "Dijital pazarlama kampanyalarında görev alacak, SEO, Google Ads ve sosyal medya yönetimi konularında deneyim kazanacak pazarlama odaklı öğrenci arıyoruz.",
    requirements: ["Dijital pazarlama ilgisi", "Analitik düşünme", "İletişim becerileri"],
    experience: "Başlangıç seviyesi",
    postedDate: "6 gün önce",
    applicants: 35,
  },
  {
    id: "8",
    company: "Operations Pro",
    role: "Operasyon Stajyeri",
    category: "Operasyon & Satış",
    type: "Tam zamanlı • Hibrit",
    tags: ["Operations", "Process Improvement", "CRM", "Project Management"],
    salary: "₺7.000-10.000",
    location: "İstanbul",
    urgent: false,
    description: "Operasyon süreçlerinde görev alacak, süreç iyileştirme ve proje yönetimi konularında deneyim kazanacak operasyon odaklı öğrenci arıyoruz.",
    requirements: ["Operasyonel düşünme", "Proje yönetimi", "Problem çözme"],
    experience: "Başlangıç seviyesi",
    postedDate: "3 gün önce",
    applicants: 19,
  },
  {
    id: "9",
    company: "AI Research Lab",
    role: "AI/ML Developer",
    category: "Yazılım & Veri",
    type: "Tam zamanlı • Kampüs",
    tags: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
    salary: "₺10.000-15.000",
    location: "Bursa",
    urgent: true,
    description: "Yapay zeka ve makine öğrenmesi modelleri geliştirecek, TensorFlow veya PyTorch kullanabilecek AI odaklı öğrenci arıyoruz.",
    requirements: ["AI/ML bilgisi", "TensorFlow/PyTorch", "Deep Learning", "Python"],
    experience: "İleri seviye",
    postedDate: "2 gün önce",
    applicants: 42,
  },
  {
    id: "10",
    company: "Content Creation Studio",
    role: "İçerik Üretimi Stajyeri",
    category: "Pazarlama & Büyüme",
    type: "Yarı zamanlı • Remote",
    tags: ["Content Writing", "SEO", "Social Media", "Video Editing"],
    salary: "₺5.000-8.000",
    location: "Remote",
    urgent: false,
    description: "İçerik üretimi ve pazarlama materyalleri hazırlama konularında görev alacak, yazılı ve görsel içerik üretimi yapacak yaratıcı öğrenci arıyoruz.",
    requirements: ["İyi yazım becerisi", "Yaratıcılık", "Sosyal medya bilgisi"],
    experience: "Başlangıç seviyesi",
    postedDate: "5 gün önce",
    applicants: 27,
  },
  {
    id: "11",
    company: "Architecture Firm",
    role: "Mimarlık Stajyeri",
    category: "Mimarlık & Çizim",
    type: "Tam zamanlı • Kampüs",
    tags: ["AutoCAD", "3D Modeling", "Architectural Design", "Project Management"],
    salary: "₺7.000-11.000",
    location: "Ankara",
    urgent: true,
    description: "Mimari projelerde görev alacak, AutoCAD ve 3D modelleme programları kullanarak tasarım ve çizim süreçlerinde deneyim kazanacak stajyer arıyoruz.",
    requirements: ["AutoCAD bilgisi", "3D modelleme", "Mimari tasarım ilgisi"],
    experience: "Başlangıç seviyesi",
    postedDate: "1 gün önce",
    applicants: 16,
  },
  {
    id: "12",
    company: "Customer Success Team",
    role: "Müşteri Başarısı Stajyeri",
    category: "Operasyon & Satış",
    type: "Yarı zamanlı • Hibrit",
    tags: ["Customer Relations", "CRM", "Problem Solving", "Communication"],
    salary: "₺5.000-8.000",
    location: "İstanbul",
    urgent: false,
    description: "Müşteri ilişkileri yönetiminde görev alacak, CRM sistemleri kullanarak müşteri memnuniyeti ve başarısı konularında deneyim kazanacak stajyer arıyoruz.",
    requirements: ["Müşteri ilişkileri", "CRM bilgisi", "Problem çözme becerisi"],
    experience: "Başlangıç seviyesi",
    postedDate: "4 gün önce",
    applicants: 22,
  },
  {
    id: "13",
    company: "Research & Development Lab",
    role: "Ar-Ge Stajyeri",
    category: "Yazılım & Veri",
    type: "Tam zamanlı • Kampüs",
    tags: ["Research", "Innovation", "Data Analysis", "Technical Writing"],
    salary: "₺8.000-12.000",
    location: "İzmir",
    urgent: true,
    description: "Araştırma ve geliştirme projelerinde görev alacak, yenilikçi çözümler geliştirme ve teknik raporlama konularında deneyim kazanacak stajyer arıyoruz.",
    requirements: ["Araştırma becerisi", "Analitik düşünme", "Teknik yazım"],
    experience: "Orta seviye",
    postedDate: "2 gün önce",
    applicants: 31,
  },
  {
    id: "14",
    company: "Sales & Business Development",
    role: "Satış ve İş Geliştirme Stajyeri",
    category: "Operasyon & Satış",
    type: "Yarı zamanlı • Hibrit",
    tags: ["Sales", "Business Development", "CRM", "Negotiation"],
    salary: "₺6.000-10.000",
    location: "İstanbul",
    urgent: false,
    description: "Satış ve iş geliştirme süreçlerinde görev alacak, müşteri ilişkileri ve pazarlama stratejileri konularında deneyim kazanacak stajyer arıyoruz.",
    requirements: ["Satış becerileri", "İletişim yeteneği", "İş geliştirme ilgisi"],
    experience: "Başlangıç seviyesi",
    postedDate: "5 gün önce",
    applicants: 29,
  },
  {
    id: "15",
    company: "Online Education Platform",
    role: "Eğitim İçeriği Geliştirici",
    category: "Online Ders",
    type: "Yarı zamanlı • Remote",
    tags: ["Content Creation", "Education", "Video Production", "Curriculum Design"],
    salary: "₺6.000-9.000",
    location: "Remote",
    urgent: false,
    description: "Online eğitim içerikleri geliştirme ve müfredat tasarımı konularında görev alacak, video üretimi ve içerik oluşturma yapacak eğitim odaklı öğrenci arıyoruz.",
    requirements: ["İçerik üretimi", "Eğitim bilgisi", "Video düzenleme"],
    experience: "Başlangıç seviyesi",
    postedDate: "3 gün önce",
    applicants: 20,
  },
];

const categories = ["Tümü", "Yazılım & Veri", "Pazarlama & Büyüme", "Ürün & Tasarım", "Finans & Analiz", "Operasyon & Satış", "Mimarlık & Çizim", "Online Ders"];
const workTypes = ["Tümü", "Remote", "Hibrit", "Kampüs", "Yarı Zamanlı", "Tam Zamanlı"];
const experienceLevels = ["Tümü", "Başlangıç seviyesi", "Orta seviye", "İleri seviye"];
const sortOptions = ["En Yeni", "En Eski", "Maaş (Yüksek)", "Maaş (Düşük)", "En Çok Başvuru", "En Az Başvuru"];

export default function TumIlanlarPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [activeWorkType, setActiveWorkType] = useState("Tümü");
  const [activeExperience, setActiveExperience] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("En Yeni");
  const [showFilters, setShowFilters] = useState(false);
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

  // Filtreleme ve sıralama
  const getFilteredAndSortedJobs = () => {
    let jobs = [...allJobs];

    // Kategori filtresi
    if (activeCategory !== "Tümü") {
      jobs = jobs.filter(job => job.category === activeCategory);
    }

    // Çalışma tipi filtresi
    if (activeWorkType !== "Tümü") {
      jobs = jobs.filter(job => {
        if (activeWorkType === "Remote") return job.type.includes("Remote");
        if (activeWorkType === "Hibrit") return job.type.includes("Hibrit");
        if (activeWorkType === "Kampüs") return job.type.includes("Kampüs");
        if (activeWorkType === "Yarı Zamanlı") return job.type.includes("Yarı zamanlı");
        if (activeWorkType === "Tam Zamanlı") return job.type.includes("Tam zamanlı");
        return true;
      });
    }

    // Deneyim seviyesi filtresi
    if (activeExperience !== "Tümü") {
      jobs = jobs.filter(job => job.experience === activeExperience);
    }

    // Arama filtresi - tüm kelimelere bak
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeText(searchQuery);
      const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);
      
      jobs = jobs.filter(job => {
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
        return queryWords.every((word) => normalizedText.includes(word));
      });
    }

    // Sıralama
    jobs.sort((a, b) => {
      switch (sortBy) {
        case "En Yeni":
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case "En Eski":
          return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
        case "Maaş (Yüksek)":
          const salaryA = parseInt(a.salary.split("-")[1]?.replace(/[^\d]/g, "") || "0");
          const salaryB = parseInt(b.salary.split("-")[1]?.replace(/[^\d]/g, "") || "0");
          return salaryB - salaryA;
        case "Maaş (Düşük)":
          const salaryALow = parseInt(a.salary.split("-")[0]?.replace(/[^\d]/g, "") || "0");
          const salaryBLow = parseInt(b.salary.split("-")[0]?.replace(/[^\d]/g, "") || "0");
          return salaryALow - salaryBLow;
        case "En Çok Başvuru":
          return b.applicants - a.applicants;
        case "En Az Başvuru":
          return a.applicants - b.applicants;
        default:
          return 0;
      }
    });

    return jobs;
  };

  const filteredJobs = getFilteredAndSortedJobs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
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
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 backdrop-blur-sm mb-4">
                  <span className="text-2xl">📋</span>
                  Tüm İlanlar
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Tüm Fırsatları Keşfet
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                  {filteredJobs.length} ilan bulundu. Filtreleme ve sıralama seçenekleriyle size en uygun fırsatı bulun.
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

          {/* Search and Filters */}
          <section className="space-y-6">
            {/* Search Bar */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400 dark:text-slate-500"
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
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pozisyon, şirket, teknoloji veya konum ara..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-white transition-all hover:border-cyan-500 dark:hover:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-500/10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filtreler
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Sırala:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Kategori</h3>
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

                <div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Çalışma Tipi</h3>
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

                <div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Deneyim Seviyesi</h3>
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
            )}
          </section>

          {/* Job Listings */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {filteredJobs.length} İlan Bulundu
              </h2>
            </div>

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
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-1">
                            {job.company}
                          </p>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {job.role}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                            <span className="rounded-full bg-slate-100 dark:bg-white/5 px-2 py-1">
                              {job.category}
                            </span>
                            <span>{job.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mb-3">
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                      <p className="text-base font-bold text-cyan-600 dark:text-cyan-400 mb-3">
                        {job.salary}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 mb-3">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <span>📅 {job.postedDate}</span>
                        <span>👥 {job.applicants} başvuru</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 px-3 py-1 text-xs text-cyan-700 dark:text-cyan-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {job.tags.length > 4 && (
                        <span className="rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs text-slate-500 dark:text-slate-400">
                          +{job.tags.length - 4}
                        </span>
                      )}
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
                <div className="col-span-3 text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Sonuç bulunamadı
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Aradığınız kriterlere uygun ilan bulunamadı. Filtreleri değiştirmeyi deneyin.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("Tümü");
                      setActiveWorkType("Tümü");
                      setActiveExperience("Tümü");
                    }}
                    className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10 pt-8 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white">
              K
            </div>
            <p>© {new Date().getFullYear()} KariyerKöprü. Tüm fırsatlar.</p>
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

