import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Check if Gemini API key is configured
const getApiKey = () => process.env.GEMINI_API_KEY;

// API endpoint to check backend status
app.get("/api/status", (req, res) => {
  const apiKey = getApiKey();
  res.json({
    hasApiKey: !!apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "",
  });
});

// Mock marketing content generator matching Streamlit app's design
function generateMockMarketing(
  product: string,
  audience: string,
  formatType: string,
  strategy: string,
  emailSubject?: string,
  emailSender?: string,
  emailSignature?: string
): string {
  const templates: Record<string, Record<string, string>> = {
    "Gençler": {
      "Instagram Postu": `🔥 Beklenen an nihayet geldi! Yeni ${product} ile hayatın ritmini yakalayın. Kendinizi ifade etmek ve kalabalıklar arasından sıyrılmak için özel olarak tasarlanan bu benzersiz ürünü kaçırmayın. Sınırlı sayıda sunulan bu fırsatı değerlendirmek için hemen profilimizdeki bağlantıyı ziyaret edin! 🎧🚀 #yenilik #tarz #gençlik`,
      "Reklam Metni": `Sıradanlığı geride bırakın. ${product}, yeni neslin dinamizmi ve estetik arayışıyla kusursuz şekilde tasarlandı. Şimdi gençlik şenliğine özel fırsatları kaçırmayın!`,
      "E-mail": `Konu: Aradığınız O Eşsiz Deneyim Burada... \n\nMerhaba,\n\nGenç neslin vazgeçilmezi olmaya aday yeni ${product} stoklarımızda yerini aldı. Tarzınızı kusursuzca tamamlayacak bu seçkin fırsatı kaçırmamak için hemen internet sitemizi ziyaret edin.`,
      "Website Açıklaması": `Karşınızda yeni nesil ${product}. Sınırları aşan dinamik yapısı, estetik çizgileri ve genç ruhuyla tarzınızı en asil şekilde yansıtır. Günlük yaşamınıza üst düzey bir enerji katmak için özenle tasarlandı.`,
      "SMS Kampanyası": `Büyük fırsat başladı! ${product} şimdi gençlere özel ayrıcalıklarla stokta. Hemen inceleyin ve sipariş verin: bit.ly/kampanya-bud`
    },
    "Teknoloji Meraklıları": {
      "Instagram Postu": `💻 Üstün mühendislik harikasıyla tanışın! Yeni ${product} ile performansın sınırlarını yeniden çizin. En güncel donanım, üst düzey optimizasyon ve üstün teknoloji şimdi sizinle. Detaylar için gönderiyi sola kaydırın! ⚡🤖 #teknoloji #gelecek #inovasyon`,
      "Reklam Metni": `Geleceğin teknolojisi bugün hayat buluyor. ${product} ile sınırları aşın, üstün mühendislik kalitesini tüm benliğinizle hissedin.`,
      "E-mail": `Konu: Teknoloji Dünyasında Devrimsel Adım: ${product}\n\nDeğerli Teknoloji Severler,\n\nMerakla beklediğiniz an geldi. En yeni teknolojik geliştirmeler ve benzersiz optimizasyonlar ile donatılan ${product} ön siparişe açıldı. Detaylar için tıklayın.`,
      "Website Açıklaması": `${product}, en yüksek teknoloji standartları hedeflenerek titizlikle geliştirilmiştir. Maksimum verimlilik, üst düzey donanım entegrasyonu ve pürüzsüz bir kullanıcı deneyimi sunar.`,
      "SMS Kampanyası": `Beklenen an geldi! ${product} en yüksek performans donanımıyla şimdi satışta. Hemen incelemek için: bit.ly/buds-tech`
    }
  };

  let content = "";
  // Generic fallback if combination is not defined
  const audienceData = templates[audience];
  if (audienceData && audienceData[formatType]) {
    content = audienceData[formatType];
  } else {
    // Smart fallback template generator
    const emoji = audience === "Aileler" ? "👨‍👩‍👧‍👦" : audience === "Kurumsal" ? "💼" : audience === "Öğrenciler" ? "🎓" : audience === "Premium Kullanıcılar" ? "✨" : "🚀";
    
    if (formatType === "Instagram Postu") {
      content = `${emoji} Karşınızda yeni ${product}! \n\n${audience} için özel olarak tasarlanan bu eşsiz deneyim hayatınızı kolaylaştırmaya geliyor. Hem şık hem de fonksiyonel! Detaylar ve sipariş için profilimizdeki linki ziyaret edin. 🌟 #yenilik #tarz #${audience.toLowerCase()}`;
    } else if (formatType === "Reklam Metni") {
      content = `Hayallerinizdeki konfor ve kalite bir arada. ${product}, ${audience} hedeflenerek en ince ayrıntısına kadar özenle geliştirildi. Şimdi keşfedin, hayatınızı kolaylaştırın!`;
    } else if (formatType === "E-mail") {
      content = `Konu: Size Özel Yenilik: ${product} ile Tanışın! ${emoji}\n\nSayın Yetkili / Merhaba,\n\n${audience} dünyasının ihtiyaçlarını analiz ederek geliştirdiğimiz yeni ürünümüz ${product} nihayet yayında. \n\nÜstün konfor, ergonomik tasarım ve yüksek standartları bir araya getiren ${product}, günlük rutininizi benzersiz kılacak. Size özel lansman tekliflerini görmek için hemen web sitemizi ziyaret edin.`;
    } else if (formatType === "Website Açıklaması") {
      content = `Modern yaşamın tüm gereksinimlerini karşılamak üzere ${audience} için tasarlanmış olan ${product}, şıklığı ve fonksiyonelliği bir araya getiriyor. Dayanıklı malzemeleri, sezgisel arayüzü ve mükemmel ergonomisi ile hayat kalitenizi bir üst seviyeye taşıyacak benzersiz bir çözüm.`;
    } else {
      content = `Fırsat Kapıda! ${audience} için özel olarak üretilen ${product} şimdi lansmana özel fiyatıyla sizlerle. Hemen sipariş verin: bit.ly/kampanya-ozel`;
    }
  }

  if (formatType === "E-mail") {
    const subject = emailSubject || "Aradığınız O Eşsiz Deneyim Burada...";
    const sender = emailSender || "Samsung Türkiye";
    const signature = emailSignature || "Saygılarımızla, PersonaCraft Ekibi";

    // Strip "Konu: ..." from start of template if present to avoid duplication
    let emailBody = content;
    if (emailBody.startsWith("Konu:")) {
      const parts = emailBody.split("\n\n");
      if (parts.length > 1) {
        emailBody = parts.slice(1).join("\n\n");
      }
    }

    return `📬 GÖNDERİCİ: ${sender}\n📌 KONU: ${subject}\n\n--------------------------------------------\n\n${emailBody}\n\n---\n${signature}`;
  }

  return content;
}

// API endpoint to generate copy
app.post("/api/generate", async (req, res) => {
  const { product, audience, format, strategy, emailSubject, emailSender, emailSignature } = req.body;

  if (!product) {
    return res.status(400).json({ error: "Ürün adı boş olamaz." });
  }

  const apiKey = getApiKey();
  const isRealMode = !!apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "";

  if (!isRealMode) {
    // Falls back to mock simulator
    const content = generateMockMarketing(product, audience, format, strategy, emailSubject, emailSender, emailSignature);
    return res.json({
      text: content,
      mode: "mock",
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    let strategyInstruction = "";
    if (strategy === "Zero-shot") {
      strategyInstruction = "Doğrudan ve hızlı bir şekilde konuya girerek nihai metni oluştur.";
    } else if (strategy === "Few-shot") {
      strategyInstruction = "İlgili kitleye yönelik başarıyla sonuçlanmış pazarlama örneklerini ve şablonlarını taklit ederek yaz.";
    } else if (strategy === "Chain of Thought") {
      strategyInstruction = `Lütfen içeriği üretirken şu adımları sırasıyla takip et ve her adımın analizini ayrı başlıklar halinde yazdıktan sonra nihai metni oluştur:
      
Adım 1: Seçilen hedef kitlenin günlük hayattaki en büyük problemi/ihtiyacı nedir ve bu ürün bu problemi nasıl çözer? (Detaylıca analiz et)
Adım 2: Bu kitleye özel tercih edilen dil tonu (profesyonel, verimlilik odaklı, samimi, eğlenceli vb.) nasıl olmalıdır? (Planla)
Adım 3: Yukarıdaki iki adıma dayanarak, şık, profesyonel/dinamik ve değer odaklı nihai pazarlama metnini (CTA ile birlikte) yaz.`;
    }

    let emailRulesSection = "";
    if (format === "E-mail") {
      emailRulesSection = `
      
ÖNEMLİ E-POSTA KURALLARI (E-mail Meta-Ayarları):
Lütfen üreteceğin e-posta metnini şu meta bilgileri en üstte açıkça belirterek ve altına imza ekleyerek oluştur. Bu kurallara uymak kesinlikle zorunludur:
- Gönderici Adı: ${emailSender || "Samsung Türkiye"}
- Konu Başlığı: ${emailSubject || "Aradığınız O Eşsiz Deneyim Burada..."}
- E-posta İmzası: ${emailSignature || "Saygılarımızla, PersonaCraft Ekibi"}

Üretilecek e-posta metni kesinlikle şu şablon formatında olmalıdır:
📬 GÖNDERİCİ: [Yukarıdaki Gönderici Adı buraya yazılacak]
📌 KONU: [Yukarıdaki Konu Başlığı buraya yazılacak]

--------------------------------------------

[E-posta İçerik Metni Buraya Gelecek]

---
[Yukarıdaki E-posta İmzası buraya yazılacak]`;
    }

    const prompt = `Sen dünyanın önde gelen teknoloji ve tüketici markalarında çalışmış, ödüllü bir dijital pazarlama uzmanı, marka stratejisti ve metin yazarısın (Copywriter).

Görevin:
Sana verilen herhangi bir ürünü veya hizmeti, belirtilen hedef kitlenin psikolojik profiline, tüketim alışkanlıklarına, yaş grubuna ve satın alma motivasyonlarına göre yeniden konumlandırmaktır.

Uyman Gereken Kurallar:
1. Dil her zaman samimi, son derece ikna edici ve akıcı bir Türkçe olmalıdır. Üretilen her bir kelimenin Türkçe literatüre, imla ve dil bilgisi kurallarına (TDK standartlarına) kusursuz şekilde uygun olmasını sağla. Yabancı dillerden devşirilmiş yersiz internet argoları veya dil bütünlüğünü bozan kısaltmalar kullanma.
2. Seçilen hedef kitlenin (Örn: Gençler, Kurumsal, Aileler) diline, jargonuna ve hassasiyetlerine tam uyum sağlarken, Türkçe kelime haznesinin asilliğine ve edebi zenginliğine sadık kal.
3. Çıktı formatının (Instagram Postu, E-mail, SMS vb.) platform kurallarına ve dinamiklerine sadık kal (Örn: Instagram için uygun emojiler ve anlamlı Türkçe hashtagler kullan, SMS için kısa, vurucu ve net ol).
4. Her metnin sonunda mutlaka güçlü ve Türkçe literatüre yakışır kalitede bir "Harekete Geçirici Mesaj" (Call to Action / CTA) bulundur.${emailRulesSection}

Örnek Kampanya Kurguları:

[ÖRNEK 1]
Girdi:
- Ürün: Samsung Galaxy Buds
- Kitle: Gençler
- Format: Instagram Postu
Çıktı:
🔥 Müziğin ritmini sokaklara taşı! Yeni Galaxy Buds ile gürültüyü engelle, sadece kendi vibe'ına odaklan. Aktif Gürültü Engelleme (ANC) sayesinde dünya sussun, senin çalma listen konuşsun. 🎧✨ Tarzını tamamlayacak renk seçenekleriyle şimdi keşfet! Link bioda. #GalaxyBuds #SoundOfYouth #Vibe

[ÖRNEK 2]
Girdi:
- Ürün: Samsung Galaxy Buds
- Kitle: Aileler
- Format: Reklam Metni
Çıktı:
Evinizdeki tatlı gürültüyü bir anlığına sessize alın. Çocuklar oyun oynarken siz sakin bir klasik müzik eşliğinde kahvenizi yudumlayın. Samsung Galaxy Buds gürültü engelleme teknolojisiyle aile boyu huzur sunar. Şimdi ailemize özel indirim fırsatıyla!

Giriş Verileri:
- Ürün/Hizmet: ${product}
- Hedef Kitle: ${audience}
- Çıktı Formatı: ${format}
- Prompt Stratejisi: ${strategy} (${strategyInstruction})`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const resultText = response.text || "";
    return res.json({
      text: resultText,
      mode: "real",
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: `Gemini API Çağrısı sırasında bir hata oluştu: ${error.message || error}`,
    });
  }
});

// Handle Vite middleware configuration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
