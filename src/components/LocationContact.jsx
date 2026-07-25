import React, { useState } from 'react';
import { MapPin, Navigation, Mail, MessageSquare, Send } from 'lucide-react';

export default function LocationContact({ t, showToast }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) return;

    // Trigger direct mailto to sriramasevacommitteepvv@gmail.com
    const subject = encodeURIComponent(`శ్రీ రామా సేవా కమిటీ సంప్రదింపు సందేశం - ${name}`);
    const body = encodeURIComponent(
      `పేరు: ${name}\nఫోన్ నంబర్: ${phone || 'N/A'}\nఇమెయిల్: ${email || 'N/A'}\n\nసందేశం:\n${message}`
    );

    window.location.href = `mailto:sriramasevacommitteepvv@gmail.com?subject=${subject}&body=${body}`;

    showToast("ఇమెయిల్ క్లయింట్ తెరవబడుతోంది...");
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("జై శ్రీరామ్! పామినివాండ్లవూరు శ్రీ రామాలయ నిర్మాణ సేవా వివరాలకై సంప్రదిస్తున్నాను.");
    window.open(`https://wa.me/919866125609?text=${text}`, '_blank');
  };

  return (
    <section id="location" className="py-16 md:py-24 relative bg-[#090914]">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="section-tag">
            <MapPin className="w-4 h-4 text-[var(--primary-saffron)]" />
            {t.location.tag}
          </span>
          <h2 className="section-title text-white heading-telugu">
            <span className="heading-gold">{t.location.title}</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            {t.location.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Address & Quick Contacts Card */}
          <div className="gold-card flex flex-col justify-between border-2 border-[var(--primary-gold)]/60">
            <div>
              <h3 className="text-2xl font-black text-white heading-telugu mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[var(--primary-saffron)]" />
                <span>{t.location.addressTitle}</span>
              </h3>

              <div className="space-y-2 text-sm md:text-base text-gray-200 mb-8 bg-black/40 p-5 rounded-2xl border border-white/10">
                {t.location.addressLines.map((line, idx) => (
                  <p key={idx} className={idx === 0 ? "font-bold text-[var(--primary-gold)] text-base" : ""}>
                    {line}
                  </p>
                ))}
              </div>

              {/* Contact Email & WhatsApp Direct Links (Phone Number Hidden) */}
              <div className="space-y-4 mb-8">
                {/* Official Email */}
                <a
                  href="mailto:sriramasevacommitteepvv@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-black/50 border border-white/10 hover:border-[var(--primary-gold)] transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-[#5C121E] text-[#FFD700]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 font-bold block uppercase">అధికారిక ఇమెయిల్ (Official Email)</span>
                    <span className="text-sm font-bold text-white font-mono group-hover:text-[var(--primary-gold)] transition-colors">
                      sriramasevacommitteepvv@gmail.com
                    </span>
                  </div>
                </a>

                {/* WhatsApp Support Button (Text Phone Number Hidden) */}
                <div
                  onClick={openWhatsApp}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/50 hover:border-emerald-400 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-600 text-white shadow-lg">
                      <MessageSquare className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <span className="text-[11px] text-emerald-300 font-bold block uppercase">వాట్సాప్ సహాయక నిధి (WhatsApp Support)</span>
                      <span className="text-sm font-extrabold text-white">
                        వాట్సాప్‌లో నేరుగా సందేశం పంపండి (Chat on WhatsApp)
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-emerald-950 bg-emerald-400 px-3.5 py-1.5 rounded-full shadow-md group-hover:scale-105 transition-transform">
                    Chat Now 💬
                  </span>
                </div>
              </div>
            </div>

            {/* Google Maps External Action Button */}
            <div className="pt-4 border-t border-white/10">
              <a
                href={t.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-sm py-3 justify-center shadow-xl"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.location.openMapsBtn}</span>
              </a>
            </div>
          </div>

          {/* Contact Form sending Email to sriramasevacommitteepvv@gmail.com */}
          <div className="gold-card border-2 border-[var(--primary-gold)]/60">
            <h3 className="text-2xl font-black text-white heading-telugu mb-2 flex items-center gap-2">
              <Mail className="w-6 h-6 text-[var(--primary-gold)]" />
              <span>{t.location.contactTitle}</span>
            </h3>
            <p className="text-xs text-gray-300 mb-6">
              మీ సందేశం నేరుగా sriramasevacommitteepvv@gmail.com కు ఇమెయిల్ రూపంలో పంపబడుతుంది.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{t.location.formName} *</label>
                <input
                  type="text"
                  required
                  placeholder="మీ పేరు"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1A0306] border border-white/20 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[var(--primary-gold)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">{t.location.formPhone}</label>
                  <input
                    type="tel"
                    placeholder="ఫోన్ నంబర్"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1A0306] border border-white/20 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[var(--primary-gold)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">{t.location.formEmail}</label>
                  <input
                    type="email"
                    placeholder="ఇమెయిల్ అడ్రస్"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A0306] border border-white/20 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[var(--primary-gold)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{t.location.formMessage} *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="మీ సందేశాన్ని ఇక్కడ టైప్ చేయండి..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#1A0306] border border-white/20 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[var(--primary-gold)] resize-none"
                />
              </div>

              <button type="submit" className="btn-gold w-full py-3 text-sm font-extrabold shadow-xl">
                <Send className="w-4 h-4" />
                <span>{t.location.formSubmit}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
