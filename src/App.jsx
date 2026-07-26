import React, { useState, useEffect } from 'react';
import { content } from './data/content';
import { v2Content } from './v2/data/v2Content';

// V1 Components
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

// V2 Components
import V2Navbar from './v2/components/V2Navbar';
import PublicWebsite from './v2/pages/PublicWebsite';
import DevoteePortal from './v2/pages/DevoteePortal';
import TempleErpAdmin from './v2/pages/TempleErpAdmin';

import { CheckCircle, Palette, MessageSquare, Layers } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('te');
  const [theme, setTheme] = useState('theme-maroon');
  const [toastMessage, setToastMessage] = useState('');
  
  // Version Switcher State: 'v1' (Classic Site) or 'v2' (Enterprise ERP & Portal)
  const [activeVersion, setActiveVersion] = useState(() => {
    return localStorage.getItem('sri_rama_version') || 'v2';
  });

  // V2 Module Routing State: 'public-home', 'devotee-portal', 'erp-admin', etc.
  const [v2Module, setV2Module] = useState('public-home');

  // V1 Admin Modal State
  const [showAdmin, setShowAdmin] = useState(false);

  const t = content[lang] || content.te;
  const v2T = v2Content[lang] || v2Content.te;

  // Dynamic States for Donors & Committee Members
  const [donorList, setDonorList] = useState(t.donorWall.donors);
  const [committeeList, setCommitteeList] = useState(t.committee.members);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sri_rama_version', activeVersion);
  }, [activeVersion]);

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

  // Toggle Version 1 vs Version 2
  const toggleVersion = () => {
    const nextVer = activeVersion === 'v1' ? 'v2' : 'v1';
    setActiveVersion(nextVer);
    showToast(nextVer === 'v2' ? "Version 2 (Enterprise ERP & Devotee Portal) లోకి మారారు!" : "Version 1 (Classic Website) లోకి మారారు!");
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
      
      {/* 🌟 Top Version & Theme Control Bar */}
      <div className="bg-[#1A0306] border-b border-[var(--primary-gold)]/40 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 z-50">
        
        {/* Version Switcher Controller */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[#FFD700] font-black">
            <Layers className="w-4 h-4 text-[var(--primary-saffron)]" />
            <span>వర్షన్ ఎంపిక (Version Switcher):</span>
          </div>

          <div className="inline-flex rounded-full bg-black/60 p-0.5 border border-[#FFD700]/50">
            <button
              onClick={() => { setActiveVersion('v1'); showToast("Version 1 లోకి మారారు!"); }}
              className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                activeVersion === 'v1'
                  ? 'bg-[#5C121E] text-[#FFD700] border border-[#FFD700] shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              V1 (Classic Site)
            </button>

            <button
              onClick={() => { setActiveVersion('v2'); showToast("Version 2 (ERP Suite) లోకి మారారు!"); }}
              className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                activeVersion === 'v2'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border border-yellow-300 shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              V2 (ERP & Devotee Portal) 🚀
            </button>
          </div>
        </div>

        {/* Dynamic Color Theme Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-[var(--primary-gold-light)] font-bold">
            <Palette className="w-3.5 h-3.5 text-[var(--primary-saffron)]" />
            <span className="hidden sm:inline">థీమ్స్:</span>
          </div>

          <button
            onClick={() => setTheme('theme-maroon')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
              theme === 'theme-maroon' ? 'bg-[#5C121E] text-[#FFD700] border border-[#FFD700]' : 'bg-white/10 text-gray-300'
            }`}
          >
            1. Maroon
          </button>

          <button
            onClick={() => setTheme('theme-cream')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
              theme === 'theme-cream' ? 'bg-[#FFFDF0] text-[#5C121E] border border-[#5C121E]' : 'bg-white/10 text-gray-300'
            }`}
          >
            2. Cream
          </button>

          <button
            onClick={() => setTheme('theme-saffron')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
              theme === 'theme-saffron' ? 'bg-[#E65100] text-[#FFD700] border border-[#FFD700]' : 'bg-white/10 text-gray-300'
            }`}
          >
            3. Saffron
          </button>
        </div>
      </div>

      {/* 🚀 VERSION 1: CLASSIC TEMPLE WEBSITE */}
      {activeVersion === 'v1' ? (
        <>
          <TickerMarquee t={updatedT} />
          <Navbar lang={lang} setLang={setLang} t={updatedT} />
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
          <Footer t={updatedT} onOpenAdmin={() => setShowAdmin(true)} />

          {/* V1 Admin Modal */}
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
        </>
      ) : (
        /* 🚀 VERSION 2: ENTERPRISE SRI RAMALAYAM ERP & DEVOTEE PORTAL */
        <>
          <V2Navbar
            activeModule={v2Module}
            setActiveModule={setV2Module}
            lang={lang}
            setLang={setLang}
            t={updatedT}
            v2T={v2T}
            onToggleVersion={toggleVersion}
          />

          <main className="flex-grow">
            {v2Module.startsWith('public') && (
              <PublicWebsite
                t={updatedT}
                v2T={v2T}
                showToast={showToast}
                subSection={v2Module.replace('public-', '')}
                setSubSection={(sec) => setV2Module(`public-${sec}`)}
              />
            )}

            {v2Module === 'devotee-portal' && (
              <DevoteePortal t={updatedT} showToast={showToast} />
            )}

            {v2Module === 'erp-admin' && (
              <TempleErpAdmin
                t={updatedT}
                v2T={v2T}
                showToast={showToast}
                donorList={donorList}
                setDonorList={setDonorList}
                committeeList={committeeList}
                setCommitteeList={setCommitteeList}
              />
            )}
          </main>

          <Footer t={updatedT} onOpenAdmin={() => setV2Module('erp-admin')} />
        </>
      )}

      {/* Floating WhatsApp Action Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 left-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.7)] border-2 border-white flex items-center gap-2 font-black text-xs transition-all transform hover:scale-105 animate-bounce"
        title="WhatsApp Support"
      >
        <MessageSquare className="w-5 h-5 fill-white text-emerald-500" />
        <span className="hidden sm:inline">WhatsApp ద్వారా సంప్రదించండి</span>
      </button>

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
