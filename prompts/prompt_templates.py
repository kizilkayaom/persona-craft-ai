# -*- coding: utf-8 -*-
"""
PersonaCraft AI - Prompt Templates
Contains specialized prompt engineering templates for Zero-shot, Few-shot, and Chain of Thought strategies.
"""

SYSTEM_PROMPT = (
    "Sen profesyonel, üst düzey bir dijital pazarlama stratejisti ve metin yazarısın (Copywriter). "
    "Görevin, verilen ürünü/hizmeti seçilen hedef kitlenin psikolojik profiline, ilgi alanlarına, "
    "ihtiyaçlarına ve satın alma motivasyonlarına göre konumlandırıp, ikna gücü yüksek pazarlama metinleri üretmektir. "
    "Ürettiğin içerik samimi, profesyonel, ilgi çekici ve eyleme geçirici (Call to Action içeren) olmalıdır."
)

PERSONA_GUIDE = """
[PERSONA REHBERİ (HEDEF KİTLE VE İLETİŞİM TONU UYUMU)]
- Hedef Kitle: {target_audience}
- İletişim Tonu: {tone}
- Dil: {language}

Bu hedef kitleye hitap ederken, seçilen iletişim tonuna ({tone}) tam uyum sağla. Örneğin; gençlere hitap ediyorsan samimi, dinamik, emojilerle zenginleştirilmiş ve trend kelimeler içeren bir dil kullan; kurumsal bir kitleye hitap ediyorsan profesyonel, veri odaklı, saygın ve güven verici bir dil tercih et.
"""

OUTPUT_FORMAT_RULES = """
[ÇIKTI FORMAT KURALLARI]
- İstenen Çıktı Türü: {output_type}

Ürettiğin metin şu bileşenleri içermelidir:
1. 📸 **Görsel Öneri (Visual Suggestion):** Paylaşım veya reklam için uygun, kitlenin dikkatini çekecek bir görsel/tasarım fikri.
2. ⚡ **Dikkat Çekici Başlık (Headline):** İlk saniyede merak uyandıracak, kancalı (hook) bir başlık.
3. ✍️ **Ana Metin (Body Text):** Ürünün faydalarını hedef kitlenin en büyük sorununa (pain point) değinerek anlatan ikna edici gövde metni.
4. 🚀 **Eylem Çağrısı (Call to Action - CTA):** Kullanıcıyı tıklamaya, satın almaya veya kaydolmaya yönlendiren net bir eylem çağrısı.
5. 🏷️ **Hashtag'ler (Eğer uygunsa):** Platform trendlerine uygun, etkileşimi artıracak hashtag önerileri.
"""

def build_zero_shot_prompt(product_name, product_desc, target_audience, tone, output_type, language):
    """
    Zero-shot prompting strategy.
    Direct generation based on guidelines without examples.
    """
    return f"""
Giriş bilgilerini kullanarak, hedef kitleye özel doğrudan bir pazarlama metni oluştur.

[ÜRÜN BİLGİLERİ]
Ürün / Hizmet Adı: {product_name}
Açıklama ve Özellikler: {product_desc}

{PERSONA_GUIDE.format(target_audience=target_audience, tone=tone, language=language)}

{OUTPUT_FORMAT_RULES.format(output_type=output_type)}

[GÖREV]
Yukarıdaki kuralları ve ürün bilgilerini harmanlayarak, sıfırdan doğrudan (Zero-shot) mükemmel bir pazarlama içeriği üret.
"""

def build_few_shot_prompt(product_name, product_desc, target_audience, tone, output_type, language):
    """
    Few-shot prompting strategy.
    Contains high-quality in-context examples showing the expected tone, structure, and format.
    """
    examples = """
[ÖRNEK 1]
Ürün: Kablosuz Kulaklık (Gürültü Engelleyici Pro)
Açıklama: Aktif Gürültü Engelleme, 40 saat pil ömrü, Bluetooth 5.4.
Kitle: Gençler
Ton: Dinamik & Trend
Dil: Türkçe
Format: Instagram Postu
Çıktı:
📸 **Görsel Öneri:** Kütüphanede veya kalabalık bir kafede kahvesini yudumlarken gözlerini kapatmış, müziğin ritmine kapılmış genç bir kadın. Arka plan hafif flu, kulaklık üzerinde şık bir ışık detayı var.
⚡ **Başlık:** SENİN VIBE'IN, SENİN KURALIN! 🎧
✍️ **Ana Metin:** Dünyanın gürültüsünü kapat, kendi ritmine odaklan! 🚀 Yeni nesil ANC özellikli Kablosuz Kulaklık Pro ile kütüphanede, otobüste veya kafede sadece senin müziğin konuşsun. 40 saatlik devasa pil ömrüyle müzik maratonun hiç bitmesin. 
🚀 **CTA:** Şimdi bio'daki linke tıkla, lansmana özel %20 indirimle ritmi yakala!
🏷️ **Hashtag'ler:** #GürültüyüKapat #KulaklıkPro #MüzikHerYerde #GençlikModu

[ÖRNEK 2]
Ürün: Akıllı Robot Süpürge (SmartClean v5)
Açıklama: 6000 Pa emiş gücü, kendi kendini boşaltan istasyon, akıllı haritalama.
Kitle: Aileler
Ton: Samimi & Çözüm Odaklı
Dil: Türkçe
Format: Reklam Metni
Çıktı:
📸 **Görsel Öneri:** Oturma odasında yerde çocuklarıyla oyun oynayan mutlu bir anne ve baba. Arka planda ise sessizce kendi kendine çalışan şık bir robot süpürge.
⚡ **Başlık:** Hafta sonunu temizliğe değil, ailenize ayırın! ❤️
✍️ **Ana Metin:** Hafta içi iş koşturmacası, hafta sonu ise ev temizliği... Sevdiklerinizle geçireceğiniz değerli saatleri temizlik yaparak harcamaktan sıkılmadınız mı? SmartClean v5, siz sevdiklerinizle mutlu anılar biriktirirken evinizi baştan aşağı pırıl pırıl yapar. 6000 Pa emiş gücüyle en zorlu tozları bile anında yutar.
🚀 **CTA:** Evinizdeki yeni yardımcınızla tanışmak için hemen tıklayın ve ücretsiz kargo fırsatından yararlanın!
🏷️ **Hashtag'ler:** #SmartClean #AileZamanı #TemizEvler #AkıllıYaşam
"""

    return f"""
Aşağıdaki örneklerdeki yapısal kurguyu, pazarlama tonunu ve formatı analiz et. Ardından, benzer kalitede ve hedef kitleye odaklı yeni bir kampanya metni oluştur.

{examples}

[GÖREV - SIRA SİZDE]
Şimdi aşağıdaki bilgiler için yukarıdaki örneklerin kalitesine, tonuna ve yapısına uygun olarak kusursuz bir içerik üret:

Ürün / Hizmet Adı: {product_name}
Açıklama ve Özellikler: {product_desc}

{PERSONA_GUIDE.format(target_audience=target_audience, tone=tone, language=language)}

{OUTPUT_FORMAT_RULES.format(output_type=output_type)}

Çıktı:
"""

def build_chain_of_thought_prompt(product_name, product_desc, target_audience, tone, output_type, language):
    """
    Chain of Thought (CoT) prompting strategy.
    Guides the model to reason step-by-step through audience needs, value propositions, and tone before delivering the content.
    """
    return f"""
Bu görevde, pazarlama mesajını oluşturmadan önce adım adım düşünmeni ve analitik bir süreç izlemeni istiyoruz. 
Aşağıdaki adımları sırasıyla takip et ve nihai metni en sonda sun:

[ÜRÜN BİLGİLERİ]
Ürün / Hizmet Adı: {product_name}
Açıklama ve Özellikler: {product_desc}

{PERSONA_GUIDE.format(target_audience=target_audience, tone=tone, language=language)}

{OUTPUT_FORMAT_RULES.format(output_type=output_type)}

[DÜŞÜNCE ZİNCİRİ ADIMLARI]
Adım 1 - Hedef Kitle Analizi: Seçilen kitlenin ({target_audience}) bu ürünle/hizmetle ilgili en büyük problemi (pain point), engeli ve ana satın alma motivasyonu nedir?
Adım 2 - Değer Önerisi (Value Proposition): {product_name} ürünü/hizmeti, bu kitlenin problemini nasıl çözüyor? Kitleye sunacağı benzersiz fayda ve değer nedir?
Adım 3 - Ton ve Stil Belirleme: Kitleye hitap ederken seçilen {tone} tonuna uygun olarak hangi üslup, kelime grupları ve yaklaşım kullanılmalı?
Adım 4 - Çıktı Kurgusu: {output_type} formatının en kritik başarı faktörleri ve kancaları nelerdir?

[RAPOR VE NİHAİ PAZARLAMA METNİ]
Lütfen yukarıdaki 4 adımlık analizi başlıklar halinde detaylandırarak yaz, ardından analiz sonuçlarına dayanan en yüksek dönüşümü sağlayacak nihai pazarlama metnini "NİHAİ PAZARLAMA METNİ" başlığı altında sun.
"""

def get_prompt_package(product_name, product_desc, target_audience, tone, prompt_style, output_type, language="Türkçe"):
    """
    Seçilen prompt stratejisine uygun şablonu doldurarak (system_prompt, user_prompt) paketini döndürür.
    """
    style_lower = prompt_style.lower()
    
    if "few" in style_lower:
        user_prompt = build_few_shot_prompt(product_name, product_desc, target_audience, tone, output_type, language)
    elif "chain" in style_lower or "thought" in style_lower or "cot" in style_lower:
        user_prompt = build_chain_of_thought_prompt(product_name, product_desc, target_audience, tone, output_type, language)
    else: # Zero-shot varsayılan
        user_prompt = build_zero_shot_prompt(product_name, product_desc, target_audience, tone, output_type, language)
        
    return SYSTEM_PROMPT, user_prompt