import React, { useState, useEffect } from 'react';
import { content } from './data/content';
import TickerMarquee from './components/TickerMarquee';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import TimingsSevas from './components/TimingsSevas';
import Objectives from './components/Objectives';
import ConstructionGallery from './components/ConstructionGallery';
import CommitteeMembers from './components/CommitteeMembers';
import DonationSection from './components/DonationSection';
import DonorWallFaq from './components/DonorWallFaq';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import { CheckCircle, Palette } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('te');
  const [theme, setTheme] = useState('theme-maroon');
  const [toastMessage, setToastMessage] = useState('');

  const t = content[lang] || content.te;

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500">
      
      {/* Dynamic Theme Selector Toolbar for User Selection */}
      <div className="bg-[#1A0306] border-b border-[var(--primary-gold)]/40 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 z-50">
        <div className="flex items-center gap-2 text-[var(--primary-gold-light)] font-bold">
          <Palette className="w-4 h-4 text-[var(--primary-saffron)]" />
          <span>కలర్ థీమ్స్ (Select Background Theme):</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTheme('theme-maroon')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              theme === 'theme-maroon'
                ? 'bg-[#5C121E] text-[#FFD700] border border-[#FFD700] shadow-md scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-[#5C121E] border border-[#FFD700]"></span>
            1. Sacred Maroon & Gold (రాయల్ కుంకుమ)
          </button>

          <button
            onClick={() => setTheme('theme-cream')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              theme === 'theme-cream'
                ? 'bg-[#FFFDF0] text-[#5C121E] border border-[#5C121E] shadow-md scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-[#FFFDF0] border border-[#5C121E]"></span>
            2. Sandalwood Cream (చందనం & ఐవరీ)
          </button>

          <button
            onClick={() => setTheme('theme-saffron')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              theme === 'theme-saffron'
                ? 'bg-[#E65100] text-[#FFD700] border border-[#FFD700] shadow-md scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-[#FF9933] border border-[#FFD700]"></span>
            3. Golden Saffron (పవిత్ర కాంతి)
          </button>

          <button
            onClick={() => setTheme('theme-navy')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              theme === 'theme-navy'
                ? 'bg-[#1C2541] text-[#FFD700] border border-[#FFD700] shadow-md scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-[#1C2541] border border-[#FFD700]"></span>
            4. Midnight Royal Navy (నీలాంబర సేవ)
          </button>
        </div>
      </div>

      {/* Live Announcement Marquee Ticker */}
      <TickerMarquee t={t} />

      {/* Sticky Header */}
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Main Page Content */}
      <main className="flex-grow">
        <HeroBanner t={t} />
        <TimingsSevas t={t} />
        <Objectives t={t} />
        <ConstructionGallery t={t} />
        <CommitteeMembers t={t} />
        <DonationSection t={t} showToast={showToast} />
        <DonorWallFaq t={t} />
        <LocationContact t={t} showToast={showToast} />
      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
