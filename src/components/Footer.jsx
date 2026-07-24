import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export default function Footer({ t, onOpenCert }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080811] border-t border-[var(--border-gold)] pt-12 pb-8 relative overflow-hidden">
      
      {/* Devotional Banner Bar */}
      <div className="bg-gradient-to-r from-[var(--sacred-maroon)] via-[#3D0C13] to-[var(--sacred-maroon)] py-4 border-y border-[var(--border-gold)] text-center mb-10 shadow-lg">
        <p className="text-base md:text-xl font-bold text-[var(--primary-gold-light)] heading-telugu tracking-wide px-4">
          {t.footer.slogan}
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[var(--primary-saffron)] via-[var(--primary-gold)] to-[var(--primary-saffron-dark)] shadow-md shrink-0">
                <img
                  src="/assets/logo.jpg"
                  alt="Sri Rama Seva Committee Logo"
                  className="w-full h-full object-cover rounded-full border border-amber-300/40"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white heading-telugu">
                  {t.nav.title}
                </h3>
                <p className="text-xs text-[var(--primary-gold)] font-medium">
                  పామినివాండ్లవూరు • Paminivandla Vooru
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 max-w-md leading-relaxed mb-4">
              మన ఊరిలో శ్రీ రామాలయ నిర్మాణం మరియు సేవా కార్యక్రమాలను నిర్వహించుటయే మా లక్ష్యం. ఈ పవిత్ర కార్యక్రమంలో ప్రతి ఒక్కరూ భాగస్వాములు కావాలని మనస్పూర్తిగా కోరుతున్నాము.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[var(--border-gold)] text-[11px] text-[var(--primary-gold-light)]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {t.footer.regdNotice}
            </div>
          </div>

          {/* Quick Links (4 Cols) */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              త్వరిత లింకులు (Quick Links)
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              <li><a href="#home" className="text-gray-300 hover:text-[var(--primary-gold)]">హోమ్ (Home)</a></li>
              <li><a href="#timings" className="text-gray-300 hover:text-[var(--primary-gold)]">పూజా సమయాలు</a></li>
              <li><a href="#objectives" className="text-gray-300 hover:text-[var(--primary-gold)]">ముఖ్య ఉద్దేశాలు</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-[var(--primary-gold)]">నిర్మాణ చిత్రాలు</a></li>
              <li><a href="#committee" className="text-gray-300 hover:text-[var(--primary-gold)]">కమిటీ సభ్యులు</a></li>
              <li><a href="#donation" className="text-gray-300 hover:text-[var(--primary-gold)]">విరాళాలు & బ్యాంకు</a></li>
              <li><a href="#location" className="text-gray-300 hover:text-[var(--primary-gold)]">ఆలయ ప్రాంతం</a></li>
            </ul>
          </div>

          {/* Bank Summary (3 Cols) */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              బ్యాంకు సారాంశం
            </h4>
            <div className="text-xs text-gray-300 space-y-1 font-mono bg-black/40 p-3 rounded-xl border border-white/5">
              <p className="text-[var(--primary-gold-light)] font-bold">SBI Account</p>
              <p>No: <strong className="text-white">45274946370</strong></p>
              <p>IFSC: <strong className="text-white">SBIN0005691</strong></p>
              <p>UPI: <strong className="text-[var(--primary-saffron)]">8431806098@ibl</strong></p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>{t.footer.rights}</p>
          
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white/10 hover:bg-[var(--primary-saffron)] text-white transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
