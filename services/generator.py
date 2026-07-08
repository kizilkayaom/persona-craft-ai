import os
from google import genai
from google.genai import types
from prompts.prompt_templates import get_prompt_package

def generate_marketing_content(product_name, product_desc, target_audience, tone, prompt_style, output_type, language="Türkçe", api_key_override=None):
    """
    Seçilen ürün, kitle ve çıktı türüne göre Gemini API'yi kullanarak pazarlama içeriği üretir.
    """
    # API Anahtarını öncelikle arayüzden gelen değerden, yoksa çevre değişkeninden alıyoruz
    api_key = api_key_override if api_key_override else os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return "Hata: API anahtarı bulunamadı. Lütfen sol panelden geçerli bir Google Gemini API Key girin veya sunucu çevre değişkenlerini yapılandırın."
    
    try:
        client = genai.Client(api_key=api_key)
        
        # prompts/prompt_templates.py dosyasından gelen tek ve birleşik prompt paketini alıyoruz
        system_instruction, user_prompt = get_prompt_package(
            product_name=product_name,
            product_desc=product_desc,
            target_audience=target_audience,
            tone=tone,
            prompt_style=prompt_style,
            output_type=output_type,
            language=language
        )
        
        # Gemini 2.5 Flash hem hızlı hem de pazarlama metinlerinde son derece başarılıdır
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