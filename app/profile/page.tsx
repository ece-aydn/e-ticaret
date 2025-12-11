"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../components/ThemeProvider";
import { supabase } from "../lib/supabase";

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    skills: [] as string[],
    website: "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState({ x: 100, y: 100, width: 200, height: 200 });
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [cropInImageCoords, setCropInImageCoords] = useState<{ x: number; y: number; size: number } | null>(null);

  const loadProfile = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profil yükleme hatası:", error);
        // Hata durumunda varsayılan değerler
        setFormData({
          name: user.name,
          email: user.email,
          phone: "",
          bio: "",
          location: "",
          skills: [],
          website: "",
        });
        return;
      }

      if (data) {
        setFormData({
          name: data.name || user.name,
          surname: data.surname || "",
          email: data.email || user.email,
          phone: data.phone || "",
          bio: data.bio || "",
          location: data.location || "",
          skills: data.skills || [],
          website: data.website || "",
        });

        // Profil fotoğrafını yükle
        if (data.profile_image_url) {
          setProfileImage(data.profile_image_url);
          setImagePreview(data.profile_image_url);
        }
      }
    } catch (error) {
      console.error("Profil yükleme hatası:", error);
      // Hata durumunda varsayılan değerler
      setFormData({
        name: user.name,
        surname: "",
        email: user.email,
        phone: "",
        bio: "",
        location: "",
        skills: [],
        website: "",
      });
    }
  }, [user]);

  useEffect(() => {
    // Kullanıcı yüklenene kadar bekle
    if (isLoading) return;
    
    // Kullanıcı yoksa login sayfasına yönlendir
    if (!user) {
      router.push("/login");
      return;
    }

    // Supabase'den profil bilgilerini yükle
    loadProfile();
  }, [user, isLoading, router, loadProfile]);

  // Yükleniyor veya kullanıcı yoksa loading göster
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!user) return;

    try {
      // Profil fotoğrafını Supabase Storage'a yükle (eğer varsa)
      let profileImageUrl = profileImage;
      
      if (imagePreview && imagePreview !== profileImage) {
        // Base64'ü blob'a çevir
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        
        // Dosya adı oluştur
        const fileExt = imagePreview.split(';')[0].split('/')[1];
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        // Supabase Storage'a yükle
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('profile-images')
          .upload(fileName, blob, {
            contentType: `image/${fileExt}`,
            upsert: true,
          });

        if (uploadError) {
          console.error("Fotoğraf yükleme hatası:", uploadError);
        } else {
          // Public URL'i al
          const { data: urlData } = supabase.storage
            .from('profile-images')
            .getPublicUrl(fileName);
          
          profileImageUrl = urlData.publicUrl;
        }
      }

      // Profil bilgilerini güncelle
      const { error } = await supabase
        .from("profiles")
        .update({
          name: formData.name,
          surname: formData.surname || null,
          phone: formData.phone,
          bio: formData.bio,
          location: formData.location,
          skills: formData.skills,
          website: formData.website,
          profile_image_url: profileImageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        console.error("Profil güncelleme hatası:", error);
        alert("Profil güncellenirken bir hata oluştu!");
        return;
      }

      // Başarılı güncelleme
      if (profileImageUrl) {
        setProfileImage(profileImageUrl);
      }
      
      setIsEditing(false);
      alert("Profil başarıyla güncellendi!");
    } catch (error) {
      console.error("Profil kaydetme hatası:", error);
      alert("Profil kaydedilirken bir hata oluştu!");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dosya boyutu kontrolü (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Dosya boyutu 5MB'dan küçük olmalıdır!");
        return;
      }

      // Dosya tipi kontrolü
      if (!file.type.startsWith("image/")) {
        alert("Lütfen bir resim dosyası seçin!");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setOriginalImage(result);
        setShowCropModal(true);
        // Varsayılan crop alanını ayarla (merkeze - 400x400 container, 200x200 crop)
        const defaultCrop = { x: 100, y: 100, width: 200, height: 200 };
        setCropArea(defaultCrop);
        setImageScale(1);
        setImagePosition({ x: 0, y: 0 });
        setIsDragging(false);
        
        // İlk crop alanını görüntü koordinatlarında kaydet
        const img = new Image();
        img.src = result;
        img.onload = () => {
          const imgAspect = img.width / img.height;
          const containerSize = 400;
          let displayWidth = containerSize;
          let displayHeight = containerSize;
          
          if (imgAspect > 1) {
            displayHeight = displayWidth / imgAspect;
          } else {
            displayWidth = displayHeight * imgAspect;
          }
          
          saveCropToImageCoords(img, displayWidth, displayHeight, 1, { x: 0, y: 0 }, defaultCrop);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!originalImage || !containerRef.current) return;

    const img = new Image();
    img.src = originalImage;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Container boyutu (sabit 400px)
      const containerSize = 400;
      
      // Görüntü aspect ratio'sunu hesapla
      const imgAspect = img.width / img.height;
      
      // Container içinde görüntünün doğal display boyutları (object-contain)
      let displayWidth = containerSize;
      let displayHeight = containerSize;
      
      if (imgAspect > 1) {
        // Görüntü yatay (geniş) - yüksekliği container'a sığdır
        displayHeight = displayWidth / imgAspect;
      } else {
        // Görüntü dikey (uzun) - genişliği container'a sığdır
        displayWidth = displayHeight * imgAspect;
      }
      
      // Scale uygulanmış görüntü boyutları
      const scaledWidth = displayWidth * imageScale;
      const scaledHeight = displayHeight * imageScale;
      
      // Container merkezi
      const containerCenterX = containerSize / 2;
      const containerCenterY = containerSize / 2;
      
      // Görüntünün container içindeki gerçek pozisyonu (sol üst köşe)
      // Transform origin center olduğu için merkezden hesaplıyoruz
      const imgLeft = containerCenterX - scaledWidth / 2 + imagePosition.x;
      const imgTop = containerCenterY - scaledHeight / 2 + imagePosition.y;
      
      // Crop alanının merkezi (container koordinatlarında)
      const cropCenterX = cropArea.x + cropArea.width / 2;
      const cropCenterY = cropArea.y + cropArea.height / 2;
      
      // Crop alanının görüntü display koordinatlarındaki pozisyonu
      const cropXInDisplay = cropCenterX - imgLeft;
      const cropYInDisplay = cropCenterY - imgTop;
      
      // Display koordinatlarından orijinal görüntü koordinatlarına dönüşüm
      // Önce scale'i geri al (doğal display koordinatlarına dön)
      const cropXInNaturalDisplay = cropXInDisplay / imageScale;
      const cropYInNaturalDisplay = cropYInDisplay / imageScale;
      const cropSizeInNaturalDisplay = cropArea.width / imageScale;
      
      // Görüntü boyutuna göre ölçekleme faktörleri
      // object-contain kullanıldığı için her iki boyut için de aynı ölçekleme faktörü kullanılmalı
      const scaleRatio = Math.min(img.width / displayWidth, img.height / displayHeight);
      
      // Crop alanının orijinal görüntü koordinatları
      const cropXInImage = cropXInNaturalDisplay * scaleRatio;
      const cropYInImage = cropYInNaturalDisplay * scaleRatio;
      const cropSizeInImage = cropSizeInNaturalDisplay * scaleRatio;
      
      // Crop alanının sınırlarını hesapla (yuvarlak crop için kare alan)
      const halfSize = cropSizeInImage / 2;
      const sourceX = Math.max(0, Math.min(img.width - cropSizeInImage, cropXInImage - halfSize));
      const sourceY = Math.max(0, Math.min(img.height - cropSizeInImage, cropYInImage - halfSize));
      const sourceSize = Math.min(
        cropSizeInImage,
        img.width - sourceX,
        img.height - sourceY
      );
      
      // Canvas'a çiz (yuvarlak crop için)
      canvas.width = 400;
      canvas.height = 400;
      
      // Yuvarlak clipping path oluştur
      ctx.beginPath();
      ctx.arc(200, 200, 200, 0, Math.PI * 2);
      ctx.clip();
      
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        400,
        400
      );

      const croppedImage = canvas.toDataURL("image/png");
      setImagePreview(croppedImage);
      setShowCropModal(false);
      setOriginalImage(null);
    };
  };

  const updateCropAreaFromImageCoords = (
    img: HTMLImageElement,
    displayWidth: number,
    displayHeight: number,
    scale: number,
    position: { x: number; y: number }
  ) => {
    if (!cropInImageCoords) return;

    const containerSize = 400;
    const containerCenterX = containerSize / 2;
    const containerCenterY = containerSize / 2;
    
    // Scale uygulanmış görüntü boyutları
    const scaledWidth = displayWidth * scale;
    const scaledHeight = displayHeight * scale;
    
    // Görüntünün container içindeki pozisyonu
    const imgLeft = containerCenterX - scaledWidth / 2 + position.x;
    const imgTop = containerCenterY - scaledHeight / 2 + position.y;
    
    // Görüntü koordinatlarından container koordinatlarına dönüşüm
    const scaleRatio = Math.min(img.width / displayWidth, img.height / displayHeight);
    const cropXInDisplay = (cropInImageCoords.x / scaleRatio) * scale;
    const cropYInDisplay = (cropInImageCoords.y / scaleRatio) * scale;
    const cropSizeInDisplay = (cropInImageCoords.size / scaleRatio) * scale;
    
    // Container koordinatlarına çevir
    const cropX = imgLeft + cropXInDisplay - cropSizeInDisplay / 2;
    const cropY = imgTop + cropYInDisplay - cropSizeInDisplay / 2;
    
    setCropArea({
      x: Math.max(0, Math.min(containerSize - cropSizeInDisplay, cropX)),
      y: Math.max(0, Math.min(containerSize - cropSizeInDisplay, cropY)),
      width: cropSizeInDisplay,
      height: cropSizeInDisplay,
    });
  };

  const handleZoom = (delta: number) => {
    const newScale = Math.max(0.5, Math.min(3, imageScale + delta));
    setImageScale(newScale);
    
    // Eğer görüntü koordinatları kaydedilmişse, crop alanını güncelle
    if (originalImage && cropInImageCoords) {
      const img = new Image();
      img.src = originalImage;
      img.onload = () => {
        const imgAspect = img.width / img.height;
        const containerSize = 400;
        let displayWidth = containerSize;
        let displayHeight = containerSize;
        
        if (imgAspect > 1) {
          displayHeight = displayWidth / imgAspect;
        } else {
          displayWidth = displayHeight * imgAspect;
        }
        
        updateCropAreaFromImageCoords(img, displayWidth, displayHeight, newScale, imagePosition);
      };
    }
  };

  const handleMove = (deltaX: number, deltaY: number) => {
    const newPosition = {
      x: imagePosition.x + deltaX,
      y: imagePosition.y + deltaY,
    };
    setImagePosition(newPosition);
    
    // Eğer görüntü koordinatları kaydedilmişse, crop alanını güncelle
    if (originalImage && cropInImageCoords) {
      const img = new Image();
      img.src = originalImage;
      img.onload = () => {
        const imgAspect = img.width / img.height;
        const containerSize = 400;
        let displayWidth = containerSize;
        let displayHeight = containerSize;
        
        if (imgAspect > 1) {
          displayHeight = displayWidth / imgAspect;
        } else {
          displayWidth = displayHeight * imgAspect;
        }
        
        updateCropAreaFromImageCoords(img, displayWidth, displayHeight, imageScale, newPosition);
      };
    }
  };

  const saveCropToImageCoords = (
    img: HTMLImageElement,
    displayWidth: number,
    displayHeight: number,
    scale: number,
    position: { x: number; y: number },
    cropArea: { x: number; y: number; width: number; height: number }
  ) => {
    const containerSize = 400;
    const containerCenterX = containerSize / 2;
    const containerCenterY = containerSize / 2;
    
    // Scale uygulanmış görüntü boyutları
    const scaledWidth = displayWidth * scale;
    const scaledHeight = displayHeight * scale;
    
    // Görüntünün container içindeki pozisyonu
    const imgLeft = containerCenterX - scaledWidth / 2 + position.x;
    const imgTop = containerCenterY - scaledHeight / 2 + position.y;
    
    // Crop alanının merkezi (container koordinatlarında)
    const cropCenterX = cropArea.x + cropArea.width / 2;
    const cropCenterY = cropArea.y + cropArea.height / 2;
    
    // Crop alanının görüntü display koordinatlarındaki pozisyonu
    const cropXInDisplay = cropCenterX - imgLeft;
    const cropYInDisplay = cropCenterY - imgTop;
    
    // Display koordinatlarından orijinal görüntü koordinatlarına dönüşüm
    const cropXInNaturalDisplay = cropXInDisplay / scale;
    const cropYInNaturalDisplay = cropYInDisplay / scale;
    const cropSizeInNaturalDisplay = cropArea.width / scale;
    
    // Görüntü boyutuna göre ölçekleme
    const scaleRatio = Math.min(img.width / displayWidth, img.height / displayHeight);
    
    // Görüntü koordinatlarında crop alanı
    setCropInImageCoords({
      x: cropXInNaturalDisplay * scaleRatio,
      y: cropYInNaturalDisplay * scaleRatio,
      size: cropSizeInNaturalDisplay * scaleRatio,
    });
  };

  const handleCropAreaDrag = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left - dragStart.x;
    const y = e.clientY - rect.top - dragStart.y;
    
    const newCropArea = {
      x: Math.max(0, Math.min(400 - cropArea.width, x)),
      y: Math.max(0, Math.min(400 - cropArea.height, y)),
      width: cropArea.width,
      height: cropArea.height,
    };
    
    setCropArea(newCropArea);
    
    // Crop alanını görüntü koordinatlarında kaydet
    if (originalImage) {
      const img = new Image();
      img.src = originalImage;
      img.onload = () => {
        const imgAspect = img.width / img.height;
        const containerSize = 400;
        let displayWidth = containerSize;
        let displayHeight = containerSize;
        
        if (imgAspect > 1) {
          displayHeight = displayWidth / imgAspect;
        } else {
          displayWidth = displayHeight * imgAspect;
        }
        
        saveCropToImageCoords(img, displayWidth, displayHeight, imageScale, imagePosition, newCropArea);
      };
    }
  };

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setDragStart({
      x: e.clientX - rect.left - cropArea.x,
      y: e.clientY - rect.top - cropArea.y,
    });
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setProfileImage(null);
    localStorage.removeItem(`profileImage_${user.id}`);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  // İstatistikler state'i
  const [stats, setStats] = useState<Array<{ label: string; value: string; icon: string }>>([]);

  // İstatistikleri yükle
  useEffect(() => {
    if (!user) return;

    const loadStats = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select(
            user.role === "student"
              ? "total_applications, interviews, accepted, profile_views"
              : "active_jobs, total_applications_received, evaluations, hired"
          )
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("İstatistik yükleme hatası:", error);
          // Varsayılan değerler
          setStats(
            user.role === "student"
              ? [
                  { label: "Toplam Başvuru", value: "0", icon: "📝" },
                  { label: "Görüşme", value: "0", icon: "💼" },
                  { label: "Kabul Edilen", value: "0", icon: "✅" },
                  { label: "Profil Görüntüleme", value: "0", icon: "👁️" },
                ]
              : [
                  { label: "Aktif İlan", value: "0", icon: "📋" },
                  { label: "Başvuru", value: "0", icon: "📥" },
                  { label: "Değerlendirme", value: "0", icon: "⭐" },
                  { label: "İşe Alınan", value: "0", icon: "👥" },
                ]
          );
          return;
        }

        if (data) {
          if (user.role === "student") {
            setStats([
              {
                label: "Toplam Başvuru",
                value: String(data.total_applications || 0),
                icon: "📝",
              },
              {
                label: "Görüşme",
                value: String(data.interviews || 0),
                icon: "💼",
              },
              {
                label: "Kabul Edilen",
                value: String(data.accepted || 0),
                icon: "✅",
              },
              {
                label: "Profil Görüntüleme",
                value: String(data.profile_views || 0),
                icon: "👁️",
              },
            ]);
          } else {
            setStats([
              {
                label: "Aktif İlan",
                value: String(data.active_jobs || 0),
                icon: "📋",
              },
              {
                label: "Başvuru",
                value: String(data.total_applications_received || 0),
                icon: "📥",
              },
              {
                label: "Değerlendirme",
                value: String(data.evaluations || 0),
                icon: "⭐",
              },
              {
                label: "İşe Alınan",
                value: String(data.hired || 0),
                icon: "👥",
              },
            ]);
          }
        }
      } catch (error) {
        console.error("İstatistik yükleme hatası:", error);
      }
    };

    loadStats();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Ana Sayfaya Dön
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profil</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {user.role === "student" ? "Öğrenci Profili" : "Şirket Profili"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
                >
                  Profili Düzenle
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setImagePreview(profileImage); // Önizlemeyi sıfırla
                    }}
                    className="rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-800 px-6 py-2 text-sm font-semibold text-slate-700 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSave}
                    className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
                  >
                    Kaydet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sol Kolon - Profil Bilgileri */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profil Kartı */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl">
              <div className="text-center">
                {/* Profil Fotoğrafı */}
                <div className="relative inline-block mb-4">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                    {imagePreview || profileImage ? (
                      <img
                        src={imagePreview || profileImage || ""}
                        alt="Profil fotoğrafı"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-5xl">
                        {user.role === "student" ? "👨‍🎓" : "🏢"}
                      </div>
                    )}
                  </div>
                  
                  {/* Fotoğraf Yükleme Butonu */}
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <label className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg transition-all hover:bg-cyan-600 hover:scale-110">
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
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                  
                  {/* Fotoğraf Silme Butonu */}
                  {isEditing && (imagePreview || profileImage) && (
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-all hover:bg-red-600 hover:scale-110"
                      title="Fotoğrafı sil"
                    >
                      <svg
                        className="h-4 w-4"
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
                </div>
                {isEditing ? (
                  <div className="space-y-2 mb-2">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ad"
                      className="text-xl font-bold text-slate-900 dark:text-white bg-transparent border-b-2 border-cyan-500 dark:border-cyan-400 outline-none text-center w-full"
                    />
                    {user.role === "student" && (
                      <input
                        type="text"
                        value={formData.surname}
                        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                        placeholder="Soyad"
                        className="text-xl font-bold text-slate-900 dark:text-white bg-transparent border-b-2 border-cyan-500 dark:border-cyan-400 outline-none text-center w-full"
                      />
                    )}
                  </div>
                ) : (
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {user.role === "student" && formData.surname
                      ? `${formData.name} ${formData.surname}`
                      : formData.name}
                  </h2>
                )}
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {formData.email}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 dark:bg-cyan-900/20 px-4 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                  {user.role === "student" ? "👨‍🎓 Öğrenci" : "🏢 Şirket"}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
                    Konum
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-400 outline-none"
                    />
                  ) : (
                    <p className="text-sm text-slate-700 dark:text-slate-300">{formData.location}</p>
                  )}
                </div>

                {user.role === "company" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
                      Website
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-400 outline-none"
                      />
                    ) : (
                      <a
                        href={formData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                      >
                        {formData.website}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* İstatistikler */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">İstatistikler</h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3 text-center"
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Detaylar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hakkında */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Hakkında</h3>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20 outline-none resize-none"
                  placeholder="Kendiniz hakkında bilgi verin..."
                />
              ) : (
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {formData.bio || "Henüz bir açıklama eklenmemiş."}
                </p>
              )}
            </div>

            {/* Yetenekler / Hizmetler */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                {user.role === "student" ? "Yetenekler" : "Hizmetler"}
              </h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 rounded-full bg-cyan-100 dark:bg-cyan-900/20 px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-300"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-cyan-900 dark:hover:text-cyan-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                      placeholder="Yeni yetenek ekle..."
                      className="flex-1 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-400 outline-none"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600 transition-colors"
                    >
                      Ekle
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.length > 0 ? (
                    formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/20 px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-300"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Henüz yetenek eklenmemiş.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* İletişim Bilgileri */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">İletişim Bilgileri</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    E-posta
                  </label>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{formData.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Telefon
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-400 outline-none"
                      placeholder="+90 555 123 45 67"
                    />
                  ) : (
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {formData.phone || "Henüz telefon numarası eklenmemiş."}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Çıkış Yap Butonu */}
            <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-1">
                    Hesap Yönetimi
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Hesabınızdan çıkış yapmak istiyor musunuz?
                  </p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="rounded-lg bg-red-500 px-6 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crop Modal */}
      {showCropModal && originalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Fotoğrafı Düzenle
              </h3>
              <button
                onClick={() => {
                  setShowCropModal(false);
                  setOriginalImage(null);
                }}
                className="rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4 rounded-lg bg-slate-100 dark:bg-slate-800 p-4">
              <div 
                ref={containerRef}
                className="relative mx-auto overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700"
                style={{ width: "400px", height: "400px" }}
                onMouseMove={handleCropAreaDrag}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
              >
                <div className="relative h-full w-full flex items-center justify-center">
                  <div
                    className="relative"
                    style={{
                      transform: `scale(${imageScale}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                      transformOrigin: "center center",
                    }}
                  >
                    <img
                      src={originalImage}
                      alt="Crop preview"
                      className="max-h-full max-w-full object-contain"
                      draggable={false}
                      style={{ display: "block" }}
                    />
                  </div>
                </div>
                {/* Crop Overlay */}
                <div className="absolute inset-0">
                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at ${cropArea.x + cropArea.width / 2}px ${cropArea.y + cropArea.height / 2}px, transparent ${cropArea.width / 2}px, rgba(0, 0, 0, 0.5) ${cropArea.width / 2}px)`,
                    }}
                  />
                  {/* Crop area - draggable */}
                  <div
                    className="absolute border-2 border-white shadow-lg cursor-move"
                    style={{
                      left: `${cropArea.x}px`,
                      top: `${cropArea.y}px`,
                      width: `${cropArea.width}px`,
                      height: `${cropArea.height}px`,
                      borderRadius: "50%",
                    }}
                    onMouseDown={startDrag}
                  />
                  {/* Crop border highlight */}
                  <div
                    className="absolute border-2 border-cyan-400 pointer-events-none"
                    style={{
                      left: `${cropArea.x}px`,
                      top: `${cropArea.y}px`,
                      width: `${cropArea.width}px`,
                      height: `${cropArea.height}px`,
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Kontroller */}
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Yakınlaştır: {Math.round(imageScale * 100)}%
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleZoom(-0.1)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                      />
                    </svg>
                  </button>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={imageScale}
                    onChange={(e) => {
                      const newScale = parseFloat(e.target.value);
                      setImageScale(newScale);
                      
                      // Crop alanını güncelle
                      if (originalImage && cropInImageCoords) {
                        const img = new Image();
                        img.src = originalImage;
                        img.onload = () => {
                          const imgAspect = img.width / img.height;
                          const containerSize = 400;
                          let displayWidth = containerSize;
                          let displayHeight = containerSize;
                          
                          if (imgAspect > 1) {
                            displayHeight = displayWidth / imgAspect;
                          } else {
                            displayWidth = displayHeight * imgAspect;
                          }
                          
                          updateCropAreaFromImageCoords(img, displayWidth, displayHeight, newScale, imagePosition);
                        };
                      }
                    }}
                    className="flex-1"
                  />
                  <button
                    onClick={() => handleZoom(0.1)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Konum Ayarla
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleMove(0, -10)}
                    className="rounded-lg bg-slate-200 dark:bg-slate-700 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    ↑ Yukarı
                  </button>
                  <button
                    onClick={() => handleMove(0, 10)}
                    className="rounded-lg bg-slate-200 dark:bg-slate-700 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    ↓ Aşağı
                  </button>
                  <button
                    onClick={() => handleMove(-10, 0)}
                    className="rounded-lg bg-slate-200 dark:bg-slate-700 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    ← Sol
                  </button>
                  <button
                    onClick={() => handleMove(10, 0)}
                    className="rounded-lg bg-slate-200 dark:bg-slate-700 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    Sağ →
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCropModal(false);
                    setOriginalImage(null);
                  }}
                  className="flex-1 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  İptal
                </button>
                <button
                  onClick={handleCrop}
                  className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40"
                >
                  Kırp ve Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

