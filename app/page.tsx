"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "./components/ThemeProvider";
import { useAuth } from "./contexts/AuthContext";

const stats = [
  { label: "Aktif öğrenci", value: "24.500+", icon: "👥" },
  { label: "Şirket iş birliği", value: "180", icon: "🏢" },
  { label: "Aylık yeni ilan", value: "430", icon: "📋" },
  { label: "Başarı oranı", value: "%87", icon: "✨" },
];

const categories = [
  {
    title: "Ürün & Tasarım",
    desc: "UI/UX, görsel tasarım, prototipleme",
    icon: "🎨",
    color: "from-purple-500/20 to-pink-500/20",
    darkColor: "dark:from-purple-500/20 dark:to-pink-500/20",
    lightColor: "from-purple-100 to-pink-100",
  },
  {
    title: "Yazılım & Veri",
    desc: "Web, mobil, veri bilimi, QA",
    icon: "💻",
    color: "from-blue-500/20 to-cyan-500/20",
    darkColor: "dark:from-blue-500/20 dark:to-cyan-500/20",
    lightColor: "from-blue-100 to-cyan-100",
  },
  {
    title: "Pazarlama & Büyüme",
    desc: "Sosyal medya, içerik, performans",
    icon: "📈",
    color: "from-green-500/20 to-emerald-500/20",
    darkColor: "dark:from-green-500/20 dark:to-emerald-500/20",
    lightColor: "from-green-100 to-emerald-100",
  },
  {
    title: "Operasyon & Satış",
    desc: "Müşteri ilişkileri, saha, satış",
    icon: "🤝",
    color: "from-orange-500/20 to-red-500/20",
    darkColor: "dark:from-orange-500/20 dark:to-red-500/20",
    lightColor: "from-orange-100 to-red-100",
  },
  {
    title: "Finans & Analiz",
    desc: "Finansal raporlama, iş zekâsı",
    icon: "📊",
    color: "from-yellow-500/20 to-amber-500/20",
    darkColor: "dark:from-yellow-500/20 dark:to-amber-500/20",
    lightColor: "from-yellow-100 to-amber-100",
  },
  {
    title: "Topluluk & Etkinlik",
    desc: "Kulüp iş birlikleri, etkinlik",
    icon: "🎉",
    color: "from-indigo-500/20 to-purple-500/20",
    darkColor: "dark:from-indigo-500/20 dark:to-purple-500/20",
    lightColor: "from-indigo-100 to-purple-100",
  },
  {
    title: "Dil Eğitimi",
    desc: "Yabancı dil, çeviri, dil öğretimi",
    icon: "🌍",
    color: "from-teal-500/20 to-cyan-500/20",
    darkColor: "dark:from-teal-500/20 dark:to-cyan-500/20",
    lightColor: "from-teal-100 to-cyan-100",
  },
  {
    title: "Online Ders",
    desc: "Matematik, fizik, kimya, biyoloji ve diğer dersler",
    icon: "📚",
    color: "from-emerald-500/20 to-teal-500/20",
    darkColor: "dark:from-emerald-500/20 dark:to-teal-500/20",
    lightColor: "from-emerald-100 to-teal-100",
  },
  {
    title: "Mimarlık & Çizim",
    desc: "Mimari çizim, CAD, teknik çizim, 3D modelleme",
    icon: "🏗️",
    color: "from-rose-500/20 to-orange-500/20",
    darkColor: "dark:from-rose-500/20 dark:to-orange-500/20",
    lightColor: "from-rose-100 to-orange-100",
  },
  {
    title: "Staj",
    desc: "Staj ilanları, stajyer pozisyonları, kariyer fırsatları",
    icon: "💼",
    color: "from-violet-500/20 to-fuchsia-500/20",
    darkColor: "dark:from-violet-500/20 dark:to-fuchsia-500/20",
    lightColor: "from-violet-100 to-fuchsia-100",
  },
];

const spotlightJobs = [
  {
    id: "1",
    company: "Lumina Tech",
    role: "Frontend Stajyeri",
    type: "Yarı zamanlı • Hibrit",
    tags: ["React", "Tailwind", "Grafik API"],
    salary: "₺8.000-12.000",
    location: "İstanbul",
    urgent: true,
  },
  {
    id: "2",
    company: "Fable Studio",
    role: "İçerik & Büyüme Asistanı",
    type: "Proje bazlı • Remote",
    tags: ["KPI takibi", "Notion", "Adobe"],
    salary: "₺6.000-9.000",
    location: "Remote",
    urgent: false,
  },
  {
    id: "3",
    company: "Northwind Labs",
    role: "Data Research Intern",
    type: "Tam zamanlı • Kampüs",
    tags: ["Python", "GSheet", "PowerBI"],
    salary: "₺10.000-15.000",
    location: "Ankara",
    urgent: true,
  },
  {
    id: "4",
    company: "CloudSync",
    role: "Backend Geliştirici",
    type: "Yarı zamanlı • Remote",
    tags: ["Node.js", "PostgreSQL", "AWS"],
    salary: "₺12.000-18.000",
    location: "Remote",
    urgent: false,
  },
  {
    id: "5",
    company: "Design Studio Pro",
    role: "UI/UX Tasarım Stajyeri",
    type: "Yarı zamanlı • Hibrit",
    tags: ["Figma", "User Research", "Prototyping", "Design Systems", "Designer"],
    salary: "₺7.000-11.000",
    location: "İzmir",
    urgent: false,
  },
  {
    id: "6",
    company: "Pixel Studio",
    role: "UI/UX Designer",
    type: "Yarı zamanlı • Remote",
    tags: ["Figma", "Adobe XD", "Prototipleme", "Designer", "UI Design"],
    salary: "₺8.000-12.000",
    location: "Remote",
    urgent: true,
  },
];

const steps = [
  {
    title: "Profilini tamamla",
    desc: "Yeteneklerini, müsaitlik durumunu ve hedeflerini birkaç dakikada paylaş.",
    icon: "📝",
  },
  {
    title: "Öne çıkan projeleri yükle",
    desc: "CV yerine etkileyici proje kartları kullanarak fark yarat.",
    icon: "🚀",
  },
  {
    title: "Mentor eşleşmesi al",
    desc: "Sektör mentorları ilk görüşmeyi birlikte simüle etmeni sağlar.",
    icon: "🎯",
  },
  {
    title: "İlanlara hızlı başvur",
    desc: "Kaydırmalı başvuru akışıyla 3 soruya cevap ver, geri bildirimi bekle.",
    icon: "⚡",
  },
];

const testimonials = [
  {
    name: "Selin Demir",
    role: "Endüstri Mühendisliği 3. sınıf",
    quote:
      "İlk hibrit stajımı iki hafta içinde buldum. KariyerKöprü mentorumla görüşme prova etmek kaygımı neredeyse bitirdi.",
    avatar: "👩‍💼",
    rating: 5,
  },
  {
    name: "Mertcan Yıldız",
    role: "Bilgisayar Mühendisliği 2. sınıf",
    quote:
      "Takvim entegrasyonu sayesinde ders programıma göre ilanlara filtre uygulayabiliyorum. Başvurular tek panelde toplandı.",
    avatar: "👨‍💻",
    rating: 5,
  },
  {
    name: "Ayşe Kaya",
    role: "İşletme 4. sınıf",
    quote:
      "Mentor desteği sayesinde kendimi çok daha iyi ifade edebiliyorum. Artık görüşmelerden korkmuyorum!",
    avatar: "👩‍🎓",
    rating: 5,
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showSmartSuggestions, setShowSmartSuggestions] = useState(false);
  const [smartSuggestionType, setSmartSuggestionType] = useState<"city" | "workType" | "both" | null>(null);
  const [detectedValue, setDetectedValue] = useState("");
  const [detectedCity, setDetectedCity] = useState("");
  const [detectedWorkType, setDetectedWorkType] = useState("");
  const { theme, toggleTheme, mounted } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null); // Arama input'una focus için ref

  // Türkçe karakterleri normalize eden fonksiyon
  // Türkçe karakterleri normalize eden fonksiyon - büyük/küçük harf duyarsız
  // "İzmir", "izmir", "İZMİR" hepsi "izmir" olur
  const normalizeText = (text: string) => {
    if (!text) return "";
    // Önce Türkçe karakterleri normalize et, sonra küçük harfe çevir
    // Bu şekilde hem büyük hem küçük Türkçe karakterler doğru işlenir
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

  // Türkiye'nin 81 ili
  const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
    "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
    "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum",
    "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir",
    "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir",
    "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir",
    "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Şanlıurfa",
    "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak",
    "Remote" // Remote çalışma için
  ];
  
  // Çalışma şartları
  const workTypes = ["Hibrit", "Remote", "Kampüs", "Yarı zamanlı", "Tam zamanlı", "Proje bazlı"];

  // Şehir veya çalışma şartı algılama - hem şehir hem çalışma şartını algılayabilir
  // Büyük/küçük harf duyarsız çalışır
  const detectSearchType = (query: string) => {
    if (!query || !query.trim()) return null;
    
    // Tüm query'yi küçük harfe çevir ve normalize et
    const trimmedQuery = query.trim();
    const normalizedQuery = normalizeText(trimmedQuery);
    const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);
    
    let detectedCity: string | null = null;
    let detectedWorkType: string | null = null;
    
    // Önce çalışma şartı kontrolü (çünkü "Remote" hem şehir hem çalışma şartı olabilir)
    for (const workType of workTypes) {
      const normalizedWorkType = normalizeText(workType);
      
      // Tam eşleşme
      if (normalizedQuery === normalizedWorkType) {
        detectedWorkType = workType;
        break;
      }
      
      // Query içinde çalışma şartı geçiyor mu
      if (normalizedQuery.length >= 3 && normalizedWorkType.length >= 3) {
        if (normalizedQuery.includes(normalizedWorkType) || normalizedWorkType.includes(normalizedQuery)) {
          detectedWorkType = workType;
          break;
        }
      }
      
      // Query kelimelerinden biri çalışma şartı mı
      for (const word of queryWords) {
        if (word.length >= 3 && normalizedWorkType.includes(word) || word.includes(normalizedWorkType)) {
          detectedWorkType = workType;
          break;
        }
      }
      if (detectedWorkType) break;
    }
    
    // Şehir kontrolü - tüm 81 il için kapsamlı kontrol
    // Önce tam eşleşme kontrolü (en hızlı)
    // Büyük/küçük harf duyarsız: "İzmir", "izmir", "İZMİR" hepsi aynı
    for (const city of cities) {
      const normalizedCity = normalizeText(city);
      
      // 1. Tam eşleşme (en öncelikli) - "İzmir" === "izmir" (normalize edildikten sonra)
      if (normalizedQuery === normalizedCity) {
        detectedCity = city;
        break;
      }
    }
    
    // 2. Query kelimelerinden biri şehirle tam eşleşiyor mu - "istanbul arama" -> "istanbul" algılanır
    if (!detectedCity) {
      for (const word of queryWords) {
        if (word.length >= 2) {
          for (const city of cities) {
            const normalizedCity = normalizeText(city);
            if (normalizedCity === word) {
              detectedCity = city;
              break;
            }
          }
          if (detectedCity) break;
        }
      }
    }
    
    // 3. Şehir query ile başlıyor - "iz" yazıldığında "izmir" algılanır (en az 2 karakter)
    // Bu kontrolü önce yapıyoruz çünkü kısaltmalar için önemli
    // Önce en uzun eşleşmeyi bul (birden fazla şehir eşleşirse en uzun olanı seç)
    if (!detectedCity) {
      let bestMatch: { city: string; length: number } | null = null;
      for (const city of cities) {
        const normalizedCity = normalizeText(city);
        
        // Şehir query ile başlıyor - "iz" -> "izmir", "ist" -> "istanbul"
        if (normalizedQuery.length >= 2 && normalizedCity.length >= 2) {
          if (normalizedCity.startsWith(normalizedQuery)) {
            // En uzun eşleşmeyi seç (örneğin "ist" hem "istanbul" hem "istanbul" ile eşleşebilir)
            if (!bestMatch || normalizedCity.length > bestMatch.length) {
              bestMatch = { city, length: normalizedCity.length };
            }
          }
        }
      }
      if (bestMatch) {
        detectedCity = bestMatch.city;
      }
    }
    
    // 4. Query şehirle başlıyor - "istanbul" yazıldığında "istanbul" algılanır
    if (!detectedCity) {
      for (const city of cities) {
        const normalizedCity = normalizeText(city);
        
        if (normalizedQuery.length >= 2 && normalizedCity.length >= 2) {
          if (normalizedQuery.startsWith(normalizedCity)) {
            detectedCity = city;
            break;
          }
        }
      }
    }
    
    // 5. Şehir query ile başlıyor (kelime bazında) - "malat" yazıldığında "malatya" algılanır
    // Sadece şehir query ile başlıyorsa kontrol et (includes değil, sadece başlangıç)
    if (!detectedCity) {
      for (const city of cities) {
        const normalizedCity = normalizeText(city);
        
        if (normalizedQuery.length >= 3 && normalizedCity.length >= 3) {
          // Şehir query ile başlıyor - "malat" -> "malatya" (en az 3 karakter)
          if (normalizedCity.startsWith(normalizedQuery)) {
            detectedCity = city;
            break;
          }
        }
      }
    }
    
    // 6. Query içinde şehir geçiyor mu - "istanbul arama" gibi durumlar için
    if (!detectedCity) {
      for (const city of cities) {
        const normalizedCity = normalizeText(city);
        
        if (normalizedQuery.length >= 2 && normalizedCity.length >= 2) {
          if (normalizedQuery.includes(normalizedCity)) {
            detectedCity = city;
            break;
          }
        }
      }
    }
    
    // 7. Query kelimelerinden biri şehirle eşleşiyor mu - "malat" -> "malatya"
    // Sadece startsWith kontrolü yap (includes çok geniş, "iz" -> "denizli" gibi yanlış eşleşmelere yol açar)
    if (!detectedCity) {
      for (const word of queryWords) {
        if (word.length >= 2) {
          for (const city of cities) {
            const normalizedCity = normalizeText(city);
            
            if (normalizedCity.length >= 2) {
              // Kelime şehirle başlıyor - "iz" -> "izmir"
              if (normalizedCity.startsWith(word)) {
                detectedCity = city;
                break;
              }
              // Şehir kelimeyle başlıyor
              if (word.startsWith(normalizedCity)) {
                detectedCity = city;
                break;
              }
              // Şehir kelime içinde geçiyor - "istanbul arama" -> "istanbul"
              if (word.includes(normalizedCity)) {
                detectedCity = city;
                break;
              }
            }
          }
          if (detectedCity) break;
        }
      }
    }
    
    // Sonuç döndür - hem şehir hem çalışma şartı algılandıysa "both", sadece biri algılandıysa o, hiçbiri algılanmadıysa null
    if (detectedCity && detectedWorkType) {
      return { type: "both" as const, city: detectedCity, workType: detectedWorkType };
    } else if (detectedCity) {
      return { type: "city" as const, value: detectedCity };
    } else if (detectedWorkType) {
      return { type: "workType" as const, value: detectedWorkType };
    }
    
    return null;
  };

  // Akıllı önerileri al (şehir veya çalışma şartına göre) - her zaman kategorileri döndür
  const getSmartSuggestions = () => {
    // Tüm kategoriler listesi
    const allCategories = [
      "Yazılım & Veri", 
      "Pazarlama & Büyüme", 
      "Ürün & Tasarım", 
      "Finans & Analiz", 
      "Operasyon & Satış", 
      "Mimarlık & Çizim", 
      "Online Ders", 
      "Topluluk & Etkinlik", 
      "Dil Eğitimi", 
      "Staj"
    ];
    
    // Eğer şehir veya çalışma şartı algılanmadıysa, tüm kategorileri döndür
    if (!smartSuggestionType || !detectedValue) {
      return allCategories.slice(0, 8);
    }
    
    // Şehir veya çalışma şartı algılandıysa, filtrelenmiş işlerden kategorileri çıkar
    let filteredJobs = spotlightJobs;
    
    if (smartSuggestionType === "city") {
      const detectedCity = normalizeText(detectedValue);
      filteredJobs = spotlightJobs.filter(job => {
        const jobLocation = normalizeText(job.location);
        return jobLocation === detectedCity || 
               jobLocation.includes(detectedCity) || 
               detectedCity.includes(jobLocation);
      });
    } else if (smartSuggestionType === "workType") {
      const detectedType = normalizeText(detectedValue);
      filteredJobs = spotlightJobs.filter(job => {
        const jobType = normalizeText(job.type);
        return jobType.includes(detectedType);
      });
    }
    
    // Her zaman kategorileri göster (filtrelenmiş iş olsa da olmasa da)
    // Eğer filtrelenmiş iş yoksa, direkt tüm kategorileri döndür
    if (filteredJobs.length === 0) {
      return allCategories.slice(0, 8);
    }
    
    // Şehir algılandığında her zaman tüm kategorileri göster
    // Filtrelenmiş işlerden kategorileri çıkarmaya çalış, ama yoksa tüm kategorileri göster
    const categories = new Set<string>();
    
    filteredJobs.forEach(job => {
      // Job role'den kategori çıkar
      if (job.role) {
        const roleLower = normalizeText(job.role);
        if (roleLower.includes("frontend") || roleLower.includes("backend") || roleLower.includes("developer") || roleLower.includes("yazılım") || (roleLower.includes("stajyeri") && (roleLower.includes("tech") || roleLower.includes("data")))) {
          categories.add("Yazılım & Veri");
        } else if (roleLower.includes("tasarım") || roleLower.includes("ui") || roleLower.includes("ux") || roleLower.includes("design") || (roleLower.includes("içerik") && roleLower.includes("tasarım"))) {
          categories.add("Ürün & Tasarım");
        } else if (roleLower.includes("pazarlama") || roleLower.includes("marketing") || roleLower.includes("içerik") || roleLower.includes("büyüme")) {
          categories.add("Pazarlama & Büyüme");
        } else if (roleLower.includes("finans") || roleLower.includes("analiz") || roleLower.includes("financial")) {
          categories.add("Finans & Analiz");
        } else if (roleLower.includes("operasyon") || roleLower.includes("satış") || roleLower.includes("müşteri") || roleLower.includes("sales")) {
          categories.add("Operasyon & Satış");
        } else if (roleLower.includes("mimarlık") || roleLower.includes("çizim") || roleLower.includes("architect")) {
          categories.add("Mimarlık & Çizim");
        } else if (roleLower.includes("ders") || roleLower.includes("eğitim") || roleLower.includes("öğretmen") || roleLower.includes("education")) {
          categories.add("Online Ders");
        }
      }
      
      // Tags'dan da kategori çıkar
      job.tags.forEach(tag => {
        const tagLower = normalizeText(tag);
        if (tagLower.includes("react") || tagLower.includes("node") || tagLower.includes("python") || tagLower.includes("veri") || tagLower.includes("typescript") || tagLower.includes("javascript") || tagLower.includes("api")) {
          categories.add("Yazılım & Veri");
        } else if (tagLower.includes("figma") || tagLower.includes("tasarım") || tagLower.includes("design") || tagLower.includes("ui") || tagLower.includes("ux")) {
          categories.add("Ürün & Tasarım");
        } else if (tagLower.includes("pazarlama") || tagLower.includes("sosyal medya") || tagLower.includes("marketing") || tagLower.includes("kpi") || tagLower.includes("içerik")) {
          categories.add("Pazarlama & Büyüme");
        } else if (tagLower.includes("excel") || tagLower.includes("finans") || tagLower.includes("analiz") || tagLower.includes("financial")) {
          categories.add("Finans & Analiz");
        } else if (tagLower.includes("crm") || tagLower.includes("satış") || tagLower.includes("müşteri") || tagLower.includes("operations")) {
          categories.add("Operasyon & Satış");
        } else if (tagLower.includes("autocad") || tagLower.includes("mimarlık") || tagLower.includes("çizim")) {
          categories.add("Mimarlık & Çizim");
        } else if (tagLower.includes("matematik") || tagLower.includes("fizik") || tagLower.includes("kimya") || tagLower.includes("ders") || tagLower.includes("education")) {
          categories.add("Online Ders");
        }
      });
    });
    
    // Eğer kategoriler bulunduysa onları göster, yoksa tüm kategorileri göster
    if (categories.size > 0) {
      // Bulunan kategorileri göster, eksik olanları da ekle
      const result = Array.from(categories);
      // Eksik kategorileri ekle
      allCategories.forEach(cat => {
        if (!result.includes(cat)) {
          result.push(cat);
        }
      });
      return result.slice(0, 8);
    }
    
    // Hiçbir kategori bulunamazsa, tüm kategorileri göster
    return allCategories.slice(0, 8);
  };

  // İngilizce-Türkçe kelime eşleştirmesi
  const translateWord = (word: string): string[] => {
    const translations: { [key: string]: string[] } = {
      "designer": ["tasarim", "tasarımcı", "design"],
      "design": ["tasarim", "tasarım", "designer"],
      "developer": ["gelistirici", "geliştirici", "programci", "programcı"],
      "developer": ["gelistirici", "geliştirici", "programci", "programcı"],
      "frontend": ["frontend", "on yuz", "ön yüz"],
      "backend": ["backend", "arka plan", "arkaplan"],
      "ui": ["ui", "arayuz", "arayüz", "kullanici arayuzu"],
      "ux": ["ux", "kullanici deneyimi", "kullanıcı deneyimi"],
      "marketing": ["pazarlama", "marketing"],
      "sales": ["satis", "satış"],
      "analyst": ["analist", "analizci"],
    };
    
    const normalized = normalizeText(word);
    if (translations[normalized]) {
      return [normalized, ...translations[normalized]];
    }
    return [normalized];
  };

  // Arama ve filtreleme algoritması
  const getFilteredJobs = () => {
    let jobs = spotlightJobs;

    // Önce şehir veya çalışma şartı algılama kontrolü yap
    const detected = detectSearchType(searchQuery);
    
    // Eğer şehir algılandıysa, o şehirdeki ilanları göster
    if (detected && detected.type === "city") {
      const detectedCity = normalizeText(detected.value);
      jobs = jobs.filter((job) => {
        const jobLocation = normalizeText(job.location);
        return jobLocation === detectedCity || 
               jobLocation.includes(detectedCity) || 
               detectedCity.includes(jobLocation);
      });
      // Şehir filtresi uygulandı, activeFilter'ı da uygula
      if (activeFilter !== "Tümü") {
        jobs = jobs.filter((job) => {
          if (activeFilter === "Remote") return job.type.includes("Remote");
          if (activeFilter === "Hibrit") return job.type.includes("Hibrit");
          if (activeFilter === "Kampüs") return job.type.includes("Kampüs");
          return true;
        });
      }
      return jobs;
    }
    
    // Eğer çalışma şartı algılandıysa, o çalışma şartına sahip ilanları göster
    if (detected && detected.type === "workType") {
      const detectedType = normalizeText(detected.value);
      jobs = jobs.filter((job) => {
        const jobType = normalizeText(job.type);
        return jobType.includes(detectedType);
      });
      // Çalışma şartı filtresi uygulandı, activeFilter'ı da uygula
      if (activeFilter !== "Tümü") {
        jobs = jobs.filter((job) => {
          if (activeFilter === "Remote") return job.type.includes("Remote");
          if (activeFilter === "Hibrit") return job.type.includes("Hibrit");
          if (activeFilter === "Kampüs") return job.type.includes("Kampüs");
          return true;
        });
      }
      return jobs;
    }

    // Normal arama yap (şehir veya çalışma şartı algılanmadıysa)
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeText(searchQuery);
      const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);

      jobs = jobs.filter((job) => {
        // Tüm arama alanlarını birleştir
        const searchableText = [
          job.company,
          job.role,
          job.type,
          job.location,
          ...job.tags,
        ].join(" ");

        const normalizedText = normalizeText(searchableText);

        // Her kelime için kontrol et (AND mantığı) - çeviri desteği ile
        return queryWords.every((word) => {
          const translations = translateWord(word);
          return translations.some(translatedWord => normalizedText.includes(translatedWord));
        });
      });
    }

    // Sonra filtreleme yap
    if (activeFilter !== "Tümü") {
      jobs = jobs.filter((job) => {
        if (activeFilter === "Remote") return job.type.includes("Remote");
        if (activeFilter === "Hibrit") return job.type.includes("Hibrit");
        if (activeFilter === "Kampüs") return job.type.includes("Kampüs");
        return true;
      });
    }

    return jobs;
  };

  const filteredJobs = getFilteredJobs();

  // Sayfa yüklendiğinde veya hash değiştiğinde arama çubuğuna focus yap
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        if (window.location.hash === "#arama" && searchInputRef.current) {
          // Kısa bir gecikme ile scroll ve focus yap
          setTimeout(() => {
            const searchSection = document.getElementById("arama");
            if (searchSection) {
              searchSection.scrollIntoView({ behavior: "smooth", block: "center" });
              setTimeout(() => {
                if (searchInputRef.current) {
                  searchInputRef.current.focus();
                }
              }, 300);
            }
          }, 100);
        }
      };

      // İlk yüklemede kontrol et
      handleHashChange();

      // Hash değişikliklerini dinle
      window.addEventListener("hashchange", handleHashChange);

      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }
  }, []);

  // Tüm arama önerilerini oluştur - tam cümleler ve kelimeler
  const getAllSuggestions = () => {
    const suggestionsSet = new Set<string>();
    
    spotlightJobs.forEach((job) => {
      // Tam pozisyon adı (öncelikli)
      suggestionsSet.add(job.role);
      
      // Şirket adı
      suggestionsSet.add(job.company);
      
      // Tam çalışma tipi
      suggestionsSet.add(job.type);
      
      // Konum
      suggestionsSet.add(job.location);
      
      // Teknoloji etiketleri (tam olarak)
      job.tags.forEach(tag => {
        suggestionsSet.add(tag);
      });
      
      // Pozisyon kelimeleri (tek kelime önerileri için)
      job.role.split(/\s+/).forEach(word => {
        if (word.length > 2) suggestionsSet.add(word);
      });
      
      // Çalışma tipi kelimeleri
      job.type.split(/\s+/).forEach(word => {
        if (word.length > 2 && word !== "•") suggestionsSet.add(word);
      });
      
      // Etiket içindeki kelimeleri de ekle
      job.tags.forEach(tag => {
        tag.split(/\s+/).forEach(word => {
          if (word.length > 2) suggestionsSet.add(word);
        });
      });
    });

    return Array.from(suggestionsSet).sort();
  };

  // Önerileri filtrele ve sırala - birden fazla kelime desteği
  const getSuggestions = () => {
    if (!searchQuery.trim() || searchQuery.length < 1) return [];
    
    const normalizedQuery = normalizeText(searchQuery);
    const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);
    const allSuggestions = getAllSuggestions();
    
    const filtered = allSuggestions
      .filter(suggestion => {
        const normalizedSuggestion = normalizeText(suggestion);
        
        // Eğer tek kelime varsa, normal kontrol
        if (queryWords.length === 1) {
          return normalizedSuggestion.startsWith(normalizedQuery) || 
                 normalizedSuggestion.includes(normalizedQuery);
        }
        
        // Birden fazla kelime varsa, tüm kelimelerin eşleşmesi gerekiyor (AND mantığı)
        return queryWords.every(word => normalizedSuggestion.includes(word));
      })
      .map(suggestion => {
        const normalizedSuggestion = normalizeText(suggestion);
        let matchScore = 0;
        
        // Tam eşleşme en yüksek puan
        if (normalizedSuggestion === normalizedQuery) {
          matchScore = 1000;
        }
        // Başlangıçta eşleşme
        else if (normalizedSuggestion.startsWith(normalizedQuery)) {
          matchScore = 500;
        }
        // Tüm kelimeler eşleşiyor
        else if (queryWords.every(word => normalizedSuggestion.includes(word))) {
          matchScore = 300;
        }
        // Bazı kelimeler eşleşiyor
        else {
          matchScore = queryWords.filter(word => normalizedSuggestion.includes(word)).length * 50;
        }
        
        // Tam cümleler öncelikli (daha uzun öneriler)
        const lengthBonus = suggestion.length > 15 ? 50 : 0;
        
        return {
          text: suggestion,
          normalized: normalizedSuggestion,
          score: matchScore + lengthBonus,
          startsWith: normalizedSuggestion.startsWith(normalizedQuery),
          isFullMatch: normalizedSuggestion === normalizedQuery
        };
      })
      .sort((a, b) => {
        // Önce tam eşleşme
        if (a.isFullMatch && !b.isFullMatch) return -1;
        if (!a.isFullMatch && b.isFullMatch) return 1;
        // Sonra puan
        if (a.score !== b.score) return b.score - a.score;
        // Sonra başlangıçta eşleşenler
        if (a.startsWith && !b.startsWith) return -1;
        if (!a.startsWith && b.startsWith) return 1;
        // Son olarak alfabetik
        return a.text.localeCompare(b.text, 'tr');
      })
      .map(item => item.text)
      .slice(0, 8); // En fazla 8 öneri göster
    
    return filtered;
  };

  const suggestions = getSuggestions();

  // Öneri seçildiğinde
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    
    // Arama sonuçları bölümüne kaydır
    setTimeout(() => {
      const resultsSection = document.getElementById("firsatlar");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Klavye ile navigasyon
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
      setShowSuggestions(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter") {
      if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
        e.preventDefault();
        handleSuggestionClick(suggestions[selectedSuggestionIndex]);
      } else if (searchQuery.trim()) {
        // Enter'a basıldığında ve öneri seçili değilse, arama sonuçlarına kaydır
        e.preventDefault();
        const resultsSection = document.getElementById("firsatlar");
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8 pb-16 pt-6">
        {/* Modern Header */}
        <header className="sticky top-4 z-50 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl px-6 py-4 shadow-lg dark:shadow-2xl transition-all hover:border-slate-300 dark:hover:border-white/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-xl font-bold text-white shadow-lg">
              K
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                KariyerKöprü
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Öğrenci iş platformu</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a
              className="relative text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-500 after:transition-all hover:after:w-full"
              href="#firsatlar"
            >
              Fırsatlar
            </a>
            <a
              className="relative text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-500 after:transition-all hover:after:w-full"
              href="#program"
            >
              Program
            </a>
            <a
              className="relative text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-500 after:transition-all hover:after:w-full"
              href="#yorumlar"
            >
              Deneyimler
            </a>
            {user && (
              <Link
                href="/kaydedilenler"
                className="relative text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-500 after:transition-all hover:after:w-full"
              >
                Kaydedilenler
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
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105">
                  <span className="text-lg">
                    {user.role === "student" ? "👨‍🎓" : "🏢"}
                  </span>
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="p-3 border-b border-slate-200 dark:border-white/10">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Profilim
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      router.refresh();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
              >
                Giriş Yap
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-lg bg-slate-100 dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-300"
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
            <button className="rounded-lg bg-white/10 dark:bg-white/10 p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>

        <main className="mt-8 flex flex-1 flex-col gap-20">
          {/* Hero Section */}
          <section className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                öğrenciden profesyonele
              </div>
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-slate-900 via-cyan-700 to-blue-700 dark:from-white dark:via-cyan-100 dark:to-blue-200 bg-clip-text text-transparent">
                  Öğrencileri projelere, stajlara ve güvenilir şirketlere bağlayan köprü
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
                  Tüm süreci tek panelde yönet: ders programına uygun ilanları keşfet,
                  mentorluk al ve üçüncü günden itibaren ödeme almaya başla.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/ilan-bul" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105">
                  <span className="relative z-10">İlk ilanını bul</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </Link>
                <Link href="/ilan-olustur" className="rounded-full border-2 border-purple-300 dark:border-purple-500/30 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-purple-500/25 backdrop-blur-sm transition-all hover:shadow-purple-500/40 hover:scale-105">
                  📝 İlan Oluştur
                </Link>
                <Link href="/platform-kesfet" className="rounded-full border-2 border-slate-300 dark:border-white/20 bg-white/50 dark:bg-white/5 px-8 py-4 text-base font-semibold text-slate-900 dark:text-white backdrop-blur-sm transition-all hover:border-slate-400 dark:hover:border-white/40 hover:bg-white/80 dark:hover:bg-white/10">
                  Platformu keşfet
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-slate-900/80 dark:to-slate-950/80 p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/30 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">AI Eşleşme Skoru</p>
                  <span className="text-2xl">🤖</span>
                </div>
                <p className="text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  92
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Son 30 başvuruda ortalama</p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-slate-900/80 dark:to-slate-950/80 p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl transition-all hover:border-purple-400/50 dark:hover:border-cyan-400/30 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Müsaitlik</p>
                  <span className="text-2xl">⏰</span>
                </div>
                <p className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  18s
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Haftalık öngörülen</p>
              </div>
              <div className="lg:col-span-2 rounded-3xl border border-dashed border-slate-300 dark:border-white/20 bg-slate-50/50 dark:bg-gradient-to-br dark:from-slate-900/40 dark:to-slate-950/40 p-6 backdrop-blur-xl">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Hızlı Filtreler</p>
                <div className="flex flex-wrap gap-2">
                  {["Hibrit", "Veri", "Mentor destekli", "Ücretli", "Remote"].map(
                    (filter) => (
                      <button
                        key={filter}
                        className="rounded-full bg-slate-200 dark:bg-white/10 px-4 py-2 text-xs font-medium text-slate-700 dark:text-white transition-all hover:bg-cyan-200 dark:hover:bg-cyan-500/20 hover:border-cyan-400/50 border border-transparent"
                      >
                        {filter}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Search Bar Section - Moved up */}
          <section id="arama" className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 p-6 lg:p-8 backdrop-blur-xl shadow-lg relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="relative z-50">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-6 w-6 text-slate-400 dark:text-slate-500"
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
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    const newQuery = e.target.value;
                    setSearchQuery(newQuery);
                    setSelectedSuggestionIndex(-1);
                    
                    // Şehir veya çalışma şartı algılama
                    const detected = detectSearchType(newQuery);
                    
                    if (detected && detected.type === "both") {
                      // Hem şehir hem çalışma şartı algılandı - akıllı önerileri göster
                      setSmartSuggestionType("both");
                      setDetectedCity(detected.city);
                      setDetectedWorkType(detected.workType);
                      setDetectedValue(`${detected.city} + ${detected.workType}`);
                      setShowSmartSuggestions(true);
                      setShowSuggestions(false);
                    } else if (detected && detected.type === "city") {
                      // Şehir algılandı - akıllı önerileri göster
                      setSmartSuggestionType("city");
                      setDetectedCity(detected.value);
                      setDetectedWorkType("");
                      setDetectedValue(detected.value);
                      setShowSmartSuggestions(true);
                      setShowSuggestions(false); // Akıllı öneriler gösterilirken normal önerileri gizle
                    } else if (detected && detected.type === "workType") {
                      // Çalışma şartı algılandı - akıllı önerileri göster
                      setSmartSuggestionType("workType");
                      setDetectedCity("");
                      setDetectedWorkType(detected.value);
                      setDetectedValue(detected.value);
                      setShowSmartSuggestions(true);
                      setShowSuggestions(false);
                    } else {
                      // Algılama yok - normal önerileri göster
                      setShowSmartSuggestions(false);
                      setSmartSuggestionType(null);
                      setDetectedValue("");
                      setDetectedCity("");
                      setDetectedWorkType("");
                      setShowSuggestions(newQuery.trim().length > 0);
                    }
                  }}
                  onKeyDown={(e) => {
                    // Enter'a basıldığında dropdown'u kapatma
                    if (e.key === "Enter" && showSmartSuggestions) {
                      e.preventDefault();
                    }
                  }}
                  onFocus={() => {
                    setShowSuggestions(true);
                    const detected = detectSearchType(searchQuery);
                    if (detected && detected.type === "both") {
                      setSmartSuggestionType("both");
                      setDetectedCity(detected.city);
                      setDetectedWorkType(detected.workType);
                      setDetectedValue(`${detected.city} + ${detected.workType}`);
                      setShowSmartSuggestions(true);
                    } else if (detected && detected.type === "city") {
                      setSmartSuggestionType("city");
                      setDetectedCity(detected.value);
                      setDetectedWorkType("");
                      setDetectedValue(detected.value);
                      setShowSmartSuggestions(true);
                    } else if (detected && detected.type === "workType") {
                      setSmartSuggestionType("workType");
                      setDetectedCity("");
                      setDetectedWorkType(detected.value);
                      setDetectedValue(detected.value);
                      setShowSmartSuggestions(true);
                    }
                  }}
                  onBlur={() => {
                    // Öneri tıklaması için kısa bir gecikme
                    setTimeout(() => {
                      setShowSuggestions(false);
                      setShowSmartSuggestions(false);
                    }, 200);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Pozisyon, şirket, teknoloji veya konum ara... (örn: React, Frontend, İstanbul, Remote)"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSuggestions(false);
                      setSelectedSuggestionIndex(-1);
                    }}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                
                {/* Akıllı Öneri Dropdown (Şehir veya Çalışma Şartı) */}
                {showSmartSuggestions && smartSuggestionType && detectedValue && (
                  <div className="absolute z-[9999] w-full mt-2 bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-500/30 rounded-2xl shadow-2xl">
                    <div className="p-4 border-b border-slate-200 dark:border-white/10">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                        {smartSuggestionType === "both"
                          ? `${detectedCity}'daki ${detectedWorkType} hizmetlerden hangisini arıyorsunuz?`
                          : smartSuggestionType === "city" 
                          ? `${detectedValue}'daki hizmetlerden hangisini arıyorsunuz?`
                          : `${detectedValue} çalışma şartına sahip hizmetlerden hangisini arıyorsunuz?`
                        }
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Kategorilerden birini seçin veya direkt aramaya devam edin
                      </p>
                    </div>
                    <div className="p-2 max-h-64 overflow-y-auto">
                      {getSmartSuggestions().length > 0 ? (
                        getSmartSuggestions().map((suggestion, index) => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              // Kategori slug'ını oluştur
                              const categorySlug = suggestion
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
                              
                              // Query parametrelerini oluştur
                              const params = new URLSearchParams();
                              
                              // Şehir bilgisini query parametresi olarak ekle
                              if (smartSuggestionType === "city" || smartSuggestionType === "both") {
                                // normalizeText kullanarak tutarlı slug oluştur
                                const cityValue = smartSuggestionType === "both" ? detectedCity : detectedValue;
                                const normalizedCity = normalizeText(cityValue);
                                const citySlug = normalizedCity.replace(/ /g, "-");
                                params.set("sehir", citySlug);
                              }
                              
                              // Çalışma şartı bilgisini query parametresi olarak ekle
                              if (smartSuggestionType === "workType" || smartSuggestionType === "both") {
                                // Çalışma şartı slug'ını oluştur
                                const workTypeValue = smartSuggestionType === "both" ? detectedWorkType : detectedValue;
                                const workTypeSlug = normalizeText(workTypeValue).replace(/ /g, "-");
                                params.set("calisma-turu", workTypeSlug);
                              }
                              
                              // Kategori sayfasına parametreler ile yönlendir
                              const queryString = params.toString();
                              router.push(`/kategori/${categorySlug}${queryString ? `?${queryString}` : ""}`);
                              
                              setShowSmartSuggestions(false);
                              setShowSuggestions(false);
                              setSelectedSuggestionIndex(-1);
                            }}
                            onMouseEnter={() => setSelectedSuggestionIndex(index)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                              selectedSuggestionIndex === index
                                ? "bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <span className="text-lg">
                                {smartSuggestionType === "both" ? "📍💼" : smartSuggestionType === "city" ? "🏢" : "💼"}
                              </span>
                              <span className="text-sm font-medium">{suggestion}</span>
                            </div>
                            <svg
                              className="h-4 w-4 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                          Yükleniyor...
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Normal Öneri Dropdown */}
                {showSuggestions && !showSmartSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-[9999] w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl max-h-80 overflow-y-auto">
                    <div className="p-2">
                      {suggestions.map((suggestion, index) => {
                        const normalizedSuggestion = normalizeText(suggestion);
                        const normalizedQuery = normalizeText(searchQuery);
                        const matchIndex = normalizedSuggestion.indexOf(normalizedQuery);
                        
                        return (
                          <button
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onMouseEnter={() => setSelectedSuggestionIndex(index)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                              selectedSuggestionIndex === index
                                ? "bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <svg
                                className="h-4 w-4 text-slate-400 dark:text-slate-500"
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
                              <span className="text-sm font-medium">
                                {matchIndex >= 0 ? (
                                  <>
                                    {suggestion.substring(0, matchIndex)}
                                    <span className="font-bold text-cyan-600 dark:text-cyan-400">
                                      {suggestion.substring(matchIndex, matchIndex + searchQuery.length)}
                                    </span>
                                    {suggestion.substring(matchIndex + searchQuery.length)}
                                  </>
                                ) : (
                                  suggestion
                                )}
                              </span>
                            </div>
                            <svg
                              className="h-4 w-4 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {searchQuery && (
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                    {filteredJobs.length}
                  </span>{" "}
                  ilan bulundu
                  {filteredJobs.length === 0 && (
                    <span className="ml-2 text-slate-500 dark:text-slate-500">
                      • Farklı anahtar kelimeler deneyin
                    </span>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Stats Section */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 p-6 backdrop-blur-sm transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/30 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </section>

          {/* Jobs Section */}
          <section
            id="firsatlar"
            className="space-y-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 p-8 lg:p-12 backdrop-blur-xl shadow-lg"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-2">
                  aradığını hızlı bul
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  Alanlara göre kişiselleştirilmiş fırsatlar
                </h2>
              </div>
              <Link 
                href="/tum-ilanlar"
                className="rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-white transition-all hover:border-cyan-500 dark:hover:border-cyan-400/50 hover:bg-cyan-50 dark:hover:bg-cyan-500/10"
              >
                Hepsini gör →
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {["Tümü", "Remote", "Hibrit", "Kampüs"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Job Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                <article
                  key={job.company}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-950/60 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  {job.urgent && (
                    <div className="absolute top-4 right-4 rounded-full bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-300">
                      Acil
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-1">
                        {job.company}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{job.role}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{job.salary}</p>
                      <Link
                        href={`/ilan/${job.id}`}
                        className="rounded-lg bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 px-4 py-2 text-xs font-semibold text-cyan-700 dark:text-cyan-300 transition-all hover:bg-cyan-200 dark:hover:bg-cyan-500/20"
                      >
                        Detayları Gör
                      </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1 text-xs text-slate-700 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Sonuç bulunamadı
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Aradığınız kriterlere uygun ilan bulunamadı.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("Tümü");
                    }}
                    className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Categories Section */}
          <section className="space-y-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-gradient-to-br dark:from-slate-900/40 dark:to-slate-950/40 p-8 lg:p-12 backdrop-blur-xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-2">
                alanlar
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Takımlar ders programına göre öğrenciler arıyor
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Kulüp geçmişini, proje dosyalarını ve portföy linklerini bağla. Platform seni
                doğru kategoriye otomatik önerir.
          </p>
        </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const categorySlug = category.title
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
                    key={category.title}
                    href={`/kategori/${categorySlug}`}
                    className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-br ${category.lightColor} ${category.darkColor} p-6 backdrop-blur-sm transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:scale-105 hover:shadow-xl cursor-pointer`}
                  >
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{category.title}</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{category.desc}</p>
                    <div className="mt-4 text-xs font-semibold text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Detayları gör →
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Steps Section */}
          <section
            id="program"
            className="space-y-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 p-8 lg:p-12 backdrop-blur-xl shadow-lg"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-2">
                adım adım destek
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                KariyerKöprü öğrenci yolculuğu
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-950/60 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:scale-105"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-500/20 dark:to-blue-500/20 border border-cyan-300 dark:border-cyan-400/30 text-2xl">
                      {step.icon}
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-sm font-bold text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-400/30">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section
            id="yorumlar"
            className="space-y-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-gradient-to-br dark:from-slate-900/40 dark:to-slate-950/40 p-8 lg:p-12 backdrop-blur-xl"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-2">
                öğrenci deneyimleri
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Binlerce öğrenciye ilham veriyoruz
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-950/60 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/40 hover:scale-105"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10 pt-8 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white">
              K
            </div>
            <p>© {new Date().getFullYear()} KariyerKöprü. Öğrencilerin kariyer yolculuğu için tasarlandı.</p>
          </div>
          <div className="flex gap-6">
            <a className="transition-colors hover:text-slate-900 dark:hover:text-white" href="#">
              Gizlilik
            </a>
            <a className="transition-colors hover:text-slate-900 dark:hover:text-white" href="#">
              Destek
            </a>
            <a className="transition-colors hover:text-slate-900 dark:hover:text-white" href="#">
              Hakkımızda
          </a>
        </div>
        </footer>
      </div>
    </div>
  );
}
