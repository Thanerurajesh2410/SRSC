import React, { useState } from 'react';
import { QrCode, Copy, Check, Sparkles, Building, ShieldCheck, Wallet } from 'lucide-react';
import { getAssetUrl, getActiveQrCode } from '../v2/data/v2Database';

export default function DonationSection({ t, showToast }) {
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedIfsc, setCopiedIfsc] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'account') {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2500);
    } else if (type === 'ifsc') {
      setCopiedIfsc(true);
      setTimeout(() => setCopiedIfsc(false), 2500);
    } else if (type === 'upi') {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
    showToast(t.donation.copiedMsg);
  };

  return (
    <section id="donation" className="py-16 md:py-24 relative bg-[#090914]">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 to-orange-600 text-white border-2 border-yellow-300 shadow-xl mb-4 animate-pulse">
            <Wallet className="w-4 h-4 fill-yellow-200" />
            <span>{t.donation.hundiBadge}</span>
          </div>

          <h2 className="section-title text-white heading-telugu">
            <span className="heading-gold">{t.donation.title}</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            {t.donation.subtitle}
          </p>
        </div>

        {/* 📢 Important Announcement Banner Card */}
        <div className="gold-card max-w-6xl mx-auto bg-gradient-to-r from-[#5C121E] via-[#3A0A11] to-[#5C121E] border-3 border-[#FFD700] !p-6 sm:!p-8 rounded-3xl shadow-2xl relative overflow-hidden mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#FFD700] text-[#5C121E] font-black shrink-0 shadow-lg">
              <Sparkles className="w-8 h-8 fill-[#5C121E]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-black text-[#FFD700] heading-telugu mb-2 flex items-center gap-2">
                <span>📢 ముఖ్య గమనిక & అధికారిక ప్రకటన (Important Announcement)</span>
              </h3>
              <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
                ఈ వెబ్‌సైట్‌లో ప్రదర్శించబడిన విరాళాల వివరాలు అన్నీ శ్రీ రామా సేవా కమిటీ అధికారిక ఆలయ బ్యాంక్ ఖాతా (SBI A/C) ప్రారంభించిన తర్వాత, భక్తులు నేరుగా <span className="text-[#FFD700] font-mono font-black">NEFT / Bank Transfer, UPI లేదా PhonePe</span> ద్వారా ఆలయ ఖాతాకు జమ చేసిన విరాళాలు మాత్రమే.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-amber-200/90 mt-2 italic border-t border-white/10 pt-2">
                (Note: All donation details displayed on this website strictly represent direct transfers received via NEFT, UPI, or PhonePe after creating the official temple bank account).
              </p>
            </div>
          </div>
        </div>

        {/* 🚩 Highlighted E-Hundi Card & Bank Account Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
          
          {/* E-Hundi & QR Scanner Card */}
          <div className="gold-card border-3 border-[#FFD700] shadow-[0_0_50px_rgba(255,215,0,0.45)] bg-gradient-to-b from-[#5C121E] via-[#3A0A11] to-[#200407] flex flex-col justify-between !p-6 sm:!p-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-[#FFD700] px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2">
                  <Sparkles className="w-4 h-4 fill-black" />
                  ఈ-హుండి (E-HUNDI)
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-300">100% SECURE & DIRECT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white heading-telugu mb-3">
                PhonePe & UPI E-Hundi Scanner
              </h3>

              <p className="text-sm sm:text-base text-gray-100 mb-6 leading-relaxed font-semibold">
                {t.donation.scanQr}
              </p>

              {/* PhonePe Standee Scanner Trigger Card */}
              <div className="bg-black/70 p-5 rounded-2xl border-2 border-dashed border-[#FFD700] flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left shadow-2xl">
                <img
                  src="/assets/phonepe_qr.png"
                  alt="Sri Rama Seva Committee PhonePe Standee QR Scanner"
                  className="w-36 h-36 rounded-xl object-contain bg-white p-1.5 border-2 border-amber-400 shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowQrModal(true)}
                />

                <div>
                  <h4 className="text-base sm:text-lg font-black text-white mb-1.5 leading-snug">
                    SRI RAMA SEVA COMMITTEE PAMINIVANDLAVOORU
                  </h4>
                  <p className="text-sm sm:text-base font-mono text-amber-300 font-black mb-3">
                    UPI ID: {t.donation.upiId}
                  </p>

                  <button
                    onClick={() => copyToClipboard(t.donation.upiId, 'upi')}
                    className="btn-gold text-xs sm:text-sm !py-2 !px-4 rounded-xl font-bold"
                  >
                    {copiedUpi ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedUpi ? t.donation.copiedMsg : "UPI ID కాపీ చేయి"}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/15 flex justify-center">
              <button
                onClick={() => setShowQrModal(true)}
                className="btn-primary text-sm sm:text-base w-full py-4 shadow-2xl flex items-center justify-center gap-2.5 font-black rounded-2xl"
              >
                <QrCode className="w-5 h-5" />
                <span>QR కోడ్ జూమ్ చేసి స్కాన్ చేయండి (Open Scanner)</span>
              </button>
            </div>
          </div>

          {/* Direct SBI Bank Account Transfer Card */}
          <div className="gold-card border-3 border-amber-400 bg-gradient-to-b from-[#4A0E17] via-[#2A060B] to-[#1A0306] flex flex-col justify-between !p-6 sm:!p-8 shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#FFD700] bg-[#5C121E] px-3.5 py-1.5 rounded-full border border-[#FFD700]/50 flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-300" />
                  BANK TRANSFER
                </span>
                <span className="text-xs sm:text-sm font-black text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> SBI Official Account
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white heading-telugu mb-4">
                {t.donation.bankTitle}
              </h3>

              {/* Bank Details Fields */}
              <div className="space-y-4">
                {/* Account Name */}
                <div className="bg-black/60 p-4 rounded-2xl border border-white/15">
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider block mb-0.5">ఖాతా పేరు (Account Name)</span>
                  <span className="text-base sm:text-lg font-black text-white font-mono">{t.donation.accountName}</span>
                </div>

                {/* Account Number */}
                <div className="bg-black/60 p-4 rounded-2xl border-2 border-[#FFD700]/60 flex items-center justify-between shadow-inner">
                  <div>
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider block mb-0.5">ఖాతా సంఖ్య (Account Number)</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[var(--primary-gold)] font-mono">{t.donation.accountNo}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(t.donation.accountNo, 'account')}
                    className="p-3 rounded-xl bg-white/10 text-amber-300 hover:bg-white/20 transition-colors"
                    title="Account Number Copy"
                  >
                    {copiedAccount ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                {/* IFSC Code */}
                <div className="bg-black/60 p-4 rounded-2xl border border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider block mb-0.5">IFSC కోడ్</span>
                    <span className="text-lg sm:text-xl font-black text-white font-mono">{t.donation.ifsc}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(t.donation.ifsc, 'ifsc')}
                    className="p-3 rounded-xl bg-white/10 text-amber-300 hover:bg-white/20 transition-colors"
                    title="IFSC Code Copy"
                  >
                    {copiedIfsc ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                {/* Bank & Branch */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-black/60 p-3.5 rounded-2xl border border-white/15">
                    <span className="text-gray-400 block text-xs font-bold">బ్యాంక్ పేరు</span>
                    <span className="font-extrabold text-white text-base">{t.donation.bankName}</span>
                  </div>
                  <div className="bg-black/60 p-3.5 rounded-2xl border border-white/15">
                    <span className="text-gray-400 block text-xs font-bold">బ్రాంచ్</span>
                    <span className="font-extrabold text-white text-base">{t.donation.branch}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/15 text-center">
              <p className="text-sm sm:text-base text-amber-200 font-extrabold">
                గూగుల్ పే / ఫోన్‌పే / పేటీఎం / నెట్ బ్యాంకింగ్ ద్వారా నేరుగా జమ చేయవచ్చు.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* PhonePe QR Full Screen Zoom Modal */}
      {showQrModal && (
        <div className="modal-overlay" onClick={() => setShowQrModal(false)}>
          <div className="modal-content text-center !max-w-md !p-6" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowQrModal(false)}>✕</button>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-[#FFD700] text-black mb-3">
              OFFICIAL PHONEPE STANDEE SCANNER
            </span>

            <h3 className="text-xl font-black text-white heading-telugu mb-2">
              SRI RAMA SEVA COMMITTEE PAMINIVANDLAVOORU
            </h3>

            <div className="bg-white p-3 rounded-2xl border-4 border-[#FFD700] shadow-2xl my-4 inline-block">
              <img
                src={getActiveQrCode()}
                alt="PhonePe QR Standee Scanner Full View"
                className="w-64 h-64 object-contain mx-auto"
              />
            </div>

            <p className="text-xs font-mono text-amber-300 font-bold mb-4">
              UPI ID: {t.donation.upiId}
            </p>

            <button
              onClick={() => copyToClipboard(t.donation.upiId, 'upi')}
              className="btn-gold text-xs w-full py-2.5 justify-center"
            >
              {copiedUpi ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedUpi ? t.donation.copiedMsg : "UPI ID కాపీ చేయి"}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
