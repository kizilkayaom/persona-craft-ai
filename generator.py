import os
from google import genai
from google.genai import types

def generate_marketing_content(product_name, target_audience, output_type, prompt_style="Few-shot"):
    """
    Seçilen ürün, kitle ve çıktı türüne göre Gemini API'yi kullanarak pazarlama içeriği üretir.
    """
    # API Anahtarını güvenli bir şekilde alıyoruz
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return "Hata: GEMINI_API_KEY çevre değişkeni bulunamadı. Lütfen API anahtarınızı ayarlayın."
    
    client = genai.Client(api_key=api_key)
    
    # Prompt Mühendisliği Stratejisi (Prompt şablonlarını buraya entegre ediyoruz)
    # Gerçek projede bunları 'prompts/prompt_templates.py' içinden import edebilirsin.
    system_instruction = (
        "Sen profesyonel bir dijital pazarlama uzmanı ve metin yazarısın (Copywriter). "
        "Görevin, verilen ürünü, belirtilen hedef kitlenin psikolojisine, ihtiyaçlarına ve "
        "satın alma motivasyonlarına uygun şekilde yeniden konumlandırmak ve pazarlamaktır."
    )
    
    user_prompt = f"""
    Ürün/Hizmet: {product_name}
    Hedef Kitle: {target_audience}
    İstenen Çıktı Türü: {output_type}
    Uygulanacak Prompt Stratejisi: {prompt_style}
    
    Lütfen bu kitleye hitap eden, dikkat çekici, ikna edici ve platformun dinamiklerine uygun bir {output_type} metni hazırla.
    """
    
    try:
        # Gemini 2.5 Flash hem hızlı hem de metin üretiminde son derece başarılı
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=user_prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7, # Yaratıcılık dengesi
            )
        )
        return response.text
    except Exception as e:
        return f"API Çağrısı sırasında bir hata oluştu: {str(e)}"
