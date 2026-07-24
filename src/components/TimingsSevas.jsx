import React from 'react';
import { Clock, Sun, HeartHandshake, Flame, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

export default function TimingsSevas({ t }) {
  return (
    <section id="timings" className="py-16 md:py-24 relative bg-[#090914]">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-tag">
            <Clock className="w-4 h-4 text-[var(--primary-gold)]" />
            {t.timings.tag}
          </span>
          <h2 className="section-title text-white heading-telugu">
            <span className="heading-gold">{t.timings.title}</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            {t.timings.subtitle}
          </p>
        </div>

        {/* Timings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-20">
          {t.timings.schedules.map((sched, idx) => (
            <div key={idx} className="gold-card !p-5 text-center flex flex-col justify-between group hover:border-[var(--primary-saffron)]">
              <div>
                <div className="w-12 h-12 rounded-full bg-[var(--sacred-maroon)] border border-[var(--border-gold)] mx-auto flex items-center justify-center text-[var(--primary-saffron)] mb-3 group-hover:scale-110 transition-transform">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-[var(--primary-gold)] bg-[var(--primary-gold)]/10 px-2.5 py-1 rounded-full border border-[var(--primary-gold)]/20 inline-block mb-2">
                  {sched.time}
                </span>
                <h3 className="text-sm font-bold text-white heading-telugu mb-1">
                  {sched.title}
                </h3>
              </div>
              <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                {sched.desc}
              </p>
            </div>
          ))}
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
