# 🏗️ PersonaCraft AI - Mimari ve Prompt Mühendisliği Dokümantasyonu

PersonaCraft AI, hedef kitleye özel içerik üretimini optimize etmek için çok katmanlı ve modüler bir mimari kullanır.

## 📁 Dosya Yapısı ve Görev Dağılımı

- **`app.py`**: Kullanıcı dostu arayüz sunan Streamlit istemcisidir. Kullanıcı girdilerini toplar, API'yi tetikler ve çıktıların canlı simülasyonunu ve indirilmesini koordine eder.
- **`services/generator.py`**: Google Gen AI SDK (`@google/genai`) istemcisini başlatır, API çağrılarını yönetir ve `prompts/` klasöründen aldığı şablonları işleyerek Gemini modeline iletir.
- **`prompts/prompt_templates.py`**: PersonaCraft'ın kalbidir. Gelişmiş prompt tekniklerini (Zero-shot, Few-shot ve Chain of Thought) içeren, dinamik olarak biçimlendirilen şablonları barındırır.

---

## 🧠 Uygulanan Prompt Mühendisliği Teknikleri

### 1. Zero-shot Prompting (Doğrudan Üretim)
* **Kullanım Amacı:** Yapay zekaya herhangi bir örnek vermeden doğrudan ne istediğimizi belirtiriz. Hızlı ve basit içerikler için idealdir.
* **Akış:** Ürün, kitle ve format bilgileri verilerek doğrudan bir pazarlama metni yazması istenir.

### 2. Few-shot Prompting (Örneklerle Güçlendirilmiş Üretim)
* **Kullanım Amacı:** Yapay zekanın istenen tonu, format yapısını ve ikna taktiklerini daha iyi anlaması için kurgulanmış örnek senaryolar sunar.
* **Akış:** Öğrenci ve kurumsal kitleler için hazırlanmış iki adet yüksek kaliteli reklam şablonu yapay zekaya "örnek" olarak gösterilir ve yeni çıktıyı bu şablon disiplininde yazması beklenir.

### 3. Chain of Thought (Düşünce Zinciri)
* **Kullanım Amacı:** Karar alma süreçlerinin arkasındaki mantığı açıklatarak yapay zekanın daha tutarlı, derinlemesine ve analitik çıktılar üretmesini sağlamak.
* **Akış:** Yapay zeka doğrudan metin yazmak yerine sırasıyla:
  1. *Hedef Kitle Analizi (Pain Points / Motivasyonlar)*
  2. *Değer Önerisi (Value Proposition)*
  3. *Ton ve Stil Belirleme*
  4. *Çıktı Kurgusu*
  adımlarını planlar ve en sonunda bu adımlara dayanan kusursuz pazarlama metnini sunar.
