import React, { useState } from 'react';
import { Menu, X, Globe, Wallet } from 'lucide-react';

export default function Navbar({ lang, setLang, t }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLang = () => {
    setLang(lang === 'te' ? 'en' : 'te');
  };

  const navLinks = [
    { name: t.nav.home, href: "#hero" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.gallery, href: "#gallery" },
    { name: t.nav.committee, href: "#committee" },
    { name: t.nav.sevas, href: "#sevas" },
    { name: t.nav.bank, href: "#donation", isHundi: true },
    { name: t.nav.location, href: "#location" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#5C121E] via-[#3A0A11] to-[#5C121E] border-b-2 border-[var(--primary-gold)]/60 backdrop-blur-md shadow-2xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Info */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/assets/logo.jpg"
                alt="Sri Rama Seva Committee Logo"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[var(--primary-gold)] shadow-xl object-cover transform group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" title="Official Verified Committee" />
            </div>

            <div>
              <h1 className="text-base md:text-xl font-extrabold text-white heading-telugu leading-tight group-hover:text-[var(--primary-gold-light)] transition-colors">
                {t.nav.title}
              </h1>
              <p className="text-xs md:text-sm text-[var(--primary-saffron)] font-bold">
                {t.nav.subtitle}
              </p>
            </div>
          </a>

          {/* Desktop Navigation & Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-5">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className={`text-[20px] font-black transition-colors py-1 border-b-2 ${
                    link.isHundi
                      ? 'text-[#FFD700] border-2 border-[#FFD700] hover:text-amber-200 animate-pulse bg-white/10 px-4 py-1.5 rounded-full'
                      : 'text-gray-100 border-transparent hover:text-[var(--primary-gold)] hover:border-[var(--primary-gold)]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 border-l border-white/20 pl-4">
              {/* Language Switcher */}
              <button
                onClick={toggleLang}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-[#FFD700] hover:bg-white/20 border border-[#FFD700]/40 flex items-center gap-1.5 transition-all"
                title="తెలుగు / English"
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'te' ? 'English' : 'తెలుగు'}</span>
              </button>

              {/* Highlighted E-Hundi Button */}
              <a href="#donation" className="btn-gold text-xs !py-2 !px-4 shadow-[0_0_20px_rgba(255,215,0,0.5)] border border-amber-300">
                <Wallet className="w-4 h-4 fill-current text-yellow-950 animate-bounce" />
                <span>{t.nav.donateBtn}</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a href="#donation" className="btn-gold text-[11px] py-1.5 px-3">
              <Wallet className="w-3.5 h-3.5" />
              <span>ఈ-హుండి</span>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10"
            >
              {isOpen ? <X className="w-6 h-6 text-[#FFD700]" /> : <Menu className="w-6 h-6 text-[#FFD700]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#3A0A11] border-b border-[var(--primary-gold)]/50 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold py-2 border-b border-white/10 ${
                  link.isHundi ? 'text-[#FFD700] font-black' : 'text-gray-200 hover:text-[var(--primary-gold)]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-between pt-3 border-t border-white/20">
            <button
              onClick={() => {
                toggleLang();
                setIsOpen(false);
              }}
              className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 text-[#FFD700] border border-[#FFD700]/40 flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'te' ? 'Switch to English' : 'తెలుగులోకి మార్చు'}</span>
            </button>

            <a href="#donation" onClick={() => setIsOpen(false)} className="btn-gold text-xs py-2 px-4">
              {t.nav.donateBtn}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
