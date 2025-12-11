"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../components/ThemeProvider";
import { useAuth } from "../contexts/AuthContext";

// Tüm ilanlar - kaydedilenler sayfası için
const allJobs = [
  {
    id: "1",
    company: "Lumina Tech",
    role: "Frontend Stajyeri",
    category: "Yazılım & Veri",
    type: "Yarı zamanlı • Hibrit",
    tags: ["React", "Tailwind", "Grafik API", "TypeScript", "Next.js", "Git"],
    salary: "₺8.000-12.000",
    location: "İstanbul",
    urgent: true,
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
  }
];

export default function KaydedilenlerPage() {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const { theme, toggleTheme, mounted } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      const userSavedJobs = saved.filter((job: any) => job.userId === user.id);
      setSavedJobs(userSavedJobs);
      setFilteredJobs(userSavedJobs);
    }
  }, [user]);

  useEffect(() => {
    if (activeFilter === "Tümü") {
      setFilteredJobs(savedJobs);
    } else {
      setFilteredJobs(savedJobs.filter((job: any) => job.category === activeFilter));
    }
  }, [activeFilter, savedJobs]);

  const handleRemoveSaved = (jobId: string) => {
    if (!user) return;
    
    const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const updated = saved.filter((job: any) => !(job.jobId === jobId && job.userId === user.id));
    localStorage.setItem("savedJobs", JSON.stringify(updated));
    
    const userSavedJobs = updated.filter((job: any) => job.userId === user.id);
    setSavedJobs(userSavedJobs);
    setFilteredJobs(userSavedJobs);
  };

  const categories = ["Tümü", "Yazılım & Veri", "Pazarlama & Büyüme", "Ürün & Tasarım", "Finans & Analiz", "Operasyon & Satış", "Mimarlık & Çizim", "Online Ders"];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Giriş Yapmanız Gerekiyor</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Kaydedilen ilanları görmek için giriş yapmalısınız.</p>
          <Link
            href="/login"
            className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

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
              href="/tum-ilanlar"
              className="relative text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Tüm İlanlar
            </Link>
            <Link
              href="/kaydedilenler"
              className="relative text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white font-semibold text-cyan-600 dark:text-cyan-400"
            >
              Kaydedilenler
            </Link>
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
                  <span className="text-2xl">💾</span>
                  Kaydedilen İlanlar
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Kaydettiğiniz İlanlar
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                  {filteredJobs.length} kaydedilmiş ilan bulundu. Daha sonra başvurmak istediğiniz ilanları burada saklayabilirsiniz.
                </p>
              </div>
              <Link
                href="/#arama"
                className="hidden md:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Yeni İlan Ara
              </Link>
            </div>
          </section>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">💾</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{savedJobs.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Toplam Kayıtlı</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{filteredJobs.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Görüntülenen</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {savedJobs.length > 0 ? Math.round((savedJobs.length / allJobs.length) * 100) : 0}%
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">İlan Oranı</p>
            </div>
          </section>

          {/* Filters */}
          {savedJobs.length > 0 && (
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Kategoriye Göre Filtrele</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                        activeFilter === category
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                          : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Saved Jobs List */}
          <section className="space-y-6">
            {filteredJobs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((savedJob) => {
                  const job = allJobs.find(j => j.id === savedJob.jobId);
                  if (!job) return null;

                  return (
                    <article
                      key={savedJob.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-950/60 p-6 backdrop-blur-xl transition-all hover:border-purple-400/50 dark:hover:border-purple-400/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                    >
                      {job.urgent && (
                        <div className="absolute top-4 right-4 rounded-full bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-300">
                          Acil
                        </div>
                      )}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-300 mb-1">
                              {job.company}
                            </p>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                              {job.role}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                              <span className="rounded-full bg-slate-100 dark:bg-white/5 px-2 py-1">
                                {job.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mb-3">
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>
                        <p className="text-base font-bold text-purple-600 dark:text-purple-400 mb-3">
                          {job.salary}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                          <span>💾 {new Date(savedJob.savedDate).toLocaleDateString('tr-TR')}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 px-3 py-1 text-xs text-purple-700 dark:text-purple-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {job.tags.length > 3 && (
                          <span className="rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs text-slate-500 dark:text-slate-400">
                            +{job.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Link
                          href={`/ilan/${job.id}`}
                          className="block w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105 text-center"
                        >
                          Detayları Gör
                        </Link>
                        <button
                          onClick={() => handleRemoveSaved(job.id)}
                          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-white transition-all hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-300 dark:hover:border-red-500/30 hover:text-red-600 dark:hover:text-red-400"
                        >
                          🗑️ Kayıttan Çıkar
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💾</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {savedJobs.length === 0 ? "Henüz Kaydedilmiş İlan Yok" : "Bu Kategoride İlan Yok"}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {savedJobs.length === 0
                    ? "Beğendiğiniz ilanları kaydederek daha sonra başvurabilirsiniz."
                    : "Farklı bir kategori seçmeyi deneyin."}
                </p>
                {savedJobs.length === 0 && (
                  <Link
                    href="/tum-ilanlar"
                    className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105"
                  >
                    İlanları Keşfet
                  </Link>
                )}
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10 pt-8 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white">
              K
            </div>
            <p>© {new Date().getFullYear()} KariyerKöprü. Kaydedilen ilanlar.</p>
          </div>
          <div className="flex gap-6">
            <Link href="/tum-ilanlar" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Tüm İlanlar
            </Link>
            <Link href="/" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Ana Sayfa
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

