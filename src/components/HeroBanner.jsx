import React from 'react';
import { Wallet, Image as ImageIcon, ChevronDown, Sparkles } from 'lucide-react';

export default function HeroBanner({ t }) {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:py-20 overflow-hidden">
      {/* Background Divine Halo Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-amber-500/25 to-orange-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-extrabold bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700]/70 shadow-xl mb-4 animate-bounce">
            <span>🚩</span>
            <span>{t.hero.badge}</span>
          </div>
        </div>

        {/* 🌟 Fixed Sacred Portrait of Lord Sri Rama at top of page */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative group">
            {/* Outer Glowing Golden Aura Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />
            
            {/* Fixed Lord Rama Emblem Image */}
            <img
              src="/assets/logo.jpg"
              alt="Lord Sri Rama Divine Portrait"
              className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-[#FFD700] shadow-[0_0_50px_rgba(255,215,0,0.6)] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />

            {/* Sacred Lotus Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] px-4 py-1 rounded-full text-xs font-black shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 fill-[#FFD700]" />
              <span>॥ జై శ్రీ రామ్ ॥</span>
            </div>
          </div>
        </div>

        {/* Titles & Slogans */}
        <div className="max-w-4xl mx-auto text-center mt-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black heading-telugu leading-tight mb-3">
            <span className="heading-gold">{t.hero.title}</span>
          </h1>

          <p className="text-lg md:text-2xl font-extrabold text-[var(--primary-saffron)] heading-telugu mb-2">
            "{t.hero.slogan}"
          </p>

          <p className="text-sm md:text-lg font-semibold text-amber-200/90 italic mb-6">
            {t.hero.subSlogan}
          </p>

          <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-8 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg max-w-3xl mx-auto">
            {t.hero.desc}
          </p>

          {/* Highlighted E-Hundi CTA & Gallery Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Highlighted E-Hundi Button */}
            <a href="#donation" className="btn-primary text-base px-8 py-4 shadow-[0_0_35px_rgba(230,81,0,0.7)] border-2 border-amber-300 animate-pulse">
              <Wallet className="w-6 h-6 text-yellow-300" />
              <span>{t.hero.eHundiBtn}</span>
            </a>

            {/* View Photos Gallery Button */}
            <a href="#gallery" className="btn-outline text-base px-8 py-4">
              <ImageIcon className="w-5 h-5 text-amber-300" />
              <span>{t.hero.galleryBtn}</span>
            </a>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center mt-12">
          <a href="#about" className="text-amber-400 hover:text-white transition-colors animate-bounce p-2" title="Scroll Down">
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>

      </div>
    </section>
  );
}
