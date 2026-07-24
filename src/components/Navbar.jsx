import React, { useState } from 'react';
import { Menu, X, Globe, Heart } from 'lucide-react';

export default function Navbar({ lang, setLang, t }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'te' ? 'en' : 'te'));
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#4A0E17] via-[#2A060B] to-[#4A0E17] border-b-2 border-[var(--primary-gold)]/60 shadow-2xl">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
        
        {/* Top Left Corner: Official Temple Logo & Brand */}
        <a href="#home" className="flex items-center gap-3 text-decoration-none group">
          {/* Official Emblem Logo */}
          <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[var(--primary-saffron)] via-[var(--primary-gold)] to-[var(--primary-saffron-dark)] shadow-[0_0_20px_rgba(255,215,0,0.7)] transition-transform duration-300 group-hover:scale-105 shrink-0">
            <img
              src="/assets/logo.jpg"
              alt="Sri Rama Seva Committee Emblem Logo"
              className="w-full h-full object-cover rounded-full border border-amber-300/50"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-extrabold text-white heading-telugu leading-tight group-hover:text-[var(--primary-gold-light)] transition-colors">
                {t.nav.title}
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--sacred-maroon)] text-[var(--primary-gold)] font-bold border border-[var(--primary-gold)]/60 shadow-sm">
                {t.nav.regd}
              </span>
            </div>
            <p className="text-xs text-[var(--primary-saffron)] font-bold tracking-wide">
              {t.nav.subtitle}
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          <a href="#home" className="text-sm font-bold text-gray-100 hover:text-[var(--primary-gold)] transition-colors">
            {t.nav.home}
          </a>
          <a href="#timings" className="text-sm font-bold text-gray-100 hover:text-[var(--primary-gold)] transition-colors">
            {t.nav.timings}
          </a>
          <a href="#objectives" className="text-sm font-bold text-gray-100 hover:text-[var(--primary-gold)] transition-colors">
            {t.nav.about}
          </a>
          <a href="#gallery" className="text-sm font-bold text-gray-100 hover:text-[var(--primary-gold)] transition-colors">
            {t.nav.gallery}
          </a>
          <a href="#committee" className="text-sm font-bold text-gray-100 hover:text-[var(--primary-gold)] transition-colors">
            {t.nav.committee}
          </a>
          <a href="#donation" className="text-sm font-bold text-gray-100 hover:text-[var(--primary-gold)] transition-colors">
            {t.nav.bank}
          </a>
          <a href="#location" className="text-sm font-bold text-gray-100 hover:text-[var(--primary-gold)] transition-colors">
            {t.nav.location}
          </a>
        </nav>

        {/* Action Buttons & Lang Toggle */}
        <div className="hidden xl:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--primary-gold)]/60 bg-white/10 hover:bg-white/20 text-xs font-bold text-[var(--primary-gold-light)] transition-all"
            title="Switch Language"
          >
            <Globe className="w-4 h-4 text-[var(--primary-saffron)]" />
            <span>{lang === 'te' ? 'English' : 'తెలుగు'}</span>
          </button>

          <a href="#donation" className="btn-primary text-xs !py-2 !px-4">
            <Heart className="w-4 h-4 fill-white" />
            <span>{t.nav.donateBtn}</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-full border border-[var(--primary-gold)] bg-white/10 text-xs text-[var(--primary-gold)] font-bold"
          >
            {lang === 'te' ? 'EN' : 'తె'}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-gray-200 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#2A060B] border-b-2 border-[var(--primary-gold)] px-4 py-6 flex flex-col gap-4 animate-fadeIn">
          <a href="#home" onClick={() => setMobileOpen(false)} className="text-base font-semibold text-gray-100 hover:text-[var(--primary-gold)] py-1">
            {t.nav.home}
          </a>
          <a href="#timings" onClick={() => setMobileOpen(false)} className="text-base font-semibold text-gray-100 hover:text-[var(--primary-gold)] py-1">
            {t.nav.timings}
          </a>
          <a href="#objectives" onClick={() => setMobileOpen(false)} className="text-base font-semibold text-gray-100 hover:text-[var(--primary-gold)] py-1">
            {t.nav.about}
          </a>
          <a href="#gallery" onClick={() => setMobileOpen(false)} className="text-base font-semibold text-gray-100 hover:text-[var(--primary-gold)] py-1">
            {t.nav.gallery}
          </a>
          <a href="#committee" onClick={() => setMobileOpen(false)} className="text-base font-semibold text-gray-100 hover:text-[var(--primary-gold)] py-1">
            {t.nav.committee}
          </a>
          <a href="#donation" onClick={() => setMobileOpen(false)} className="text-base font-semibold text-gray-100 hover:text-[var(--primary-gold)] py-1">
            {t.nav.bank}
          </a>
          <a href="#location" onClick={() => setMobileOpen(false)} className="text-base font-semibold text-gray-100 hover:text-[var(--primary-gold)] py-1">
            {t.nav.location}
          </a>

          <a href="#donation" onClick={() => setMobileOpen(false)} className="btn-primary text-center mt-2">
            <Heart className="w-4 h-4 fill-white inline mr-2" />
            {t.nav.donateBtn}
          </a>
        </div>
      )}
    </header>
  );
}
