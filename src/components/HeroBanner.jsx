import React from 'react';
import { Wallet, Image as ImageIcon, ChevronDown, Sparkles } from 'lucide-react';
import { getAssetUrl, getActiveLogo } from '../v2/data/v2Database';

export default function HeroBanner({ t }) {
  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-[92vh] flex flex-col justify-center pt-16 pb-24 md:py-32 overflow-hidden sacred-temple-bg-masked">
      {/* Background Divine Halo Light Mask Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-amber-500/40 via-orange-600/30 to-yellow-400/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm md:text-base font-black bg-[#5C121E]/95 text-[#FFD700] border-3 border-[#FFD700] shadow-[0_0_35px_rgba(255,215,0,0.6)] mb-4 animate-bounce">
            <span className="text-lg">🚩</span>
            <span>{t.hero.badge}</span>
          </div>
        </div>

        {/* 🌟 Fixed Sacred Portrait of Lord Sri Rama with Divine Glow Halo - Taller & Larger */}
        <div className="flex flex-col items-center justify-center my-8">
          <div className="relative group">
            {/* Outer Glowing Golden Aura Ring */}
            <div className="absolute -inset-8 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 rounded-full blur-3xl opacity-85 group-hover:opacity-100 transition duration-1000 animate-pulse" />
            
            {/* Fixed Lord Rama Emblem Image */}
            <img
              src={getActiveLogo()}
              alt="Lord Sri Rama Divine Portrait"
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-88 md:h-88 lg:w-96 lg:h-96 rounded-full border-4 md:border-6 border-[#FFD700] shadow-[0_0_80px_rgba(255,215,0,0.85)] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />

            {/* Sacred Lotus Badge */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#5C121E] via-[#800E20] to-[#5C121E] text-[#FFD700] border-2 md:border-3 border-[#FFD700] px-6 py-2 rounded-full text-sm md:text-base font-black shadow-2xl flex items-center gap-2 whitespace-nowrap">
              <Sparkles className="w-5 h-5 fill-[#FFD700]" />
              <span>॥ జై శ్రీ రామ్ ॥</span>
            </div>
          </div>
        </div>

        {/* Titles & Slogans */}
        <div className="max-w-5xl mx-auto text-center mt-10">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black heading-telugu leading-tight mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            <span className="heading-gold">{t.hero.title}</span>
          </h1>

          <p className="text-xl md:text-3xl font-extrabold text-[var(--primary-saffron)] heading-telugu mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            "{t.hero.slogan}"
          </p>

          <p className="text-base md:text-xl font-semibold text-amber-200/90 italic mb-8">
            {t.hero.subSlogan}
          </p>

          <p className="text-base md:text-xl text-gray-100 leading-relaxed mb-10 bg-black/70 backdrop-blur-md p-8 rounded-3xl border-2 md:border-3 border-[#FFD700]/50 shadow-2xl max-w-4xl mx-auto">
            {t.hero.desc}
          </p>

          {/* Highlighted E-Hundi CTA & Gallery Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            {/* Highlighted E-Hundi Button */}
            <a href="#donation" className="btn-primary text-lg md:text-xl px-10 py-4.5 shadow-[0_0_40px_rgba(230,81,0,0.9)] border-2 border-amber-300 animate-pulse rounded-2xl">
              <Wallet className="w-6 h-6 text-yellow-300" />
              <span>{t.hero.eHundiBtn}</span>
            </a>

            {/* View Photos Gallery Button */}
            <a href="#gallery" className="btn-outline text-lg md:text-xl px-10 py-4.5 rounded-2xl">
              <ImageIcon className="w-6 h-6 text-amber-300" />
              <span>{t.hero.galleryBtn}</span>
            </a>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center mt-16">
          <a href="#about" className="text-amber-400 hover:text-white transition-colors animate-bounce p-3" title="Scroll Down">
            <ChevronDown className="w-10 h-10" />
          </a>
        </div>

      </div>
    </section>
  );
}
