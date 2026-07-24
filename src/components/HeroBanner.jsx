import React, { useState } from 'react';
import { Heart, Sparkles, Image as ImageIcon, ShieldCheck, Award, Maximize2, X } from 'lucide-react';

export default function HeroBanner({ t, onOpenCert }) {
  const [showBannerModal, setShowBannerModal] = useState(false);

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial from-[rgba(255,153,51,0.18)] via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Top Regd Badge & Logo Emblem Header */}
        <div className="flex flex-col items-center mb-8">
          
          {/* Large Emblem Logo Badge */}
          <div className="relative mb-4 group cursor-pointer" onClick={() => setShowBannerModal(true)}>
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-[var(--primary-saffron)] via-[var(--primary-gold)] to-[var(--primary-saffron-dark)] shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-transform duration-500 group-hover:scale-105">
              <img
                src="/assets/logo.jpg"
                alt="Official Sri Rama Seva Committee Logo Emblem"
                className="w-full h-full object-cover rounded-full border-2 border-amber-300/50"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[var(--sacred-maroon)] text-[var(--primary-gold-light)] text-[11px] font-bold px-3 py-0.5 rounded-full border border-[var(--border-gold)] shadow-md whitespace-nowrap">
              పామినివాండ్లవూరు
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--sacred-maroon)]/80 border border-[var(--primary-gold)] text-[var(--primary-gold-light)] text-xs md:text-sm font-semibold shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[var(--primary-saffron)]" />
            <span>{t.hero.badge}</span>
          </div>
        </div>

        {/* Hero Title & Slogans */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 heading-telugu">
            <span className="heading-saffron">{t.hero.title}</span>
          </h1>

          <div className="inline-block p-4 my-2 rounded-2xl bg-gradient-to-r from-[var(--sacred-maroon)] via-[#2D0A10] to-[var(--sacred-maroon)] border border-[var(--border-gold)] shadow-2xl">
            <p className="text-lg md:text-2xl font-bold text-[var(--primary-gold-light)] heading-telugu">
              "{t.hero.slogan}"
            </p>
            <p className="text-sm md:text-base text-[var(--primary-saffron)] font-medium mt-1">
              {t.hero.subSlogan}
            </p>
          </div>

          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mt-4 leading-relaxed">
            {t.hero.desc}
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a href="#donation" className="btn-primary">
              <Heart className="w-5 h-5 fill-white" />
              <span>{t.hero.donateAction}</span>
            </a>
            <a href="#gallery" className="btn-gold">
              <ImageIcon className="w-5 h-5" />
              <span>{t.hero.progressAction}</span>
            </a>
            <button onClick={onOpenCert} className="btn-outline">
              <Award className="w-5 h-5 text-[var(--primary-gold)]" />
              <span>{t.hero.certAction}</span>
            </button>
          </div>
        </div>

        {/* Featured Official Banner Card */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="gold-card !p-3 group relative cursor-pointer" onClick={() => setShowBannerModal(true)}>
            <div className="relative rounded-xl overflow-hidden border border-[var(--border-gold)] bg-black/40">
              <img
                src="/assets/banner.jpg"
                alt="Sri Rama Seva Committee Official Banner"
                className="w-full h-auto object-cover max-h-[600px] transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                <span className="text-white font-semibold text-sm flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-[var(--primary-gold)]" />
                  Click to View Full Size Banner & Details
                </span>
                <span className="bg-[var(--primary-saffron)] text-white text-xs px-3 py-1 rounded-full font-bold">
                  REGD NO: 125 OF 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10">
          <div className="gold-card !p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-[var(--primary-gold)] font-mono">125 OF 2026</div>
            <div className="text-xs text-gray-300 mt-1">Govt Registered Society</div>
          </div>
          <div className="gold-card !p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-[var(--primary-saffron)]">గ్రానైట్ రాతి ఆలయం</div>
            <div className="text-xs text-gray-300 mt-1">Granite Stone Architecture</div>
          </div>
          <div className="gold-card !p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-[var(--primary-gold)]">పామినివాండ్లవూరు</div>
            <div className="text-xs text-gray-300 mt-1">Bangarupalem, Chittoor</div>
          </div>
          <div className="gold-card !p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-[var(--primary-saffron)]">7+ పాలక వర్గం</div>
            <div className="text-xs text-gray-300 mt-1">Dedicated Committee</div>
          </div>
        </div>

      </div>

      {/* Fullsize Banner Modal */}
      {showBannerModal && (
        <div className="modal-overlay" onClick={() => setShowBannerModal(false)}>
          <div className="modal-content !max-w-4xl" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBannerModal(false)}>
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-[var(--primary-gold-light)] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--primary-saffron)]" />
              అధికారిక శ్రీ రామాలయం ఫ్లెక్సి బ్యానర్ (Official Banner)
            </h3>
            <div className="rounded-xl overflow-hidden border border-[var(--border-gold)]">
              <img
                src="/assets/banner.jpg"
                alt="Sri Rama Seva Committee Full Banner"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
