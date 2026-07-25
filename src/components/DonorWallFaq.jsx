import React, { useState } from 'react';
import { Search, Heart, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

export default function DonorWallFaq({ t }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const filteredDonors = t.donorWall.donors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.seva.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="donorwall" className="py-16 md:py-24 relative bg-[#090914]">
      <div className="container mx-auto px-4">
        
        {/* Donor Wall Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-tag">
            <Heart className="w-4 h-4 text-[var(--primary-saffron)]" />
            {t.donorWall.tag}
          </span>
          <h2 className="section-title text-white heading-telugu">
            <span className="heading-gold">{t.donorWall.title}</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            {t.donorWall.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <input
            type="text"
            placeholder="దాత పేరు లేదా గ్రామం వెతకండి (Search Donor Name)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#3A0A11] border-2 border-[var(--primary-gold)]/60 text-white rounded-full py-3 px-5 pl-12 text-sm focus:outline-none focus:border-[var(--primary-gold)] shadow-xl"
          />
          <Search className="w-5 h-5 text-[var(--primary-gold)] absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Donors Table (Chronological Order: 1st Donor on Top) */}
        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border-2 border-[var(--primary-gold)]/60 shadow-2xl bg-[#2A060B] mb-20">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-200">
              <thead className="bg-[#5C121E] text-[var(--primary-gold)] font-bold text-xs uppercase tracking-wider border-b border-[var(--primary-gold)]/50">
                <tr>
                  <th className="py-3.5 px-4 text-center">#</th>
                  <th className="py-3.5 px-4">తేదీ (Received Date)</th>
                  <th className="py-3.5 px-4">దాత పేరు (Donor Name)</th>
                  <th className="py-3.5 px-4">గ్రామం (Village/City)</th>
                  <th className="py-3.5 px-4">సేవా విభాగం</th>
                  <th className="py-3.5 px-4 text-right">మొత్తం (Amount)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredDonors.map((donor, idx) => (
                  <tr key={idx} className="hover:bg-white/10 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-gray-400">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-amber-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{donor.date}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white heading-telugu">
                      {donor.name}
                    </td>
                    <td className="py-3.5 px-4 text-gray-300 text-xs">
                      {donor.city}
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <span className="bg-[#5C121E] text-[#FFD700] px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-[#FFD700]/30">
                        {donor.seva}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-[var(--primary-gold)] font-mono text-base">
                      {donor.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="section-tag">{t.faq.tag}</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white heading-telugu">
              {t.faq.title}
            </h3>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((item, idx) => (
              <div key={idx} className="gold-card !p-5 cursor-pointer" onClick={() => toggleFaq(idx)}>
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-base font-bold text-white heading-telugu">
                    {item.q}
                  </h4>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[var(--primary-gold)] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--primary-gold)] flex-shrink-0" />
                  )}
                </div>

                {openFaq === idx && (
                  <p className="mt-3 text-xs md:text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-3">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
