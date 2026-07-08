import streamlit as st
import json
import os
from generator import call_gemini

# App Title & Styling
st.set_page_config(
    page_title="PersonaCraft AI - Marketing Personalizer (Streamlit)",
    page_icon="🎯",
    layout="wide"
)

st.title("🎯 PersonaCraft AI — Marketing Personalizer")
st.markdown("---")

# Setup layout columns
col1, col2 = st.columns([1, 2])

with col1:
    st.subheader("📋 Kampanya Parametreleri")
    
    # API Key Handling (looks for environment variable or secure text input)
    api_key_from_env = os.environ.get("GEMINI_API_KEY", "")
    api_key = st.text_input(
        "Google Gemini API Key", 
        type="password", 
        value=api_key_from_env,
        help="API Key verilmezse sistem çalışmayacaktır. Lütfen geçerli bir Gemini API anahtarı girin."
    )
    
    # 1. Product Name & Description
    product_name = st.text_input("Ürün veya Hizmet Adı", "Kablosuz ANC Kulaklık Pro")
    product_desc = st.text_area(
        "Ürün Açıklaması & Temel Özellikler", 
        "Aktif gürültü engelleme (ANC), 40 saat pil ömrü, tere dayanıklı tasarım, gelişmiş Bluetooth 5.4."
    )
    
    # 2. Target Audience
    audience_options = ["Gençler", "Aileler", "Sporcular", "Kurumsal", "Yaratıcı Profesyoneller"]
    target_audience = st.selectbox("Hedef Kitle", audience_options)
    
    # 3. Tone of Voice
    tone_options = [
        "Dinamik & Trend", 
        "Profesyonel & Güvenilir", 
        "Heyecanlı & Merak Uyandıran", 
        "Lüks & Prestijli", 
        "Samimi & Sıcak"
    ]
    tone = st.selectbox("İletişim Tonu", tone_options)
    
    # 4. Prompting Style
    style_options = {
        "Zero-Shot Prompting (Örneksiz)": "zero-shot",
        "Few-Shot Prompting (Örnekli)": "few-shot",
        "Chain-of-Thought (CoT)": "chain-of-thought"
    }
    selected_style_name = st.selectbox("Prompt Tekniği (Metodu)", list(style_options.keys()))
    prompt_style = style_options[selected_style_name]
    
    # 5. Output Language
    language = st.selectbox("Çıktı Dili", ["Türkçe", "English", "Deutsch", "Español"])
    
    # 6. Specific Output Channel
    output_type = st.selectbox("İstediğiniz Çıktı Türü", ["Tümü", "Instagram", "Reklam", "Email", "Website", "SMS"])

    generate_btn = st.button("🚀 Kampanyayı Yeniden Pazarla", use_container_width=True)

with col2:
    st.subheader("✨ Yapay Zeka Pazarlama Çıktıları")
    
    if generate_btn:
        if not api_key:
            st.error("Lütfen geçerli bir Gemini API Anahtarı girin!")
        else:
            with st.spinner("Yapay Zeka Metinleri Yazıyor..."):
                try:
                    result = call_gemini(
                        api_key=api_key,
                        product=product_name,
                        audience=target_audience,
                        output_type=output_type,
                        technique=prompt_style,
                        tone=tone,
                        language=language,
                        desc=product_desc
                    )
                    
                    st.success("Metinler Başarıyla Oluşturuldu!")
                    
                    if isinstance(result, dict):
                        # Show Chain of Thought analysis if present
                        if prompt_style == "chain-of-thought" and "audienceAnalysis" in result and result["audienceAnalysis"]:
                            with st.expander("🧠 Yapay Zekanın Akıl Yürütme ve Kitle Analizi (CoT)", expanded=True):
                                st.info(result["audienceAnalysis"])
                        
                        # Show tabs for other platforms
                        tabs = st.tabs(["📱 Instagram", "📢 Reklam", "✉️ Email", "🌐 Website", "💬 SMS"])
                        
                        with tabs[0]:
                            st.subheader("Instagram Postu")
                            st.write(result.get("instagram", "Metin üretilemedi."))
                        with tabs[1]:
                            st.subheader("Reklam Metni")
                            st.write(result.get("reklam", "Metin üretilemedi."))
                        with tabs[2]:
                            st.subheader("E-posta Kampanyası")
                            st.code(result.get("email", "Metin üretilemedi."), language="text")
                        with tabs[3]:
                            st.subheader("Web Sitesi Açıklaması")
                            st.write(result.get("website", "Metin üretilemedi."))
                        with tabs[4]:
                            st.subheader("SMS Kampanyası")
                            st.info(result.get("sms", "Metin üretilemedi."))
                            
                    else:
                        # Single output selected
                        st.subheader(f"Seçilen Kanal Çıktısı: {output_type}")
                        st.write(result)
                        
                except Exception as e:
                    st.error(f"Yapay zeka çağrısı sırasında bir hata oluştu: {str(e)}")
    else:
        st.info("Soldaki parametreleri ayarlayıp 'Kampanyayı Yeniden Pazarla' butonuna tıklayarak ilk kampanyanızı oluşturun.")

st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #888; font-size: 12px;">
    PersonaCraft AI — İnovasyon Kampüsü Projesi Sunum Altyapısı
</div>
""", unsafe_type_html=True)
