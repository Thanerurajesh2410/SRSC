import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import HeroSlideshow from './HeroSlideshow';

export default function HeroBanner({ t }) {
  return (
    <section id="hero" className="relative pt-6 pb-16 md:py-20 overflow-hidden">
      {/* Background Glowing Halo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/20 to-orange-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        
        {/* Top Header Badge & Slogan */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-extrabold bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700]/70 shadow-xl mb-4 animate-bounce">
            <span>🚩</span>
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black heading-telugu leading-tight mb-3">
            <span className="heading-gold">{t.hero.title}</span>
          </h1>

          <p className="text-lg md:text-2xl font-bold text-[var(--primary-saffron)] heading-telugu mb-2">
            "{t.hero.slogan}"
          </p>

          <p className="text-sm md:text-lg font-semibold text-amber-200/90 italic mb-4">
            {t.hero.subSlogan}
          </p>
        </div>

        {/* 📸 Photos Slideshow right at the starting of the page */}
        <HeroSlideshow t={t} />

        {/* Description & Call to Action Buttons */}
        <div className="max-w-3xl mx-auto text-center mt-8">
          <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-8 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#donation" className="btn-primary text-base px-8 py-3.5 shadow-2xl">
              <Heart className="w-5 h-5 text-white animate-pulse" />
              <span>{t.hero.donateAction}</span>
            </a>

            <a href="#gallery" className="btn-outline text-base px-8 py-3.5">
              <span>{t.hero.progressAction}</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <a href="#about" className="text-amber-400 hover:text-white transition-colors animate-bounce p-2" title="Scroll Down">
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>

      </div>
    </section>
  );
}
