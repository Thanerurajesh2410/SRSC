import React from 'react';
import { Building, Flame, Heart, Users, Sparkles, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Building: Building,
  Flame: Flame,
  Heart: Heart,
  Users: Users,
  Sparkles: Sparkles
};

export default function Objectives({ t }) {
  return (
    <section id="objectives" className="py-16 md:py-24 relative bg-[#0B0B14]/80">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-tag">
            <Sparkles className="w-4 h-4" />
            {t.objectives.tag}
          </span>
          <h2 className="section-title text-white heading-telugu">
            <span className="heading-gold">{t.objectives.title}</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            {t.objectives.subtitle}
          </p>
        </div>

        {/* Objectives Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.objectives.items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || CheckCircle2;
            return (
              <div key={idx} className="gold-card flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[var(--sacred-maroon)] to-[var(--primary-saffron-dark)] border border-[var(--border-gold)] flex items-center justify-center text-[var(--primary-gold)] mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-[var(--primary-saffron)] font-mono bg-[var(--primary-saffron)]/10 px-2 py-0.5 rounded border border-[var(--primary-saffron)]/20">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white heading-telugu group-hover:text-[var(--primary-gold-light)] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-[var(--primary-gold)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary-saffron)]" />
                  కమిటీ ప్రాథమిక సంకల్పం
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
