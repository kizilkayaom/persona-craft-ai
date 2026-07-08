import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Layers, 
  Users, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Cpu, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  RefreshCw,
  Package,
  Zap,
  Clock,
  Code,
  RotateCw
} from "lucide-react";
import FormatPreview from "./components/FormatPreview";
import { jsPDF } from "jspdf";

// Crisp high-fidelity SVG representation of the official PersonaCraft AI circular monogram (interlocking P and C)
function PersonaCraftLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      id="brand-logo-svg"
    >
      {/* Outer Circle Split Arcs - Navy Blue (#1428a0) and Vibrant Cyan (#00a3e0) */}
      {/* Left semicircular arc (Navy Blue) */}
      <path 
        d="M 60,14 A 46,46 0 0,0 20,60 A 46,46 0 0,0 60,106" 
        stroke="#1428a0" 
        strokeWidth="9.5" 
        strokeLinecap="round" 
      />
      {/* Right semicircular arc (Vibrant Cyan) */}
      <path 
        d="M 60,14 A 46,46 0 0,1 100,60 A 46,46 0 0,1 60,106" 
        stroke="#00a3e0" 
        strokeWidth="9.5" 
        strokeLinecap="round" 
      />

      {/* Inner Monogram elements - Interlocking P (left, Navy Blue) and C (right, Cyan) */}
      {/* Navy Blue stylized 'P' */}
      <path 
        d="M 45,38 H 60 M 45,38 V 82 M 45,60 H 60 C 71,60 71,38 60,38" 
        stroke="#1428a0" 
        strokeWidth="9.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Vibrant Cyan stylized 'C' loop */}
      <path 
        d="M 75,82 H 60 M 75,60 H 60 C 49,60 49,82 60,82" 
        stroke="#00a3e0" 
        strokeWidth="9.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  // Form States
  const [productName, setProductName] = useState("Samsung Galaxy Buds");
  const [targetAudience, setTargetAudience] = useState("Gençler");
  const [outputFormat, setOutputFormat] = useState("Instagram Postu");
  const [selectedStrategy, setSelectedStrategy] = useState("Few-shot");

  // Email Meta-Settings States
  const [activeTab, setActiveTab] = useState<"genel" | "email">("genel");
  const [emailSubject, setEmailSubject] = useState("Aradığınız O Eşsiz Deneyim Burada...");
  const [emailSender, setEmailSender] = useState("Samsung Türkiye");
  const [emailSignature, setEmailSignature] = useState("Saygılarımızla, PersonaCraft Ekibi");

  // App States
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [generationMode, setGenerationMode] = useState<"real" | "mock" | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [outputTab, setOutputTab] = useState<"text" | "preview">("text");
  const [isLandscape, setIsLandscape] = useState(false);

  // Constants
  const audiences = ["Gençler", "Aileler", "Kurumsal", "Teknoloji Meraklıları", "Öğrenciler", "Premium Kullanıcılar"];
  const outputFormats = ["Instagram Postu", "Reklam Metni", "E-mail", "Website Açıklaması", "SMS Kampanyası"];
  const strategies = ["Zero-shot", "Few-shot", "Chain of Thought"];

  // Fetch API Status on load
  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch("/api/status");
      const data = await response.json();
      setHasApiKey(data.hasApiKey);
    } catch (err) {
      console.error("Error checking API status:", err);
      setHasApiKey(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      setError("Lütfen bir ürün veya hizmet adı girin!");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedContent("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productName,
          audience: targetAudience,
          format: outputFormat,
          strategy: selectedStrategy,
          emailSubject: emailSubject,
          emailSender: emailSender,
          emailSignature: emailSignature,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Sunucu hatası oluştu.");
      }

      const data = await response.json();
      setGeneratedContent(data.text);
      setGenerationMode(data.mode);
      setOutputTab("preview");
    } catch (err: any) {
      setError(err.message || "Kampanya içeriği üretilirken bir hata oluştu.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    const element = document.createElement("a");
    const file = new Blob([generatedContent], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `personacraft_${targetAudience.toLowerCase().replace(/\s+/g, "_")}_${outputFormat.toLowerCase().replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPDF = () => {
    if (!generatedContent) return;

    // Create standard A4 document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Helper to sanitize Turkish characters for basic PDF Helvetica compatibility
    const sanitizeText = (txt: string) => {
      return txt
        .replace(/ğ/g, "g").replace(/Ğ/g, "G")
        .replace(/ü/g, "u").replace(/Ü/g, "U")
        .replace(/ş/g, "s").replace(/Ş/g, "S")
        .replace(/ı/g, "i").replace(/İ/g, "I")
        .replace(/ö/g, "o").replace(/Ö/g, "O")
        .replace(/ç/g, "c").replace(/Ç/g, "C");
    };

    // Brand Colors
    const samsungBlue = [20, 40, 160]; // #1428a0
    const charcoal = [30, 41, 59]; // slate-800
    const lightSlate = [100, 116, 139]; // slate-500
    const cardBg = [248, 250, 252]; // slate-50
    const borderGray = [226, 232, 240]; // slate-200

    // Page styling helpers
    const drawPageTemplate = (pageNum: number) => {
      // Top Samsung Blue Accent Bar
      doc.setFillColor(samsungBlue[0], samsungBlue[1], samsungBlue[2]);
      doc.rect(0, 0, 210, 8, "F");

      // Brand Logo Text left and Platform Name right in the header area
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(samsungBlue[0], samsungBlue[1], samsungBlue[2]);
      doc.text("SAMSUNG", 15, 15);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text("Innovation Campus | PersonaCraft AI", 33, 15);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(samsungBlue[0], samsungBlue[1], samsungBlue[2]);
      doc.text("RAPOR", 195, 15, { align: "right" });

      // Header horizontal thin separator line
      doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
      doc.setLineWidth(0.2);
      doc.line(15, 18, 195, 18);

      // Bottom footer thin separator
      doc.line(15, 280, 195, 280);

      // Footer content
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text("Bu rapor Samsung Innovation Campus PersonaCraft AI platformu tarafından üretilmiştir. @ 2026", 15, 285);
      doc.text(`Sayfa ${pageNum}`, 195, 285, { align: "right" });
    };

    // Draw page 1 template
    let currentPage = 1;
    drawPageTemplate(currentPage);

    // Title Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.text(sanitizeText("KAMPANYA PLANLAMA VE PAZARLAMA RAPORU"), 15, 28);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(lightSlate[0], lightSlate[1], lightSlate[2]);
    doc.text(sanitizeText(`Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')} - ${new Date().toLocaleTimeString('tr-TR')}`), 15, 33);

    // Metadata Card Background
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(15, 38, 180, 42, 3, 3, "FD");

    // Metadata details Inside Card
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(samsungBlue[0], samsungBlue[1], samsungBlue[2]);
    doc.text(sanitizeText("KAMPANYA YAPILANDIRMASI"), 20, 45);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);

    // Col 1
    doc.text(sanitizeText(`Ürün / Hizmet: ${productName || "Belirtilmedi"}`), 20, 52);
    doc.text(sanitizeText(`Hedef Kitle: ${targetAudience}`), 20, 58);
    doc.text(sanitizeText(`Kampanya Formatı: ${outputFormat}`), 20, 64);

    // Col 2
    doc.text(sanitizeText(`Prompt Stratejisi: ${selectedStrategy}`), 110, 52);
    const modeLabel = generationMode === "real" ? "Canli Yapay Zeka (Gemini 2.5 Flash)" : "Yapay Zeka Simulatoru";
    doc.text(sanitizeText(`Üretim Modu: ${modeLabel}`), 110, 58);
    doc.text(sanitizeText("Icerik Dili: Turkce (TR)"), 110, 64);

    // Draw a neat left accent strip in the metadata card
    doc.setFillColor(samsungBlue[0], samsungBlue[1], samsungBlue[2]);
    doc.rect(15, 38, 2, 42, "F");

    // Header for Campaign Content
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(samsungBlue[0], samsungBlue[1], samsungBlue[2]);
    doc.text(sanitizeText("ÜRETİLEN KAMPANYA METNİ"), 15, 92);

    doc.setDrawColor(samsungBlue[0], samsungBlue[1], samsungBlue[2]);
    doc.setLineWidth(0.8);
    doc.line(15, 95, 35, 95);

    // Text Content Area
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);

    // Process and print campaign text
    const cleanContent = sanitizeText(generatedContent);
    const lines = doc.splitTextToSize(cleanContent, 180);
    
    let currentY = 103;
    const lineHeight = 6.2;
    const maxY = 265;

    lines.forEach((line: string) => {
      if (currentY > maxY) {
        // Add new page
        doc.addPage();
        currentPage += 1;
        drawPageTemplate(currentPage);
        
        // Reset Y coordinate on new page
        currentY = 30;
        
        // Reset font settings for new page text
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
      }
      
      doc.text(line, 15, currentY);
      currentY += lineHeight;
    });

    // Save PDF
    const filename = `personacraft_${targetAudience.toLowerCase().replace(/\s+/g, "_")}_${outputFormat.toLowerCase().replace(/\s+/g, "_")}.pdf`;
    doc.save(filename);
  };

  // Helper for strategy descriptions
  const getStrategyExplanation = (strat: string) => {
    switch (strat) {
      case "Zero-shot":
        return "Doğrudan amaca odaklanarak ek referans örnekleri olmaksızın hızlı ve doğrudan bir pazarlama içeriği üretir.";
      case "Few-shot":
        return "Seçilen kitleye yönelik kanıtlanmış başarılı kampanyaları ve reklam dili formüllerini referans alarak kurgular.";
      case "Chain of Thought":
        return "Önce kitle analizini, psikolojik tetikleyicileri adım adım planlar ve metni bu rasyonel temel üzerine inşa eder.";
      default:
        return "";
    }
  };

  // Quick stats derived from generated content
  const wordCount = generatedContent ? generatedContent.trim().split(/\s+/).length : 0;
  const charCount = generatedContent ? generatedContent.length : 0;

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-[#1e293b] flex flex-col md:flex-row font-sans overflow-x-hidden" id="app-root">
      
      {/* SIDEBAR: Clean Control Panel */}
      <aside className="w-full md:w-[350px] lg:w-[380px] bg-white border-r border-[#e2e8f0] flex flex-col shrink-0" id="aside-panel">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#e2e8f0] flex flex-col justify-between" id="aside-header">
          <div className="text-[#1428a0] font-bold text-2xl tracking-tight flex items-center gap-3 font-display" id="brand-logo-title">
            <PersonaCraftLogo className="w-9 h-9 shrink-0" />
            <span>PersonaCraft AI</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-2.5 font-semibold" id="brand-sub">
            Samsung Innovation Campus
          </p>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-4 pb-2 border-b border-[#e2e8f0] flex gap-2 bg-[#fcfdfe]" id="sidebar-tabs">
          <button
            type="button"
            onClick={() => setActiveTab("genel")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all border cursor-pointer ${
              activeTab === "genel"
                ? "bg-[#1428a0] text-white border-[#1428a0] shadow-sm"
                : "bg-white text-slate-600 border-[#e2e8f0] hover:bg-slate-50"
            }`}
            id="tab-btn-genel"
          >
            ⚙️ Genel Ayarlar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all border flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === "email"
                ? "bg-[#1428a0] text-white border-[#1428a0] shadow-sm"
                : "bg-white text-slate-600 border-[#e2e8f0] hover:bg-slate-50"
            }`}
            id="tab-btn-email"
          >
            📧 E-mail Meta
            {outputFormat === "E-mail" && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block ml-1"></span>
            )}
          </button>
        </div>

        {/* Configuration controls */}
        <div className="p-6 flex-1 overflow-y-auto text-sm" id="aside-body">
          {activeTab === "genel" ? (
            <div className="space-y-6" id="genel-settings-panel">
              {/* Product Input */}
              <div className="space-y-2" id="group-product">
                <label className="block font-bold text-xs uppercase text-slate-500 tracking-wider" htmlFor="product-input">
                  📦 Ürün veya Hizmet Adı
                </label>
                <div className="relative" id="product-input-container">
                  <input 
                    id="product-input"
                    type="text" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Örn: Samsung Galaxy Buds" 
                    className="w-full p-3 border border-[#e2e8f0] rounded-xl bg-[#fcfdfe] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1428a0]/15 focus:border-[#1428a0] shadow-sm text-sm transition-all"
                    maxLength={100}
                    required
                  />
                  {productName && (
                    <button
                      type="button"
                      onClick={() => setProductName("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 font-bold px-1.5 py-0.5 rounded hover:bg-slate-100"
                      id="aside-clear-btn"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>

              {/* Target Audience */}
              <div className="space-y-2" id="group-audience">
                <label className="block font-bold text-xs uppercase text-slate-500 tracking-wider" htmlFor="audience-select">
                  🎯 Hedef Kitle
                </label>
                <div className="relative" id="audience-select-container">
                  <select
                    id="audience-select"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full p-3 border border-[#e2e8f0] rounded-xl bg-[#fcfdfe] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1428a0]/15 focus:border-[#1428a0] shadow-sm text-sm transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1.1rem', backgroundRepeat: 'no-repeat' }}
                  >
                    {audiences.map((aud) => (
                      <option key={aud} value={aud}>
                        {aud}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Output Format */}
              <div className="space-y-2" id="group-format">
                <label className="block font-bold text-xs uppercase text-slate-500 tracking-wider" htmlFor="format-select">
                  📄 Çıktı Formatı
                </label>
                <div className="relative" id="format-select-container">
                  <select
                    id="format-select"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full p-3 border border-[#e2e8f0] rounded-xl bg-[#fcfdfe] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1428a0]/15 focus:border-[#1428a0] shadow-sm text-sm transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1.1rem', backgroundRepeat: 'no-repeat' }}
                  >
                    {outputFormats.map((fmt) => (
                      <option key={fmt} value={fmt}>
                        {fmt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Prompt Engineering Strategy */}
              <div className="space-y-3" id="group-strategy">
                <label className="block font-bold text-xs uppercase text-slate-500 tracking-wider">
                  🧠 Prompt Mühendisliği Stratejisi
                </label>
                <div className="space-y-2 text-xs" id="strategies-list">
                  {strategies.map((strat) => {
                    const isSelected = selectedStrategy === strat;
                    return (
                      <label
                        key={strat}
                        onClick={() => setSelectedStrategy(strat)}
                        className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                          isSelected
                            ? "bg-[#f4f7f9] border-[#1428a0]/20 text-[#1428a0] shadow-sm"
                            : "bg-white border-[#e2e8f0] hover:bg-slate-50/50 text-slate-600"
                        }`}
                        id={`strat-label-${strat.replace(/\s+/g, "-")}`}
                      >
                        <input
                          type="radio"
                          name="strategy"
                          checked={isSelected}
                          onChange={() => setSelectedStrategy(strat)}
                          className="mt-0.5 accent-[#1428a0] cursor-pointer"
                          id={`strat-radio-${strat.replace(/\s+/g, "-")}`}
                        />
                        <div>
                          <span className="font-bold block">{strat}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block leading-relaxed">
                            {strat === "Zero-shot" && "Hızlı, ek referanssız, direkt talimat odaklı üretim."}
                            {strat === "Few-shot" && "Benzer başarılı örnek şablonları taklit ederek kurgu."}
                            {strat === "Chain of Thought" && "Kitle psikolojisini derin analiz eden rasyonel süreç."}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5" id="email-meta-settings-panel">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed" id="email-meta-notice">
                💡 <strong>E-mail Meta-Ayarları:</strong> Bu panelde belirleyeceğiniz e-posta konu başlığı, gönderici adı ve imza bilgileri, üretilecek olan kurumsal e-posta şablonlarına entegre edilir.
              </div>

              {/* Format compatibility warning */}
              {outputFormat !== "E-mail" && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] leading-relaxed space-y-1.5" id="email-format-warning">
                  <p>⚠️ <strong>Uyum Uyarısı:</strong> Mevcut çıktı formatınız <strong>"{outputFormat}"</strong> olarak seçilmiş. Bu ayarların metne dahil edilmesi için çıktı formatının <strong>"E-mail"</strong> olması önerilir.</p>
                  <button
                    type="button"
                    onClick={() => setOutputFormat("E-mail")}
                    className="w-full bg-[#1428a0] text-white font-bold py-1.5 rounded-lg text-center hover:bg-[#0d1d78] transition-all cursor-pointer text-[10px]"
                    id="switch-format-to-email-btn"
                  >
                    Formatı "E-mail" Yap ✉️
                  </button>
                </div>
              )}

              {/* Sender Name Input */}
              <div className="space-y-2" id="group-email-sender">
                <label className="block font-bold text-xs uppercase text-slate-500 tracking-wider" htmlFor="email-sender-input">
                  👤 Gönderici Adı
                </label>
                <input 
                  id="email-sender-input"
                  type="text" 
                  value={emailSender}
                  onChange={(e) => setEmailSender(e.target.value)}
                  placeholder="Örn: Samsung Türkiye" 
                  className="w-full p-3 border border-[#e2e8f0] rounded-xl bg-[#fcfdfe] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1428a0]/15 focus:border-[#1428a0] shadow-sm text-sm transition-all"
                  maxLength={50}
                />
              </div>

              {/* Subject Line Input */}
              <div className="space-y-2" id="group-email-subject">
                <label className="block font-bold text-xs uppercase text-slate-500 tracking-wider" htmlFor="email-subject-input">
                  📌 E-posta Konu Başlığı
                </label>
                <input 
                  id="email-subject-input"
                  type="text" 
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Örn: Size Özel Yenilik..." 
                  className="w-full p-3 border border-[#e2e8f0] rounded-xl bg-[#fcfdfe] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1428a0]/15 focus:border-[#1428a0] shadow-sm text-sm transition-all"
                  maxLength={100}
                />
              </div>

              {/* Email Signature Input */}
              <div className="space-y-2" id="group-email-signature">
                <label className="block font-bold text-xs uppercase text-slate-500 tracking-wider" htmlFor="email-signature-input">
                  ✍️ E-posta İmzası
                </label>
                <textarea 
                  id="email-signature-input"
                  value={emailSignature}
                  onChange={(e) => setEmailSignature(e.target.value)}
                  placeholder="Örn: Saygılarımızla, Samsung Türkiye Ekibi" 
                  className="w-full p-3 border border-[#e2e8f0] rounded-xl bg-[#fcfdfe] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1428a0]/15 focus:border-[#1428a0] shadow-sm text-sm transition-all min-h-[90px] resize-none"
                  maxLength={150}
                />
              </div>
            </div>
          )}
        </div>

        {/* Generate Button Footer */}
        <div className="p-6 bg-[#fcfdfe] border-t border-[#e2e8f0]" id="aside-footer">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-[#1428a0] hover:bg-[#0d1d78] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#1428a0]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed text-sm"
            id="generate-trigger-button"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Hazırlanıyor...</span>
              </>
            ) : (
              <>
                <span>Pazarlama Metni Üret ✨</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE PANEL: Pristine Minimalist Layout */}
      <main className="flex-1 flex flex-col p-4 md:p-8 gap-6 overflow-y-auto max-w-7xl" id="main-content">
        
        {/* Workspace Top Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/60 pb-6" id="workspace-header">
          <div className="space-y-1.5" id="workspace-header-text">
            <h2 className="text-2xl font-bold text-[#1428a0] font-display flex items-center gap-2">
              Kampanya Kontrol Paneli
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium" id="header-task-context">
              <span className="bg-blue-50 text-[#1428a0] px-2.5 py-1 rounded-md font-bold">Samsung Türkiye Özel Portal</span>
              <span>•</span>
              <span>Akıllı Dijital İçerik Editörü ve Pazarlama Stratejisti</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3" id="workspace-badges">
            {hasApiKey !== null ? (
              <div className={`border px-4 py-2 rounded-full flex items-center gap-2 text-[12px] font-semibold shadow-sm bg-white ${
                hasApiKey ? "text-emerald-600 border-emerald-200" : "text-amber-600 border-amber-200"
              }`} id="api-status-badge">
                <span className={`w-2 h-2 rounded-full ${hasApiKey ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-pulse"}`}></span>
                <span>{hasApiKey ? "Canlı Gemini API Aktif" : "Akıllı Simülatör Aktif"}</span>
              </div>
            ) : (
              <div className="bg-white border border-[#e2e8f0] px-4 py-2 rounded-full text-[12px] font-semibold text-slate-500 shadow-sm animate-pulse" id="api-checking-badge">
                Bağlantı Kontrol Ediliyor...
              </div>
            )}
            <div className="bg-white border border-[#e2e8f0] px-4 py-2 rounded-full text-[12px] font-semibold text-[#1428a0] shadow-sm font-mono" id="model-identifier-badge">
              Gemini 3.5 Flash
            </div>
          </div>
        </header>

        {/* PREMIUM SAMSUNG TÜRKİYE KAMPANYA ŞABLONLARI CARD */}
        <section className="bg-white rounded-3xl p-6 border border-l-8 border-l-[#1428a0] border-[#e2e8f0] shadow-sm space-y-4" id="samsung-campaign-templates">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" id="campaign-templates-header">
            <div>
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 font-display uppercase tracking-wide">
                <Sparkles className="w-5 h-5 text-[#1428a0]" />
                Hızlı Kampanya Şablonları & Senaryoları
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Samsung Türkiye ürünleri için optimize edilmiş hazır senaryolardan birini seçerek anında hedef kitle odaklı kampanya içerikleri kurgulayın.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="campaign-scenarios-grid">
            <button
              onClick={() => {
                setProductName("Samsung Galaxy S26 Ultra");
                setTargetAudience("Teknoloji Meraklıları");
                setOutputFormat("Reklam Metni");
                setSelectedStrategy("Chain of Thought");
                setEmailSender("Samsung Türkiye");
                setEmailSubject("Yapay Zeka Çağında Sınırları Zorlayın: Yeni Galaxy S26 Ultra");
                setEmailSignature("Saygılarımızla, Samsung Galaxy Türkiye Ekibi");
              }}
              className="p-4 bg-gradient-to-br from-[#1428a0]/5 to-transparent hover:from-[#1428a0]/10 rounded-2xl border border-[#1428a0]/15 text-left space-y-2 cursor-pointer transition-all hover:scale-[1.02] shadow-sm active:scale-[0.98] group"
              id="scenario-s26"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#1428a0] bg-[#1428a0]/10 px-2 py-0.5 rounded">Mobil Amiral Gemisi</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-all text-[#1428a0]">Fırlat ⚡</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800">Galaxy S26 Ultra</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Yapay zeka (Galaxy AI) odaklı, teknoloji tutkunlarına özel <strong>Chain of Thought</strong> kurgulu reklam kampanyası.
              </p>
            </button>

            <button
              onClick={() => {
                setProductName("Samsung Galaxy Buds3 Pro");
                setTargetAudience("Gençler");
                setOutputFormat("Instagram Postu");
                setSelectedStrategy("Few-shot");
                setEmailSender("Samsung Türkiye");
                setEmailSubject("Kusursuz Ses, Benzersiz Tarz: Galaxy Buds3 Pro");
                setEmailSignature("Sevgiyle, Samsung Ses Teknolojileri Grubu");
              }}
              className="p-4 bg-gradient-to-br from-[#0076cc]/5 to-transparent hover:from-[#0076cc]/10 rounded-2xl border border-[#0076cc]/15 text-left space-y-2 cursor-pointer transition-all hover:scale-[1.02] shadow-sm active:scale-[0.98] group"
              id="scenario-buds"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#0076cc] bg-[#0076cc]/10 px-2 py-0.5 rounded">Giyilebilir Teknoloji</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-all text-[#0076cc]">Fırlat ⚡</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800">Galaxy Buds3 Pro</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Genç dinamik kitleye hitap eden, yüksek kaliteli ses ve ergonomi vaat eden <strong>Few-shot</strong> sosyal medya post kurgusu.
              </p>
            </button>

            <button
              onClick={() => {
                setProductName("Samsung Galaxy Z Fold6");
                setTargetAudience("Kurumsal");
                setOutputFormat("E-mail");
                setSelectedStrategy("Zero-shot");
                setEmailSender("Samsung Türkiye İş Çözümleri");
                setEmailSubject("Geleceğin İş Gücü: Galaxy Z Fold6 ile Sınırları Aşın");
                setEmailSignature("Saygılarımızla, Samsung Kurumsal İletişim Ekibi");
              }}
              className="p-4 bg-gradient-to-br from-slate-900/5 to-transparent hover:from-slate-900/10 rounded-2xl border border-slate-200 text-left space-y-2 cursor-pointer transition-all hover:scale-[1.02] shadow-sm active:scale-[0.98] group"
              id="scenario-fold"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Katlanabilir Güç</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-all text-slate-800">Fırlat ⚡</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800">Galaxy Z Fold6</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                İş dünyasındaki liderler için çoklu görev ve üretkenlik sunan profesyonel <strong>Zero-shot</strong> e-posta bülteni.
              </p>
            </button>
          </div>
        </section>

        {/* Dashboard Cards Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="dashboard-grid">
          
          {/* Card A: Configuration Summary & Badges */}
          <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-4 flex flex-col justify-between" id="summary-card">
            <div className="space-y-3" id="summary-card-top">
              <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#1428a0]" />
                Yapılandırma Özeti
              </h3>
              <div className="flex flex-wrap gap-2 pt-1" id="config-tags">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-bold truncate max-w-[150px]">
                  {productName || "Buds"}
                </span>
                <span className="px-3 py-1 bg-[#0076cc] text-white rounded-full text-[11px] font-bold">
                  {targetAudience}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-bold">
                  {outputFormat}
                </span>
                <span className="px-3 py-1 bg-[#1428a0] text-white rounded-full text-[11px] font-bold">
                  {selectedStrategy}
                </span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100" id="summary-card-bottom">
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong>Strateji Detayı:</strong> {getStrategyExplanation(selectedStrategy)}
              </p>
            </div>
          </div>

          {/* Card B: Live Analytics and Speed Cards */}
          <div className="bg-[#1428a0] p-6 rounded-3xl text-white shadow-xl flex flex-col justify-between" id="analytics-card">
            <div className="space-y-2" id="analytics-top">
              <h3 className="font-bold text-xs uppercase tracking-widest opacity-60 mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-white" />
                İstatistikler ve Metrikler
              </h3>
              <div className="grid grid-cols-2 gap-2" id="metrics-details">
                <div>
                  <div className="text-3xl font-light font-display" id="metric-speed">
                    {isGenerating ? "---" : "1.2s"}
                  </div>
                  <p className="text-[9px] opacity-75 uppercase font-medium tracking-wide">Ortalama Hız</p>
                </div>
                <div>
                  <div className="text-3xl font-light font-display" id="metric-chars">
                    {charCount || "0"}
                  </div>
                  <p className="text-[9px] opacity-75 uppercase font-medium tracking-wide">Karakter Sayısı</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end mt-4 pt-3 border-t border-white/10" id="analytics-bottom">
              <div className="text-xs font-mono opacity-50 italic">
                {wordCount > 0 ? `Metin Boyutu: ${wordCount} Kelime` : "ID: PC-8842"}
              </div>
              <div className="flex -space-x-1.5" id="participants-avatars">
                <div className="w-6 h-6 rounded-full border-2 border-[#1428a0] bg-slate-200 flex items-center justify-center text-[7px] font-bold text-slate-700">SIC</div>
                <div className="w-6 h-6 rounded-full border-2 border-[#1428a0] bg-slate-400 flex items-center justify-center text-[7px] font-bold text-white">AI</div>
                <div className="w-6 h-6 rounded-full border-2 border-[#1428a0] bg-slate-800 text-[8px] flex items-center justify-center font-bold">
                  +3
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Content Section: Dynamic Output Container with pristine border and copy triggers */}
        <section 
          className="flex-1 bg-white rounded-3xl border-l-8 border-[#1428a0] shadow-md p-6 md:p-8 relative flex flex-col min-h-[350px] justify-between" 
          id="content-display-section"
        >
          <div className="space-y-4" id="content-header-and-body">
            <div className="flex justify-between items-center flex-wrap gap-2 mb-2" id="output-header-bar">
              <h3 className="font-bold text-xs uppercase tracking-widest text-[#1428a0] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Üretilen Kampanya İçeriği
              </h3>

              {generatedContent && !isGenerating && (
                <div className="flex items-center gap-2 flex-wrap" id="output-header-actions-wrapper">
                  {outputTab === "preview" && (
                    <button
                      onClick={() => setIsLandscape(!isLandscape)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border shrink-0 ${
                        isLandscape
                          ? "bg-[#1428a0] text-white border-[#1428a0] shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                      id="content-section-rotate-btn"
                      title={`Görünümü Döndür (${isLandscape ? "Yatay / Landscape" : "Dikey / Portrait"})`}
                    >
                      <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isLandscape ? "rotate-90" : "rotate-0"}`} />
                      <span>Döndür ({isLandscape ? "Yatay" : "Dikey"})</span>
                    </button>
                  )}
                  
                  <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl" id="output-tab-toggles">
                    <button
                      onClick={() => setOutputTab("text")}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        outputTab === "text"
                          ? "bg-white text-[#1428a0] shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                      id="tab-btn-text"
                    >
                      📝 Metin İçeriği
                    </button>
                    <button
                      onClick={() => setOutputTab("preview")}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                        outputTab === "preview"
                          ? "bg-white text-[#1428a0] shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                      id="tab-btn-preview"
                    >
                      👁️ Görsel Önizleme
                      <span className="bg-[#1428a0]/15 text-[#1428a0] text-[9px] px-1.5 rounded-full font-black">CANLI</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Error notifications or system status inside outputs */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700" id="error-box">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold">İşlem Başarısız</h4>
                  <p className="text-xs mt-1 leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait" id="content-presence">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                  id="generating-spinner"
                >
                  <div className="w-10 h-10 rounded-full border-4 border-slate-100 border-t-[#1428a0] animate-spin mb-4"></div>
                  <h4 className="text-sm font-semibold text-slate-700">Kampanya Kurgulanıyor...</h4>
                  <p className="text-xs text-slate-400 mt-1">Lütfen bekleyin, yapay zeka en uygun pazarlama mesajını üretiyor.</p>
                </motion.div>
              ) : generatedContent ? (
                <motion.div
                  key={outputTab === "text" ? "text-output" : "preview-output"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                  id="output-tab-content-wrapper"
                >
                  {outputTab === "text" ? (
                    <div className="space-y-4" id="raw-text-view-container">
                      {/* Real mode vs Mock mode flags */}
                      {generationMode === "mock" && (
                        <div className="bg-amber-50/80 border border-amber-200/50 rounded-xl p-3 flex items-start gap-2.5 text-amber-800 text-xs" id="mock-info">
                          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div id="mock-info-text">
                            <strong>Simülasyon Aktif:</strong> API anahtarı tanımlanmadığı için akıllı simülatör şablonları yüklendi. Secrets panelinden <code>GEMINI_API_KEY</code> değerini girerek canlı modu aktifleştirebilirsiniz.
                          </div>
                        </div>
                      )}

                      {generationMode === "real" && (
                        <div className="bg-emerald-50/80 border border-emerald-200/50 rounded-xl p-3 flex items-start gap-2.5 text-emerald-800 text-xs" id="real-info">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div id="real-info-text">
                            <strong>Canlı Yapay Zeka:</strong> İçerik, Gemini 1.5/3.5 modeli ile tamamen dinamik ve özgün olarak oluşturuldu.
                          </div>
                        </div>
                      )}

                      {/* Main Display Body */}
                      <div 
                        className="text-lg leading-relaxed text-slate-700 italic font-serif whitespace-pre-line py-2 max-h-[380px] overflow-y-auto" 
                        id="copywrite-output-text"
                      >
                        {generatedContent}
                      </div>
                    </div>
                  ) : (
                    <FormatPreview
                      format={outputFormat}
                      content={generatedContent}
                      productName={productName}
                      targetAudience={targetAudience}
                      emailSubject={emailSubject}
                      emailSender={emailSender}
                      emailSignature={emailSignature}
                      isLandscapeProp={isLandscape}
                      setIsLandscapeProp={setIsLandscape}
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center text-slate-400"
                  id="blank-state"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 mb-3" id="blank-icon-wrapper">
                    <Sparkles className="w-6 h-6 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700" id="blank-title">Pazarlama Kampanyası Başlatın</h4>
                  <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed" id="blank-desc">
                    Sol taraftaki kontrol panelinden ürün ve hedef kitle bilgilerinizi seçip <strong>"Pazarlama Metni Üret"</strong> butonuna basın.
                  </p>

                  {/* Suggestion Chips */}
                  <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-md" id="suggestion-chips">
                    <button 
                      onClick={() => {
                        setProductName("Samsung Galaxy S26 Ultra");
                        setTargetAudience("Teknoloji Meraklıları");
                        setOutputFormat("Reklam Metni");
                        setSelectedStrategy("Chain of Thought");
                      }}
                      className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition-all border border-slate-200 cursor-pointer font-medium"
                      id="chip-s26"
                    >
                      S26 Ultra Reklamı Oluştur ⚡
                    </button>
                    <button 
                      onClick={() => {
                        setProductName("Premium Akıllı Saat");
                        setTargetAudience("Premium Kullanıcılar");
                        setOutputFormat("E-mail");
                        setSelectedStrategy("Few-shot");
                      }}
                      className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition-all border border-slate-200 cursor-pointer font-medium"
                      id="chip-buds"
                    >
                      Saat Tanıtım E-postası Tasarla ✉️
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action trigger absolute/bottom bars */}
          {generatedContent && (
            <div className="flex flex-col sm:flex-row justify-end items-center gap-3 border-t border-slate-100 pt-6 mt-6" id="action-buttons-container">
              <button 
                onClick={handleCopyToClipboard}
                className="w-full sm:w-auto bg-[#f4f7f9] hover:bg-slate-100 text-slate-700 p-3 rounded-xl border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="copy-action-btn"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Metni Kopyala</span>
                  </>
                )}
              </button>
              
              <button 
                onClick={handleDownload}
                className="w-full sm:w-auto bg-slate-900 text-white p-3 px-6 rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/10"
                id="download-action-btn"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Dosyayı İndir (.txt)</span>
              </button>

              <button 
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto bg-[#1428a0] text-white p-3 px-6 rounded-xl text-xs font-bold hover:bg-[#102080] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/10"
                id="download-pdf-action-btn"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF Raporu İndir</span>
              </button>
            </div>
          )}
        </section>

        {/* Quick Educational Info Box */}
        <section className="bg-white rounded-3xl p-6 border border-[#e2e8f0] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6" id="educational-panel">
          <div className="space-y-1.5" id="edu-card-left">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#0076cc]" />
              Samsung Innovation Campus Nedir?
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Gençlerin dijital becerilerini geliştirerek onları geleceğin teknoloji liderleri olmaya hazırlayan kapsamlı bir eğitim programıdır. PersonaCraft AI, bu vizyonla üretken yapay zeka entegrasyonu sunar.
            </p>
          </div>
          <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6" id="edu-card-right">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#1428a0]" />
              Canlı Mod Nasıl Kurulur?
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI Studio Secrets panelinden <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[11px] font-semibold text-slate-700">GEMINI_API_KEY</code> anahtarınızı ekleyerek, yapay zekanın gerçek gücünü dilediğiniz zaman aktive edebilirsiniz.
            </p>
          </div>
        </section>

        {/* Workspace Footer */}
        <footer className="mt-auto pt-4" id="workspace-footer">
          <p className="text-[10px] text-center text-slate-400 font-semibold tracking-wide uppercase">
            PersonaCraft AI — Advanced Campaign Generation Platform — Proprietary Framework 2026
          </p>
        </footer>

      </main>

    </div>
  );
}
