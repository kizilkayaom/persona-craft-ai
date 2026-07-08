import React, { useState, useEffect } from "react";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Smartphone, 
  Tablet,
  Monitor,
  Mail, 
  Globe, 
  Search, 
  ShoppingBag, 
  Star, 
  ArrowLeft, 
  User, 
  Sparkles,
  Check,
  Eye,
  Copy,
  FolderOpen,
  Trash2,
  Archive,
  AlertOctagon,
  Paperclip,
  Share2,
  Flame,
  ThumbsUp,
  Cpu,
  Layers,
  HelpCircle,
  BookmarkCheck,
  Palette,
  RotateCw,
  Wifi,
  Battery,
  Signal
} from "lucide-react";

interface FormatPreviewProps {
  format: string;
  content: string;
  productName: string;
  targetAudience: string;
  emailSubject: string;
  emailSender: string;
  emailSignature: string;
  isLandscapeProp?: boolean;
  setIsLandscapeProp?: (val: boolean) => void;
}

export default function FormatPreview({
  format,
  content,
  productName,
  targetAudience,
  emailSubject,
  emailSender,
  emailSignature,
  isLandscapeProp,
  setIsLandscapeProp
}: FormatPreviewProps) {
  // Common states
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("mobile");
  
  const [isLandscapeInternal, setIsLandscapeInternal] = useState(false);
  const isLandscape = isLandscapeProp !== undefined ? isLandscapeProp : isLandscapeInternal;
  const setIsLandscape = setIsLandscapeProp !== undefined ? setIsLandscapeProp : setIsLandscapeInternal;

  // Instagram states
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [igTheme, setIgTheme] = useState<"light" | "dark">("light");
  const [igImageStyle, setIgImageStyle] = useState<"neon" | "minimal" | "blueprint" | "editorial">("neon");
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [customComments, setCustomComments] = useState<string[]>([]);
  const [newCommentInput, setNewCommentInput] = useState("");

  // Email states
  const [emailIsStarred, setEmailIsStarred] = useState(false);
  const [emailIsImportant, setEmailIsImportant] = useState(true);
  const [emailTheme, setEmailTheme] = useState<"light" | "dark">("light");

  // Website states
  const [selectedColor, setSelectedColor] = useState<"navy" | "pearl" | "charcoal">("navy");
  const [cartCount, setCartCount] = useState(0);
  const [activeWebTab, setActiveWebTab] = useState<"detaylar" | "ozellikler" | "teslimat">("detaylar");
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Clean custom comments when target audience changes
  useEffect(() => {
    setCustomComments([]);
  }, [targetAudience]);

  // Helper to copy text inside the preview frame
  const handleCopyPreviewText = () => {
    navigator.clipboard.writeText(content);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // Double tap to like on Instagram
  const handleIgDoubleTap = () => {
    if (!isLiked) {
      setIsLiked(true);
    }
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 800);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentInput.trim()) {
      setCustomComments([...customComments, newCommentInput.trim()]);
      setNewCommentInput("");
    }
  };

  if (!content) return null;

  // Get audience-specific mock comments for high-fidelity social feel
  const getAudienceComments = () => {
    const commentsMap: Record<string, string[]> = {
      "Gençler": [
        "Fiyat/performans oranı inanılmaz duruyor! Hemen sipariş verdim 🚀🔥",
        "Renk seçenekleri çok tatlı, tasarımı efsane olmuş bence 😍"
      ],
      "Aileler": [
        "Çocukların güvenli kullanımı için uygun mu acaba? Detay alabilir miyim?",
        "Evde hayatımızı gerçekten kolaylaştıracak harika bir ürün, tavsiye ederim 👍"
      ],
      "Kurumsal": [
        "Şirket içi operasyonel verimliliğimizi artırmak amacıyla toplu sipariş için görüşeceğiz.",
        "Son derece prestijli ve iş dünyasının standartlarına çok yakışan bir tasarım."
      ],
      "Teknoloji Meraklıları": [
        "Sonunda beklenen Bluetooth ve aktif gürültü engelleme kodek iyileştirmesi gelmiş! 🎧⚡",
        "Sürücü çapını ve frekans tepki aralığını detaylı inceleyen var mı acaba?"
      ],
      "Öğrenciler": [
        "Öğrenci indirim kodları aktif mi acaba? Kampanyayı kaçırmak istemiyorum 🎓🎒",
        "Kütüphanede çalışırken odaklanmak için tam aradığım sessizlik ve ergonomi!"
      ],
      "Premium Kullanıcılar": [
        "Kalite her detayında kendini hissettiriyor. Kusursuz bir deneyim asaletle buluşmuş ✨",
        "Tasarım dili son derece rafine ve seçkin. Koleksiyonuma ekledim."
      ]
    };

    return commentsMap[targetAudience] || ["Harika bir kampanya, çok beğendim! 🔥", "Merakla bekliyorduk, nihayet satışta! 👏"];
  };

  // Render individual formats
  const renderInstagramPost = () => {
    // Highlight hashtags and mentions in stylish colors
    const formattedText = content.split(" ").map((word, i) => {
      if (word.startsWith("#")) {
        return <span key={i} className={`font-semibold hover:underline cursor-pointer ${igTheme === 'light' ? 'text-[#00376b]' : 'text-sky-400'}`}>{word} </span>;
      }
      if (word.startsWith("@")) {
        return <span key={i} className={`font-semibold hover:underline cursor-pointer ${igTheme === 'light' ? 'text-[#00376b]' : 'text-sky-400'}`}>{word} </span>;
      }
      return word + " ";
    });

    const senderHandle = emailSender.toLowerCase().replace(/\s+/g, "") || "samsungturkiye";
    const commentsList = [...getAudienceComments(), ...customComments];

    // Image presets based on style selector
    const getImageStyleClasses = () => {
      switch (igImageStyle) {
        case "neon":
          return "bg-gradient-to-br from-[#1428a0] via-[#7000ff] to-[#ff007f] text-white";
        case "minimal":
          return "bg-gradient-to-tr from-[#faf5f0] via-[#f5ebe0] to-[#e3d5ca] text-slate-900 border-b border-slate-100";
        case "blueprint":
          return "bg-[#0a1128] text-cyan-400 border-2 border-cyan-500/20 font-mono";
        case "editorial":
          return "bg-gradient-to-b from-[#1c1c1e] to-[#0a0a0a] text-[#d4af37] border-b border-yellow-600/10";
      }
    };

    return (
      <div 
        className={`w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-xl border transition-colors duration-300 ${
          igTheme === "light" 
            ? "bg-white border-slate-200 text-slate-800" 
            : "bg-[#121212] border-zinc-800 text-zinc-100"
        }`} 
        id="preview-instagram-card"
      >
        {/* Mockup Control Panels for high interaction */}
        <div className={`px-4 py-2.5 flex items-center justify-between border-b text-[10px] font-bold ${
          igTheme === 'light' ? 'bg-slate-50 border-slate-100 text-slate-500' : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
        }`} id="ig-customization-toolbar">
          <div className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[#1428a0]" />
            <span>Tema & Stil:</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setIgTheme(igTheme === "light" ? "dark" : "light")}
              className={`px-2 py-0.5 rounded transition-all border ${
                igTheme === "dark" 
                  ? "bg-zinc-800 border-zinc-700 text-yellow-400" 
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              {igTheme === "light" ? "🌙 Koyu" : "☀️ Aydınlık"}
            </button>
            <span className="text-slate-300">|</span>
            {/* Preset Toggles */}
            <div className="flex gap-1">
              {(["neon", "minimal", "blueprint", "editorial"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setIgImageStyle(style)}
                  className={`px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider transition-all border ${
                    igImageStyle === style
                      ? "bg-[#1428a0] text-white border-[#1428a0]"
                      : igTheme === 'light' ? "bg-white border-slate-200 text-slate-500 hover:bg-slate-100" : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* IG Header */}
        <div className={`flex items-center justify-between p-3.5 border-b ${
          igTheme === 'light' ? 'border-slate-100' : 'border-zinc-800/80'
        }`} id="ig-header">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[2.2px] shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-[2px]">
                <div className="w-full h-full rounded-full bg-[#1428a0] flex items-center justify-center text-white text-[9px] font-black">
                  PC
                </div>
              </div>
            </div>
            <div>
              <div className="text-[12.5px] font-bold leading-tight flex items-center gap-1">
                <span className={igTheme === 'light' ? 'text-slate-900' : 'text-zinc-50'}>
                  {emailSender || "Samsung Türkiye"}
                </span>
                <span className="w-3.5 h-3.5 bg-[#0095f6] rounded-full flex items-center justify-center text-white text-[8px] font-bold" title="Doğrulanmış Hesap">✓</span>
              </div>
              <p className={`text-[9.5px] leading-none mt-0.5 flex items-center gap-1 ${igTheme === 'light' ? 'text-slate-400' : 'text-zinc-500'}`}>
                <span>İstanbul, Türkiye</span>
                <span>•</span>
                <span className="font-semibold text-emerald-500 uppercase text-[8px]">Sponsorlu</span>
              </p>
            </div>
          </div>
          <button className={`hover:scale-105 transition-all p-1.5 rounded-full ${igTheme === 'light' ? 'text-slate-500 hover:bg-slate-50' : 'text-zinc-400 hover:bg-zinc-900'}`} id="ig-more-btn">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* IG Media Area - Beautiful interactive product frame */}
        <div 
          onDoubleClick={handleIgDoubleTap}
          className={`aspect-square w-full flex flex-col justify-between p-6 relative overflow-hidden cursor-pointer select-none transition-all duration-500 ${getImageStyleClasses()}`} 
          id="ig-media"
        >
          {/* Style overlays for visual flair */}
          {igImageStyle === "neon" && (
            <>
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5 border border-white/10"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-cyan-400/10 blur-2xl"></div>
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            </>
          )}

          {igImageStyle === "blueprint" && (
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,163,224,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,163,224,0.05)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          )}

          {igImageStyle === "minimal" && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 to-orange-100"></div>
          )}

          {/* Double click heart pop */}
          {showHeartBurst && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/15 backdrop-blur-[1px] animate-fade-in">
              <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl animate-ping" style={{ animationDuration: '0.8s' }} />
            </div>
          )}

          <div className="flex justify-between items-start z-10">
            <span className={`backdrop-blur-md text-[9px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm border ${
              igImageStyle === 'minimal' 
                ? 'bg-slate-800 text-white border-slate-700' 
                : 'bg-white/10 text-white border-white/10'
            }`}>
              {igImageStyle === 'blueprint' ? "⚡ BLUEPRINT v1.4" : "✨ YENİ KAMPANYA"}
            </span>
            <div className="flex gap-1.5">
              <span className="bg-black/40 backdrop-blur-md text-white text-[8px] font-bold px-2 py-1 rounded-md">
                1 / 2
              </span>
            </div>
          </div>

          <div className="text-center my-auto px-4 z-10 space-y-3">
            <h4 className={`font-black text-2.5xl tracking-tight leading-snug drop-shadow-sm uppercase ${
              igImageStyle === 'blueprint' ? 'font-mono text-cyan-300' : 'font-display'
            }`}>
              {productName || "Samsung Galaxy Buds"}
            </h4>
            <div className={`w-14 h-1 mx-auto rounded-full ${
              igImageStyle === 'minimal' ? 'bg-slate-800' : igImageStyle === 'blueprint' ? 'bg-cyan-400' : 'bg-cyan-300'
            }`}></div>
            <p className={`text-xs font-bold uppercase tracking-widest ${
              igImageStyle === 'minimal' ? 'text-slate-500' : igImageStyle === 'blueprint' ? 'text-cyan-200/70 font-mono' : 'text-cyan-100'
            }`}>
              {targetAudience} İçin Özel Deneyim
            </p>
          </div>

          <div className="flex justify-between items-end z-10" id="ig-media-footer">
            <div className="flex flex-col items-start">
              <span className={`text-[8.5px] font-bold tracking-wide uppercase ${
                igImageStyle === 'minimal' ? 'text-slate-400' : 'text-white/70'
              }`}>PersonaCraft AI</span>
              <div className="flex gap-1 mt-1">
                <span className={`w-1.5 h-1.5 rounded-full ${igImageStyle === 'minimal' ? 'bg-slate-800' : 'bg-white'}`}></span>
                <span className={`w-1.5 h-1.5 rounded-full opacity-50 ${igImageStyle === 'minimal' ? 'bg-slate-800' : 'bg-white'}`}></span>
              </div>
            </div>
            
            <div className={`px-3.5 py-1.5 text-[10px] font-bold rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5 ${
              igImageStyle === 'minimal'
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : igImageStyle === 'blueprint'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/20'
                  : 'bg-white text-[#1428a0] hover:bg-slate-50'
            }`}>
              <span>Şimdi Keşfet</span>
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* IG Actions Bar */}
        <div className={`flex items-center justify-between px-3.5 py-3 ${igTheme === 'light' ? 'bg-white' : 'bg-[#121212]'}`} id="ig-actions-bar">
          <div className="flex items-center gap-4.5">
            <button 
              onClick={() => setIsLiked(!isLiked)} 
              className="hover:scale-120 active:scale-90 transition-all cursor-pointer text-current"
              id="ig-like-action"
            >
              <Heart className={`w-6.5 h-6.5 ${isLiked ? "fill-red-500 stroke-red-500 text-red-500" : ""}`} />
            </button>
            <button className="hover:scale-120 active:scale-90 transition-all text-current" id="ig-comment-action">
              <MessageCircle className="w-6.5 h-6.5" />
            </button>
            <button className="hover:scale-120 active:scale-90 transition-all text-current" id="ig-share-action">
              <Send className="w-6 h-6 -rotate-12" />
            </button>
          </div>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)} 
            className="hover:scale-120 active:scale-90 transition-all cursor-pointer text-current"
            id="ig-save-action"
          >
            <Bookmark className={`w-6.5 h-6.5 ${isBookmarked ? "fill-current text-[#1428a0]" : ""}`} />
          </button>
        </div>

        {/* IG Likes block */}
        <div className="px-4 text-[12px] font-bold tracking-tight" id="ig-likes-count">
          {isLiked ? "1.250" : "1.249"} beğeni
        </div>

        {/* IG Caption & Comments */}
        <div className="px-4 pt-1.5 pb-4 space-y-3 text-[12px]" id="ig-caption-block">
          <p className="leading-relaxed">
            <span className="font-extrabold mr-2">{senderHandle}</span>
            {formattedText}
          </p>

          {/* Interactive Comments Drawer */}
          <div className={`pt-2 border-t space-y-2 ${igTheme === 'light' ? 'border-slate-100' : 'border-zinc-800'}`} id="ig-comments-drawer">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Yorumlar ({commentsList.length})</p>
            <div className="space-y-2.5 max-h-[110px] overflow-y-auto pr-1">
              {commentsList.map((comment, index) => {
                const mockUsernames = ["mert_kaya", "ayse_guler", "bora_tech", "zeynep.derin", "can_uzun", "melis.tas"];
                const commentUser = mockUsernames[(index + targetAudience.length) % mockUsernames.length];
                return (
                  <div key={index} className="flex items-start gap-1.5 leading-snug">
                    <span className="font-bold text-slate-900 dark:text-zinc-100 shrink-0">@{commentUser}</span>
                    <span className="text-slate-600 dark:text-zinc-300">{comment}</span>
                  </div>
                );
              })}
            </div>

            {/* Form to submit inline comments */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-1">
              <input 
                type="text" 
                placeholder="Yorum ekle..."
                value={newCommentInput}
                onChange={(e) => setNewCommentInput(e.target.value)}
                className={`flex-1 text-[11px] px-2.5 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#1428a0]/40 ${
                  igTheme === 'light' 
                    ? 'bg-slate-50 border-slate-200 text-slate-800' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500'
                }`}
              />
              <button 
                type="submit"
                className="bg-[#1428a0] text-white font-bold text-[10px] px-2.5 py-1 rounded-lg hover:bg-blue-800 transition-all cursor-pointer shrink-0"
              >
                Gönder
              </button>
            </form>
          </div>

          <p className="text-[9.5px] text-slate-400 font-semibold uppercase tracking-wider pt-1">
            HAZİRAN 2026 • SPONSORLU SİMÜLASYON
          </p>
        </div>
      </div>
    );
  };

  const renderEmail = () => {
    const fromName = emailSender || "Samsung Türkiye";
    const subject = emailSubject || "Aradığınız O Eşsiz Deneyim Burada...";
    const signature = emailSignature || "Saygılarımızla, PersonaCraft Ekibi";

    // Clean internal Subject metadata from body if displayed
    let emailBody = content;
    if (emailBody.includes("📬 GÖNDERİCİ:")) {
      const parts = emailBody.split("--------------------------------------------");
      if (parts.length > 1) {
        emailBody = parts[1].split("---")[0].trim();
      }
    } else if (emailBody.startsWith("Konu:")) {
      const lines = emailBody.split("\n\n");
      if (lines.length > 1) {
        emailBody = lines.slice(1).join("\n\n");
      }
    }

    return (
      <div 
        className={`w-full bg-white border rounded-2xl overflow-hidden shadow-lg font-sans transition-colors duration-300 ${
          emailTheme === "light" 
            ? "border-slate-200 text-slate-800" 
            : "bg-[#18181b] border-zinc-800 text-zinc-100"
        }`} 
        id="preview-email-card"
      >
        {/* Email Client Top Bar */}
        <div className={`px-4 py-2 flex items-center justify-between border-b text-xs ${
          emailTheme === 'light' ? 'bg-slate-50 border-slate-200/80 text-slate-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
        }`} id="email-toolbar-controls">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
          </div>

          {/* Stars & Trash Interactions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setEmailIsStarred(!emailIsStarred)}
              className={`hover:scale-110 transition-all ${emailIsStarred ? 'text-amber-500' : 'text-slate-400'}`}
              title="Yıldızla"
            >
              <Star className={`w-4 h-4 ${emailIsStarred ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => setEmailIsImportant(!emailIsImportant)}
              className={`hover:scale-110 transition-all ${emailIsImportant ? 'text-blue-600' : 'text-slate-400'}`}
              title="Önemli İşaretle"
            >
              <BookmarkCheck className={`w-4 h-4 ${emailIsImportant ? 'fill-current' : ''}`} />
            </button>
            <span className="text-slate-300">|</span>
            <button 
              onClick={() => setEmailTheme(emailTheme === "light" ? "dark" : "light")}
              className="font-bold text-[10px] bg-white dark:bg-zinc-800 border rounded px-1.5 py-0.5 text-slate-600 dark:text-zinc-300 hover:bg-slate-100"
            >
              {emailTheme === "light" ? "🌙 Gece Modu" : "☀️ Gündüz Modu"}
            </button>
          </div>
        </div>

        {/* Email Header Info */}
        <div className={`p-4 border-b space-y-2.5 text-xs ${
          emailTheme === 'light' ? 'bg-[#fbfcfd] border-slate-100 text-slate-600' : 'bg-[#1e1e21] border-zinc-800/80 text-zinc-400'
        }`} id="email-meta-info">
          <div className="flex items-center justify-between" id="email-row-from">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-500 w-14 shrink-0">Kimden:</span>
              <span className={`font-bold px-2 py-0.5 rounded-md text-[11px] ${
                emailTheme === 'light' ? 'bg-blue-50 text-[#1428a0]' : 'bg-blue-900/40 text-sky-400'
              }`}>
                {fromName}
              </span>
              <span className="font-mono text-[10px] opacity-70">&lt;bulten@{fromName.toLowerCase().replace(/\s+/g, "") || "samsung"}.com&gt;</span>
            </div>
            <span className="text-[10px] opacity-60">12:04 (Şimdi)</span>
          </div>

          <div className="flex items-center gap-2" id="email-row-to">
            <span className="font-bold text-slate-500 w-14 shrink-0">Kime:</span>
            <span className="font-medium">degerli.musterimiz@mail.com</span>
            <span className="opacity-40">|</span>
            <span className="text-[10px] opacity-80 bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">Gelen Kutusu 📥</span>
          </div>

          <div className="flex items-start gap-2 pt-1 border-t border-slate-100/50 dark:border-zinc-800/50" id="email-row-subject">
            <span className="font-bold text-slate-500 w-14 shrink-0 mt-0.5">Konu:</span>
            <span className={`font-extrabold text-[13px] tracking-tight ${
              emailTheme === 'light' ? 'text-slate-900' : 'text-zinc-100'
            }`}>
              {subject}
            </span>
          </div>
        </div>

        {/* Email Body Wrap */}
        <div className={`p-6 md:p-8 space-y-6 text-sm leading-relaxed max-h-[360px] overflow-y-auto ${
          emailTheme === 'light' ? 'bg-white' : 'bg-[#18181b]'
        }`} id="email-body-area">
          {/* Corporate logo banner */}
          <div className="border-b border-slate-100 dark:border-zinc-800 pb-4 text-center animate-pulse" id="email-branding-banner">
            <h1 className="text-lg font-black text-[#1428a0] dark:text-sky-400 tracking-widest font-display uppercase">
              {fromName} bülten
            </h1>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Yapay Zekayla Kişiselleştirilmiş İletişim</p>
          </div>

          {/* Email Main Message */}
          <div className={`whitespace-pre-line font-serif text-[13.5px] leading-relaxed py-2 ${
            emailTheme === 'light' ? 'text-slate-800' : 'text-zinc-200'
          }`} id="email-rendered-main-content">
            {emailBody}
          </div>

          {/* Email Attachment Block */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
            emailTheme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
          }`} id="email-attachment-box">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-950/40 rounded-lg text-red-600 dark:text-red-400 shrink-0">
                <Paperclip className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs block truncate max-w-[160px] md:max-w-xs">{productName || "Urun"}_Katalog_Detaylari.pdf</span>
                <span className="text-[10px] text-slate-400 block">PDF Dosyası • 1.4 MB</span>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => alert("Simüle edilmiş katalog indirildi! 📂")}
              className="text-[10px] font-bold text-[#1428a0] dark:text-sky-400 hover:underline px-2.5 py-1.5 bg-white dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700 cursor-pointer"
            >
              İndir 📥
            </button>
          </div>

          {/* Email Footer / Signature block */}
          <div className="border-t border-slate-100 dark:border-zinc-800 pt-5 mt-6 text-xs text-slate-500" id="email-signature-rendered">
            <div className="font-bold text-slate-800 dark:text-zinc-200">{signature}</div>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug">
              Bu e-posta PersonaCraft AI sistemi tarafından sizin için özel olarak simüle edilmiştir.<br />
              © 2026 {fromName}. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderSms = () => {
    return (
      <div className="w-full max-w-[290px] mx-auto bg-black rounded-[42px] p-2.5 shadow-2xl border-4 border-slate-800 relative font-sans" id="preview-sms-card">
        {/* Phone Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-b-xl z-20 flex items-center justify-center">
          <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
        </div>

        <div className="w-full h-[480px] bg-[#f2f2f7] rounded-[34px] overflow-hidden relative flex flex-col justify-between" id="sms-screen-body">
          {/* Phone StatusBar */}
          <div className="bg-white/80 backdrop-blur-md px-5 pt-4 pb-2 flex justify-between items-center text-[10px] font-bold text-slate-900 z-10" id="sms-statusbar">
            <span>12:04</span>
            <div className="flex items-center gap-1">
              <span>LTE</span>
              <Smartphone className="w-3.5 h-3.5 rotate-90 inline" />
              <span className="w-4.5 h-2.5 border border-slate-900 rounded-sm p-[1px] flex items-center"><span className="h-full w-4/5 bg-slate-900 rounded-2xs block"></span></span>
            </div>
          </div>

          {/* Messages Header */}
          <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-slate-200/50 flex items-center justify-between" id="sms-header">
            <button className="text-[#007aff] text-xs flex items-center gap-0.5 font-bold" id="sms-back-btn">
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Geri</span>
            </button>
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#1428a0] text-white text-[9px] font-bold flex items-center justify-center shadow">
                S
              </div>
              <span className="text-[10px] font-black text-slate-800 mt-1 uppercase tracking-wider">SAMSUNG</span>
            </div>
            <span className="text-[#007aff] text-xs font-bold cursor-pointer hover:underline">Bilgi</span>
          </div>

          {/* SMS Body Container */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-end space-y-3" id="sms-messages-list">
            <div className="text-center my-1">
              <span className="text-[9px] bg-slate-200 text-slate-500 px-3 py-0.5 rounded-full font-bold uppercase tracking-widest">
                Bugün 12:04
              </span>
            </div>

            {/* Bubble */}
            <div className="flex items-end gap-1.5 max-w-[85%] self-start" id="sms-incoming-bubble">
              <div className="bg-white text-slate-800 text-[11.5px] px-3.5 py-2.5 rounded-2xl rounded-bl-xs border border-slate-200 shadow-sm leading-relaxed whitespace-pre-line font-sans">
                {content}
              </div>
            </div>
            <span className="text-[8.5px] text-slate-400 font-semibold ml-2 flex items-center gap-1">
              <span>İletildi</span>
              <Check className="w-3 h-3 text-emerald-500 inline" />
            </span>
          </div>

          {/* SMS Input footer bar */}
          <div className="bg-white/95 backdrop-blur-md p-3 border-t border-slate-200/80 flex items-center gap-2" id="sms-footer">
            <div className="flex-1 bg-[#f2f2f7] border border-slate-200 rounded-full py-1.5 px-3.5 text-xs text-slate-400 font-medium">
              Metin Mesajı
            </div>
            <button className="w-7 h-7 rounded-full bg-[#34c759] text-white flex items-center justify-center font-bold text-sm hover:scale-105 active:scale-95 transition-all" id="sms-send-arrow">
              ↑
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderWebsite = () => {
    // Generate color display styles
    const colorsMap = {
      navy: "bg-[#1428a0]",
      pearl: "bg-slate-50 border border-slate-300",
      charcoal: "bg-slate-800"
    };

    return (
      <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl font-sans" id="preview-website-card">
        {/* Browser Top */}
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200/60 flex items-center justify-between" id="web-window-header">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-lg py-1 px-3 text-[11px] text-slate-400 flex items-center gap-2 max-w-[200px] md:max-w-xs shadow-inner">
              <Globe className="w-3 h-3 text-slate-400" />
              <span className="truncate font-mono">https://www.samsung.com/tr/wearables</span>
            </div>
          </div>

          {/* Interactive Web Cart Counter */}
          <div className="flex items-center gap-3" id="web-cart-counter">
            <div className="relative p-1">
              <ShoppingBag className="w-5 h-5 text-[#1428a0]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* E-commerce Page Simulation */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start" id="web-layout-body">
          {/* Left Column: Product Photo Frame with Color updates */}
          <div className="md:col-span-5 space-y-4" id="web-product-photo-col">
            <div className={`aspect-square w-full rounded-2xl flex flex-col justify-between p-4 shadow-sm relative overflow-hidden transition-all duration-500 ${
              selectedColor === "navy" 
                ? "bg-gradient-to-tr from-[#1428a0] via-[#00529b] to-[#0d1d78]" 
                : selectedColor === "pearl"
                  ? "bg-gradient-to-tr from-slate-100 via-white to-slate-200 border border-slate-200"
                  : "bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-900"
            }`}>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase self-start z-10 shadow ${
                selectedColor === 'pearl' ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'
              }`}>
                Lansman Özel
              </span>
              <div className="m-auto text-center z-10">
                <ShoppingBag className={`w-14 h-14 mx-auto animate-bounce ${
                  selectedColor === 'pearl' ? 'text-slate-700' : 'text-cyan-200'
                }`} />
                <span className={`text-[10px] font-bold block mt-2 uppercase tracking-widest ${
                  selectedColor === 'pearl' ? 'text-slate-800' : 'text-white'
                }`}>{productName || "Buds Pro"}</span>
              </div>
              <span className={`text-[8px] text-right font-mono z-10 ${
                selectedColor === 'pearl' ? 'text-slate-400' : 'text-white/50'
              }`}>MODEL PRE-26: {selectedColor.toUpperCase()}</span>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
            </div>

            {/* Color Selectors */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Renk Seçeneği:</span>
              <div className="flex gap-2" id="web-thumbnails">
                <button
                  onClick={() => setSelectedColor("navy")}
                  className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center p-1 cursor-pointer transition-all ${
                    selectedColor === "navy" ? "border-[#1428a0] scale-105 shadow-sm" : "border-transparent"
                  }`}
                  title="Lacivert"
                >
                  <span className="w-full h-full rounded-lg bg-[#1428a0] block"></span>
                </button>
                <button
                  onClick={() => setSelectedColor("pearl")}
                  className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center p-1 cursor-pointer transition-all ${
                    selectedColor === "pearl" ? "border-slate-800 scale-105 shadow-sm" : "border-transparent"
                  }`}
                  title="İnci Beyazı"
                >
                  <span className="w-full h-full rounded-lg bg-white border border-slate-200 block"></span>
                </button>
                <button
                  onClick={() => setSelectedColor("charcoal")}
                  className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center p-1 cursor-pointer transition-all ${
                    selectedColor === "charcoal" ? "border-slate-800 scale-105 shadow-sm" : "border-transparent"
                  }`}
                  title="Kömür Siyahı"
                >
                  <span className="w-full h-full rounded-lg bg-slate-800 block"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: E-commerce purchase panel */}
          <div className="md:col-span-7 space-y-4" id="web-product-info-col">
            <div className="space-y-1" id="web-product-title-row">
              <div className="flex items-center gap-1.5" id="web-ratings">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-[11px] text-slate-400 font-bold">(4.9 Değerlendirme • 142 Yorum)</span>
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-display uppercase">
                {productName || "Samsung Galaxy Buds"}
              </h1>
            </div>

            <div className="py-2.5 border-y border-slate-100 flex items-baseline gap-3" id="web-price-block">
              <span className="text-2xl font-black text-[#1428a0] font-display">4.599 TL</span>
              <span className="text-sm text-slate-400 line-through">5.799 TL</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md">%20 İndirim</span>
            </div>

            {/* Specs Accordion System */}
            <div className="border border-slate-200 rounded-xl overflow-hidden" id="web-tabs-system">
              <div className="flex bg-slate-50 border-b border-slate-200" id="web-tabs-headers">
                {(["detaylar", "ozellikler", "teslimat"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveWebTab(tab)}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeWebTab === tab 
                        ? "bg-white text-[#1428a0] border-t-2 border-[#1428a0]" 
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-4 text-[12.5px] leading-relaxed text-slate-600 bg-white" id="web-tabs-body">
                {activeWebTab === "detaylar" && (
                  <div className="whitespace-pre-line" id="web-rendered-desc-text">
                    {content}
                  </div>
                )}
                {activeWebTab === "ozellikler" && (
                  <ul className="space-y-1.5 font-sans" id="web-specs-list">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> <strong>Gelişmiş Yapay Zeka:</strong> {targetAudience} kurgusuyla optimize.</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> <strong>Ergonomik Tasarım:</strong> Ultra konfor ve hafiflik.</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> <strong>Pil Ömrü:</strong> Tek şarjla saatlerce kesintisiz kullanım.</li>
                  </ul>
                )}
                {activeWebTab === "teslimat" && (
                  <p id="web-delivery-text">
                    🚚 <strong>Ücretsiz Aynı Gün Teslimat:</strong> Saat 16:00'ya kadar tamamlanan siparişleriniz aynı gün kargoya teslim edilmektedir. 2 Yıl Türkiye Garantilidir.
                  </p>
                )}
              </div>
            </div>

            {/* Action purchase triggers */}
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setCartCount(cartCount + 1);
                  setIsAddedToCart(true);
                  setTimeout(() => setIsAddedToCart(false), 1500);
                }}
                className="flex-1 bg-[#1428a0] hover:bg-[#0d1d78] text-white font-bold py-3 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-xs" 
                id="web-add-cart-btn"
              >
                <ShoppingBag className="w-4 h-4 animate-pulse" />
                <span>{isAddedToCart ? "SEPETE EKLENDİ! ✓" : "SİPARİŞ VER / SEPETE EKLE"}</span>
              </button>
              <button
                onClick={() => {
                  setCartCount(0);
                  alert("Sepetiniz başarıyla temizlendi! 🛒");
                }}
                className="px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer text-slate-400 hover:text-red-500"
                title="Sepeti Sıfırla"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSearchAd = () => {
    return (
      <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm p-5 space-y-4 font-sans text-slate-800" id="preview-searchad-card">
        {/* Search header bar */}
        <div className="flex items-center gap-3 bg-slate-100 p-2.5 rounded-xl border border-slate-200/50" id="search-bar-mock">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <div className="text-xs font-bold text-slate-700 truncate flex-1">
            {productName || "Samsung Galaxy Buds"} satın al
          </div>
          <div className="w-5 h-5 rounded-full bg-[#1428a0] flex items-center justify-center text-white text-[8px] font-black">
            PC
          </div>
        </div>

        {/* Google Ad Block */}
        <div className="space-y-2 border-l-4 border-[#1428a0]/40 pl-4 py-1" id="search-ad-result">
          {/* Sponsor Tag */}
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold" id="ad-tag-row">
            <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black text-[9px]">Sponsorlu</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">https://www.samsung.com/tr/{productName.toLowerCase().replace(/\s+/g, "") || "buds"}</span>
          </div>

          {/* Blue Link Header */}
          <h2 className="text-base text-[#1a0dab] font-extrabold hover:underline cursor-pointer leading-snug tracking-tight" id="ad-headline">
            {productName || "Samsung Galaxy Buds"} | Resmi Türkiye Fırsatları
          </h2>

          {/* Actual generated copy */}
          <p className="text-xs text-[#4d5156] leading-relaxed font-sans whitespace-pre-line" id="ad-description">
            {content}
          </p>

          {/* Extension links */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 mt-2" id="ad-sitelinks">
            <div>
              <span className="text-[#1a0dab] font-bold hover:underline cursor-pointer block text-xs">%20 Gençlik Kampanyası</span>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Seçili Buds modellerinde geçerli büyük indirimler.</p>
            </div>
            <div>
              <span className="text-[#1a0dab] font-bold hover:underline cursor-pointer block text-xs">Ücretsiz Aynı Gün Kargo</span>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Saat 16:00'ya kadar olan tüm siparişlerde hemen teslimat.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Switch according to output format
  const getSimulatedView = () => {
    switch (format) {
      case "Instagram Postu":
        return renderInstagramPost();
      case "E-mail":
        return renderEmail();
      case "SMS Kampanyası":
        return renderSms();
      case "Website Açıklaması":
        return renderWebsite();
      case "Reklam Metni":
        return renderSearchAd();
      default:
        return renderInstagramPost();
    }
  };

  return (
    <div className="space-y-4" id="format-preview-wrapper">
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#f8fafc] p-3 rounded-xl border border-slate-100 gap-3" id="preview-mini-header">
        <div className="flex items-center gap-2" id="preview-badge-container">
          <Eye className="w-4 h-4 text-[#1428a0]" />
          <span className="text-xs font-bold text-slate-700">Canlı Format Önizleme Simülatörü</span>
        </div>

        {/* Viewport switcher */}
        <div className="flex bg-slate-200/60 p-1 rounded-xl gap-1 shrink-0" id="viewport-switcher">
          <button
            onClick={() => setViewport("mobile")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              viewport === "mobile"
                ? "bg-white text-[#1428a0] shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            id="viewport-btn-mobile"
            title="Mobil Görünüm (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px]">Mobil</span>
          </button>
          <button
            onClick={() => setViewport("tablet")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              viewport === "tablet"
                ? "bg-white text-[#1428a0] shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            id="viewport-btn-tablet"
            title="Tablet Görünüm (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="text-[11px]">Tablet</span>
          </button>
          <button
            onClick={() => setViewport("desktop")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              viewport === "desktop"
                ? "bg-white text-[#1428a0] shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            id="viewport-btn-desktop"
            title="Masaüstü Görünüm (%100)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="text-[11px]">Masaüstü</span>
          </button>
        </div>

        {/* Rotate Button */}
        <button
          onClick={() => setIsLandscape(!isLandscape)}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border shrink-0 ${
            isLandscape
              ? "bg-[#1428a0] text-white border-[#1428a0] shadow-sm"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
          id="preview-rotate-btn"
          title={`Görünümü Döndür (${isLandscape ? "Yatay / Landscape" : "Dikey / Portrait"})`}
        >
          <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isLandscape ? "rotate-90" : "rotate-0"}`} />
          <span>Döndür ({isLandscape ? "Yatay" : "Dikey"})</span>
        </button>

        <div className="flex items-center gap-2" id="preview-control-buttons">
          <button
            onClick={handleCopyPreviewText}
            className="text-[10px] font-bold bg-white hover:bg-slate-50 text-slate-600 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
            id="preview-copy-btn"
          >
            {copiedNotification ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-600">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Kopyala</span>
              </>
            )}
          </button>
          <span className="text-[10px] bg-[#1428a0]/10 text-[#1428a0] font-bold px-2.5 py-1.5 rounded-lg shrink-0">
            {format}
          </span>
        </div>
      </div>

      {/* Renders the dynamic view based on active viewport setting inside a stylized device frame */}
      <div className="py-4 flex justify-center items-center" id="preview-dynamic-render-area">
        {viewport === "mobile" && (
          <div 
            className={`relative bg-[#0c0d14] border-[12px] border-slate-900 rounded-[44px] shadow-2xl transition-all duration-300 flex flex-col overflow-hidden origin-center ${
              isLandscape 
                ? "w-full max-w-[680px] h-[375px]" 
                : "w-[360px] h-[680px]"
            }`}
            style={{
              transform: isLandscape 
                ? "perspective(1000px) rotateY(360deg) scale(1.02)" 
                : "perspective(1000px) rotateY(0deg) scale(1)",
              transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), max-width 0.5s ease, height 0.5s ease"
            }}
            id="samsung-galaxy-mobile-frame"
          >
            {/* Front Camera Punch-Hole */}
            <div 
              className={`absolute bg-black rounded-full border border-zinc-800/80 z-50 shadow-inner ${
                isLandscape 
                  ? "left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" 
                  : "top-2.5 left-1/2 -translate-x-1/2 w-3 h-3"
              }`}
              id="mobile-punch-hole"
            />

            {/* Mobile Status Bar */}
            <div className="h-8 bg-[#090a10] text-zinc-300/90 text-[10px] font-sans font-medium px-6 flex justify-between items-center select-none z-40 shrink-0 border-b border-zinc-900/30">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#1428a0]">Samsung TR</span>
                <span className="opacity-40">•</span>
                <span>12:45</span>
              </div>
              <div className="flex items-center gap-2">
                <Signal className="w-3 h-3 text-zinc-300" />
                <span className="text-[9px] font-black tracking-tighter text-[#1428a0]">5G</span>
                <Wifi className="w-3 h-3 text-zinc-300" />
                <div className="flex items-center gap-0.5">
                  <Battery className="w-3.5 h-3.5 text-zinc-300" />
                  <span className="text-[9px]">98%</span>
                </div>
              </div>
            </div>

            {/* Mock Mobile Browser/App Header */}
            <div className="bg-zinc-900/95 border-b border-zinc-800 px-4 py-2 flex items-center justify-between gap-2 shrink-0 text-white">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                <span className="text-[10px] font-mono tracking-tight max-w-[140px] truncate">samsung.com/tr/offers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-[#1428a0] text-white font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wide">SECURE SSL</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            </div>

            {/* Inner Content Display Area */}
            <div className="flex-1 bg-slate-50/50 overflow-y-auto overflow-x-hidden p-3 relative scrollbar-thin" id="inner-preview-container-mobile">
              {getSimulatedView()}
            </div>

            {/* Home Pill Indicator */}
            <div className="h-4 bg-[#090a10] flex justify-center items-center shrink-0">
              <div className="w-24 h-1 bg-zinc-700 rounded-full" />
            </div>
          </div>
        )}

        {viewport === "tablet" && (
          <div 
            className={`relative bg-[#0c0d14] border-[14px] border-slate-900 rounded-[32px] shadow-2xl transition-all duration-300 flex flex-col overflow-hidden origin-center ${
              isLandscape 
                ? "w-full max-w-[880px] h-[580px]" 
                : "w-[540px] h-[780px]"
            }`}
            style={{
              transform: isLandscape 
                ? "perspective(1200px) rotateY(360deg) scale(1.01)" 
                : "perspective(1200px) rotateY(0deg) scale(1)",
              transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), max-width 0.5s ease, height 0.5s ease"
            }}
            id="samsung-galaxy-tablet-frame"
          >
            {/* Tablet Camera Punch-Hole */}
            <div 
              className={`absolute bg-black rounded-full border border-zinc-800/85 z-50 shadow-inner ${
                isLandscape 
                  ? "top-3 left-1/2 -translate-x-1/2 w-3 h-3" 
                  : "left-3 top-1/2 -translate-y-1/2 w-3 h-3"
              }`}
              id="tablet-punch-hole"
            />

            {/* Tablet Status Bar */}
            <div className="h-8 bg-[#090a10] text-zinc-300/90 text-[10px] font-sans font-medium px-8 flex justify-between items-center select-none z-40 shrink-0 border-b border-zinc-900/30">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1428a0]">Galaxy Tab S10</span>
                <span className="opacity-40">•</span>
                <span>Alıcı: {targetAudience || "Müşteri"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Signal className="w-3.5 h-3.5 text-zinc-300" />
                <Wifi className="w-3.5 h-3.5 text-zinc-300" />
                <div className="flex items-center gap-1">
                  <Battery className="w-4 h-4 text-zinc-300" />
                  <span className="text-[10px]">95%</span>
                </div>
              </div>
            </div>

            {/* Mock Tablet Browser Header */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-2.5 flex items-center justify-between gap-4 shrink-0 text-white">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                </div>
                <div className="bg-zinc-800/80 rounded-lg px-4 py-1 text-[11px] text-zinc-300 flex items-center gap-2 min-w-[280px]">
                  <Globe className="w-3 h-3 text-[#1428a0]" />
                  <span className="font-mono tracking-tight text-zinc-400">https://www.samsung.com/tr/kampanyalar</span>
                </div>
              </div>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-extrabold px-2.5 py-1 rounded border border-emerald-500/20 uppercase tracking-wider">GÜVENLİ BAĞLANTI</span>
            </div>

            {/* Inner Content Display Area */}
            <div className="flex-1 bg-slate-50/50 overflow-y-auto p-4 relative scrollbar-thin" id="inner-preview-container-tablet">
              {getSimulatedView()}
            </div>

            {/* Home Indicator */}
            <div className="h-3 bg-[#090a10] flex justify-center items-center shrink-0">
              <div className="w-32 h-1 bg-zinc-700 rounded-full" />
            </div>
          </div>
        )}

        {viewport === "desktop" && (
          <div 
            className="w-full relative bg-[#12131a] border-[8px] border-slate-800 rounded-2xl shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
            id="samsung-monitor-desktop-frame"
          >
            {/* Desktop OS Browser Header */}
            <div className="h-10 bg-[#090a10] text-zinc-300 px-4 flex items-center justify-between select-none z-40 shrink-0 border-b border-zinc-900">
              <div className="flex items-center gap-3">
                {/* Windows/Mac style mini dots */}
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/30"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/30"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/30"></div>
                </div>
                {/* Tab */}
                <div className="bg-zinc-900 text-white px-4 py-1.5 rounded-t-lg text-xs font-bold flex items-center gap-2 border-t border-x border-zinc-800">
                  <Globe className="w-3 h-3 text-[#1428a0]" />
                  <span className="max-w-[150px] truncate">Samsung TR Kampanya Editörü</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-[11px] font-sans text-zinc-400">
                <span className="font-bold text-[#1428a0]">Odyssey Neo G9 Simülatörü</span>
                <span className="opacity-30">|</span>
                <span>Görünüm: Masaüstü (%100)</span>
              </div>
            </div>

            {/* Desktop Web Address Bar Row */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center gap-3 shrink-0 text-white">
              <div className="flex gap-2 text-zinc-500">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="opacity-30">|</span>
              </div>
              <div className="flex-1 bg-[#1c1d24] border border-zinc-800/80 rounded-lg px-3 py-1 text-xs text-zinc-300 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-emerald-500 text-[10px] font-bold shrink-0">Secure SSL</span>
                <span className="text-zinc-500 shrink-0">|</span>
                <span className="font-mono tracking-tight text-zinc-400 truncate">https://www.samsung.com/tr/microsite/marketing-ai-builder</span>
              </div>
              <div className="shrink-0 text-zinc-400 text-xs font-mono font-bold pr-1">
                🖥️ 1920 x 1080
              </div>
            </div>

            {/* Inner Content Display Area */}
            <div className="bg-slate-50/50 min-h-[480px] max-h-[600px] overflow-y-auto p-6 relative scrollbar-thin" id="inner-preview-container-desktop">
              {getSimulatedView()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
