import React, { useState } from 'react';
import { Building2, Heart, Calendar, FileText, Camera, ShieldCheck, MapPin, Mail, MessageSquare, Phone, CheckCircle2, ChevronRight, Award, DollarSign, Wallet, Users, Sparkles, Send, Download, FileCheck, Layers, Info, Bell } from 'lucide-react';

export default function PublicWebsite({ t, v2T, showToast, subSection, setSubSection }) {
  const [activeTab, setActiveTab] = useState(subSection || 'home');
  const [donorVerifyId, setDonorVerifyId] = useState('');
  const [verifiedResult, setVerifiedResult] = useState(null);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Active Category Filter for Donation Suite
  const [selectedCatId, setSelectedCatId] = useState('all');

  const handleVerifyReceipt = (e) => {
    e.preventDefault();
    if (!donorVerifyId) return;
    const donor = t.donorWall.donors.find(d => String(d.id) === String(donorVerifyId) || d.name.toLowerCase().includes(donorVerifyId.toLowerCase()));
    if (donor) {
      setVerifiedResult(donor);
      showToast("రశీదు వివరాలు దాతల పట్టికలో నిర్ధారించబడ్డాయి!");
    } else {
      setVerifiedResult({ error: "ఎలాంటి రశీదు కనుగొనబడలేదు. రశీదు నంబర్ లేదా దాత పేరును సరిచూడండి." });
    }
  };

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!feedbackName || !feedbackMsg) return;
    showToast("మీ అభిప్రాయం కమిటీకి పంపబడింది. ధన్యవాదాలు!");
    setFeedbackName('');
    setFeedbackMsg('');
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("జై శ్రీరామ్! పామినివాండ్లవూరు శ్రీ రామాలయ నిర్మాణ సేవా వివరాలకై సంప్రదిస్తున్నాను.");
    window.open("https://wa.me/919866125609?text=" + text, '_blank');
  };

  return (
    <div className="bg-[#090914] text-white min-h-screen sacred-temple-bg-masked">
      
      {/* Sub-Navigation Menu Bar - Left Aligned Layout */}
      <div className="bg-[#1A0306]/95 border-b border-[#FFD700]/40 sticky top-[73px] z-40 backdrop-blur-md overflow-x-auto scrollbar-none py-2.5 px-3 shadow-2xl">
        <div className="flex items-center justify-start gap-2 md:gap-3 whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-[17px] font-extrabold px-2">
          {[
            { id: 'home', label: 'హోమ్ (Home)' },
            { id: 'about', label: 'ఆలయ విశేషాలు (About)' },
            { id: 'construction', label: 'నిర్మాణ పురోగతి (Construction)' },
            { id: 'donations', label: 'ఈ-హుండి & వర్గాలు (Donations)' },
            { id: 'terms', label: '📜 నిబంధనలు (Terms)' },
            { id: 'sevas', label: 'సేవలు & పూజలు (Sevas)' },
            { id: 'events', label: 'ఉత్సవాలు (Events)' },
            { id: 'gallery', label: 'చిత్రావళి (Gallery)' },
            { id: 'news', label: 'వార్తలు (News)' },
            { id: 'reports', label: 'పారదర్శకత (Reports)' },
            { id: 'contact', label: 'సంప్రదించండి (Contact)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); if (setSubSection) setSubSection(tab.id); }}
              className={`px-4 py-2 rounded-full transition-all border shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg scale-105 font-black'
                  : 'bg-white/10 text-gray-200 border-white/20 hover:bg-white/20 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">

        {/* 1. HOME SUB-SECTION */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto py-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-black bg-[#5C121E]/90 text-[#FFD700] border-2 border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.5)] mb-4 animate-bounce">
                <span>🚩 {t.hero.badge}</span>
              </div>

              {/* Fixed Lord Rama Divine Portrait */}
              <div className="flex justify-center my-6">
                <div className="relative group">
                  <div className="absolute -inset-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 rounded-full blur-2xl opacity-85 group-hover:opacity-100 transition duration-1000 animate-pulse" />
                  <img
                    src="/assets/logo.jpg"
                    alt="Lord Rama Portrait"
                    className="relative w-48 h-48 md:w-60 md:h-60 rounded-full border-4 border-[#FFD700] shadow-[0_0_60px_rgba(255,215,0,0.8)] object-cover"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] px-4 py-1 rounded-full text-xs font-black shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 fill-[#FFD700]" />
                    <span>॥ జై శ్రీ రామ్ ॥</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black heading-telugu leading-tight mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                <span className="heading-gold">{t.hero.title}</span>
              </h1>
              <p className="text-lg md:text-xl font-extrabold text-[var(--primary-saffron)] heading-telugu mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                "{t.hero.slogan}"
              </p>

              {/* Construction Progress Widget */}
              <div className="max-w-2xl mx-auto gold-card !p-5 mb-8 border-2 border-[#FFD700]/70 shadow-2xl bg-[#5C121E]/80 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-extrabold mb-2">
                  <span className="text-amber-300">రాతి గోడల నిర్మాణ పురోగతి (Progress):</span>
                  <span className="text-emerald-400 font-mono text-sm">{v2T.construction.progressPct}% Completed</span>
                </div>
                <div className="w-full bg-black/70 rounded-full h-4 border border-white/20 p-0.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-lg"
                    style={{ width: `${v2T.construction.progressPct}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-bold text-gray-200 mt-3">
                  <div>మొత్తం బడ్జెట్: <span className="text-amber-300">{v2T.construction.totalBudget}</span></div>
                  <div>అందిన విరాళాలు: <span className="text-emerald-400">{v2T.construction.fundsReceived}</span></div>
                  <div>ఖర్చయిన నిధులు: <span className="text-sky-300">{v2T.construction.fundsUtilized}</span></div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setActiveTab('donations')} className="btn-primary px-6 py-3 text-sm shadow-[0_0_35px_rgba(230,81,0,0.8)] border-2 border-amber-300">
                  <Wallet className="w-4 h-4 text-yellow-300" />
                  <span>ఈ-హుండి ద్వారా విరాళం</span>
                </button>
                <button onClick={() => setActiveTab('construction')} className="btn-outline px-6 py-3 text-sm">
                  <Building2 className="w-4 h-4 text-amber-300" />
                  <span>నిర్మాణ ప్రగతి నివేదిక</span>
                </button>
              </div>
            </div>

            {/* 📢 Important Announcement Banner Card */}
            <div className="gold-card max-w-4xl mx-auto bg-gradient-to-r from-[#5C121E] via-[#3A0A11] to-[#5C121E] border-3 border-[#FFD700] !p-6 sm:!p-8 rounded-3xl shadow-2xl relative overflow-hidden my-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[#FFD700] text-[#5C121E] font-black shrink-0 shadow-lg">
                  <Bell className="w-8 h-8 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-black text-[#FFD700] heading-telugu mb-2 flex items-center gap-2">
                    <span>📢 ముఖ్య గమనిక & అధికారిక ప్రకటన (Important Announcement)</span>
                  </h3>
                  <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
                    ఈ వెబ్‌సైట్‌లో ప్రదర్శించబడిన విరాళాల వివరాలు అన్నీ శ్రీ రామా సేవా కమిటీ అధికారిక ఆలయ బ్యాంక్ ఖాతా (SBI A/C) ప్రారంభించిన తర్వాత, భక్తులు నేరుగా <span className="text-[#FFD700] font-mono font-black">NEFT / Bank Transfer, UPI లేదా PhonePe</span> ద్వారా ఆలయ ఖాతాకు జమ చేసిన విరాళాలు మాత్రమే.
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-amber-200/90 mt-2 italic border-t border-white/10 pt-2">
                    (Note: All donation details displayed on this website strictly represent direct transfers received via NEFT, UPI, or PhonePe after creating the official temple bank account).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ABOUT TEMPLE SUB-SECTION */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag">ఆలయ విశేషాలు</span>
              <h2 className="text-3xl font-black text-white heading-telugu">శ్రీ రామాలయం పామినివాండ్లవూరు - చరిత్ర & వివరాలు</h2>
            </div>

            <div className="gold-card space-y-4 text-sm leading-relaxed text-gray-200 bg-[#5C121E]/90 backdrop-blur-md border-2 border-amber-400/70">
              <h3 className="text-xl font-bold text-[#FFD700]">ఆలయ చరిత్ర (History)</h3>
              <p>
                చిత్తూరు జిల్లా బంగారుపాళెం మండలం మంగళపల్లె పంచాయతీ పరిధిలోని పామినివాండ్లవూరు గ్రామంలో గ్రామస్థులందరి ఏకోపితి సంకల్పంతో ఈ పవిత్ర రాతి గోడల శ్రీ రామాలయ శంకుస్థాపన జరిగింది.
              </p>

              <h3 className="text-xl font-bold text-[#FFD700] pt-4 border-t border-white/10">సోసైటీ రిజిస్ట్రేషన్ (Trust Registration)</h3>
              <div className="bg-black/60 p-4 rounded-xl border border-white/20 text-xs font-mono">
                <p className="text-amber-300 font-bold">Registration Name: SRI RAMA SEVA COMMITTEE PAMINIVANDLAVOORU</p>
                <p className="text-gray-300">Society Act: Andhra Pradesh Societies Registration Act</p>
                <p className="text-gray-300">Address: Door No: 5-233, Paminivandlavooru, Mangalapalli, Bangarupalem Mandal, Chittoor Dist - 517416</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. TEMPLE CONSTRUCTION SUB-SECTION */}
        {activeTab === 'construction' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag">నిర్మాణ నివేదిక</span>
              <h2 className="text-3xl font-black text-white heading-telugu">రాతి గోడల నిర్మాణం & ప్రాజెక్ట్ పురోగతి</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="gold-card text-center bg-[#5C121E]/90 border-2 border-amber-400/70">
                <span className="text-xs text-gray-300 block font-bold">అంచనా బడ్జెట్ (Total Budget)</span>
                <span className="text-2xl font-black text-amber-300 font-mono">{v2T.construction.totalBudget}</span>
              </div>
              <div className="gold-card text-center bg-[#5C121E]/90 border-2 border-emerald-400/70">
                <span className="text-xs text-gray-300 block font-bold">సేకరించిన విరాళాలు (Funds Received)</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{v2T.construction.fundsReceived}</span>
              </div>
              <div className="gold-card text-center bg-[#5C121E]/90 border-2 border-sky-400/70">
                <span className="text-xs text-gray-300 block font-bold">ఖర్చు చేసిన నిధులు (Utilized)</span>
                <span className="text-2xl font-black text-sky-300 font-mono">{v2T.construction.fundsUtilized}</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. 🏆 COMPREHENSIVE DONATION CATEGORIES & E-HUNDI */}
        {activeTab === 'donations' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag text-sm sm:text-base font-black px-5 py-2">విరాళాల వర్గీకరణ</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white heading-telugu mt-3 mb-2">శ్రీ రామాలయం విరాళాల పథకాలు & విభాగాలు</h2>
              <p className="text-sm sm:text-base md:text-lg text-amber-300 font-extrabold max-w-3xl mx-auto mt-2">
                పారదర్శకత మరియు సులువైన లెక్కల నిర్వహణ కొరకు విరాళాలు 10 పవిత్ర వర్గాలుగా వర్గీకరించబడ్డాయి.
              </p>
            </div>

            {/* Category Filter Selector */}
            <div className="flex flex-wrap justify-center gap-2.5 bg-[#1A0306]/90 p-4 rounded-2xl border-2 border-[#FFD700]/40 text-sm sm:text-base font-black shadow-xl">
              <button
                onClick={() => setSelectedCatId('all')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl transition-all ${selectedCatId === 'all' ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg scale-105 font-black' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}
              >
                అన్ని విభాగాలు (All Categories)
              </button>
              {v2T.donationCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl transition-all ${selectedCatId === cat.id ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg scale-105 font-black' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}
                >
                  {cat.name.split(' ')[1]}
                </button>
              ))}
            </div>

            {/* Display Donation Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {v2T.donationCategories
                .filter(cat => selectedCatId === 'all' || selectedCatId === cat.id)
                .map(cat => (
                  <div key={cat.id} className="gold-card bg-[#5C121E]/95 border-3 border-amber-400/80 space-y-4 !p-6 sm:!p-8 shadow-2xl">
                    <h3 className="text-xl sm:text-2xl font-black text-[#FFD700] heading-telugu flex items-center gap-3">
                      <Layers className="w-6 h-6 text-amber-400" />
                      <span>{cat.name}</span>
                    </h3>
                    <p className="text-sm sm:text-base text-gray-200 italic font-medium">{cat.desc}</p>
                    
                    {/* Subtypes List */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cat.subTypes.map((sub, idx) => (
                        <span key={idx} className="bg-black/70 text-amber-200 text-xs sm:text-sm font-extrabold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 shadow">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{sub}</span>
                        </span>
                      ))}
                    </div>

                    <button onClick={() => showToast(`${cat.name} కానుక సమర్పించే విధానం ఆరంభించబడింది.`)} className="btn-primary text-base sm:text-lg py-3.5 px-6 w-full mt-4 font-black rounded-2xl shadow-xl">
                      ఈ వర్గంలో విరాళం సమర్పించండి
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 5. 📜 TERMS & CONDITIONS SUB-SECTION */}
        {activeTab === 'terms' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag">అధికారిక నిబంధనలు</span>
              <h2 className="text-3xl font-black text-white heading-telugu">శ్రీ రామాలయం పామినివాండ్లవూరు - నిబంధనలు & షరతులు</h2>
              <p className="text-xs text-amber-300 max-w-2xl mx-auto mt-2">
                ఆలయ నిధుల పారదర్శకత, విరాళాల వినియోగం మరియు భక్తుల హక్కుల కొరకు పవిత్ర నిబంధనలు.
              </p>
            </div>

            <div className="space-y-4">
              {v2T.termsAndConditions.map((term) => (
                <div key={term.id} className="gold-card bg-[#5C121E]/90 border-2 border-amber-400/70 p-5 rounded-2xl flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#1A0306] border border-[#FFD700] text-[#FFD700] shrink-0">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#FFD700] heading-telugu mb-1">
                      {term.title}
                    </h3>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      {term.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SEVAS SUB-SECTION */}
        {activeTab === 'sevas' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag">సేవల వివరాలు</span>
              <h2 className="text-3xl font-black text-white heading-telugu">శ్రీ రామాలయం నిత్య & విశేష సేవలు</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {v2T.sevas.map((s) => (
                <div key={s.id} className="gold-card flex flex-col justify-between bg-[#5C121E]/90 border-2 border-amber-400/70">
                  <div>
                    <span className="text-xs font-bold text-amber-300 font-mono block mb-1">{s.time}</span>
                    <h3 className="text-lg font-bold text-white heading-telugu mb-2">{s.name}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-lg font-black text-[#FFD700] font-mono">{s.amount}</span>
                    <button onClick={() => showToast(`${s.name} సేవ బుకింగ్ కోసం అడ్మిన్ వద్దకు పంపబడింది.`)} className="btn-primary text-xs !py-1 !px-3">
                      సేవ బుక్ చేయండి
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. EVENTS SUB-SECTION */}
        {activeTab === 'events' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag">ఉత్సవాలు</span>
              <h2 className="text-3xl font-black text-white heading-telugu">వార్షిక శ్రీరామనవమి & ధార్మిక కార్యక్రమాలు</h2>
            </div>

            <div className="space-y-4">
              {v2T.events.map((e) => (
                <div key={e.id} className="gold-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#5C121E]/90 border-2 border-amber-400/70">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40">
                      📅 {e.date}
                    </span>
                    <h3 className="text-xl font-bold text-white heading-telugu mt-2">{e.title}</h3>
                    <p className="text-xs text-gray-300 mt-1">{e.desc}</p>
                  </div>
                  <button onClick={() => showToast(`${e.title} ఉత్సవానికి నమోదు చేసుకోబడింది!`)} className="btn-gold text-xs whitespace-nowrap">
                    ఉత్సవానికి హాజరు అవ్వండి
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. GALLERY SUB-SECTION */}
        {activeTab === 'gallery' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag">ఆలయ ప్రగతి చిత్రాలు</span>
              <h2 className="text-3xl font-black text-white heading-telugu">శ్రీ రామాలయ నిర్మాణ ఫోటోల గ్యాలరీ</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.gallery.photos.map((p) => (
                <div key={p.id} className="gold-card !p-3 group bg-[#5C121E]/90 border-2 border-amber-400/70">
                  <div className="aspect-video rounded-xl overflow-hidden bg-black mb-3">
                    <img src={p.src} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="text-xs font-bold text-white text-center heading-telugu">{p.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. NEWS SUB-SECTION */}
        {activeTab === 'news' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag">వార్తలు & ప్రకటనలు</span>
              <h2 className="text-3xl font-black text-white heading-telugu">తాజా వివరాలు & పత్రికా ప్రకటనలు</h2>
            </div>

            <div className="space-y-4">
              {v2T.news.map((n) => (
                <div key={n.id} className="gold-card bg-[#5C121E]/90 border-2 border-amber-400/70">
                  <span className="text-[11px] font-mono text-amber-300 font-bold">{n.date}</span>
                  <h3 className="text-lg font-bold text-white heading-telugu mt-1 mb-2">{n.title}</h3>
                  <p className="text-xs text-gray-200 leading-relaxed">{n.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. REPORTS SUB-SECTION */}
        {activeTab === 'reports' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag">పారదర్శకత నివేదికలు</span>
              <h2 className="text-3xl font-black text-white heading-telugu">ఆదాయ వ్యయాలు & ఆడిట్ రికార్డులు</h2>
            </div>

            <div className="gold-card space-y-4 bg-[#5C121E]/90 border-2 border-amber-400/70">
              <h3 className="text-lg font-bold text-[#FFD700]">నెలవారీ ఆదాయ వ్యయ నివేదిక (Income & Expense)</h3>
              <div className="space-y-2 text-xs">
                {v2T.financials.monthlyIncome.map((m, idx) => (
                  <div key={idx} className="flex justify-between p-3 rounded-xl bg-black/60 border border-white/20">
                    <span className="font-bold text-white">{m.month}</span>
                    <span className="text-emerald-400 font-mono">ఆదాయం: ₹ {m.income.toLocaleString()}</span>
                    <span className="text-sky-300 font-mono">ఖర్చు: ₹ {m.expense.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 11. CONTACT SUB-SECTION */}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag">సంప్రదించండి</span>
              <h2 className="text-3xl font-black text-white heading-telugu">అధికారిక చిరునామా & ఫీడ్‌బ్యాక్</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="gold-card space-y-3 text-xs bg-[#5C121E]/90 border-2 border-amber-400/70">
                <h3 className="text-base font-bold text-[#FFD700]">చిరునామా:</h3>
                <p>శ్రీ రామా సేవా కమిటీ, డోర్ నం: 5-233, పామినివాండ్లవూరు</p>
                <p>మంగళపల్లె పంచాయతీ, బంగారుపాళెం మండలం, చిత్తూరు జిల్లా - 517416</p>
                <p className="text-amber-300 font-mono pt-2">ఇమెయిల్: sriramasevacommitteepvv@gmail.com</p>
                <button onClick={openWhatsApp} className="btn-gold w-full text-xs py-2 justify-center mt-3">
                  <MessageSquare className="w-4 h-4" /> WhatsApp ద్వారా సంప్రదించండి
                </button>
              </div>

              <form onSubmit={handleSendFeedback} className="gold-card space-y-3 bg-[#5C121E]/90 border-2 border-amber-400/70">
                <h3 className="text-base font-bold text-[#FFD700]">అభిప్రాయం తెలపండి (Feedback Form)</h3>
                <input
                  type="text"
                  required
                  placeholder="మీ పేరు"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  className="w-full bg-[#1A0306] border border-white/20 rounded-xl p-2.5 text-xs text-white"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="మీ సలహా లేదా సందేశం..."
                  value={feedbackMsg}
                  onChange={(e) => setFeedbackMsg(e.target.value)}
                  className="w-full bg-[#1A0306] border border-white/20 rounded-xl p-2.5 text-xs text-white"
                />
                <button type="submit" className="btn-primary w-full text-xs py-2">
                  సందేశం పంపండి
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
