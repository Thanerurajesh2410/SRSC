import React, { useState } from 'react';
import { MapPin, QrCode, Navigation, Send, CheckCircle2 } from 'lucide-react';

export default function LocationContact({ t, showToast }) {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    showToast('మీ సందేశం విజయవంతంగా అందజేయబడింది! (Message Sent Successfully)');
    setTimeout(() => {
      setName('');
      setPhone('');
      setMsg('');
      setFormSent(false);
    }, 4000);
  };

  const mapsUrl = t.location.mapsUrl || "https://maps.app.goo.gl/FgyzQLz4rNMFhSY98";

  return (
    <section id="location" className="py-16 md:py-24 relative bg-[#0B0B14]/80">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Address & QR Card (6 Cols) */}
          <div className="lg:col-span-6 gold-card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--sacred-maroon)] border border-[var(--border-gold)] flex items-center justify-center text-[var(--primary-gold)] shadow">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white heading-telugu">
                    {t.location.addressTitle}
                  </h3>
                  <p className="text-xs text-[var(--primary-saffron)] font-semibold">
                    పామినివాండ్లవూరు గ్రామం
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-gray-200 text-sm bg-black/40 p-5 rounded-2xl border border-white/5 mb-6">
                {t.location.addressLines.map((line, idx) => (
                  <p key={idx} className={`leading-relaxed ${idx === 0 ? 'font-bold text-[var(--primary-gold-light)] text-base' : ''}`}>
                    {line}
                  </p>
                ))}
              </div>

              {/* Location QR Code Display */}
              <div className="bg-black/30 p-4 rounded-2xl border border-[var(--border-gold)] flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl border border-[var(--primary-gold)] shrink-0">
                  <img
                    src="/assets/banner.jpg"
                    alt="Scan for Location QR"
                    className="w-20 h-20 object-cover rounded-lg object-bottom"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5 mb-1">
                    <QrCode className="w-4 h-4 text-[var(--primary-saffron)]" />
                    {t.location.qrScanTitle}
                  </h4>
                  <p className="text-xs text-gray-400">
                    Scan this QR code from your smartphone camera to get precise GPS directions to the temple site.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-gold w-full text-center"
              >
                <Navigation className="w-4 h-4" />
                {t.location.openMapsBtn}
              </a>
            </div>
          </div>

          {/* Contact Inquiry Form Card (6 Cols) */}
          <div className="lg:col-span-6 gold-card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--sacred-maroon)] border border-[var(--border-gold)] flex items-center justify-center text-[var(--primary-gold)] shadow">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white heading-telugu">
                    {t.location.contactTitle}
                  </h3>
                  <p className="text-xs text-gray-300">
                    ఆలయ నిర్మాణ సహాయం లేదా సమాచారం కోసం సంప్రదించండి
                  </p>
                </div>
              </div>

              {formSent ? (
                <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl my-auto">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-white heading-telugu">
                    సందేశం అందింది! (Message Received)
                  </h4>
                  <p className="text-xs text-gray-300 mt-2">
                    శ్రీ రామా సేవా కమిటీ ప్రతినిధులు త్వరలోనే మిమ్మల్ని సంప్రదిస్తారు. జై శ్రీ రామ్!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      {t.location.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="మీ పూర్తి పేరు"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-black/40 border border-[var(--border-gold)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--primary-saffron)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      {t.location.formPhone} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="మీ చరవాణి సంఖ్య (Phone Number)"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-black/40 border border-[var(--border-gold)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--primary-saffron)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      {t.location.formMessage} *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="మీ సలహాలు లేదా విరాళ వివరాలు..."
                      value={msg}
                      onChange={e => setMsg(e.target.value)}
                      className="w-full bg-black/40 border border-[var(--border-gold)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--primary-saffron)]"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full mt-2">
                    <Send className="w-4 h-4" />
                    {t.location.formSubmit}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
              పామినివాండ్లవూరు గ్రామం • తంబుగానిపల్లె పంచాయతీ • చిత్తూరు జిల్లా
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
