import React from 'react';
import { HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

export default function TimingsSevas({ t }) {
  return (
    <section id="sevas" className="py-16 md:py-24 relative bg-[#090914]">
      <div className="container mx-auto px-4">
        
        {/* Seva Packages & Schemes Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-tag">
            <HeartHandshake className="w-4 h-4 text-[var(--primary-saffron)]" />
            {t.sevas.tag}
          </span>
          <h2 className="section-title text-white heading-telugu">
            <span className="heading-saffron">{t.sevas.title}</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            {t.sevas.subtitle}
          </p>
        </div>

        {/* Seva Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.sevas.items.map((seva, idx) => (
            <div key={idx} className="gold-card flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary-gold)] bg-[var(--sacred-maroon)] px-2.5 py-0.5 rounded-full border border-[var(--border-gold)]">
                    {seva.badge}
                  </span>
                  <Sparkles className="w-4 h-4 text-[var(--primary-saffron)]" />
                </div>

                <h3 className="text-lg font-bold text-white heading-telugu mb-2 group-hover:text-[var(--primary-gold-light)] transition-colors">
                  {seva.title}
                </h3>

                <div className="text-xl font-extrabold text-[var(--primary-saffron)] font-mono mb-3">
                  {seva.amount}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {seva.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a href="#donation" className="btn-gold w-full text-xs !py-2 justify-between">
                  <span>సేవలో భాగస్వామి అవ్వండి</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
