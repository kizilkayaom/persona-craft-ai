import json
from google import genai
from google.genai import types

# Few-shot examples database
FEW_SHOT_EXAMPLES = {
    "Gençler": {
        "product": "Akıllı Kulaklık (SoundVibe)",
        "desc": "Gürültü engelleyici kablosuz kulaklık, 30 saat pil ömrü, bas güçlendirici mod.",
        "tone": "Dinamik & Trend",
        "outputs": {
            "instagram": "Şehrin gürültüsünü tek dokunuşla kapat, kendi ritmine odaklan! 🎧 SoundVibe ile 30 saat kesintisiz müzik ve derin baslar seninle. Şimdi ritmini keşfet! #SoundVibe #MüzikHerYerde #Kulaklık",
            "reklam": "Sıkıcı sesleri geride bırak. SoundVibe Active Noise Cancelling ile sadece senin müziğin. Basları hisset, özgürlüğü yaşa! Hemen sipariş ver, %20 gençlik indirimini kaçırma.",
            "email": "Konu: Müziğin Ritmini Değiştirmeye Hazır mısın? 🎧\n\nSelam! Şehir çok gürültülü ama senin dünyan sessiz kalabilir. SoundVibe kablosuz kulaklık ile gürültüyü engelle, bas güçlendirici ile en sevdiğin şarkıların tadını çıkar. Üstelik tam 30 saat pil ömrüyle şarj dertlerini unut. Kendini ödüllendirmek için şimdi tıkla!",
            "website": "Sesini Seç, Tarzını Yansıt. SoundVibe, aktif gürültü engelleme teknolojisi ve ultra güçlü baslarıyla müzik dinleme deneyimini baştan yaratıyor. Genç, dinamik ve durdurulamaz olanlar için tasarlandı.",
            "sms": "Ritmine odaklan! SoundVibe kablosuz kulaklıkta gençlere özel %20 indirim başladı. Şehrin gürültüsünü kapatmak için tıkla: soundvibe.co/genc"
        }
    },
    "Kurumsal": {
        "product": "FocusTask Pro",
        "desc": "Yapay zeka destekli proje yönetim yazılımı, zaman takibi ve otomatik raporlama.",
        "tone": "Profesyonel & Güvenilir",
        "outputs": {
            "instagram": "Projelerinizi yapay zeka gücüyle optimize edin! FocusTask Pro ile zaman takibi ve raporlama artık otomatik. Ekip verimliliğinizi %40 artırmak için hemen profilimizdeki linki ziyaret edin. #ProjeYönetimi #B2B #Verimlilik",
            "reklam": "Ekibinizin vaktini boşa harcamayın. FocusTask Pro, mikro yönetim süreçlerini otomatikleştirerek projelerinizi zamanında ve bütçe dahilinde tamamlamanızı sağlar. Kurumsal denemenizi bugün başlatın.",
            "email": "Konu: FocusTask Pro ile Operasyonel Verimliliği Artırın\n\nSayın Yetkili,\n\nGünümüz iş dünyasında zaman en değerli kaynağımızdır. FocusTask Pro, yapay zeka tabanlı algoritmalarıyla projelerinizi akıllıca planlar ve ekibinizin verimliliğini artırır. Detaylı bilgi almak ve firmanıza özel demo talebi oluşturmak için lütfen web sitemizi ziyaret edin.",
            "website": "Geleceğin İş Yönetim Platformu. FocusTask Pro, kurumsal ekipler için geliştirilmiş entegre proje yönetimi, otomatik raporlama ve yapay zeka destekli iş analitiği sunar. Karar alma süreçlerinizi veriyle güçlendirin.",
            "sms": "FocusTask Pro ile kurumsal projelerinizde verimliliği %40 artırın. Otomatik raporlama ve zaman takibini ücretsiz denemek için tıklayın: focustask.pro/kurumsal"
        }
    }
}

def get_prompt_package(product, audience, output_type, technique, tone, language, desc):
    """
    Builds the system instructions and user prompt for Gemini.
    """
    system_instruction = f"""Sen profesyonel bir Kıdemli Metin Yazarı (Senior Copywriter) ve Pazarlama Stratejistisin. 
Görevin, kullanıcının girdiği ürün/hizmeti belirtilen HEDEF KİTLE için, seçilen TON ve DİLDE yeniden pazarlamak ve 5 farklı formatta (Instagram postu, Reklam metni, E-mail, Website açıklaması, SMS kampanyası) pazarlama materyali oluşturmaktır.

Çıktıyı MUTLAKA geçerli bir JSON formatında döndürmelisin. JSON yapısı şu şekilde olmalıdır:
{{
  "audienceAnalysis": "Yalnızca chain-of-thought modu seçildiğinde doldurulacak kitle analizi ve stratejik düşünceler, diğer modlarda boş olmalıdır.",
  "instagram": "Instagram Postu (Görsel önerisi, başlık, gövde metni ve hashtagler dahil)",
  "reklam": "Reklam Metni (Hook/Kanca, Reklam gövdesi ve Harekete Geçirici Mesaj/CTA dahil)",
  "email": "E-postası (Konu başlığı, samimi/profesyonel gövde ve CTA dahil)",
  "website": "Web Sitesi Açıklaması (Çarpıcı Başlık, Alt Başlık ve Ürün Özellikleri dahil)",
  "sms": "SMS Kampanyası (Kısa, net, 160 karakteri aşmayan, bağlantı içeren metin)"
}}

Kurallar:
- Dil kesinlikle '{language}' olmalıdır.
- İletişim tonu kesinlikle '{tone}' olmalıdır.
- Hedef kitle '{audience}' özelliklerine göre psikolojik tetikleyiciler kullanılmalıdır.
- Başka açıklama metni ekleme, doğrudan yukarıdaki şablona uygun JSON döndür."""

    user_prompt = ""
    
    if technique == "zero-shot":
        user_prompt = f"""[ZERO-SHOT PROMPTING]
Ürün/Hizmet Adı: {product}
Ürün/Hizmet Açıklaması: {desc}
Hedef Kitle: {audience}
Dil: {language}
Ton: {tone}

Lütfen doğrudan hedef kitleye hitap eden en yaratıcı ve ikna edici pazarlama metinlerini oluştur ve JSON formatında döndür. "audienceAnalysis" alanını boş bırak."""

    elif technique == "few-shot":
        example = FEW_SHOT_EXAMPLES.get(audience, FEW_SHOT_EXAMPLES["Gençler"])
        user_prompt = f"""[FEW-SHOT PROMPTING]
Aşağıda, benzer pazarlama senaryoları için başarılı metin yazarlığı örnekleri verilmiştir. Bu örneklerin kalitesini, yapısını ve tonunu referans alarak yeni ürün için metinler oluştur.

Örnek Senaryo:
Ürün: {example["product"]}
Açıklama: {example["desc"]}
Hedef Kitle: {audience}
Ton: {example["tone"]}
Çıktı (JSON):
{{
  "audienceAnalysis": "",
  "instagram": "{example["outputs"]["instagram"]}",
  "reklam": "{example["outputs"]["reklam"]}",
  "email": "{example["outputs"]["email"]}",
  "website": "{example["outputs"]["website"]}",
  "sms": "{example["outputs"]["sms"]}"
}}

Şimdi, aşağıdaki gerçek ürün için metinleri aynı yüksek kalitede, '{language}' dilinde ve '{tone}' tonunda oluştur:
Ürün: {product}
Açıklama: {desc}
Hedef Kitle: {audience}

Lütfen yukarıdaki örneğin yapısını takip ederek JSON formatında çıktı ver. "audienceAnalysis" alanını boş bırak."""

    elif technique == "chain-of-thought":
        user_prompt = f"""[CHAIN-OF-THOUGHT PROMPTING]
Ürün: {product}
Açıklama: {desc}
Hedef Kitle: {audience}
Dil: {language}
Ton: {tone}

Lütfen adımları sırasıyla düşünerek ilerle ve bu düşünce sürecini JSON'daki "audienceAnalysis" alanına yansıt:
1. Adım: Hedef kitlenin ({audience}) bu ürünle ilgili en büyük 3 psikolojik ihtiyacını, motivasyonunu veya sorununu analiz et.
2. Adım: Bu kitleyi ikna etmek için hangi değer tekliflerinin (value proposition) ön plana çıkarılması gerektiğini belirle.
3. Adım: Seçilen '{tone}' tonunu kullanarak, Instagram, Reklam, E-posta, Website ve SMS kanalları için en etkili kelimeleri ve tetikleyicileri tasarla.
4. Adım: Son olarak, bu analizlere dayanarak her kanal için yüksek dönüşümlü pazarlama kopyalarını oluştur.

Çıktıyı JSON olarak ver. "audienceAnalysis" alanı yukarıdaki 1, 2 ve 3. adımlardaki analiz ve çıkarımları detaylı olarak içermelidir (Örn: 'Hedef Kitle Analizi:\\n1. İhtiyaçlar: ...\\n2. Değer Teklifleri: ...')."""

    return system_instruction, user_prompt

def call_gemini(api_key, product, audience, output_type, technique, tone, language, desc):
    """
    Main generator interface matching the exact layout friend sent.
    """
    system_instruction, prompt = get_prompt_package(product, audience, output_type, technique, tone, language, desc)
    
    # Initialize the standard Google GenAI SDK (preferred v1/gemini-2.5/3.5 pattern)
    client = genai.Client(api_key=api_key)
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json"
        )
    )
    
    raw_text = response.text
    
    try:
        parsed_json = json.loads(raw_text)
        
        # If user selected a specific output type and is NOT asking for all,
        # we can return just that string. But Streamlit usually handles all tabs!
        if output_type != "Tümü" and output_type.lower() in parsed_json:
            return parsed_json[output_type.lower()]
            
        return parsed_json
    except Exception as e:
        # Fallback to returning raw text if JSON parse fails
        return {"error": "JSON parse hatası", "raw": raw_text}
