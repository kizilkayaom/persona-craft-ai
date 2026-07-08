"""
prompt_templates.py
PersonaCraft AI Prompt Engineering

Bu modül, generator.py ve Streamlit arayüzünün kullanacağı tek giriş noktasını
(get_prompt) ve üç prompt engineering tekniğini içerir:
- Zero-shot
- Few-shot
- Chain-of-Thought
"""

# ---------------------------------------------------
# AVAILABLE OPTIONS
# ---------------------------------------------------

AUDIENCES = [
    "Gençler", "Aileler", "Kurumsal", "Teknoloji Meraklıları", "Öğrenciler", "Premium Kullanıcılar"
]

OUTPUT_TYPES = [
    "Instagram Postu", "Reklam Metni", "E-mail", "Website Açıklaması", "SMS Kampanyası"
]

TECHNIQUES = ["zero-shot", "few-shot", "chain-of-thought"]

# ---------------------------------------------------
# PERSONA GUIDE
# ---------------------------------------------------

PERSONA_GUIDE = {
    "Gençler": "- Enerjik, samimi ve kısa cümleler kullan. Trend odaklı ol. Emoji kullanılabilir.",
    "Aileler": "- Güven, dayanıklılık ve uzun ömür vurgusu yap.",
    "Kurumsal": "- Profesyonel, resmi ve güven veren bir dil kullan.",
    "Teknoloji Meraklıları": "- Teknik özellikleri ve performansı öne çıkar.",
    "Öğrenciler": "- Bütçe dostu, günlük kullanım ve pratik faydalara odaklan.",
    "Premium Kullanıcılar": "- Kalite, prestij ve ayrıcalık hissini ön plana çıkar."
}

# ---------------------------------------------------
# OUTPUT FORMAT RULES
# ---------------------------------------------------

OUTPUT_FORMAT_RULES = {
    "Instagram Postu": "3-4 cümle yaz. Sonunda 3-5 hashtag ve güçlü CTA kullan.",
    "Reklam Metni": "Başlık + 2 kısa açıklama cümlesi + CTA oluştur.",
    "E-mail": "Konu satırı, hitap, 3 kısa paragraf ve kapanış yaz.",
    "Website Açıklaması": "SEO uyumlu, iki paragraf ve fayda odaklı yaz.",
    "SMS Kampanyası": "160 karakteri geçme. Net CTA kullan."
}

# ---------------------------------------------------
# SYSTEM PROMPT (tüm teknikler tarafından paylaşılır)
# ---------------------------------------------------

SYSTEM_PROMPT = """
You are an expert digital marketing specialist.

Rules:
- Adapt content to the target audience.
- Never invent product specifications.
- Never make misleading claims.
- Follow the requested output format exactly.
- Write the final output only in Turkish.
"""

# ---------------------------------------------------
# FEW-SHOT EXAMPLES
# Her output_type için en az bir örnek. Tanımsız bir output_type gelirse
# GENERIC_FALLBACK_EXAMPLE kullanılır, böylece prompt asla örneksiz kalmaz.
# ---------------------------------------------------

FEW_SHOT_EXAMPLES = {
    "Instagram Postu": [
        {
            "product": "Kablosuz Kulaklık",
            "audience": "Gençler",
            "output": "Kulağına tak, ritmi yakala! 🎧 Yeni nesil kablosuz kulaklıkla müzik her an yanında. Hemen keşfet! #müzik #teknoloji #özgürlük"
        }
    ],
    "Reklam Metni": [
        {
            "product": "Termos",
            "audience": "Aileler",
            "output": "Sıcaklığı Koruyan Güven\nAileniz için uzun süre sıcak ve soğuk koruma. Şimdi sipariş verin!"
        }
    ],
    "E-mail": [
        {
            "product": "Yazılım Aboneliği",
            "audience": "Öğrenciler",
            "output": "Konu: Öğrencilere Özel %50 İndirim Başladı!\n\nMerhaba,\n\nBütçeni zorlamadan üretkenliğini artırmak ister misin? Öğrenci aboneliğimizle tüm premium özelliklere erişebilirsin.\n\nBu ay kayıt olanlara özel %50 indirim uyguluyoruz. Fırsat sınırlı sürede geçerli.\n\nHemen öğrenci mailinle kaydol.\n\nİyi çalışmalar,\nEkibimiz"
        }
    ],
    "Website Açıklaması": [
        {
            "product": "Akıllı Saat",
            "audience": "Teknoloji Meraklıları",
            "output": "Yeni nesil akıllı saatimiz, gelişmiş sensör teknolojisi ve uzun pil ömrüyle performansınızı bir üst seviyeye taşır. Kalp atış hızı, uyku takibi ve bildirim yönetimi tek bir cihazda birleşiyor.\n\nGünlük kullanımdan spor performansına kadar her senaryoda güvenilir veriler sunan bu cihaz, teknolojiyi seven herkes için tasarlandı. Hemen inceleyin ve fark yaratan detayları keşfedin."
        }
    ],
    "SMS Kampanyası": [
        {
            "product": "Kahve Zinciri Kampanyası",
            "audience": "Gençler",
            "output": "2. kahve %50 indirimli! Sadece bugün geçerli. Hemen uğra: [link]"
        }
    ],
}

GENERIC_FALLBACK_EXAMPLE = {
    "product": "Örnek Ürün",
    "audience": "Kurumsal",
    "output": "Bu ürün, hedef kitlenin somut ihtiyaçlarına yönelik faydalar sunar ve profesyonel bir tonla anlatılır."
}

# Chain-of-Thought çıktısını "analiz" ve "final metin" olarak ayırmak için kullanılır.
FINAL_OUTPUT_MARKER = "Final Content:"


def _validate_inputs(product: str, audience: str, output_type: str) -> None:
    if not product or not product.strip():
        raise ValueError("Ürün adı boş olamaz.")
    if audience not in AUDIENCES:
        raise ValueError(f"Geçersiz kitle: {audience}. Beklenen: {AUDIENCES}")
    if output_type not in OUTPUT_TYPES:
        raise ValueError(f"Geçersiz çıktı türü: {output_type}. Beklenen: {OUTPUT_TYPES}")


def build_zero_shot_prompt(product: str, audience: str, output_type: str) -> str:
    """En temel teknik: örnek veya ara adım yok, doğrudan talimat.
    Diğer tekniklerle kıyaslama (baseline) için kullanılır."""
    _validate_inputs(product, audience, output_type)
    return f"""{SYSTEM_PROMPT}

TASK:
Write a {output_type}.

PRODUCT:
{product}

TARGET AUDIENCE:
{audience}
{PERSONA_GUIDE[audience]}

OUTPUT FORMAT:
{OUTPUT_FORMAT_RULES[output_type]}

Return only the final marketing content.
""".strip()


def build_few_shot_prompt(product: str, audience: str, output_type: str) -> str:
    """Modelin ton/format beklentisini örnekler üzerinden gösterir.
    output_type için tanımlı örnek yoksa GENERIC_FALLBACK_EXAMPLE kullanılır."""
    _validate_inputs(product, audience, output_type)
    examples = FEW_SHOT_EXAMPLES.get(output_type) or [GENERIC_FALLBACK_EXAMPLE]
    examples_text = "\n\n".join(
        f"Example {i+1}\nProduct:{e['product']}\nAudience:{e['audience']}\nOutput:\n{e['output']}"
        for i, e in enumerate(examples)
    )
    return f"""{SYSTEM_PROMPT}

Study the examples.

{examples_text}

Now create a new {output_type}.

PRODUCT:
{product}

TARGET AUDIENCE:
{audience}
{PERSONA_GUIDE[audience]}

OUTPUT FORMAT:
{OUTPUT_FORMAT_RULES[output_type]}

Return only the final marketing content.
""".strip()


def build_chain_of_thought_prompt(product: str, audience: str, output_type: str) -> str:
    """Model önce kısa bir pazarlama stratejisi kurar, sonra final metni üretir.
    'Final Content:' işaretleyicisinden sonrasını extract_final_output() ile ayıklayabilirsin."""
    _validate_inputs(product, audience, output_type)
    return f"""{SYSTEM_PROMPT}

Create a short marketing strategy before writing.

PRODUCT:
{product}

TARGET AUDIENCE:
{audience}
{PERSONA_GUIDE[audience]}

OUTPUT FORMAT:
{OUTPUT_FORMAT_RULES[output_type]}

Format your response EXACTLY like this:

Marketing Strategy:
- Audience Need: <this audience's main need/expectation for this product>
- Key Benefit: <the single strongest benefit to highlight>
- Marketing Angle: <the emotional or rational angle to use>

{FINAL_OUTPUT_MARKER}
<only the requested {output_type}, written in Turkish, nothing else after this>
""".strip()


def extract_final_output(response_text: str) -> str:
    """generator.py, Chain-of-Thought çıktısından kullanıcıya gösterilecek
    final metni bu fonksiyonla ayıklar. Marker bulunamazsa (model formatı tam
    takip etmezse) tüm metni döner, böylece demo'da boş ekran görülmez."""
    if FINAL_OUTPUT_MARKER in response_text:
        return response_text.split(FINAL_OUTPUT_MARKER, 1)[1].strip()
    return response_text.strip()


def get_prompt(product: str, audience: str, output_type: str, technique: str) -> str:
    """generator.py ve Streamlit arayüzünün çağıracağı tek giriş noktası."""
    _validate_inputs(product, audience, output_type)
    if technique not in TECHNIQUES:
        raise ValueError(f"Geçersiz teknik: {technique}. Beklenen: {TECHNIQUES}")

    builders = {
        "zero-shot": build_zero_shot_prompt,
        "few-shot": build_few_shot_prompt,
        "chain-of-thought": build_chain_of_thought_prompt,
    }
    return builders[technique](product, audience, output_type)