import React, { useState } from 'react';
import { LayoutDashboard, Users, Heart, Globe, Menu, X, Building2, Calendar, FileText, Camera, ShieldCheck, Sparkles, Phone, Lock, Zap, Bell, Palette, Sun, Moon } from 'lucide-react';
import { getAssetUrl, getActiveLogo } from '../data/v2Database';

export default function V2Navbar({ activeModule, setActiveModule, lang, setLang, theme, setTheme, t, v2T, onToggleVersion }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLang = () => {
    setLang(lang === 'te' ? 'en' : 'te');
  };

  const toggleTheme = () => {
    if (setTheme) {
      setTheme(theme === 'theme-cream' ? 'theme-maroon' : 'theme-cream');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#2D080E] border-b-2 border-[#FFD700] text-white shadow-2xl backdrop-blur-md">

      {/* ⚡ ATTENTION-GRABBING FLASH NEWS SCROLLING TICKER BAR (Visible on ALL Pages) */}
      <div className="flash-news-banner py-2 px-3 flex items-center justify-between gap-3 text-white overflow-hidden shadow-2xl relative z-20">
        <div className="flex items-center gap-2 bg-[#FFD700] text-black font-black text-xs md:text-sm px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.9)] shrink-0 animate-pulse border border-black">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white animate-ping" />
          <Zap className="w-4 h-4 fill-amber-950 text-black" />
          <span>⚡ తాజా ప్రకటన (FLASH NEWS)</span>
        </div>

        <div className="overflow-hidden w-full relative">
          <div className="flash-news-content text-xs sm:text-sm md:text-base font-extrabold text-[#FFF5C0] heading-telugu tracking-wide hover:[animation-play-state:paused] cursor-pointer">
            {lang === 'te' ? (
              <>
                📢 ముఖ్య గమనిక: ఆలయ వెబ్‌సైట్‌లో ప్రదర్శించబడుతున్న విరాళాల వివరాలు, శ్రీ రామా సేవా కమిటీ పామినివాండ్లవూరు అధికారిక బ్యాంక్ ఖాతా సృష్టించిన తర్వాత NEFT లేదా UPI ద్వారా నేరుగా ఖాతాకు జమ కాబడినవి మాత్రమే ప్రదర్శించబడుతున్నాయి.
              </>
            ) : (
              <>
                📢 IMPORTANT NOTICE: Donation details displayed on the website are recorded only after creating the official Sri Rama Seva Committee temple account and transferred directly to the account via NEFT or UPI.
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar - Left Aligned Layout */}
      <div className="w-full px-4 md:px-6 py-2.5 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between gap-4 whitespace-nowrap min-w-max">
          
          {/* Crystal Clear Brand Logo & Left Alignment */}
          <div className="flex items-center gap-3 shrink-0 select-none cursor-pointer group" onClick={() => setActiveModule('public-home')}>
            <div className="relative shrink-0">
              <img
                src={getActiveLogo()}
                alt="Sri Rama Seva Committee Logo"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getAssetUrl('assets/logo.jpg');
                }}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#FFD700] shadow-xl object-cover bg-[#1A0306] p-0.5 ring-2 ring-[#FFD700]/60 transform group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow" title="Official Verified ERP Active" />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-base md:text-xl font-black text-white heading-telugu leading-tight group-hover:text-amber-200 transition-colors">
                {t.nav.title}
              </h1>
              <p className="text-[11px] md:text-xs text-amber-300 font-extrabold">
                {v2T.tagline}
              </p>
            </div>
          </div>

          {/* Left Aligned Module Navigation - Fits All Screen Widths */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            
            {/* 1. Global View (Public Website) */}
            <button
              onClick={() => setActiveModule('public-home')}
              className={`btn-autofit px-3.5 md:px-4 py-2 rounded-xl text-xs md:text-sm font-black transition-all flex items-center gap-1.5 shrink-0 ${
                activeModule.startsWith('public')
                  ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg'
                  : 'text-gray-100 bg-white/5 border border-white/10 hover:bg-white/20 hover:text-white'
              }`}
              title="Global Public View - Temple website, donation wall & events"
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>🌐 Global View (ప్రజా వెబ్‌సైట్)</span>
            </button>

            {/* 2. Devotee View (Devotee Portal) */}
            <button
              onClick={() => setActiveModule('devotee-portal')}
              className={`btn-autofit px-3.5 md:px-4 py-2 rounded-xl text-xs md:text-sm font-black transition-all flex items-center gap-1.5 shrink-0 ${
                activeModule === 'devotee-portal'
                  ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg'
                  : 'text-sky-200 bg-sky-950/40 border border-sky-400/30 hover:bg-sky-900/60'
              }`}
              title="Devotee View - My donations, pooja bookings & receipts"
            >
              <Users className="w-4 h-4 text-sky-400" />
              <span>🛕 Devotee View (భక్తుల పోర్టల్)</span>
            </button>

            {/* 3. Admin View (Temple ERP Suite) */}
            <button
              onClick={() => setActiveModule('erp-admin')}
              className={`btn-autofit px-3.5 md:px-4 py-2 rounded-xl text-xs md:text-sm font-black transition-all flex items-center gap-1.5 shrink-0 ${
                activeModule === 'erp-admin'
                  ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg'
                  : 'bg-amber-500/20 text-[#FFD700] border border-amber-400/60 hover:bg-[#5C121E]'
              }`}
              title="Admin View - Financial management, donor approvals & database"
            >
              <LayoutDashboard className="w-4 h-4 text-[#FFD700]" />
              <span>⚙️ Admin View (టెంపుల్ ERP అడ్మిన్)</span>
            </button>

            {/* 4. Swagger API Explorer Button */}
            <button
              onClick={() => setActiveModule('api-explorer')}
              className={`px-3.5 md:px-4.5 py-2 rounded-xl text-sm md:text-base lg:text-[17px] font-black transition-all flex items-center gap-1.5 shrink-0 ${
                activeModule === 'api-explorer'
                  ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg'
                  : 'text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/60'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Swagger REST API</span>
            </button>

            {/* Donate CTA */}
            <button
              onClick={() => setActiveModule('public-donations')}
              className="btn-gold text-sm md:text-base lg:text-[17px] !py-2 !px-4 md:!px-5 shadow-xl border-2 border-amber-300 font-black shrink-0 rounded-xl"
            >
              <Heart className="w-4 h-4 fill-current text-red-700" />
              <span>ఈ-హుండి విరాళం</span>
            </button>

            {/* Theme Toggle Button (Light Theme / Dark Theme) */}
            <button
              onClick={toggleTheme}
              className="px-3.5 py-2 rounded-xl text-xs md:text-sm font-black bg-amber-400 text-amber-950 border-2 border-amber-300 hover:bg-amber-300 transition-all flex items-center gap-1.5 shrink-0 shadow-md"
              title="థీమ్ మార్చుకోండి (Light / Dark Theme Toggle)"
            >
              {theme === 'theme-cream' ? (
                <>
                  <Moon className="w-4 h-4 text-amber-950" />
                  <span>డార్క్ థీమ్</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-950" />
                  <span>లైట్ థీమ్</span>
                </>
              )}
            </button>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-[#FFD700] hover:bg-white/10">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#3A0A11] border-b-2 border-[#FFD700] p-4 space-y-3 shadow-2xl animate-fadeIn">
          <div className="space-y-2.5">
            <button
              onClick={() => { setActiveModule('public-home'); setIsOpen(false); }}
              className="w-full text-left p-3.5 rounded-xl text-sm sm:text-base font-black bg-white/10 text-white hover:bg-white/20 border border-white/10 flex items-center gap-2.5"
            >
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>1. ప్రజా వెబ్‌సైట్ (Public Website)</span>
            </button>
            <button
              onClick={() => { setActiveModule('devotee-portal'); setIsOpen(false); }}
              className="w-full text-left p-3.5 rounded-xl text-sm sm:text-base font-black bg-white/10 text-sky-300 hover:bg-white/20 border border-sky-400/30 flex items-center gap-2.5"
            >
              <Users className="w-5 h-5 text-sky-400" />
              <span>2. భక్తుల పోర్టల్ (Devotee Portal)</span>
            </button>
            <button
              onClick={() => { setActiveModule('erp-admin'); setIsOpen(false); }}
              className="w-full text-left p-3.5 rounded-xl text-sm sm:text-base font-black bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg flex items-center gap-2.5"
            >
              <LayoutDashboard className="w-5 h-5 text-[#FFD700]" />
              <span>3. శ్రీ రామాలయం ERP అడ్మిన్ (Temple ERP Suite)</span>
            </button>
            <button
              onClick={() => { setActiveModule('public-donations'); setIsOpen(false); }}
              className="w-full text-left p-3.5 rounded-xl text-sm sm:text-base font-black bg-gradient-to-r from-amber-500 to-orange-600 text-white border border-yellow-300 flex items-center gap-2.5 shadow-lg"
            >
              <Heart className="w-5 h-5 fill-red-700 text-red-700" />
              <span>4. ఈ-హుండి విరాళం సమర్పించండి</span>
            </button>
          </div>

          <div className="pt-3.5 border-t border-white/20 flex justify-between items-center text-xs sm:text-sm font-bold">
            <button onClick={() => { onToggleVersion(); setIsOpen(false); }} className="text-amber-300 font-extrabold underline flex items-center gap-1">
              <span>🔄 Switch to Version 1 Classic</span>
            </button>
            <button onClick={toggleLang} className="text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 font-bold">
              🌐 {lang === 'te' ? 'English' : 'తెలుగు'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
