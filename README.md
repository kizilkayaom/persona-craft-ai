# 🎨 PersonaCraft AI — Akıllı Pazarlama ve Hedef Kitle Odaklı İçerik Yönetim Platformu

> **Samsung Innovation Campus** kapsamında geliştirilen **PersonaCraft AI**, yapay zekanın gücünü kullanarak girilen ürün veya hizmetleri, seçilen hedef kitlenin psikolojik ve satın alma motivasyonlarına göre yeniden konumlandıran yüksek kaliteli bir pazarlama asistanıdır.

---

## 🚀 Proje Hakkında

Geleneksel pazarlama yöntemlerinde tek bir mesajın herkese ulaşması beklenirken, modern pazarlamada **kişiselleştirme (hyper-personalization)** başarının anahtarıdır. PersonaCraft AI, bu felsefeyi merkeze alarak dijital pazarlama profesyonellerinin, metin yazarlarının ve girişimcilerin hedef kitleye özel, yüksek dönüşüm oranlı kampanyalar kurgulamasını sağlar.

Uygulama, hem **Simülasyon Modu** (tasarım ve arayüz testleri için) hem de **Canlı Yapay Zeka Modu** (gerçek Gemini 2.5 Flash API entegrasyonu) ile çalışmaktadır. Samsung'un modern ve minimalist tasarım dilini yansıtan dinamik bir canlı görsel önizleme ekranına, cihaz döndürme yeteneklerine ve kurumsal raporlama modülüne sahiptir.

---

## ✨ Öne Çıkan Özellikler

### 1. Akıllı Hedef Kitle Konumlandırması (Persona Matching)
* Girişi yapılan ürün veya hizmeti analiz eder.
* **Gençler, Aileler, Kurumsal, Teknoloji Meraklıları, Öğrenciler** veya **Premium Kullanıcılar** arasından seçilen hedef kitlenin ilgi alanlarına, beklentilerine ve dil tonuna uygun pazarlama dili kurgular.

### 2. Canlı Görsel Önizleme ve Gerçekçi Cihaz Simülatörü (Samsung Galaxy Estetiği)
* **Dinamik Çıktı Formatları:** Instagram Postu, Reklam Metni, E-posta, Web Sitesi Açıklaması ve SMS Kampanyası.
* **Samsung Galaxy Mobil & Tablet Kasaları:** Üretilen içeriği, dikey ya da yatay döndürülebilen (landscape/portrait) Samsung Galaxy arayüzlerinde gerçekçi birer görsel şablon olarak canlı olarak önizleme imkanı sunar.
* **Gelişmiş Web Browser ve E-posta Arayüzleri:** Profesyonel e-posta gönderici başlığı, konusu ve dinamik imzasıyla e-posta çıktısını gerçeğe en yakın şekilde simüle eder.

### 3. Gelişmiş Prompt Mühendisliği Stratejileri
* İçerik üretim süreçlerinde yapay zekanın çıktısını optimize etmek için 3 farklı stratejiyi destekler:
  * **Zero-shot:** Direkt ve hızlı üretim.
  * **Few-shot:** Şablon ve örneklerle zenginleştirilmiş, yapısal açıdan kusursuz üretim.
  * **Chain of Thought (Düşünce Zinciri):** Yapay zekanın önce hedef kitle analizi yapıp ardından pazarlama adımlarını mantık silsilesiyle kurguladığı derinlemesine üretim.

### 4. Profesyonel PDF Raporlama ve Dışa Aktarım (`jsPDF` Entegrasyonu)
* Üretilen kampanya içeriğini tek tıkla profesyonel bir **PDF Raporuna** dönüştürür.
* **Rapor Özellikleri:**
  * Samsung Kurumsal Mavisi (`#1428a0`) ve slate-slate renk paletine sahip şık tasarım.
  * Ürün bilgisi, hedef kitle, prompt stratejisi ve yapay zeka detaylarını içeren şık yapılandırılmış bir **Metadata Kartı**.
  * Otomatik sayfa sonu algılama ve kelime kaydırma (automatic word-wrap / auto-pagination).
  * Türkçe karakter desteği için temizlenmiş, Helvetica uyumlu metin mimarisi.
  * Resmi rapor hissi veren dinamik sayfa numaralandırması ve alt bilgi (footer) alanları.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

### Frontend (İstemci Tarafı)
* **React 18 & TypeScript:** Güçlü, modüler ve güvenli tip sistemi.
* **Vite:** Ultra hızlı derleme ve istemci tarafı optimize edilmiş yapı.
* **Tailwind CSS:** Samsung'un modern kurumsal kimliğine ve minimalist tasarım çizgisine uygun responsive arayüz.
* **Framer Motion (`motion/react`):** Akıcı tab geçişleri, cihaz döndürme efektleri ve animasyonlar.
* **Lucide React:** Modern ve temiz vektörel ikon kütüphanesi.
* **jsPDF:** İstemci tarafında sunucuya ihtiyaç duymadan, yüksek hızda profesyonel PDF raporları oluşturma ve indirme.

### Backend (Sunucu Tarafı)
* **Express & Node.js:** Güvenli ve ölçeklenebilir API yönlendirme katmanı.
* **Google Gen AI SDK (`@google/genai`):** Gemini API'nin en güncel standartlarına (`gemini-2.5-flash` modeli) tam uyumlu entegrasyon.
* **Esbuild:** TypeScript sunucu kodunun üretime hazır, optimize edilmiş tek bir dosyaya (`dist/server.cjs`) derlenmesi.

---

## 📁 Klasör Yapısı

```bash
├── src/
│   ├── components/
│   │   └── FormatPreview.tsx   # Canlı görsel simülatör (Samsung Galaxy mobil/tablet, e-posta, web mockupları)
│   ├── App.tsx                 # Ana kullanıcı arayüzü, form girişleri, PDF üretim motoru ve yönetim
│   ├── index.css               # Tailwind CSS tanımlamaları ve özel font konfigürasyonları
│   └── main.tsx                # React başlangıç noktası
├── server.ts                   # Express.js API rotaları, Gemini SDK bağlantısı ve statik dosya sunucusu
├── app.py                      # Python / Streamlit entegrasyon katmanı (Alternatif Python sürümü için)
├── services/
│   └── generator.py            # Python tarafı Gemini API servis modülü
├── package.json                # Bağımlılıklar, build ve start komutları
├── .env.example                # Çevre değişkeni şablonu (API Anahtarları)
└── README.md                   # Proje dokümantasyonu (Bu dosya)
```

---

## ⚙️ Kurulum ve Çalıştırma

### Gereksinimler
* Node.js (v18 veya üzeri önerilir)
* npm (ya da yarn)

### 1. Bağımlılıkların Yüklenmesi
Proje kök dizininde aşağıdaki komutu çalıştırarak gerekli tüm paketleri yükleyin:
```bash
npm install
```

### 2. Çevre Değişkenlerinin Tanımlanması
Proje kök dizininde bulunan `.env.example` dosyasını kopyalayıp `.env` adında bir dosya oluşturun ve içerisine Google Gemini API anahtarınızı tanımlayın:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Geliştirme Sunucusunun Başlatılması (Development)
Frontend ve Backend'i aynı anda tsx tabanlı Express sunucusu üzerinden başlatmak için:
```bash
npm run dev
```
Uygulama varsayılan olarak **http://localhost:3000** adresinde çalışmaya başlayacaktır.

### 4. Üretim İçin Derleme (Production Build)
Uygulamayı canlı ortama aktarmak üzere derlemek için:
```bash
npm run build
```
Bu komut hem frontend statik dosyalarını hem de `server.ts` dosyasını `dist/` klasörü içerisine optimize edilmiş bir şekilde derler.

### 5. Derlenmiş Uygulamanın Başlatılması (Start)
Derlenen uygulamayı üretim modunda çalıştırmak için:
```bash
npm run start
```

---

## 📄 PDF Rapor Örneği Yapısı
İndirilen PDF Raporları, kurumsal standartlara uygun olarak şu hiyerarşide oluşturulur:
1. **Üst Bilgi (Header):** `SAMSUNG | Innovation Campus | PersonaCraft AI` ibaresi ve mavi şerit.
2. **Başlık Alanı:** Rapor adı ve üretilme tarihi (tarih-saat damgası).
3. **Konfigürasyon Tablosu (Metadata Card):**
   * Ürün, hedef kitle, çıktı biçimi, kullanılan prompt mühendisliği yöntemi ve yapay zeka üretim modeli.
4. **Ana İçerik Bölümü:** Belirlenen şablonda üretilmiş reklam veya kampanya metni (sayfa taşmaları otomatik hesaplanır).
5. **Alt Bilgi (Footer):** Telif hakları, sistem damgası ve dinamik sayfa numaraları (`Sayfa 1`, `Sayfa 2`...).

---

## 🛡️ Lisans
Bu proje **Samsung Innovation Campus** eğitim programı kapsamında geliştirilmiştir. Tüm hakları saklıdır.
