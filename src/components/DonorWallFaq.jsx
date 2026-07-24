import React, { useState } from 'react';
import { Award, ChevronDown, HelpCircle, Heart, Search, ShieldCheck } from 'lucide-react';

export default function DonorWallFaq({ t }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDonors = t.donorWall.donors.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        
        {/* Donor Wall Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="section-tag">
              <Award className="w-4 h-4 text-[var(--primary-gold)]" />
              {t.donorWall.tag}
            </span>
            <h2 className="section-title text-white heading-telugu">
              <span className="heading-gold">{t.donorWall.title}</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              {t.donorWall.subtitle}
            </p>
          </div>

          <div className="gold-card !p-6">
            {/* Search Input */}
            <div className="mb-6 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="దాత పేరు లేదా గ్రామం వెతకండి (Search Donor Name / Village)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-[var(--border-gold)] rounded-xl pl-11 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--primary-saffron)]"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-gold)] text-[var(--primary-gold)] font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">దాత పేరు (Donor Name)</th>
                    <th className="py-3 px-4">ప్రాంతం (City/Village)</th>
                    <th className="py-3 px-4">సేవా వివరాలు (Seva Category)</th>
                    <th className="py-3 px-4 text-right">మొత్తం (Amount)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-200 font-medium">
                  {filteredDonors.map((donor, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-bold text-white heading-telugu flex items-center gap-2">
                        <Heart className="w-3.5 h-3.5 text-[var(--primary-saffron)] fill-[var(--primary-saffron)] shrink-0" />
                        {donor.name}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{donor.city}</td>
                      <td className="py-3 px-4 text-[var(--primary-gold-light)] font-medium">
                        {donor.seva}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-400 font-mono text-sm">
                        {donor.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
              <span>* అధికారిక బ్యాంక్ విరాళాల ఆధారంగా నమోదు చేయబడిన వివరాలు</span>
              <span className="flex items-center gap-1 text-[var(--primary-gold)]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% నమ్మకమైన సమాచారం
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-tag">
              <HelpCircle className="w-4 h-4 text-[var(--primary-saffron)]" />
              {t.faq.tag}
            </span>
            <h2 className="section-title text-white heading-telugu">
              <span className="heading-saffron">{t.faq.title}</span>
            </h2>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="gold-card !p-5 cursor-pointer" onClick={() => setOpenFaq(isOpen ? null : idx)}>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-bold text-white heading-telugu flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[var(--primary-saffron)]/20 text-[var(--primary-saffron)] text-xs flex items-center justify-center font-bold font-mono">
                        Q
                      </span>
                      {item.q}
                    </h3>
                    <ChevronDown className={`w-5 h-5 text-[var(--primary-gold)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {isOpen && (
                    <p className="mt-3 pt-3 border-t border-white/10 text-xs md:text-sm text-gray-300 leading-relaxed pl-8">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
