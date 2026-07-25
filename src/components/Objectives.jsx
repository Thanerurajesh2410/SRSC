import React from 'react';
import { Building, Heart, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Objectives({ t }) {
  const iconMap = {
    Building: Building,
    Heart: Heart,
    Users: Users,
    Sparkles: Sparkles
  };

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="section-tag">
            <Sparkles className="w-4 h-4 text-[var(--primary-saffron)]" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.objectives.items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <div key={idx} className="gold-card flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--sacred-crimson)] to-[#2A060B] border border-[var(--primary-gold)]/60 flex items-center justify-center text-[var(--primary-gold)] mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white heading-telugu mb-2 group-hover:text-[var(--primary-gold-light)] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[var(--primary-saffron)] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>శ్రీ రామ సేవ</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
