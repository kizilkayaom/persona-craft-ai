import streamlit as st
from services.generator import generate_marketing_content

# Sayfa Genişlik ve Başlık Ayarları
st.set_page_config(
    page_title="PersonaCraft AI",
    page_icon="🎨",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS ile Arayüzü Şıklaştırma (Koyu ve Modern bir Tema)
st.markdown("""
    <style>
    /* Ana Başlık stili */
    .main-title {
        font-size: 2.6rem;
        color: #F3F4F6;
        font-weight: 800;
        margin-bottom: 2px;
        text-align: left;
    }
    .subtitle {
        font-size: 1.1rem;
        color: #9CA3AF;
        margin-bottom: 20px;
        text-align: left;
    }
    /* Sonuç kutusu stili */
    .result-box {
        background-color: #1F2937;
        color: #F9FAFB;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid #374151;
        border-left: 6px solid #10B981;
        line-height: 1.6;
        font-size: 1.05rem;
        margin-top: 15px;
        white-space: pre-line;
    }
    /* CoT Akıl Yürütme Kutusu */
    .cot-box {
        background-color: #111827;
        color: #E5E7EB;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #374151;
        font-family: sans-serif;
        font-size: 0.95rem;
        margin-bottom: 15px;
    }
    /* Alert stili */
    .success-alert {
        background-color: #064E3B;
        color: #A7F3D0;
        padding: 15px;
        border-radius: 8px;
        border: 1px solid #047857;
        margin-bottom: 20px;
        font-weight: 600;
    }
    </style>
""", unsafe_allow_html=True)

# Üst Başlık Alanı
st.markdown('<div class="main-title">🎨 PersonaCraft AI</div>', unsafe_allow_html=True)
st.markdown('<div class="subtitle">Yapay Zeka Destekli Pazarlama ve Hedef Kitle Kişiselleştirme Asistanı</div>', unsafe_allow_html=True)
st.divider()

# Ana Ekranı İki Sütuna Bölüyoruz
col_left, col_right = st.columns([2, 3])

# --- SOL SÜTUN: Kampanya Parametreleri ---
with col_left:
    st.markdown("### 📋 Kampanya Parametreleri")
    
    # 1. API Anahtarı Girdisi
    api_key_input = st.text_input(
        "Google Gemini API Key",
        type="password",
        placeholder="Girmek için tıklayın (Boş bırakılırsa varsayılan anahtar kullanılır)",
        help="Google AI Studio'dan aldığınız Gemini API anahtarınızı girerek kendi kotanızı kullanabilirsiniz."
    )
    
    # 2. Ürün Girişleri
    product_name = st.text_input(
        "Ürün veya Hizmet Adı",
        value="Kablosuz ANC Kulaklık Pro",
        placeholder="Örn: Kablosuz ANC Kulaklık Pro",
        help="Pazarlamak istediğiniz ürünün tam adını yazın."
    )
    
    product_desc = st.text_area(
        "Ürün Açıklaması & Temel Özellikler",
        value="Aktif gürültü engelleme (ANC), 40 saat pil ömrü, tere dayanıklı tasarım, gelişmiş Bluetooth 5.4.",
        placeholder="Ürünün öne çıkan teknik veya fonksiyonel özelliklerini yazın...",
        height=110,
        help="Ürününüzün faydalarını, malzemesini veya dikkat çeken yönlerini detaylandırın."
    )
    
    # 3. Dropdown ve Seçenekler
    audiences = ["Gençler", "Aileler", "Kurumsal", "Teknoloji Meraklıları", "Öğrenciler", "Premium Kullanıcılar"]
    target_audience = st.selectbox("🎯 Hedef Kitle", options=audiences, index=0)
    
    tones = ["Dinamik & Trend", "Samimi & Sıcak", "Profesyonel & Kurumsal", "Heyecanlı & İkna Edici", "Eğlenceli & Esprili"]
    communication_tone = st.selectbox("🗣️ İletişim Tonu", options=tones, index=0)
    
    strategies = ["Zero-Shot Prompting (Örneksiz)", "Few-Shot Prompting (Örnekli)", "Chain-of-Thought (CoT)"]
    prompt_style = st.selectbox("🧠 Prompt Tekniği (Metodu)", options=strategies, index=0)
    
    output_language = "Türkçe"
    
    output_types = ["Tümü", "Instagram Postu", "Reklam Metni", "E-mail", "Website Açıklaması", "SMS Kampanyası"]
    output_type = st.selectbox("📄 İstediğiniz Çıktı Türü", options=output_types, index=0)
    
    st.markdown("<br>", unsafe_allow_html=True)
    # Kampanyayı Yeniden Pazarla Butonu
    submit_btn = st.button("🚀 Kampanyayı Yeniden Pazarla", type="primary", use_container_width=True)

# --- SAĞ SÜTUN: Yapay Zeka Pazarlama Çıktıları ---
with col_right:
    st.markdown("### ✨ Yapay Zeka Pazarlama Çıktıları")
    
    if submit_btn:
        if not product_name:
            st.error("Lütfen bir Ürün veya Hizmet Adı girin!")
        else:
            with st.spinner("PersonaCraft AI hedef kitlenizin dilini analiz ediyor ve kampanya kurguluyor..."):
                # Backend fonksiyonunu çağırıyoruz
                generated_text = generate_marketing_content(
                    product_name=product_name,
                    product_desc=product_desc,
                    target_audience=target_audience,
                    tone=communication_tone,
                    prompt_style=prompt_style,
                    output_type=output_type,
                    language=output_language,
                    api_key_override=api_key_input if api_key_input.strip() != "" else None
                )

                    # Önce hata kontrolü yap
                if generated_text.startswith("Hata:") or generated_text.startswith("API Çağrısı"):
                    st.error(generated_text)
                    st.stop()

                # Başarı mesajını sadece gerçekten başarılıysa göster
                st.markdown(
                    '<div class="success-alert">Metinler Başarıyla Oluşturuldu!</div>',
                unsafe_allow_html=True
)
                
                # Chain-of-Thought akıl yürütmesini ayırıp göstermek
                if "chain" in prompt_style.lower() or "cot" in prompt_style.lower():
                    # "NİHAİ PAZARLAMA METNİ" kelimesine göre çıktıları ayırmaya çalışabiliriz
                    parts = generated_text.split("NİHAİ PAZARLAMA METNİ")
                    if len(parts) > 1:
                        reasoning_part = parts[0].strip()
                        content_part = parts[1].strip()
                        
                        # Akıl yürütmeyi güzel bir expander içinde gösteriyoruz
                        with st.expander("🧠 Yapay Zekanın Akıl Yürütme ve Kitle Analizi (CoT)", expanded=True):
                            st.markdown(reasoning_part)
                        
                        # Nihai metni gösteriyoruz
                        st.markdown("#### 🎯 Üretilen Kampanya İçeriği")
                        st.markdown(f'<div class="result-box">{content_part}</div>', unsafe_allow_html=True)
                    else:
                        st.markdown(f'<div class="result-box">{generated_text}</div>', unsafe_allow_html=True)
                else:
                    # Diğer metotlar için doğrudan gösteriyoruz
                    st.markdown(f'<div class="result-box">{generated_text}</div>', unsafe_allow_html=True)
                
                st.markdown("<br>", unsafe_allow_html=True)
                # İndirme Seçeneği
                st.download_button(
                    label="📥 Kampanya İçeriğini İndir (.txt)",
                    data=generated_text,
                    file_name=f"{product_name}_{target_audience}_{prompt_style}.txt",
                    mime="text/plain",
                    use_container_width=True
                )
    else:
        st.info("Sol taraftaki parametreleri ayarladıktan sonra '🚀 Kampanyayı Yeniden Pazarla' butonuna tıklayarak ilk içeriğinizi üretebilirsiniz.")
