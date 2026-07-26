import React, { useState } from 'react';
import { Building2, Heart, Calendar, FileText, Camera, ShieldCheck, MapPin, Mail, MessageSquare, Phone, CheckCircle2, ChevronRight, Award, DollarSign, Wallet, Users, Sparkles, Send, Download, FileCheck, Layers, Info, Bell, TrendingUp, CheckCircle, Database } from 'lucide-react';
import { getDB } from '../data/v2Database';

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
      <div className="bg-[#1A0306]/95 border-b border-[#FFD700]/40 sticky top-[73px] z-40 backdrop-blur-md overflow-x-auto scrollbar-none py-3 px-3 shadow-2xl">
        <div className="flex items-center justify-start gap-2.5 md:gap-3.5 whitespace-nowrap text-sm sm:text-base md:text-lg font-black px-2">
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
              className={`px-4 sm:px-5 py-2.5 rounded-full transition-all border shrink-0 ${
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
                <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold mb-2">
                  <span className="text-amber-300">రాతి గోడల నిర్మాణ పురోగతి (Progress):</span>
                  <span className="text-emerald-400 font-mono text-sm sm:text-base font-black">{v2T.construction.progressPct}% Completed</span>
                </div>
                <div className="w-full bg-black/70 rounded-full h-4 border border-white/20 p-0.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-lg"
                    style={{ width: `${v2T.construction.progressPct}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm font-extrabold text-gray-100 mt-3">
                  <div>మొత్తం బడ్జెట్: <span className="text-amber-300">{v2T.construction.totalBudget}</span></div>
                  <div>అందిన విరాళాలు: <span className="text-emerald-400">{v2T.construction.fundsReceived}</span></div>
                  <div>ఖర్చయిన నిధులు: <span className="text-sky-300">{v2T.construction.fundsUtilized}</span></div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setActiveTab('donations')} className="btn-primary px-6 py-3.5 text-base font-black shadow-[0_0_35px_rgba(230,81,0,0.8)] border-2 border-amber-300 rounded-2xl">
                  <Wallet className="w-5 h-5 text-yellow-300" />
                  <span>ఈ-హుండి ద్వారా విరాళం</span>
                </button>
                <button onClick={() => setActiveTab('construction')} className="btn-outline px-6 py-3.5 text-base font-black rounded-2xl">
                  <Building2 className="w-5 h-5 text-amber-300" />
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
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag text-sm sm:text-base font-black px-5 py-2">ఆలయ విశేషాలు</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white heading-telugu mt-3">శ్రీ రామాలయం పామినివాండ్లవూరు - చరిత్ర & వివరాలు</h2>
            </div>

            <div className="gold-card space-y-6 text-base sm:text-lg leading-relaxed text-gray-100 bg-[#5C121E]/95 border-3 border-amber-400/80 !p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-black text-[#FFD700] heading-telugu">ఆలయ చరిత్ర (History)</h3>
              <p className="font-bold">
                చిత్తూరు జిల్లా బంగారుపాళెం మండలం మంగళపల్లె పంచాయతీ పరిధిలోని పామినివాండ్లవూరు గ్రామంలో గ్రామస్థులందరి ఏకోపితి సంకల్పంతో ఈ పవిత్ర రాతి గోడల శ్రీ రామాలయ శంకుస్థాపన జరిగింది.
              </p>

              <h3 className="text-2xl sm:text-3xl font-black text-[#FFD700] pt-4 border-t border-white/20 heading-telugu">సోసైటీ రిజిస్ట్రేషన్ (Trust Registration)</h3>
              <div className="bg-black/70 p-6 rounded-2xl border-2 border-white/20 text-sm sm:text-base font-mono space-y-2 shadow-inner">
                <p className="text-amber-300 font-black text-base sm:text-lg">Registration Name: SRI RAMA SEVA COMMITTEE PAMINIVANDLAVOORU</p>
                <p className="text-gray-200 font-extrabold">Society Act: Andhra Pradesh Societies Registration Act</p>
                <p className="text-gray-200 font-extrabold">Address: Door No: 5-233, Paminivandlavooru, Mangalapalli, Bangarupalem Mandal, Chittoor Dist - 517416</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. TEMPLE CONSTRUCTION SUB-SECTION */}
        {activeTab === 'construction' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag text-sm sm:text-base font-black px-5 py-2">నిర్మాణ నివేదిక</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white heading-telugu mt-3">రాతి గోడల నిర్మాణం & ప్రాజెక్ట్ పురోగతి</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="gold-card text-center bg-[#5C121E]/95 border-3 border-amber-400 !p-6 rounded-3xl shadow-2xl">
                <span className="text-xs sm:text-sm text-gray-200 block font-black mb-1">అంచనా బడ్జెట్ (Total Budget)</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-300 font-mono">{v2T.construction.totalBudget}</span>
              </div>
              <div className="gold-card text-center bg-[#5C121E]/95 border-3 border-emerald-400 !p-6 rounded-3xl shadow-2xl">
                <span className="text-xs sm:text-sm text-gray-200 block font-black mb-1">సేకరించిన విరాళాలు (Funds Received)</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-400 font-mono">{v2T.construction.fundsReceived}</span>
              </div>
              <div className="gold-card text-center bg-[#5C121E]/95 border-3 border-sky-400 !p-6 rounded-3xl shadow-2xl">
                <span className="text-xs sm:text-sm text-gray-200 block font-black mb-1">ఖర్చు చేసిన నిధులు (Utilized)</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-sky-300 font-mono">{v2T.construction.fundsUtilized}</span>
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
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag text-sm sm:text-base font-black px-5 py-2">అధికారిక నిబంధనలు</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white heading-telugu mt-3">శ్రీ రామాలయం పామినివాండ్లవూరు - నిబంధనలు & షరతులు</h2>
              <p className="text-sm sm:text-base text-amber-300 font-bold max-w-2xl mx-auto mt-2">
                ఆలయ నిధుల పారదర్శకత, విరాళాల వినియోగం మరియు భక్తుల హక్కుల కొరకు పవిత్ర నిబంధనలు.
              </p>
            </div>

            <div className="space-y-5">
              {v2T.termsAndConditions.map((term) => (
                <div key={term.id} className="gold-card bg-[#5C121E]/95 border-3 border-amber-400/80 !p-6 sm:!p-8 rounded-3xl flex items-start gap-5 shadow-2xl">
                  <div className="p-4 rounded-2xl bg-[#1A0306] border-2 border-[#FFD700] text-[#FFD700] shrink-0 shadow-lg">
                    <FileCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#FFD700] heading-telugu mb-2">
                      {term.title}
                    </h3>
                    <p className="text-base sm:text-lg font-extrabold text-gray-100 leading-relaxed">
                      {term.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SEVAS SUB-SECTION - ENLARGED FONT */}
        {activeTab === 'sevas' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag text-sm sm:text-base font-black px-5 py-2">సేవల వివరాలు</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white heading-telugu mt-3">శ్రీ రామాలయం నిత్య & విశేష సేవలు</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {v2T.sevas.map((s) => (
                <div key={s.id} className="gold-card flex flex-col justify-between bg-[#5C121E]/95 border-3 border-amber-400/80 !p-6 sm:!p-8 rounded-3xl shadow-2xl space-y-4">
                  <div>
                    <span className="text-sm font-black text-amber-300 font-mono block mb-1 bg-black/60 px-3 py-1 rounded-lg border border-amber-400/40 w-fit">{s.time}</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white heading-telugu mt-2">{s.name}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <span className="text-2xl sm:text-3xl font-black text-[#FFD700] font-mono">{s.amount}</span>
                    <button onClick={() => showToast(`${s.name} సేవ బుకింగ్ కోసం అడ్మిన్ వద్దకు పంపబడింది.`)} className="btn-primary text-base font-black !py-3 !px-6 rounded-2xl shadow-xl">
                      సేవ బుక్ చేయండి
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. EVENTS SUB-SECTION - ENLARGED FONT */}
        {activeTab === 'events' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag text-sm sm:text-base font-black px-5 py-2">ఉత్సవాలు</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white heading-telugu mt-3">వార్షిక శ్రీరామనవమి & ధార్మిక కార్యక్రమాలు</h2>
            </div>

            <div className="space-y-5">
              {v2T.events.map((e) => (
                <div key={e.id} className="gold-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#5C121E]/95 border-3 border-amber-400/80 !p-6 sm:!p-8 rounded-3xl shadow-2xl">
                  <div>
                    <span className="text-sm sm:text-base font-mono font-black text-amber-300 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-400/40 inline-block mb-2">
                      📅 {e.date}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white heading-telugu mb-1">{e.title}</h3>
                    <p className="text-base sm:text-lg font-extrabold text-gray-200 mt-1">{e.desc}</p>
                  </div>
                  <button onClick={() => showToast(`${e.title} ఉత్సవానికి నమోదు చేసుకోబడింది!`)} className="btn-gold text-base font-black whitespace-nowrap !py-3.5 !px-6 rounded-2xl shadow-xl shrink-0">
                    ఉత్సవానికి హాజరు అవ్వండి
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. GALLERY SUB-SECTION - ENLARGED FONT */}
        {activeTab === 'gallery' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag text-sm sm:text-base font-black px-5 py-2">ఆలయ ప్రగతి చిత్రాలు</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white heading-telugu mt-3">శ్రీ రామాలయ నిర్మాణ ఫోటోల గ్యాలరీ</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.gallery.photos.map((p) => (
                <div key={p.id} className="gold-card !p-4 group bg-[#5C121E]/95 border-3 border-amber-400/80 rounded-3xl shadow-2xl">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-black mb-4 border border-white/20">
                    <img src={p.src} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white text-center heading-telugu">{p.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. NEWS SUB-SECTION - ENLARGED FONT */}
        {activeTab === 'news' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag text-sm sm:text-base font-black px-5 py-2">వార్తలు & ప్రకటనలు</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white heading-telugu mt-3">తాజా వివరాలు & పత్రికా ప్రకటనలు</h2>
            </div>

            <div className="space-y-5">
              {v2T.news.map((n) => (
                <div key={n.id} className="gold-card bg-[#5C121E]/95 border-3 border-amber-400/80 !p-6 sm:!p-8 rounded-3xl shadow-2xl space-y-2">
                  <span className="text-sm font-mono text-amber-300 font-black bg-black/60 px-3.5 py-1 rounded-lg border border-white/10">{n.date}</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white heading-telugu mt-2 mb-2">{n.title}</h3>
                  <p className="text-base sm:text-lg font-extrabold text-gray-100 leading-relaxed">{n.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. REPORTS SUB-SECTION - DYNAMIC DATABASE MATCHED & ENLARGED FONT */}
        {activeTab === 'reports' && (() => {
          const currentDB = getDB();
          const dbDonationsList = currentDB.donations || [];
          const dbExpensesList = currentDB.expenses || [];

          const totalDonationsReceived = dbDonationsList.reduce((acc, curr) => {
            const num = typeof curr.amount === 'number' ? curr.amount : parseInt(String(curr.amount).replace(/\D/g, '')) || 0;
            return acc + num;
          }, 0);

          const totalExpensesUtilized = dbExpensesList.reduce((acc, curr) => {
            const num = typeof curr.amount === 'number' ? curr.amount : parseInt(String(curr.amount).replace(/\D/g, '')) || 0;
            return acc + num;
          }, 0);

          const netBalance = totalDonationsReceived - totalExpensesUtilized;

          const juneDonations = dbDonationsList.filter(d => String(d.date).includes('06-2026') || String(d.date).includes('June'));
          const julyDonations = dbDonationsList.filter(d => String(d.date).includes('07-2026') || String(d.date).includes('July'));

          const juneSum = juneDonations.reduce((acc, curr) => acc + (typeof curr.amount === 'number' ? curr.amount : parseInt(String(curr.amount).replace(/\D/g, '')) || 0), 0);
          const julySum = julyDonations.reduce((acc, curr) => acc + (typeof curr.amount === 'number' ? curr.amount : parseInt(String(curr.amount).replace(/\D/g, '')) || 0), 0);

          return (
            <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
              <div className="text-center mb-8">
                <span className="section-tag text-sm sm:text-base font-black px-5 py-2">పారదర్శకత నివేదికలు</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white heading-telugu mt-3 mb-2">ఆదాయ వ్యయాలు & ఆడిట్ నివేదిక</h2>
                <p className="text-sm sm:text-base md:text-lg text-amber-300 font-extrabold max-w-3xl mx-auto mt-2">
                  ఆలయ డేటాబేస్ నుండి లైవ్ విరాళాల జాబితా ప్రకారం లెక్కించబడిన అధికారిక ఆర్థిక నివేదిక.
                </p>
              </div>

              {/* 📊 Summary Financial Metric Cards (Enlarged View Font) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="gold-card bg-[#5C121E]/95 border-3 border-emerald-400 !p-6 rounded-3xl text-center shadow-2xl space-y-2">
                  <span className="text-xs sm:text-sm font-black text-gray-200 uppercase tracking-wider block">మొత్తం సేకరించిన విరాళాలు (Income)</span>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-400 font-mono block">₹ {totalDonationsReceived.toLocaleString()}</span>
                  <span className="text-xs font-bold text-emerald-300 block">({dbDonationsList.length} విరాళాల రికార్డులు)</span>
                </div>

                <div className="gold-card bg-[#5C121E]/95 border-3 border-sky-400 !p-6 rounded-3xl text-center shadow-2xl space-y-2">
                  <span className="text-xs sm:text-sm font-black text-gray-200 uppercase tracking-wider block">మొత్తం నిర్మాణ ఖర్చులు (Expenses)</span>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-sky-300 font-mono block">₹ {totalExpensesUtilized.toLocaleString()}</span>
                  <span className="text-xs font-bold text-sky-200 block">({dbExpensesList.length} ఖర్చుల బిల్లులు)</span>
                </div>

                <div className="gold-card bg-[#5C121E]/95 border-3 border-[#FFD700] !p-6 rounded-3xl text-center shadow-2xl space-y-2">
                  <span className="text-xs sm:text-sm font-black text-gray-200 uppercase tracking-wider block">నికర ఆలయ నిల్వ నిధి (Net Balance)</span>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFD700] font-mono block">₹ {netBalance.toLocaleString()}</span>
                  <span className="text-xs font-bold text-amber-200 block">(నిఖార్సైన ఆలయ ఖాతా నిధి)</span>
                </div>
              </div>

              {/* 📅 Monthly Income & Expense Breakdown Cards (Enlarged View Font) */}
              <div className="gold-card bg-[#5C121E]/95 border-3 border-amber-400/80 !p-6 sm:!p-8 rounded-3xl space-y-6 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-black text-[#FFD700] heading-telugu flex items-center gap-3">
                  <TrendingUp className="w-7 h-7 text-amber-400" />
                  <span>నెలవారీ ఆదాయ వ్యయ విశ్లేషణ నివేదిక (Monthly Summary)</span>
                </h3>

                <div className="space-y-4">
                  {/* June 2026 */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-black/70 border-2 border-white/20 gap-3 shadow-lg">
                    <div>
                      <span className="text-lg sm:text-xl font-black text-white block">జూన్ 2026 (June 2026)</span>
                      <span className="text-xs sm:text-sm text-amber-200 font-extrabold">{juneDonations.length} రికార్డులు సేకరించబడ్డాయి</span>
                    </div>
                    <div className="flex items-center gap-4 text-base sm:text-xl font-black font-mono">
                      <span className="text-emerald-400 bg-emerald-950/60 px-4 py-1.5 rounded-xl border border-emerald-500/40">ఆదాయం: ₹ {juneSum.toLocaleString()}</span>
                      <span className="text-sky-300 bg-sky-950/60 px-4 py-1.5 rounded-xl border border-sky-500/40">ఖర్చు: ₹ 0</span>
                    </div>
                  </div>

                  {/* July 2026 */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-black/70 border-2 border-white/20 gap-3 shadow-lg">
                    <div>
                      <span className="text-lg sm:text-xl font-black text-white block">జులై 2026 (July 2026)</span>
                      <span className="text-xs sm:text-sm text-amber-200 font-extrabold">{julyDonations.length} రికార్డులు సేకరించబడ్డాయి</span>
                    </div>
                    <div className="flex items-center gap-4 text-base sm:text-xl font-black font-mono">
                      <span className="text-emerald-400 bg-emerald-950/60 px-4 py-1.5 rounded-xl border border-emerald-500/40">ఆదాయం: ₹ {julySum.toLocaleString()}</span>
                      <span className="text-sky-300 bg-sky-950/60 px-4 py-1.5 rounded-xl border border-sky-500/40">ఖర్చు: ₹ 0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 📜 Database Matched Donors Transparent Ledger Table (Enlarged View Font) */}
              <div className="gold-card bg-[#5C121E]/95 border-3 border-[#FFD700]/80 !p-6 sm:!p-8 rounded-3xl space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/20">
                  <h3 className="text-xl sm:text-2xl font-black text-[#FFD700] heading-telugu flex items-center gap-3">
                    <Database className="w-7 h-7 text-amber-400" />
                    <span>అధికారిక విరాళాల జాబితా & రికార్డులు (Database Donors Ledger)</span>
                  </h3>
                  <span className="text-xs sm:text-sm font-black text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-400/50">
                    మొత్తం రికార్డులు: {dbDonationsList.length}
                  </span>
                </div>

                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-black/70 text-[#FFD700] text-sm sm:text-base font-black border-b-2 border-[#FFD700]">
                        <th className="p-3.5">దాత పేరు (Donor Name)</th>
                        <th className="p-3.5">మొత్తం (Amount)</th>
                        <th className="p-3.5">తేదీ (Date)</th>
                        <th className="p-3.5">సేవ (Seva)</th>
                        <th className="p-3.5">చెల్లింపు మార్గం (Mode)</th>
                        <th className="p-3.5">గ్రామం (City)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-sm sm:text-base font-extrabold text-white">
                      {dbDonationsList.map((d, idx) => (
                        <tr key={idx} className="hover:bg-white/10 transition-colors">
                          <td className="p-3.5 text-amber-200 font-bold">{d.donorName}</td>
                          <td className="p-3.5 text-emerald-400 font-mono font-black">₹ {(typeof d.amount === 'number' ? d.amount : parseInt(String(d.amount).replace(/\D/g, '')) || 0).toLocaleString()}</td>
                          <td className="p-3.5 font-mono text-gray-300 text-xs sm:text-sm">{d.date}</td>
                          <td className="p-3.5 text-xs sm:text-sm text-gray-200">{d.seva}</td>
                          <td className="p-3.5 text-xs sm:text-sm text-sky-300">{d.mode || 'Direct Transfer'}</td>
                          <td className="p-3.5 text-xs sm:text-sm text-amber-300">{d.city}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 11. CONTACT SUB-SECTION - ENLARGED FONT */}
        {activeTab === 'contact' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <span className="section-tag text-sm sm:text-base font-black px-5 py-2">సంప్రదించండి</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white heading-telugu mt-3">అధికారిక చిరునామా & ఫీడ్‌బ్యాక్</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="gold-card space-y-5 text-base sm:text-lg bg-[#5C121E]/95 border-3 border-amber-400/80 !p-8 rounded-3xl shadow-2xl">
                <h3 className="text-2xl sm:text-3xl font-black text-[#FFD700] heading-telugu">చిరునామా:</h3>
                <p className="font-extrabold text-white leading-relaxed">శ్రీ రామా సేవా కమిటీ, డోర్ నం: 5-233, పామినివాండ్లవూరు</p>
                <p className="font-extrabold text-white leading-relaxed">మంగళపల్లె పంచాయతీ, బంగారుపాళెం మండలం, చిత్తూరు జిల్లా - 517416</p>
                <p className="text-amber-300 font-mono font-black pt-3 border-t border-white/20 text-base sm:text-lg">ఇమెయిల్: sriramasevacommitteepvv@gmail.com</p>
                <button onClick={openWhatsApp} className="btn-gold w-full text-base sm:text-lg py-4 justify-center font-black rounded-2xl mt-4 shadow-xl">
                  <MessageSquare className="w-5 h-5" /> WhatsApp ద్వారా సంప్రదించండి
                </button>
              </div>

              <form onSubmit={handleSendFeedback} className="gold-card space-y-4 bg-[#5C121E]/95 border-3 border-amber-400/80 !p-8 rounded-3xl shadow-2xl">
                <h3 className="text-2xl sm:text-3xl font-black text-[#FFD700] heading-telugu mb-2">అభిప్రాయం తెలపండి (Feedback Form)</h3>
                <input
                  type="text"
                  required
                  placeholder="మీ పేరు"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  className="w-full bg-[#1A0306] border-2 border-white/20 rounded-2xl p-4 text-base sm:text-lg text-white font-extrabold focus:border-[#FFD700] transition-colors"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="మీ సలహా లేదా సందేశం..."
                  value={feedbackMsg}
                  onChange={(e) => setFeedbackMsg(e.target.value)}
                  className="w-full bg-[#1A0306] border-2 border-white/20 rounded-2xl p-4 text-base sm:text-lg text-white font-extrabold focus:border-[#FFD700] transition-colors"
                />
                <button type="submit" className="btn-primary w-full text-base sm:text-lg font-black py-4 rounded-2xl shadow-xl mt-2">
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
