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
import AdminDashboard from './components/AdminDashboard';
import { CheckCircle, Palette, MessageSquare } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('te');
  const [theme, setTheme] = useState('theme-maroon');
  const [toastMessage, setToastMessage] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);

  const t = content[lang] || content.te;

  // Dynamic States for Admin Control (Donors & Committee)
  const [donorList, setDonorList] = useState(t.donorWall.donors);
  const [committeeList, setCommitteeList] = useState(t.committee.members);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Keep state synchronized on language toggle
  useEffect(() => {
    const currentT = content[lang] || content.te;
    setDonorList(currentT.donorWall.donors);
    setCommitteeList(currentT.committee.members);
  }, [lang]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("జై శ్రీరామ్! పామినివాండ్లవూరు శ్రీ రామాలయ నిర్మాణ సేవా వివరాలకై సంప్రదిస్తున్నాను.");
    window.open("https://wa.me/919866125609?text=" + text, '_blank');
  };

  // Override content dictionary with dynamic admin state
  const updatedT = {
    ...t,
    donorWall: {
      ...t.donorWall,
      donors: donorList
    },
    committee: {
      ...t.committee,
      members: committeeList
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 relative">
      
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
      <TickerMarquee t={updatedT} />

      {/* Sticky Header */}
      <Navbar lang={lang} setLang={setLang} t={updatedT} />

      {/* Main Page Content */}
      <main className="flex-grow">
        <HeroBanner t={updatedT} />
        <TimingsSevas t={updatedT} />
        <Objectives t={updatedT} />
        <ConstructionGallery t={updatedT} />
        <CommitteeMembers t={updatedT} />
        <DonationSection t={updatedT} showToast={showToast} />
        <DonorWallFaq t={updatedT} />
        <LocationContact t={updatedT} showToast={showToast} />
      </main>

      {/* Footer */}
      <Footer t={updatedT} onOpenAdmin={() => setShowAdmin(true)} />

      {/* Floating WhatsApp Action Button (Phone number hidden from text) */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 left-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.7)] border-2 border-white flex items-center gap-2 font-black text-xs transition-all transform hover:scale-105 animate-bounce"
        title="WhatsApp Support"
      >
        <MessageSquare className="w-5 h-5 fill-white text-emerald-500" />
        <span className="hidden sm:inline">WhatsApp ద్వారా సంప్రదించండి</span>
      </button>

      {/* Admin Dashboard Modal */}
      {showAdmin && (
        <AdminDashboard
          t={updatedT}
          showToast={showToast}
          donorList={donorList}
          setDonorList={setDonorList}
          committeeList={committeeList}
          setCommitteeList={setCommitteeList}
          onClose={() => setShowAdmin(false)}
        />
      )}

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
