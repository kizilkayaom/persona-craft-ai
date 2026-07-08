# 🎨 PersonaCraft AI

**Yapay Zeka Destekli Pazarlama ve Hedef Kitle Kişiselleştirme Asistanı**

PersonaCraft AI, girdiğiniz ürün/hizmet bilgilerini seçtiğiniz hedef kitleye, iletişim tonuna ve prompt engineering stratejisine göre otomatik olarak ikna gücü yüksek pazarlama içeriğine dönüştüren bir Streamlit uygulamasıdır. Google Gemini API'yi kullanır ve üç farklı prompt engineering tekniğini (Zero-Shot, Few-Shot, Chain-of-Thought) karşılaştırmalı olarak sunar.

---

## 👥 Proje Geliştiricileri

Bu proje aşağıdaki ekip tarafından geliştirilmiştir:

- **Ayşe Ulaşlı**
- **Nermin Kılıçarslan**
- **Zeynep Fenercioğlu**
- **Ömer Kızılkaya**
- **Metehan Merdan**

---

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Kurulum](#-kurulum)
- [Kullanım Kılavuzu](#-kullanım-kılavuzu)
- [Prompt Engineering Stratejileri](#-prompt-engineering-stratejileri)
- [Demo Senaryosu](#-demo-senaryosu)
- [Proje Yapısı](#-proje-yapısı)
- [Bilinen Sorunlar ve Sınırlamalar](#-bilinen-sorunlar-ve-sınırlamalar)
- [Test Kapsamı](#-test-kapsamı)

---

## ✨ Özellikler

- **6 farklı hedef kitle** profiline göre içerik kişiselleştirme (Gençler, Aileler, Kurumsal, Teknoloji Meraklıları, Öğrenciler, Premium Kullanıcılar)
- **5 farklı iletişim tonu** (Dinamik & Trend, Samimi & Sıcak, Profesyonel & Kurumsal, Heyecanlı & İkna Edici, Eğlenceli & Esprili)
- **3 prompt engineering stratejisi**: Zero-Shot, Few-Shot, Chain-of-Thought
- **6 farklı çıktı türü**: Instagram Postu, Reklam Metni, E-mail, Website Açıklaması, SMS Kampanyası, Tümü
- Üretilen içeriği `.txt` olarak indirme
- Kendi Gemini API key'inizi girme veya varsayılan anahtarı kullanma seçeneği

---

## 🛠 Kurulum

### Gereksinimler
- Python 3.9+
- Bir Google Gemini API key ([Google AI Studio](https://aistudio.google.com/apikey)'dan ücretsiz alınabilir)

### Adımlar

```bash
# 1. Projeyi klonlayın
git clone https://github.com/<kullanici-adi>/persona-craft-ai.git
cd persona-craft-ai

# 2. Bağımlılıkları kurun
pip install -r requirements.txt

# 3. (Opsiyonel) API key'i ortam değişkeni olarak tanımlayın
#    Tanımlamazsanız uygulama arayüzünden girebilirsiniz
```

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="buraya_api_key_yapıştırın"
```

**macOS/Linux:**
```bash
export GEMINI_API_KEY="buraya_api_key_yapıştırın"
```

### Uygulamayı Çalıştırma

```bash
streamlit run app.py
```

> ⚠️ **Windows'ta "streamlit is not recognized" hatası alırsanız:** Bu, `streamlit` komutunun sistem PATH'ine eklenmemiş olmasından kaynaklanır. Bunun yerine şunu kullanın:
> ```powershell
> python -m streamlit run app.py
> ```

Uygulama açıldıktan sonra tarayıcınızda otomatik olarak `http://localhost:8501` adresinde açılacaktır.

---

## 📖 Kullanım Kılavuzu

1. **API Key girin** *(opsiyonel)* — Kendi Gemini API key'inizi girin, boş bırakırsanız varsayılan anahtar kullanılır.
2. **Ürün bilgilerini doldurun** — Ürün/hizmet adı ve öne çıkan özelliklerini yazın. Ne kadar detaylı yazarsanız çıktı o kadar isabetli olur.
3. **Hedef Kitle seçin** — İçeriğin kime hitap edeceğini belirleyin (örn. *Gençler*, *Kurumsal*).
4. **İletişim Tonu seçin** — İçeriğin üslubunu belirleyin (örn. *Dinamik & Trend*, *Profesyonel & Kurumsal*).
5. **Prompt Tekniği seçin:**
   - *Zero-Shot* → Hızlı, doğrudan üretim
   - *Few-Shot* → Örnek metinlerden ilham alarak daha tutarlı format
   - *Chain-of-Thought* → Önce hedef kitle analizi yapıp sonra içerik üretir, süreç şeffaf şekilde gösterilir
6. **Çıktı Dili ve Çıktı Türünü** seçin.
7. **"🚀 Kampanyayı Yeniden Pazarla"** butonuna tıklayın.
8. Üretilen içeriği inceleyin, isterseniz **.txt olarak indirin**.

> 💡 **İpucu:** Aynı ürünü farklı hedef kitle/ton kombinasyonlarıyla deneyerek PersonaCraft AI'nin kişiselleştirme gücünü karşılaştırabilirsiniz.

> ⚠️ **Bilinen sınırlama:** Çıktı Dili seçici şu anda yalnızca Türkçe çıktı üretmektedir (bkz. [Bilinen Sorunlar](#-bilinen-sorunlar-ve-sınırlamalar)).

---

## 🧠 Prompt Engineering Stratejileri

PersonaCraft AI'nin en özgün tarafı, aynı görevi üç farklı prompt engineering yaklaşımıyla çözebilmesidir:

| Strateji | Açıklama | Ne Zaman Tercih Edilir |
|---|---|---|
| **Zero-Shot** | Modele örnek verilmeden, doğrudan kurallar ve ürün bilgisiyle üretim yapılır. | Hızlı sonuç istendiğinde |
| **Few-Shot** | Modele önceden hazırlanmış 2 kaliteli örnek gösterilir, model bu formatı taklit eder. | Format tutarlılığı önemli olduğunda |
| **Chain-of-Thought (CoT)** | Model önce 4 adımlı bir analiz yapar (Hedef Kitle Analizi → Değer Önerisi → Ton Belirleme → Çıktı Kurgusu), sonra bu analize dayanan nihai metni üretir. | Şeffaflık ve stratejik gerekçelendirme istendiğinde |

### Örnek CoT Çıktısı

Aşağıda, *Kablosuz ANC Kulaklık Pro* ürünü için *Gençler* hedef kitlesine, *Dinamik & Trend* tonuyla üretilen gerçek bir CoT çıktısından kısaltılmış örnek:

**🧠 Akıl Yürütme (özet):**
> Adım 1 – Hedef Kitle Analizi: Gençlerin en büyük sorunları dış gürültü/odaklanma, pil ömrü kaygısı ve dayanıklılık olarak belirlendi. Ana motivasyon: özgürlük, kesintisiz deneyim, tarz.
> Adım 2 – Değer Önerisi: ANC özelliği odaklanma sorununu, 40 saat pil süresi şarj kaygısını doğrudan çözüyor.
> Adım 3 – Ton: Samimi, enerjik, trend argo ifadeler (*"vibe"*, *"chill"*), bol emoji.
> Adım 4 – Çıktı Kurgusu: Kalabalık bir ortamda odaklanmış genç görseli, pain-point'e değinen kanca başlık.

**🎯 Nihai Kampanya İçeriği (özet):**
> ⚡ Başlık: *"Ortamın Gürültüsü Seni Yorma mı Artık? Kendi Vibe'ını Yaratma Zamanı!"*
> ✍️ Gençlerin günlük yaşadığı dikkat dağıtma anlarına (otobüs, ders çalışma, oyun) değinen, ürünün ANC ve 40 saat pil özelliklerini bu sorunlara çözüm olarak sunan samimi bir metin, ardından net bir CTA ve trend hashtag'ler ile tamamlanıyor.

*(Tam çıktı proje ekibiyle paylaşılan test kayıtlarında mevcuttur.)*

---

## 🎬 Demo Senaryosu

Aşağıdaki senaryo, uygulamanın sunumunda veya değerlendirmesinde kullanılabilir; üç prompt stratejisini ve kişiselleştirme gücünü net biçimde gösterir.

### Senaryo: "Kablosuz ANC Kulaklık Pro" — Karşılaştırmalı Sunum

**Adım 1 — Zero-Shot ile hızlı üretim**
- Ürün: *Kablosuz ANC Kulaklık Pro*
- Hedef Kitle: *Gençler* | Ton: *Dinamik & Trend* | Format: *Instagram Postu*
- 🎯 Gösterilecek nokta: Tek tıkla, saniyeler içinde kullanıma hazır bir içerik.

**Adım 2 — Aynı ürünü Few-Shot ile üretme**
- Aynı parametreler, sadece Prompt Tekniği → *Few-Shot*
- 🎯 Gösterilecek nokta: Örnek formatına (Görsel Öneri / Başlık / Ana Metin / CTA / Hashtag) ne kadar sadık kaldığı.

**Adım 3 — Aynı ürünü Chain-of-Thought ile üretme**
- Aynı parametreler, Prompt Tekniği → *Chain-of-Thought*
- 🎯 Gösterilecek nokta: Expander içinde açılan 4 adımlı stratejik analiz — modelin "neden" bu içeriği ürettiğinin şeffaf gösterimi.

**Adım 4 — Kişiselleştirme gücünü gösterme**
- Aynı ürünü, Hedef Kitle → *Kurumsal*, Ton → *Profesyonel & Kurumsal* olarak değiştirip tekrar üretin.
- 🎯 Gösterilecek nokta: Aynı ürün, tamamen farklı bir dil ve yaklaşımla (veri odaklı, resmi) sunuluyor — "gençler" versiyonuyla yan yana karşılaştırın.

**Adım 5 — İndirme**
- Üretilen içeriği `.txt` olarak indirip gösterin.

> **Sunum süresi:** ~5 dakika. Adım 1-3 aynı parametrelerle yapıldığı için prompt stratejisi farkı çok net görülür; Adım 4 ürünün kişiselleştirme yeteneğini vurgular.

---

## 📁 Proje Yapısı

```
persona-craft-ai/
├── app.py                      # Streamlit arayüzü (frontend)
├── services/
│   └── generator.py            # Gemini API çağrısı ve içerik üretim mantığı
├── prompts/
│   └── prompt_templates.py     # Zero-Shot / Few-Shot / CoT prompt şablonları
├── test_prompts.py             # Prompt test dosyası
├── requirements.txt
├── docs/
│   └── ethics.md
├── examples/
│   └── outputs.md
└── README.md
```

---

## ⚠️ Bilinen Sorunlar ve Sınırlamalar

Yapılan test sürecinde tespit edilen ve ekip tarafından değerlendirilen bulgular:

| Sorun | Etki | Durum |
|---|---|---|
| Çıktı Dili seçici (İngilizce/Almanca/Fransızca/İspanyolca) işlevsiz, model her zaman Türkçe üretiyor | Yüksek | Ekibe iletildi |
| API hataları (geçersiz key, kota aşımı, bağlantı hatası) kullanıcıya ham/teknik mesaj olarak gösteriliyor | Orta | Ekibe iletildi |
| "Tümü" çıktı türü seçildiğinde formatlar sıralı üretiliyor, UX tasarımı netleştirilmeli | Düşük | Değerlendirmede |
| Google Gemini ücretsiz katman kota sınırı (günlük 20 istek, `gemini-2.5-flash`) — yoğun testte hızla dolabiliyor | Bilgi amaçlı | Kota planı gözden geçirilmeli |

Detaylı test bulguları ve kanıtları için ekip içi test raporuna bakınız.

---

## ✅ Test Kapsamı

Proje, aşağıdaki kategorilerde manuel test edilmiştir:
- Kurulum ve ortam testleri
- Arayüz (frontend) doğrulaması
- Girdi validasyonu (boş alanlar, geçersiz API key)
- Üç prompt stratejisinin karşılaştırmalı testi
- Hedef kitle / ton / dil kişiselleştirme testleri
- Dosya indirme testi
- Hata ve kenar durum (ağ hatası, rate limit, uzun girdi) testleri

Toplam ~30 senaryo test edilmiştir.

