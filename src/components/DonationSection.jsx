import React, { useState } from 'react';
import { Heart, Copy, Check, QrCode, Sparkles, Printer, ShieldCheck, Building, Smartphone, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonationSection({ t, showToast }) {
  const [copiedField, setCopiedField] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Form state for donation receipt generator
  const [donorName, setDonorName] = useState('');
  const [donorAmount, setDonorAmount] = useState('1008');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorCity, setDonorCity] = useState('');
  const [generatedReceipt, setGeneratedReceipt] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`${fieldName} ${t.donation.copiedMsg}`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleGenerateReceipt = (e) => {
    e.preventDefault();
    if (!donorName.trim() || !donorAmount) return;

    const receiptNo = 'SRSC-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    setGeneratedReceipt({
      receiptNo,
      dateStr,
      name: donorName,
      amount: donorAmount,
      phone: donorPhone || 'N/A',
      city: donorCity || 'Paminivandla Vooru'
    });

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9933', '#D4AF37', '#8B0000']
    });
  };

  return (
    <section id="donation" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-tag">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            {t.donation.tag}
          </span>
          <h2 className="section-title text-white heading-telugu">
            <span className="heading-saffron">{t.donation.title}</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            {t.donation.subtitle}
          </p>
          <div className="mt-3 inline-block px-4 py-1 rounded-full bg-[var(--sacred-maroon)]/80 text-[var(--primary-gold-light)] font-bold text-sm border border-[var(--border-gold)]">
            "{t.donation.slogan}"
          </div>
        </div>

        {/* Bank & UPI Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Main Bank Account Details Card (7 Cols) */}
          <div className="lg:col-span-7 gold-card !p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--sacred-maroon)] border border-[var(--border-gold)] flex items-center justify-center text-[var(--primary-gold)] shadow-md">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white heading-telugu">
                      {t.donation.bankTitle}
                    </h3>
                    <p className="text-xs text-[var(--primary-gold)] font-medium">
                      {t.donation.bankName}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  Verified Official Account
                </span>
              </div>

              {/* Bank Details Rows */}
              <div className="space-y-4">
                
                {/* Account Name */}
                <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-gray-400 block">Account Name (సామాజిక ఖాతా పేరు):</span>
                    <span className="text-base font-bold text-white font-mono">
                      {t.donation.accountName}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(t.donation.accountName, 'Account Name')}
                    className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-[var(--primary-gold-light)] font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedField === 'Account Name' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedField === 'Account Name' ? t.donation.copiedMsg : t.donation.copyBtn}
                  </button>
                </div>

                {/* Account Number */}
                <div className="bg-gradient-to-r from-[var(--sacred-maroon)]/60 to-black/40 p-4 rounded-xl border border-[var(--border-gold)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-inner">
                  <div>
                    <span className="text-xs text-[var(--primary-saffron)] font-bold block">Account Number (ఖాతా సంఖ్య):</span>
                    <span className="text-2xl font-extrabold text-[var(--primary-gold-light)] font-mono tracking-wider">
                      {t.donation.accountNo}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(t.donation.accountNo, 'Account Number')}
                    className="btn-gold !py-1.5 !px-3 text-xs"
                  >
                    {copiedField === 'Account Number' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedField === 'Account Number' ? t.donation.copiedMsg : t.donation.copyBtn}
                  </button>
                </div>

                {/* IFSC & Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block">IFSC Code:</span>
                      <span className="text-lg font-bold text-white font-mono">
                        {t.donation.ifsc}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(t.donation.ifsc, 'IFSC Code')}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[var(--primary-gold)]"
                    >
                      {copiedField === 'IFSC Code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-400 block">Branch Name:</span>
                    <span className="text-sm font-bold text-gray-200">
                      {t.donation.branch}
                    </span>
                  </div>
                </div>

                {/* UPI ID */}
                <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">UPI ID (PhonePe / GPay / Paytm):</span>
                    <span className="text-base font-bold text-[var(--primary-saffron)] font-mono">
                      {t.donation.upiId}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(t.donation.upiId, 'UPI ID')}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-[var(--primary-gold-light)] font-semibold flex items-center gap-1.5"
                  >
                    {copiedField === 'UPI ID' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedField === 'UPI ID' ? t.donation.copiedMsg : t.donation.copyBtn}
                  </button>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> 100% Transparent Community Donations
              </span>
              <span className="font-mono text-[var(--primary-gold)]">Regd Society 125/2026</span>
            </div>
          </div>

          {/* PhonePe QR Scanner Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="gold-card !p-6 text-center flex flex-col items-center justify-between">
              <div className="w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-saffron)]/20 text-[var(--primary-saffron)] text-xs font-bold mb-3 border border-[var(--primary-saffron)]/30">
                  <Smartphone className="w-3.5 h-3.5" /> Official PhonePe Scanner
                </div>
                
                <h4 className="text-lg font-bold text-white heading-telugu mb-2">
                  Scan PhonePe QR Code to Donate
                </h4>

                <div
                  className="relative p-2 bg-white rounded-2xl border-4 border-[var(--primary-gold)] shadow-2xl my-3 inline-block group cursor-pointer"
                  onClick={() => setShowQrModal(true)}
                >
                  <img
                    src="/assets/phonepe_qr.png"
                    alt="Official PhonePe QR Scanner"
                    className="w-56 h-auto max-h-[300px] object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white font-bold text-xs">
                    <QrCode className="w-8 h-8 text-[var(--primary-gold)]" />
                  </div>
                </div>

                <p className="text-xs text-gray-300">
                  {t.donation.scanQr}
                </p>
              </div>

              <div className="w-full mt-4 flex flex-col gap-2">
                <button onClick={() => setShowQrModal(true)} className="btn-gold text-xs !py-2.5 w-full">
                  <QrCode className="w-4 h-4" /> View PhonePe Scanner In Full Screen
                </button>
                
                <button onClick={() => setShowReceiptModal(true)} className="btn-outline text-xs !py-2.5 w-full">
                  <Sparkles className="w-4 h-4 text-[var(--primary-saffron)]" /> {t.donation.generateReceipt}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* PhonePe QR Code Full Modal */}
      {showQrModal && (
        <div className="modal-overlay" onClick={() => setShowQrModal(false)}>
          <div className="modal-content !max-w-md text-center" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowQrModal(false)}>
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-bold text-white heading-telugu mb-1 flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5 text-[var(--primary-saffron)]" />
              Official PhonePe QR Code
            </h3>
            
            <p className="text-xs text-gray-300 mb-4">
              Sri Rama Seva Committee Paminivandlavooru
            </p>

            <div className="bg-white p-3 rounded-2xl border-4 border-[var(--primary-gold)] inline-block shadow-2xl">
              <img
                src="/assets/phonepe_qr.png"
                alt="Official PhonePe Scanner Full View"
                className="w-72 h-auto max-h-[420px] object-contain rounded-xl mx-auto"
              />
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Scan with PhonePe or any UPI app to make a direct contribution to the Sri Rama Temple construction fund.
            </p>
          </div>
        </div>
      )}

      {/* Receipt Generator Modal */}
      {showReceiptModal && (
        <div className="modal-overlay" onClick={() => setShowReceiptModal(false)}>
          <div className="modal-content !max-w-xl" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowReceiptModal(false)}>
              <X className="w-5 h-5" />
            </button>

            {!generatedReceipt ? (
              <div>
                <h3 className="text-xl font-bold text-white heading-telugu mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--primary-gold)]" />
                  {t.donation.generateReceipt}
                </h3>
                <p className="text-xs text-gray-300 mb-6">
                  Enter your donation details to generate an official digital acknowledgment receipt.
                </p>

                <form onSubmit={handleGenerateReceipt} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      {t.donation.donorName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={donorName}
                      onChange={e => setDonorName(e.target.value)}
                      className="w-full bg-black/40 border border-[var(--border-gold)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--primary-saffron)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      {t.donation.donorAmount} *
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {t.donation.presetAmounts.map(amt => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setDonorAmount(amt.toString())}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            donorAmount === amt.toString()
                              ? 'bg-[var(--primary-saffron)] text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="1008"
                      value={donorAmount}
                      onChange={e => setDonorAmount(e.target.value)}
                      className="w-full bg-black/40 border border-[var(--border-gold)] rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-[var(--primary-saffron)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">
                        {t.donation.donorPhone}
                      </label>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={donorPhone}
                        onChange={e => setDonorPhone(e.target.value)}
                        className="w-full bg-black/40 border border-[var(--border-gold)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">
                        {t.donation.donorCity}
                      </label>
                      <input
                        type="text"
                        placeholder="Paminivandla Vooru"
                        value={donorCity}
                        onChange={e => setDonorCity(e.target.value)}
                        className="w-full bg-black/40 border border-[var(--border-gold)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full mt-4">
                    <Sparkles className="w-5 h-5" />
                    {t.donation.getReceiptBtn}
                  </button>
                </form>
              </div>
            ) : (
              /* Printable / Viewable Digital Receipt Card */
              <div className="text-center">
                <div className="p-6 rounded-2xl bg-gradient-to-b from-[var(--sacred-maroon)] via-[#22070D] to-[#120407] border-2 border-[var(--primary-gold)] shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-[var(--border-gold)] pb-4 mb-4">
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-white heading-telugu">
                        శ్రీ రామా సేవా కమిటీ
                      </h4>
                      <p className="text-[11px] text-[var(--primary-gold)] font-mono">
                        Regd Society No: 125 of 2026
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded bg-[var(--primary-saffron)] text-white text-xs font-bold font-mono">
                      {generatedReceipt.receiptNo}
                    </span>
                  </div>

                  <div className="my-6">
                    <span className="text-xs text-gray-300 block">విరాళ రశీదు (Donation Acknowledgment)</span>
                    <div className="text-3xl font-extrabold text-[var(--primary-gold-light)] font-mono my-2">
                      ₹ {parseInt(generatedReceipt.amount).toLocaleString('en-IN')}
                    </div>
                    <p className="text-base font-bold text-white mt-2 heading-telugu">
                      Donor: {generatedReceipt.name}
                    </p>
                    <p className="text-xs text-gray-300">
                      {generatedReceipt.city} • Date: {generatedReceipt.dateStr}
                    </p>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl text-xs text-[var(--primary-gold)] font-medium border border-white/10">
                    "సేవే మా సంకల్పం, శ్రీ రాముడు మా దైవం..." • ధన్యవాదాలు!
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => setGeneratedReceipt(null)}
                    className="btn-outline text-xs w-full"
                  >
                    Create Another Receipt
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="btn-gold text-xs w-full"
                  >
                    <Printer className="w-4 h-4" /> Print Receipt
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
