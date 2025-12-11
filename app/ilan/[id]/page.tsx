"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../../components/ThemeProvider";
import { useAuth } from "../../contexts/AuthContext";

// Tüm ilanlar - detay sayfası için
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
    description: "Frontend geliştirme ekibinde staj yapacak, React ve TypeScript ile modern web uygulamaları geliştirecek öğrenci arıyoruz. Takım çalışması ve öğrenme odaklı bir ortamda deneyim kazanacaksınız.",
    fullDescription: `Lumina Tech olarak, yenilikçi web uygulamaları geliştiren bir ekibiz. Frontend geliştirme ekibimizde staj yapacak, modern teknolojilerle çalışma fırsatı bulacaksınız.

**Görevler:**
- React ve Next.js kullanarak modern web uygulamaları geliştirmek
- TypeScript ile tip güvenli kod yazmak
- Tailwind CSS ile responsive tasarımlar oluşturmak
- Git kullanarak versiyon kontrolü yapmak
- Takım içi code review süreçlerine katılmak
- API entegrasyonları yapmak

**Kazanımlar:**
- Gerçek projelerde deneyim kazanma
- Senior geliştiricilerden mentorluk alma
- Modern frontend teknolojilerini öğrenme
- Portfolio geliştirme fırsatı
- İş dünyasına adım atma`,
    requirements: [
      "React/Next.js bilgisi",
      "TypeScript temel bilgisi",
      "Git kullanımı",
      "Takım çalışması",
      "Öğrenme isteği",
      "İletişim becerileri"
    ],
    niceToHave: [
      "Tailwind CSS deneyimi",
      "API entegrasyonu bilgisi",
      "Test yazma deneyimi",
      "Open source proje katkısı"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "2 gün önce",
    applicants: 24,
    companyInfo: {
      name: "Lumina Tech",
      size: "50-100 çalışan",
      industry: "Teknoloji",
      website: "www.luminatech.com",
      about: "Lumina Tech, modern web teknolojileri ile yenilikçi çözümler geliştiren bir teknoloji şirketidir. 2018'den beri faaliyet gösteren şirketimiz, öğrenci dostu bir çalışma ortamı sunmaktadır."
    },
    benefits: [
      "Esnek çalışma saatleri",
      "Mentorluk desteği",
      "Öğrenme bütçesi",
      "Ekip etkinlikleri",
      "Uzaktan çalışma imkanı"
    ]
  },
  {
    id: "2",
    company: "Fable Studio",
    role: "İçerik & Büyüme Asistanı",
    category: "Pazarlama & Büyüme",
    type: "Proje bazlı • Remote",
    tags: ["KPI takibi", "Notion", "Adobe", "Sosyal Medya", "Analytics"],
    salary: "₺6.000-9.000",
    location: "Remote",
    urgent: false,
    description: "İçerik üretimi ve büyüme stratejilerinde görev alacak, sosyal medya yönetimi ve analitik takibi yapacak pazarlama odaklı öğrenci arıyoruz.",
    fullDescription: `Fable Studio olarak, yaratıcı içerik ve büyüme stratejileri geliştiren bir ekibiz. İçerik ve büyüme ekibimizde proje bazlı çalışacak, dijital pazarlama dünyasında deneyim kazanacaksınız.

**Görevler:**
- Sosyal medya içerikleri üretmek ve planlamak
- KPI takibi ve raporlama yapmak
- Notion ile proje yönetimi yapmak
- Adobe araçları ile görsel içerik hazırlamak
- Analytics verilerini analiz etmek
- Büyüme stratejileri geliştirmek

**Kazanımlar:**
- Dijital pazarlama deneyimi
- İçerik üretimi becerileri
- Analitik düşünme yetisi
- Remote çalışma deneyimi`,
    requirements: [
      "Sosyal medya deneyimi",
      "Analitik düşünme",
      "İçerik üretimi",
      "Notion kullanımı",
      "Adobe temel bilgisi"
    ],
    niceToHave: [
      "SEO bilgisi",
      "Video düzenleme",
      "Copywriting deneyimi",
      "Google Analytics sertifikası"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "5 gün önce",
    applicants: 18,
    companyInfo: {
      name: "Fable Studio",
      size: "20-50 çalışan",
      industry: "Dijital Pazarlama",
      website: "www.fablestudio.com",
      about: "Fable Studio, yaratıcı içerik ve büyüme stratejileri konusunda uzmanlaşmış bir dijital pazarlama ajansıdır."
    },
    benefits: [
      "Tam remote çalışma",
      "Esnek saatler",
      "Yaratıcı özgürlük",
      "Portfolio geliştirme"
    ]
  },
  {
    id: "3",
    company: "Northwind Labs",
    role: "Data Research Intern",
    category: "Yazılım & Veri",
    type: "Tam zamanlı • Kampüs",
    tags: ["Python", "GSheet", "PowerBI", "Data Analysis", "SQL"],
    salary: "₺10.000-15.000",
    location: "Ankara",
    urgent: true,
    description: "Veri analizi ve araştırma projelerinde görev alacak, Python ve veri görselleştirme araçları kullanarak raporlama yapacak veri odaklı öğrenci arıyoruz.",
    fullDescription: `Northwind Labs, veri bilimi ve araştırma konusunda öncü bir laboratuvardır. Veri araştırma ekibimizde tam zamanlı çalışacak, veri analizi ve görselleştirme konularında uzmanlaşacaksınız.

**Görevler:**
- Python ile veri analizi yapmak
- Google Sheets ve Excel ile veri işleme
- PowerBI ile görselleştirme yapmak
- SQL sorguları yazmak
- Araştırma raporları hazırlamak
- Veri kalitesi kontrolü yapmak

**Kazanımlar:**
- Veri bilimi deneyimi
- Python programlama becerileri
- Veri görselleştirme yetisi
- Araştırma metodolojisi`,
    requirements: [
      "Python programlama",
      "Veri analizi",
      "Excel/Google Sheets",
      "Analitik düşünme",
      "Raporlama becerisi"
    ],
    niceToHave: [
      "SQL bilgisi",
      "PowerBI deneyimi",
      "Machine Learning temelleri",
      "İstatistik bilgisi"
    ],
    experience: "Orta seviye",
    postedDate: "1 gün önce",
    applicants: 32,
    companyInfo: {
      name: "Northwind Labs",
      size: "100+ çalışan",
      industry: "Veri Bilimi & Araştırma",
      website: "www.northwindlabs.com",
      about: "Northwind Labs, akademik ve endüstriyel araştırma projelerinde veri bilimi çözümleri sunan önde gelen bir laboratuvardır."
    },
    benefits: [
      "Kampüs içi çalışma",
      "Araştırma fırsatları",
      "Akademik iş birliği",
      "Yüksek maaş",
      "Kariyer gelişimi"
    ]
  },
  {
    id: "4",
    company: "CloudSync",
    role: "Backend Geliştirici",
    category: "Yazılım & Veri",
    type: "Yarı zamanlı • Remote",
    tags: ["Node.js", "PostgreSQL", "AWS", "REST API", "Docker"],
    salary: "₺12.000-18.000",
    location: "Remote",
    urgent: false,
    description: "Backend API geliştirme, veritabanı tasarımı ve cloud servisleri konularında çalışacak backend odaklı öğrenci arıyoruz.",
    fullDescription: `CloudSync, bulut tabanlı çözümler geliştiren bir teknoloji şirketidir. Backend ekibimizde yarı zamanlı remote çalışacak, modern backend teknolojileri ile çalışma fırsatı bulacaksınız.

**Görevler:**
- Node.js ile REST API geliştirmek
- PostgreSQL veritabanı tasarımı ve yönetimi
- AWS servisleri entegrasyonu
- Docker ile containerization
- API dokümantasyonu yazmak
- Test yazma ve code review

**Kazanımlar:**
- Backend geliştirme deneyimi
- Cloud teknolojileri bilgisi
- Veritabanı yönetimi
- Remote çalışma deneyimi`,
    requirements: [
      "Node.js/Express",
      "Veritabanı bilgisi",
      "API tasarımı",
      "Cloud servisleri",
      "Git kullanımı"
    ],
    niceToHave: [
      "PostgreSQL deneyimi",
      "AWS sertifikası",
      "Docker bilgisi",
      "Microservices mimarisi"
    ],
    experience: "Orta seviye",
    postedDate: "3 gün önce",
    applicants: 15,
    companyInfo: {
      name: "CloudSync",
      size: "50-100 çalışan",
      industry: "Cloud Computing",
      website: "www.cloudsync.com",
      about: "CloudSync, kurumsal bulut çözümleri sunan ve öğrenci dostu çalışma ortamı sağlayan bir teknoloji şirketidir."
    },
    benefits: [
      "Tam remote",
      "Yüksek maaş",
      "Esnek saatler",
      "Teknoloji bütçesi",
      "Eğitim desteği"
    ]
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
    fullDescription: `Design Studio Pro, kullanıcı odaklı tasarımlar geliştiren bir tasarım stüdyosudur. UI/UX ekibimizde hibrit çalışacak, modern tasarım araçları ve metodolojileri öğreneceksiniz.

**Görevler:**
- Figma ile UI tasarımları yapmak
- Kullanıcı araştırmaları yürütmek
- Prototipleme yapmak
- Design system oluşturmak
- Kullanıcı testleri organize etmek
- Tasarım dokümantasyonu hazırlamak

**Kazanımlar:**
- UI/UX tasarım deneyimi
- Kullanıcı araştırma metodolojisi
- Prototipleme becerileri
- Portfolio geliştirme`,
    requirements: [
      "Figma bilgisi",
      "Tasarım portföyü",
      "Kullanıcı odaklı düşünme",
      "Yaratıcılık",
      "İletişim becerileri"
    ],
    niceToHave: [
      "User research deneyimi",
      "Prototyping araçları",
      "Design system bilgisi",
      "HTML/CSS temel bilgisi"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "4 gün önce",
    applicants: 28,
    companyInfo: {
      name: "Design Studio Pro",
      size: "20-50 çalışan",
      industry: "Tasarım",
      website: "www.designstudiopro.com",
      about: "Design Studio Pro, kullanıcı deneyimi odaklı tasarımlar geliştiren ve öğrenci yeteneklerini destekleyen bir tasarım stüdyosudur."
    },
    benefits: [
      "Hibrit çalışma",
      "Tasarım araçları erişimi",
      "Mentorluk",
      "Portfolio desteği",
      "Yaratıcı özgürlük"
    ]
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
    fullDescription: `Finance Solutions, finansal danışmanlık ve analiz hizmetleri sunan bir şirkettir. Finans ekibimizde tam zamanlı kampüs içi çalışacak, finansal analiz konularında uzmanlaşacaksınız.

**Görevler:**
- Excel ile finansal modelleme yapmak
- Finansal raporlar hazırlamak
- Veri analizi ve yorumlama
- Dashboard oluşturmak
- Finansal tahminler yapmak
- Rapor sunumları hazırlamak

**Kazanımlar:**
- Finansal analiz deneyimi
- Excel ileri seviye kullanımı
- Finansal modelleme
- İş dünyası deneyimi`,
    requirements: [
      "Excel ileri seviye",
      "Finansal analiz bilgisi",
      "Detay odaklı çalışma",
      "Analitik düşünme",
      "Raporlama becerisi"
    ],
    niceToHave: [
      "Financial modeling deneyimi",
      "PowerBI bilgisi",
      "SQL temel bilgisi",
      "Mali muhasebe bilgisi"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "1 gün önce",
    applicants: 21,
    companyInfo: {
      name: "Finance Solutions",
      size: "50-100 çalışan",
      industry: "Finansal Danışmanlık",
      website: "www.financesolutions.com",
      about: "Finance Solutions, kurumsal finansal danışmanlık ve analiz hizmetleri sunan, öğrenci dostu bir şirkettir."
    },
    benefits: [
      "Kampüs içi çalışma",
      "Finansal eğitim",
      "Mentorluk",
      "Kariyer fırsatları",
      "Network oluşturma"
    ]
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
    fullDescription: `Marketing Hub, dijital pazarlama çözümleri sunan bir ajanstır. Pazarlama ekibimizde remote çalışacak, dijital pazarlama dünyasında deneyim kazanacaksınız.

**Görevler:**
- SEO optimizasyonu yapmak
- Google Ads kampanyaları yönetmek
- Sosyal medya içerikleri üretmek
- İçerik pazarlama stratejileri geliştirmek
- Analytics takibi yapmak
- Raporlama hazırlamak

**Kazanımlar:**
- Dijital pazarlama deneyimi
- SEO ve SEM bilgisi
- Sosyal medya yönetimi
- Remote çalışma deneyimi`,
    requirements: [
      "Dijital pazarlama ilgisi",
      "Analitik düşünme",
      "İletişim becerileri",
      "Yaratıcılık",
      "Öğrenme isteği"
    ],
    niceToHave: [
      "Google Ads sertifikası",
      "SEO deneyimi",
      "Content writing",
      "Analytics bilgisi"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "6 gün önce",
    applicants: 35,
    companyInfo: {
      name: "Marketing Hub",
      size: "20-50 çalışan",
      industry: "Dijital Pazarlama",
      website: "www.marketinghub.com",
      about: "Marketing Hub, küçük ve orta ölçekli işletmelere dijital pazarlama hizmetleri sunan bir ajanstır."
    },
    benefits: [
      "Tam remote",
      "Esnek saatler",
      "Eğitim desteği",
      "Portfolio geliştirme",
      "Kampanya deneyimi"
    ]
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
    fullDescription: `Operations Pro, operasyonel mükemmellik konusunda uzmanlaşmış bir danışmanlık şirketidir. Operasyon ekibimizde hibrit çalışacak, süreç yönetimi konularında deneyim kazanacaksınız.

**Görevler:**
- Operasyon süreçlerini analiz etmek
- Süreç iyileştirme önerileri geliştirmek
- CRM sistemleri kullanmak
- Proje yönetimi yapmak
- Raporlama hazırlamak
- Ekip koordinasyonu

**Kazanımlar:**
- Operasyon yönetimi deneyimi
- Süreç iyileştirme metodolojisi
- Proje yönetimi becerileri
- İş dünyası deneyimi`,
    requirements: [
      "Operasyonel düşünme",
      "Proje yönetimi",
      "Problem çözme",
      "İletişim becerileri",
      "Organizasyon yeteneği"
    ],
    niceToHave: [
      "CRM deneyimi",
      "Lean/Six Sigma bilgisi",
      "Excel ileri seviye",
      "İş analizi deneyimi"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "3 gün önce",
    applicants: 19,
    companyInfo: {
      name: "Operations Pro",
      size: "50-100 çalışan",
      industry: "Operasyonel Danışmanlık",
      website: "www.operationspro.com",
      about: "Operations Pro, işletmelere operasyonel danışmanlık hizmetleri sunan ve öğrenci yeteneklerini destekleyen bir şirkettir."
    },
    benefits: [
      "Hibrit çalışma",
      "Mentorluk",
      "Sertifika programları",
      "Kariyer gelişimi",
      "Network fırsatları"
    ]
  },
  {
    id: "9",
    company: "AI Research Lab",
    role: "AI/ML Developer",
    category: "Yazılım & Veri",
    type: "Tam zamanlı • Kampüs",
    tags: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "NLP"],
    salary: "₺10.000-15.000",
    location: "Bursa",
    urgent: true,
    description: "Yapay zeka ve makine öğrenmesi modelleri geliştirecek, TensorFlow veya PyTorch kullanabilecek AI odaklı öğrenci arıyoruz.",
    fullDescription: `AI Research Lab, yapay zeka ve makine öğrenmesi araştırmaları yapan bir laboratuvardır. AI ekibimizde tam zamanlı kampüs içi çalışacak, cutting-edge AI teknolojileri ile çalışma fırsatı bulacaksınız.

**Görevler:**
- TensorFlow/PyTorch ile model geliştirmek
- Deep learning modelleri tasarlamak
- NLP projeleri üzerinde çalışmak
- Veri ön işleme yapmak
- Model eğitimi ve optimizasyonu
- Araştırma makaleleri okumak

**Kazanımlar:**
- AI/ML derinlemesine deneyimi
- Deep learning framework bilgisi
- Araştırma deneyimi
- Yayın fırsatları`,
    requirements: [
      "AI/ML bilgisi",
      "TensorFlow/PyTorch",
      "Deep Learning",
      "Python programlama",
      "Matematik temelleri"
    ],
    niceToHave: [
      "NLP deneyimi",
      "Computer Vision",
      "Araştırma deneyimi",
      "Yayın geçmişi"
    ],
    experience: "İleri seviye",
    postedDate: "2 gün önce",
    applicants: 42,
    companyInfo: {
      name: "AI Research Lab",
      size: "50-100 çalışan",
      industry: "AI Araştırma",
      website: "www.airesearchlab.com",
      about: "AI Research Lab, akademik ve endüstriyel AI araştırmaları yapan, öğrenci araştırmacıları destekleyen bir laboratuvardır."
    },
    benefits: [
      "Kampüs içi çalışma",
      "Araştırma fırsatları",
      "Yayın desteği",
      "Yüksek maaş",
      "Akademik iş birliği"
    ]
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
    fullDescription: `Content Creation Studio, yaratıcı içerik üretimi konusunda uzmanlaşmış bir stüdyodur. İçerik ekibimizde remote çalışacak, çeşitli içerik formatları üzerinde çalışma fırsatı bulacaksınız.

**Görevler:**
- Blog yazıları ve makaleler yazmak
- SEO uyumlu içerik üretmek
- Sosyal medya içerikleri hazırlamak
- Video düzenleme yapmak
- İçerik takvimi oluşturmak
- İçerik performansını analiz etmek

**Kazanımlar:**
- İçerik üretimi deneyimi
- SEO bilgisi
- Video düzenleme becerileri
- Yaratıcı portföy geliştirme`,
    requirements: [
      "İyi yazım becerisi",
      "Yaratıcılık",
      "Sosyal medya bilgisi",
      "Öğrenme isteği",
      "Zaman yönetimi"
    ],
    niceToHave: [
      "SEO deneyimi",
      "Video düzenleme",
      "Graphic design",
      "Copywriting sertifikası"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "5 gün önce",
    applicants: 27,
    companyInfo: {
      name: "Content Creation Studio",
      size: "20-50 çalışan",
      industry: "İçerik Üretimi",
      website: "www.contentcreationstudio.com",
      about: "Content Creation Studio, markalar için yaratıcı içerik üretimi yapan ve öğrenci yeteneklerini destekleyen bir stüdyodur."
    },
    benefits: [
      "Tam remote",
      "Yaratıcı özgürlük",
      "Portfolio geliştirme",
      "Esnek saatler",
      "İçerik kütüphanesi erişimi"
    ]
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
    fullDescription: `Architecture Firm, modern mimari projeler geliştiren bir mimarlık ofisidir. Mimarlık ekibimizde tam zamanlı kampüs içi çalışacak, gerçek projelerde deneyim kazanacaksınız.

**Görevler:**
- AutoCAD ile teknik çizimler yapmak
- 3D modelleme yapmak
- Mimari tasarımlar geliştirmek
- Proje yönetimi yapmak
- Müşteri sunumları hazırlamak
- Şantiye ziyaretleri yapmak

**Kazanımlar:**
- Mimarlık deneyimi
- CAD programları bilgisi
- 3D modelleme becerileri
- Proje yönetimi
- Portfolio geliştirme`,
    requirements: [
      "AutoCAD bilgisi",
      "3D modelleme",
      "Mimari tasarım ilgisi",
      "Teknik çizim",
      "Yaratıcılık"
    ],
    niceToHave: [
      "Revit bilgisi",
      "SketchUp deneyimi",
      "Photoshop",
      "Mimarlık stajı deneyimi"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "1 gün önce",
    applicants: 16,
    companyInfo: {
      name: "Architecture Firm",
      size: "20-50 çalışan",
      industry: "Mimarlık",
      website: "www.architecturefirm.com",
      about: "Architecture Firm, sürdürülebilir ve modern mimari projeler geliştiren, öğrenci mimarları destekleyen bir ofistir."
    },
    benefits: [
      "Kampüs içi çalışma",
      "Gerçek proje deneyimi",
      "Mentorluk",
      "Portfolio desteği",
      "Şantiye ziyaretleri"
    ]
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
    fullDescription: `Customer Success Team, müşteri başarısı ve memnuniyeti konusunda uzmanlaşmış bir ekiptir. Müşteri başarısı ekibimizde hibrit çalışacak, müşteri ilişkileri yönetimi konularında deneyim kazanacaksınız.

**Görevler:**
- Müşteri iletişimi yönetmek
- CRM sistemleri kullanmak
- Müşteri sorunlarını çözmek
- Müşteri memnuniyeti anketleri yapmak
- Raporlama hazırlamak
- Müşteri eğitimleri organize etmek

**Kazanımlar:**
- Müşteri ilişkileri deneyimi
- CRM kullanımı
- Problem çözme becerileri
- İletişim yetenekleri`,
    requirements: [
      "Müşteri ilişkileri",
      "CRM bilgisi",
      "Problem çözme becerisi",
      "İletişim yeteneği",
      "Empati"
    ],
    niceToHave: [
      "CRM sertifikası",
      "Müşteri hizmetleri deneyimi",
      "Çok dilli iletişim",
      "Analitik düşünme"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "4 gün önce",
    applicants: 22,
    companyInfo: {
      name: "Customer Success Team",
      size: "50-100 çalışan",
      industry: "Müşteri Hizmetleri",
      website: "www.customersuccessteam.com",
      about: "Customer Success Team, müşteri başarısı ve memnuniyeti konusunda uzmanlaşmış, öğrenci dostu bir ekiptir."
    },
    benefits: [
      "Hibrit çalışma",
      "Müşteri iletişimi deneyimi",
      "CRM eğitimi",
      "Esnek saatler",
      "Kariyer gelişimi"
    ]
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
    fullDescription: `Research & Development Lab, yenilikçi araştırma ve geliştirme projeleri yürüten bir laboratuvardır. Ar-Ge ekibimizde tam zamanlı kampüs içi çalışacak, araştırma metodolojisi öğreneceksiniz.

**Görevler:**
- Araştırma projeleri yürütmek
- Veri toplama ve analiz yapmak
- Teknik raporlar yazmak
- Literatür taraması yapmak
- Deneyler tasarlamak
- Sunumlar hazırlamak

**Kazanımlar:**
- Araştırma deneyimi
- Teknik yazım becerileri
- Analitik düşünme
- Yayın fırsatları`,
    requirements: [
      "Araştırma becerisi",
      "Analitik düşünme",
      "Teknik yazım",
      "Veri analizi",
      "Öğrenme isteği"
    ],
    niceToHave: [
      "Araştırma deneyimi",
      "Yayın geçmişi",
      "İstatistik bilgisi",
      "Akademik yazım"
    ],
    experience: "Orta seviye",
    postedDate: "2 gün önce",
    applicants: 31,
    companyInfo: {
      name: "Research & Development Lab",
      size: "50-100 çalışan",
      industry: "Ar-Ge",
      website: "www.rdlab.com",
      about: "Research & Development Lab, akademik ve endüstriyel araştırma projeleri yürüten, öğrenci araştırmacıları destekleyen bir laboratuvardır."
    },
    benefits: [
      "Kampüs içi çalışma",
      "Araştırma fırsatları",
      "Yayın desteği",
      "Akademik iş birliği",
      "Kariyer gelişimi"
    ]
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
    fullDescription: `Sales & Business Development, satış ve iş geliştirme konusunda uzmanlaşmış bir ekiptir. Satış ekibimizde hibrit çalışacak, satış süreçleri ve iş geliştirme konularında deneyim kazanacaksınız.

**Görevler:**
- Müşteri görüşmeleri yapmak
- Satış sunumları hazırlamak
- CRM sistemleri kullanmak
- İş geliştirme stratejileri geliştirmek
- Müşteri takibi yapmak
- Raporlama hazırlamak

**Kazanımlar:**
- Satış deneyimi
- İş geliştirme becerileri
- Müşteri ilişkileri
- Pazarlama stratejileri`,
    requirements: [
      "Satış becerileri",
      "İletişim yeteneği",
      "İş geliştirme ilgisi",
      "İkna yeteneği",
      "Ekip çalışması"
    ],
    niceToHave: [
      "Satış deneyimi",
      "CRM sertifikası",
      "Pazarlama bilgisi",
      "Müşteri hizmetleri"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "5 gün önce",
    applicants: 29,
    companyInfo: {
      name: "Sales & Business Development",
      size: "50-100 çalışan",
      industry: "Satış & İş Geliştirme",
      website: "www.salesbd.com",
      about: "Sales & Business Development, satış ve iş geliştirme konusunda uzmanlaşmış, öğrenci yeteneklerini destekleyen bir ekiptir."
    },
    benefits: [
      "Hibrit çalışma",
      "Satış eğitimi",
      "Komisyon imkanı",
      "Kariyer gelişimi",
      "Network fırsatları"
    ]
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
    fullDescription: `Online Education Platform, online eğitim içerikleri geliştiren bir platformdur. Eğitim ekibimizde remote çalışacak, eğitim içeriği geliştirme konularında deneyim kazanacaksınız.

**Görevler:**
- Eğitim içerikleri yazmak
- Video içerikleri üretmek
- Müfredat tasarımı yapmak
- Öğrenci materyalleri hazırlamak
- İçerik düzenleme yapmak
- Eğitim videoları çekmek

**Kazanımlar:**
- Eğitim içeriği geliştirme
- Video üretimi deneyimi
- Müfredat tasarımı
- Eğitim teknolojileri`,
    requirements: [
      "İçerik üretimi",
      "Eğitim bilgisi",
      "Video düzenleme",
      "Yaratıcılık",
      "Pedagojik yaklaşım"
    ],
    niceToHave: [
      "Eğitim deneyimi",
      "Video production",
      "Graphic design",
      "E-learning platformları"
    ],
    experience: "Başlangıç seviyesi",
    postedDate: "3 gün önce",
    applicants: 20,
    companyInfo: {
      name: "Online Education Platform",
      size: "50-100 çalışan",
      industry: "Eğitim Teknolojileri",
      website: "www.onlineeducation.com",
      about: "Online Education Platform, kaliteli online eğitim içerikleri geliştiren ve öğrenci eğitmenleri destekleyen bir platformdur."
    },
    benefits: [
      "Tam remote",
      "Eğitim içeriği erişimi",
      "Video production araçları",
      "Esnek saatler",
      "Portfolio geliştirme"
    ]
  }
];

export default function IlanDetayPage() {
  const params = useParams();
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();
  const { user } = useAuth();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    birthDate: "",
    coverLetter: "",
    portfolio: "",
    linkedin: "",
    github: "",
    whyMe: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveType, setSaveType] = useState<"saved" | "removed">("saved");
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const jobId = params.id as string;
  
  // Kategori prefix'li ID'leri destekle (örn: urun-tasarim-1, yazilim-veri-2)
  let job = allJobs.find(j => j.id === jobId);
  
  // Eğer kategori prefix'li ID ise, kategori ilanlarını bul
  if (!job && jobId.includes("-")) {
    // Kategori prefix'ini ve ID'yi ayır
    const parts = jobId.split("-");
    if (parts.length >= 3) {
      const categoryPrefix = parts.slice(0, -1).join("-"); // "urun-tasarim"
      const originalId = parts[parts.length - 1]; // "1"
      
      // Kategori ilanlarını mapping'den bul
      const categoryJobsMap: { [key: string]: any[] } = {};
      
      // Ürün & Tasarım ilanları
      if (categoryPrefix === "urun-tasarim") {
        categoryJobsMap["urun-tasarim"] = [
          { id: "1", company: "Pixel Studio", role: "UI/UX Tasarım Stajyeri", category: "Ürün & Tasarım", type: "Yarı zamanlı • Hibrit", tags: ["Figma", "Adobe XD", "Prototipleme", "User Research"], salary: "₺8.000-12.000", location: "İstanbul", urgent: true, description: "Dijital ürünler için kullanıcı arayüzü ve kullanıcı deneyimi tasarımları yapacak, prototipleme ve kullanıcı testleri gerçekleştirecek tasarım odaklı öğrenci arıyoruz.", requirements: ["Figma veya Adobe XD bilgisi", "Tasarım portföyü", "Kullanıcı odaklı düşünme"], fullDescription: "Dijital ürünler için kullanıcı arayüzü ve kullanıcı deneyimi tasarımları yapacak, prototipleme ve kullanıcı testleri gerçekleştirecek tasarım odaklı öğrenci arıyoruz.", experience: "Başlangıç seviyesi", postedDate: "2 gün önce", applicants: 15, companyInfo: { name: "Pixel Studio", size: "20-50 çalışan", industry: "Tasarım", website: "www.pixelstudio.com", about: "Pixel Studio, dijital ürün tasarımı konusunda uzmanlaşmış bir tasarım stüdyosudur." }, benefits: ["Esnek çalışma", "Tasarım araçları", "Mentorluk"], niceToHave: [] },
          { id: "2", company: "Creative Labs", role: "Görsel Tasarım Asistanı", category: "Ürün & Tasarım", type: "Yarı zamanlı • Remote", tags: ["Photoshop", "Illustrator", "Branding", "Grafik Tasarım"], salary: "₺6.000-9.000", location: "Remote", urgent: false, description: "Marka kimliği, sosyal medya içerikleri ve pazarlama materyalleri tasarımında görev alacak yaratıcı öğrenci arıyoruz.", requirements: ["Adobe Creative Suite", "Görsel tasarım deneyimi", "Yaratıcı portföy"], fullDescription: "Marka kimliği, sosyal medya içerikleri ve pazarlama materyalleri tasarımında görev alacak yaratıcı öğrenci arıyoruz.", experience: "Başlangıç seviyesi", postedDate: "5 gün önce", applicants: 8, companyInfo: { name: "Creative Labs", size: "10-20 çalışan", industry: "Tasarım", website: "www.creativelabs.com", about: "Creative Labs, yaratıcı tasarım çözümleri sunan bir ajans." }, benefits: ["Remote çalışma", "Yaratıcı özgürlük"], niceToHave: [] },
          { id: "3", company: "Design System Co.", role: "Prototipleme Uzmanı", category: "Ürün & Tasarım", type: "Tam zamanlı • Kampüs", tags: ["Figma", "Principle", "Interaction Design", "Design Systems"], salary: "₺10.000-15.000", location: "Ankara", urgent: true, description: "Tasarım sistemleri oluşturma ve interaktif prototipler geliştirme konusunda deneyimli öğrenci arıyoruz.", requirements: ["Prototipleme araçları", "Design system bilgisi", "Interaction design"], fullDescription: "Tasarım sistemleri oluşturma ve interaktif prototipler geliştirme konusunda deneyimli öğrenci arıyoruz.", experience: "Orta seviye", postedDate: "1 gün önce", applicants: 22, companyInfo: { name: "Design System Co.", size: "30-50 çalışan", industry: "Tasarım", website: "www.designsystem.com", about: "Design System Co., tasarım sistemleri ve prototipleme konusunda uzmanlaşmış bir şirket." }, benefits: ["Kampüs çalışması", "Tasarım araçları", "Ekip çalışması"], niceToHave: [] },
          { id: "4", company: "Startup Design Hub", role: "Product Designer", category: "Ürün & Tasarım", type: "Yarı zamanlı • Remote", tags: ["Product Design", "User Journey", "Wireframing", "Usability Testing"], salary: "₺9.000-13.000", location: "Remote", urgent: false, description: "Yeni başlayan startup'lar için ürün tasarımı yapacak, kullanıcı yolculuğu haritalama ve wireframe oluşturma konularında çalışacak öğrenci arıyoruz.", requirements: ["Ürün tasarımı deneyimi", "User journey mapping", "Wireframing"], fullDescription: "Yeni başlayan startup'lar için ürün tasarımı yapacak, kullanıcı yolculuğu haritalama ve wireframe oluşturma konularında çalışacak öğrenci arıyoruz.", experience: "Orta seviye", postedDate: "3 gün önce", applicants: 12, companyInfo: { name: "Startup Design Hub", size: "5-10 çalışan", industry: "Tasarım", website: "www.startupdesign.com", about: "Startup Design Hub, startup'lara tasarım desteği sağlayan bir platform." }, benefits: ["Remote çalışma", "Startup deneyimi"], niceToHave: [] },
          { id: "5", company: "Digital Agency", role: "UI Designer", category: "Ürün & Tasarım", type: "Yarı zamanlı • Hibrit", tags: ["UI Design", "Mobile Design", "Web Design", "Responsive Design"], salary: "₺7.000-11.000", location: "İzmir", urgent: false, description: "Web ve mobil uygulamalar için arayüz tasarımları yapacak, responsive tasarım prensiplerini uygulayacak öğrenci arıyoruz.", requirements: ["UI tasarım portföyü", "Responsive design bilgisi", "Mobile-first yaklaşım"], fullDescription: "Web ve mobil uygulamalar için arayüz tasarımları yapacak, responsive tasarım prensiplerini uygulayacak öğrenci arıyoruz.", experience: "Başlangıç seviyesi", postedDate: "4 gün önce", applicants: 18, companyInfo: { name: "Digital Agency", size: "20-30 çalışan", industry: "Dijital", website: "www.digitalagency.com", about: "Digital Agency, dijital çözümler sunan bir ajans." }, benefits: ["Hibrit çalışma", "Modern araçlar"], niceToHave: [] },
          { id: "6", company: "UX Research Lab", role: "UX Research Asistanı", category: "Ürün & Tasarım", type: "Proje bazlı • Kampüs", tags: ["User Research", "Usability Testing", "Analytics", "Data Analysis"], salary: "₺5.000-8.000", location: "Bursa", urgent: true, description: "Kullanıcı araştırmaları yürütecek, usability testleri organize edecek ve veri analizi yapacak araştırma odaklı öğrenci arıyoruz.", requirements: ["User research metodolojisi", "Analitik düşünme", "Veri analizi"], fullDescription: "Kullanıcı araştırmaları yürütecek, usability testleri organize edecek ve veri analizi yapacak araştırma odaklı öğrenci arıyoruz.", experience: "Başlangıç seviyesi", postedDate: "1 gün önce", applicants: 9, companyInfo: { name: "UX Research Lab", size: "10-15 çalışan", industry: "Araştırma", website: "www.uxresearch.com", about: "UX Research Lab, kullanıcı deneyimi araştırmaları yapan bir laboratuvar." }, benefits: ["Araştırma deneyimi", "Kampüs çalışması"], niceToHave: [] },
          { id: "7", company: "Brand Identity Studio", role: "Brand Designer", category: "Ürün & Tasarım", type: "Yarı zamanlı • Remote", tags: ["Branding", "Logo Design", "Visual Identity", "Typography"], salary: "₺6.000-10.000", location: "Remote", urgent: false, description: "Marka kimliği tasarımları, logo tasarımları ve görsel kimlik çalışmalarında görev alacak öğrenci arıyoruz.", requirements: ["Branding deneyimi", "Logo tasarım portföyü", "Tipografi bilgisi"], fullDescription: "Marka kimliği tasarımları, logo tasarımları ve görsel kimlik çalışmalarında görev alacak öğrenci arıyoruz.", experience: "Orta seviye", postedDate: "6 gün önce", applicants: 11, companyInfo: { name: "Brand Identity Studio", size: "15-25 çalışan", industry: "Tasarım", website: "www.brandidentity.com", about: "Brand Identity Studio, marka kimliği tasarımları yapan bir stüdyo." }, benefits: ["Remote çalışma", "Yaratıcı projeler"], niceToHave: [] },
          { id: "8", company: "App Design Studio", role: "Mobile UI/UX Designer", category: "Ürün & Tasarım", type: "Tam zamanlı • Hibrit", tags: ["Mobile Design", "iOS Design", "Android Design", "App Prototyping"], salary: "₺11.000-16.000", location: "İstanbul", urgent: true, description: "Mobil uygulamalar için UI/UX tasarımları yapacak, iOS ve Android platformları için özel tasarımlar geliştirecek öğrenci arıyoruz.", requirements: ["Mobil tasarım deneyimi", "Platform guidelines bilgisi", "App prototyping"], fullDescription: "Mobil uygulamalar için UI/UX tasarımları yapacak, iOS ve Android platformları için özel tasarımlar geliştirecek öğrenci arıyoruz.", experience: "Orta seviye", postedDate: "2 gün önce", applicants: 25, companyInfo: { name: "App Design Studio", size: "25-40 çalışan", industry: "Mobil", website: "www.appdesign.com", about: "App Design Studio, mobil uygulama tasarımları yapan bir stüdyo." }, benefits: ["Hibrit çalışma", "Mobil deneyim"], niceToHave: [] },
        ];
        const categoryJobs = categoryJobsMap[categoryPrefix];
        if (categoryJobs) {
          job = categoryJobs.find(j => j.id === originalId);
          if (job) {
            job = { ...job, id: jobId }; // ID'yi kategori prefix'li hale getir
          }
        }
      }
      
      // Diğer kategoriler için de benzer şekilde eklenebilir
      // Şimdilik sadece urun-tasarim için detaylı ekledik
      // Diğer kategoriler için de aynı mantıkla eklenebilir
    }
  }

  // Sayfa yüklendiğinde ilanın kaydedilip kaydedilmediğini kontrol et
  useEffect(() => {
    if (user && job) {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      const isJobSaved = savedJobs.some((saved: any) => saved.jobId === jobId && saved.userId === user.id);
      setIsSaved(isJobSaved);
    }
  }, [user, job, jobId]);

  const handleApplyClick = () => {
    if (!user) {
      router.push(`/login?redirect=/ilan/${jobId}`);
      return;
    }
    if (user.role !== "student") {
      alert("Sadece öğrenciler başvuru yapabilir.");
      return;
    }
    setShowApplicationModal(true);
  };

  const handleShare = (platform: string) => {
    if (!job || typeof window === "undefined") return;
    
    const jobUrl = `${window.location.origin}/ilan/${jobId}`;
    const jobTitle = `${job.role} - ${job.company}`;
    const shareText = `${jobTitle}\n${job.company} şirketinde ${job.role} pozisyonu için başvuru yapabilirsiniz.\n\n${jobUrl}`;
    
    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(jobUrl)}`, "_blank");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`, "_blank");
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(jobTitle)}&body=${encodeURIComponent(shareText)}`;
        break;
      case "copy":
        if (navigator.clipboard) {
          navigator.clipboard.writeText(jobUrl).then(() => {
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
          }).catch(() => {});
        }
        break;
      case "native":
        if (navigator.share) {
          navigator.share({
            title: jobTitle,
            text: `${job.company} şirketinde ${job.role} pozisyonu`,
            url: jobUrl,
          }).catch(() => {});
        }
        break;
    }
    setShowShareModal(false);
  };

  const handleSaveJob = () => {
    if (!user) {
      router.push(`/login?redirect=/ilan/${jobId}`);
      return;
    }

    if (!job) {
      console.error("Job not found");
      return;
    }

    try {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      
      if (isSaved) {
        // İlanı kaydedilenlerden çıkar
        const updatedSavedJobs = savedJobs.filter(
          (saved: any) => !(saved.jobId === jobId && saved.userId === user.id)
        );
        localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
        setIsSaved(false);
        setSaveType("removed");
        setSaveMessage("İlan kayıttan çıkarıldı");
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setSaveMessage("");
        }, 3000);
      } else {
        // İlanı kaydet
        const newSavedJob = {
          id: Date.now().toString(),
          jobId: jobId,
          jobTitle: job.role,
          company: job.company,
          category: job.category,
          type: job.type,
          location: job.location,
          salary: job.salary,
          tags: job.tags,
          userId: user.id,
          savedDate: new Date().toISOString(),
        };
        
        savedJobs.push(newSavedJob);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
        setIsSaved(true);
        setSaveType("saved");
        setSaveMessage(`${job.company} şirketindeki "${job.role}" pozisyonu kaydedildi! 💾`);
        setSaveSuccess(true);
        
        // Bildirimi göster
        setTimeout(() => {
          setSaveSuccess(false);
          setSaveMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // CV dosyası kontrolü
    if (!cvFile) {
      alert("Lütfen CV dosyanızı yükleyin.");
      setIsSubmitting(false);
      return;
    }

    // Simüle edilmiş başvuru işlemi
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Başvuruyu localStorage'a kaydet
    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    applications.push({
      id: Date.now().toString(),
      jobId: jobId,
      jobTitle: job?.role,
      company: job?.company,
      userId: user?.id,
      ...applicationForm,
      cvFileName: cvFile.name,
      cvFileSize: cvFile.size,
      appliedDate: new Date().toISOString(),
      status: "pending",
    });
    localStorage.setItem("applications", JSON.stringify(applications));

    setIsSubmitting(false);
    setApplicationSuccess(true);
    setShowApplicationModal(false);
    
    // 3 saniye sonra başarı mesajını kapat
    setTimeout(() => {
      setApplicationSuccess(false);
      setApplicationForm({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        birthDate: "",
        coverLetter: "",
        portfolio: "",
        linkedin: "",
        github: "",
        whyMe: "",
      });
      setCvFile(null);
    }, 3000);
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">İlan Bulunamadı</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Aradığınız ilan mevcut değil.</p>
          <Link
            href="/tum-ilanlar"
            className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
          >
            Tüm İlanlara Dön
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
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8 pb-16 pt-6">
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
          {/* Back Button */}
          <Link
            href="/tum-ilanlar"
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tüm İlanlara Dön
          </Link>

          {/* Job Header */}
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 p-8 lg:p-12 backdrop-blur-xl shadow-lg">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                {job.urgent && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-300 mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Acil İlan
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-2xl font-bold text-white shadow-lg">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{job.company}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{job.category}</p>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  {job.role}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.salary}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                  <span>📅 {job.postedDate}</span>
                  <span>👥 {job.applicants} başvuru</span>
                  <span>⭐ {job.experience}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 px-4 py-2 text-sm text-cyan-700 dark:text-cyan-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const jobDetailsSection = document.getElementById("job-details");
                  if (jobDetailsSection) {
                    jobDetailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="rounded-full border-2 border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 px-6 py-4 text-base font-semibold text-slate-700 dark:text-white transition-all hover:border-cyan-500 dark:hover:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-500/10"
              >
                📋 Detaylar
              </button>
              <button
                onClick={handleApplyClick}
                className="flex-1 min-w-[200px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
              >
                Başvur
              </button>
              <button
                onClick={handleSaveJob}
                className={`rounded-full border-2 px-6 py-4 text-base font-semibold transition-all ${
                  isSaved
                    ? "border-cyan-500 dark:border-cyan-400 bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300"
                    : "border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 text-slate-700 dark:text-white hover:border-cyan-500 dark:hover:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-500/10"
                }`}
              >
                {isSaved ? "✓ Kaydedildi" : "💾 Kaydet"}
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="rounded-full border-2 border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 px-6 py-4 text-base font-semibold text-slate-700 dark:text-white transition-all hover:border-cyan-500 dark:hover:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-500/10"
              >
                📤 Paylaş
              </button>
            </div>
          </section>

          {/* Job Details */}
          <div id="job-details" className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">İş Tanımı</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {job.fullDescription}
                  </p>
                </div>
              </section>

              {/* Requirements */}
              <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Gereksinimler</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-semibold text-sm mt-0.5">
                        ✓
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Nice to Have */}
              {job.niceToHave && job.niceToHave.length > 0 && (
                <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Tercih Edilen Özellikler</h2>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 font-semibold text-sm mt-0.5">
                          +
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Yan Haklar</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {job.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-cyan-500">✨</span>
                        <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              {job.companyInfo && (
                <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Şirket Bilgileri</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Şirket Adı</p>
                      <p className="text-base text-slate-900 dark:text-white">{job.companyInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Sektör</p>
                      <p className="text-base text-slate-900 dark:text-white">{job.companyInfo.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Çalışan Sayısı</p>
                      <p className="text-base text-slate-900 dark:text-white">{job.companyInfo.size}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Web Sitesi</p>
                      <a
                        href={`https://${job.companyInfo.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-cyan-600 dark:text-cyan-400 hover:underline"
                      >
                        {job.companyInfo.website}
                      </a>
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-white/10">
                      <p className="text-sm text-slate-700 dark:text-slate-300">{job.companyInfo.about}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* Quick Info */}
              <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Hızlı Bilgiler</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Deneyim</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{job.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Kategori</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{job.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Başvuru</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{job.applicants} kişi</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Yayın Tarihi</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{job.postedDate}</span>
                  </div>
                </div>
              </section>

              {/* Similar Jobs */}
              <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Benzer İlanlar</h3>
                <div className="space-y-3">
                  {allJobs
                    .filter(j => j.category === job.category && j.id !== job.id)
                    .slice(0, 3)
                    .map(similarJob => (
                      <Link
                        key={similarJob.id}
                        href={`/ilan/${similarJob.id}`}
                        className="block p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-all"
                      >
                        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                          {similarJob.role}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{similarJob.company}</p>
                        <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">{similarJob.salary}</p>
                      </Link>
                    ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Save Success Message */}
        {saveSuccess && (
          <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
            <div className={`rounded-2xl border shadow-2xl backdrop-blur-xl p-6 max-w-md ${
              saveType === "saved"
                ? "border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/20"
                : "border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/20"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  saveType === "saved" ? "bg-green-500" : "bg-orange-500"
                }`}>
                  {saveType === "saved" ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-1 ${
                    saveType === "saved"
                      ? "text-green-900 dark:text-green-100"
                      : "text-orange-900 dark:text-orange-100"
                  }`}>
                    {saveType === "saved" ? "İlan Kaydedildi! 🎉" : "İlan Kayıttan Çıkarıldı"}
                  </h3>
                  <p className={`text-sm ${
                    saveType === "saved"
                      ? "text-green-700 dark:text-green-300"
                      : "text-orange-700 dark:text-orange-300"
                  }`}>
                    {saveMessage || (saveType === "saved" ? `${job?.company} şirketindeki "${job?.role}" pozisyonu kaydedildi. Kaydedilenler sayfasından görüntüleyebilirsiniz.` : "İlan kayıttan çıkarıldı.")}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSaveSuccess(false);
                    setSaveMessage("");
                  }}
                  className={`flex-shrink-0 hover:opacity-70 transition-opacity ${
                    saveType === "saved"
                      ? "text-green-600 dark:text-green-400"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                İlanı Paylaş
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Bu ilanı paylaşmak için bir platform seçin:
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* WhatsApp */}
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="flex items-center gap-3 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-xl">
                    💬
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">WhatsApp</span>
                </button>

                {/* LinkedIn */}
                <button
                  onClick={() => handleShare("linkedin")}
                  className="flex items-center gap-3 p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                    💼
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">LinkedIn</span>
                </button>

                {/* Twitter/X */}
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-xl font-bold">
                    𝕏
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">Twitter/X</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex items-center gap-3 p-4 rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                    f
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">Facebook</span>
                </button>

                {/* E-posta */}
                <button
                  onClick={() => handleShare("email")}
                  className="flex items-center gap-3 p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl">
                    ✉️
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">E-posta</span>
                </button>

                {/* Link Kopyala */}
                <button
                  onClick={() => handleShare("copy")}
                  className="flex items-center gap-3 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xl">
                    {linkCopied ? "✓" : "🔗"}
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {linkCopied ? "Kopyalandı!" : "Link Kopyala"}
                  </span>
                </button>
              </div>

              {/* Native Share (Mobil cihazlar için) */}
              {typeof window !== "undefined" && navigator.share && (
                <button
                  onClick={() => handleShare("native")}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-cyan-500 dark:border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all mb-4"
                >
                  <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">Diğer Seçenekler</span>
                </button>
              )}

              <button
                onClick={() => setShowShareModal(false)}
                className="w-full rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Kapat
              </button>

              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Application Success Message */}
        {applicationSuccess && (
          <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
            <div className="rounded-2xl border border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/20 p-6 shadow-2xl backdrop-blur-xl max-w-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-1">
                    Başvurunuz Alındı! 🎉
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {job?.company} şirketine başvurunuz başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.
                  </p>
                </div>
                <button
                  onClick={() => setApplicationSuccess(false)}
                  className="flex-shrink-0 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Application Modal */}
        {showApplicationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    İlana Başvur
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {job?.role} - {job?.company}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowApplicationModal(false);
                    setApplicationForm({
                      fullName: "",
                      email: "",
                      phone: "",
                      address: "",
                      city: "",
                      birthDate: "",
                      coverLetter: "",
                      portfolio: "",
                      linkedin: "",
                      github: "",
                      whyMe: "",
                    });
                    setCvFile(null);
                  }}
                  className="rounded-full p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="p-6 space-y-6">
                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Ön Yazı <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={applicationForm.coverLetter}
                    onChange={(e) => {
                      if (e.target.value.length <= 1000) {
                        setApplicationForm({ ...applicationForm, coverLetter: e.target.value });
                      }
                    }}
                    placeholder="Neden bu pozisyona uygun olduğunuzu ve neden bu şirkette çalışmak istediğinizi açıklayın..."
                    rows={6}
                    maxLength={1000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
                  />
                  <p className={`text-xs mt-1 ${applicationForm.coverLetter.length > 1000 ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
                    {applicationForm.coverLetter.length}/1000 karakter
                  </p>
                </div>

                {/* Portfolio */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Portföy Linki
                  </label>
                  <input
                    type="url"
                    value={applicationForm.portfolio}
                    onChange={(e) => setApplicationForm({ ...applicationForm, portfolio: e.target.value })}
                    placeholder="https://portfolio.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    LinkedIn Profili
                  </label>
                  <input
                    type="url"
                    value={applicationForm.linkedin}
                    onChange={(e) => setApplicationForm({ ...applicationForm, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    GitHub Profili
                  </label>
                  <input
                    type="url"
                    value={applicationForm.github}
                    onChange={(e) => setApplicationForm({ ...applicationForm, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Why Me */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Neden Siz? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={applicationForm.whyMe}
                    onChange={(e) => setApplicationForm({ ...applicationForm, whyMe: e.target.value })}
                    placeholder="Bu pozisyon için neden sizi seçmeleri gerektiğini kısaca açıklayın..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Başvuru Bilgileri */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 p-4">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Başvuru Bilgileri</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Ad Soyad */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Ad Soyad <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={applicationForm.fullName}
                        onChange={(e) => setApplicationForm({ ...applicationForm, fullName: e.target.value })}
                        placeholder="Adınız ve soyadınız"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors"
                      />
                    </div>

                    {/* E-posta */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        E-posta <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                        placeholder="ornek@email.com"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors"
                      />
                    </div>

                    {/* Telefon */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Telefon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicationForm.phone}
                        onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                        placeholder="05XX XXX XX XX"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors"
                      />
                    </div>

                    {/* Şehir */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Şehir <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={applicationForm.city}
                        onChange={(e) => setApplicationForm({ ...applicationForm, city: e.target.value })}
                        placeholder="İstanbul, Ankara, İzmir..."
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors"
                      />
                    </div>

                    {/* Doğum Tarihi */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Doğum Tarihi
                      </label>
                      <input
                        type="date"
                        value={applicationForm.birthDate}
                        onChange={(e) => setApplicationForm({ ...applicationForm, birthDate: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors"
                      />
                    </div>

                    {/* Adres */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Adres
                      </label>
                      <textarea
                        value={applicationForm.address}
                        onChange={(e) => setApplicationForm({ ...applicationForm, address: e.target.value })}
                        placeholder="Adres bilgileriniz (opsiyonel)"
                        rows={2}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* CV Yükleme */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    CV Yükle <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCvFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label
                      htmlFor="cv-upload"
                      className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-cyan-500 dark:hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 cursor-pointer transition-all"
                    >
                      <svg className="w-6 h-6 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {cvFile ? cvFile.name : "CV dosyanızı seçin (PDF, DOC, DOCX)"}
                      </span>
                    </label>
                    {cvFile && (
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        ✓ Dosya seçildi: {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplicationModal(false);
                      setApplicationForm({
                        fullName: "",
                        email: "",
                        phone: "",
                        address: "",
                        city: "",
                        birthDate: "",
                        coverLetter: "",
                        portfolio: "",
                        linkedin: "",
                        github: "",
                        whyMe: "",
                      });
                      setCvFile(null);
                    }}
                    className="flex-1 rounded-full border-2 border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 px-6 py-3 text-base font-semibold text-slate-700 dark:text-white transition-all hover:border-slate-400 dark:hover:border-white/40 hover:bg-slate-50 dark:hover:bg-white/10"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gönderiliyor...
                      </span>
                    ) : (
                      "Başvuruyu Gönder"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10 pt-8 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white">
              K
            </div>
            <p>© {new Date().getFullYear()} KariyerKöprü. İlan detayları.</p>
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

