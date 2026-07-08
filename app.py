import streamlit as st
from services.generator import generate_marketing_content

# Sayfa Genişlik ve Başlık Ayarları
st.set_page_config(
    page_title="PersonaCraft AI",
    page_icon="🎨",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS ile Arayüzü Şıklaştırma (Responsive ve Göze Hoş Gelen Renkler)
st.markdown("""
    <style>
    .main-title {
        font-size: 2.5rem;
        color: #1E3A8A;
        font-weight: 700;
        margin-bottom: 5px;
    }
    .subtitle {
        font-size: 1.1rem;
        color: #4B5563;
        margin-bottom: 25px;
    }
    .result-box {
        background-color: #F3F4F6;
        padding: 20px;
        border-radius: 10px;
        border-left: 5px solid #1E3A8A;
    }
    </style>
""", unsafe_with_html=True)

# Üst Başlık Alanı
st.markdown('<div class="main-title">🎨 PersonaCraft AI</div>', unsafe_with_html=True)
st.markdown('<div class="subtitle">AI-Powered Marketing Personalization Assistant</div>', unsafe_with_html=True)
st.divider()

# Sidebar: Giriş Alanları ve Form Kontrolleri
with st.sidebar:
    st.header("🚀 Kampanya Ayarları")
    
    # 1. Ürün Girişi
    product_name = st.text_input(
        "Ürün veya Hizmet Adı", 
        placeholder="Örn: Samsung Galaxy Buds",
        help="Pazarlamak istediğiniz ürünün tam adını veya kısa açıklamasını yazın."
    )
    
    # 2. Hedef Kitle Seçimi (Dropdown)
    audiences = ["Gençler", "Aileler", "Kurumsal", "Teknoloji Meraklıları", "Öğrenciler", "Premium Kullanıcılar"]
    target_audience = st.selectbox("🎯 Hedef Kitle", options=audiences)
    
    # 3. Çıktı Türü Seçimi (Dropdown)
    output_types = ["Instagram Postu", "Reklam Metni", "E-mail", "Website Açıklaması", "SMS Kampanyası"]
    output_type = st.selectbox("📄 Çıktı Formatı", options=output_types)
    
    # 4. Prompt Stratejisi (Gelişmiş Ayar)
    prompt_styles = ["Zero-shot", "Few-shot", "Chain of Thought"]
    prompt_style = st.radio("🧠 Prompt Stratejisi", options=prompt_styles, index=0)
    
    st.divider()
    # İçerik Üretme Butonu
    generate_btn = st.button("İçerik Üret ✨", type="primary", use_container_width=True)

# Ana Ekran: Sonuçların Gösterileceği Alan
col1, col2 = st.columns([1, 1]) # Ekranı ikiye bölebiliriz: Sol taraf özet, Sağ taraf çıktı

with col1:
    st.subheader("📋 Seçim Özeti")
    if product_name:
        st.info(f"**Ürün:** {product_name}\n\n**Kitle:** {target_audience}\n\n**Format:** {output_type}\n\n**Strateji:** {prompt_style}")
    else:
        st.warning("Lütfen sol taraftaki menüden ürün adı girerek başlayın.")

with col2:
    st.subheader("✨ Yapay Zeka Çıktısı")
    
    if generate_btn:
        if not product_name:
            st.error("Lütfen önce bir ürün adı girin!")
        else:
            # Kullanıcıya işlem yapıldığını gösteren animasyon
            with st.spinner("PersonaCraft AI hedef kitlenizin dilini analiz ediyor..."):
                # Backend fonksiyonunu çağırıyoruz
                generated_text = generate_marketing_content(
                    product_name=product_name,
                    target_audience=target_audience,
                    output_type=output_type,
                    prompt_style=prompt_style
                )
                
                # Sonucu ekrana şık bir markdown kutusu içinde basıyoruz
                st.markdown(f'<div class="result-box">{generated_text}</div>', unsafe_with_html=True)
                
                # İndirme Butonu 
                st.download_button(
                    label="Metni İndir (.txt)",
                    data=generated_text,
                    file_name=f"{product_name}_{target_audience}_{output_type}.txt",
                    mime="text/plain"
                )
