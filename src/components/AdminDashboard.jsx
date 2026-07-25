import React, { useState } from 'react';
import { Lock, LogOut, Plus, Trash2, Receipt, Users, ShieldCheck, MessageSquare, Mail, Smartphone, Share2, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminDashboard({ t, showToast, donorList, setDonorList, committeeList, setCommitteeList, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');
  const [activeTab, setActiveTab] = useState('receipts');

  // Receipt Generator State
  const [receiptName, setReceiptName] = useState('');
  const [receiptAmount, setReceiptAmount] = useState('');
  const [receiptPhone, setReceiptPhone] = useState('');
  const [receiptCity, setReceiptCity] = useState('');
  const [receiptSeva, setReceiptSeva] = useState('రాతి గోడల నిర్మాణం');
  const [generatedReceipt, setGeneratedReceipt] = useState(null);

  // New Donor Form State
  const [newDonorName, setNewDonorName] = useState('');
  const [newDonorAmount, setNewDonorAmount] = useState('');
  const [newDonorCity, setNewDonorCity] = useState('');
  const [newDonorDate, setNewDonorDate] = useState(new Date().toISOString().split('T')[0]);
  const [newDonorSeva, setNewDonorSeva] = useState('రాతి గోడల నిర్మాణం');

  // New Committee Member State
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberFather, setNewMemberFather] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('EXECUTIVE MEMBER (కమిటీ సభ్యుడు)');
  const [newMemberOcc, setNewMemberOcc] = useState('Self Employee');
  const [newMemberAddress, setNewMemberAddress] = useState('5-10, Paminivandlavooru, Mangalapalli, Bangarupalem Mandal');

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '1252026' || passcode === 'admin123' || passcode === '9866125609') {
      setIsAuthenticated(true);
      setPassError('');
      showToast("అడ్మిన్ పోర్టల్‌లోకి విజయవంతంగా లాగిన్ అయ్యారు!");
    } else {
      setPassError("తప్పు పాస్‌కోడ్! దయచేసి సరైన అడ్మిన్ పిన్ ఎంటర్ చేయండి.");
    }
  };

  // Add Donor
  const handleAddDonor = (e) => {
    e.preventDefault();
    if (!newDonorName || !newDonorAmount) return;

    const formattedAmount = `₹ ${parseInt(newDonorAmount).toLocaleString()}`;
    const newEntry = {
      id: donorList.length + 1,
      name: newDonorName,
      amount: formattedAmount,
      city: newDonorCity || 'పామినివాండ్లవూరు',
      date: newDonorDate,
      seva: newDonorSeva
    };

    setDonorList([...donorList, newEntry]);
    setNewDonorName('');
    setNewDonorAmount('');
    showToast("క్రొత్త దాత వివరాలు దాతల పట్టికలో చేర్చబడ్డాయి!");
  };

  // Delete Donor
  const handleDeleteDonor = (id) => {
    setDonorList(donorList.filter(d => d.id !== id));
    showToast("దాత వివరాలు తొలగించబడ్డాయి.");
  };

  // Generate Receipt
  const handleGenerateReceipt = (e) => {
    e.preventDefault();
    if (!receiptName || !receiptAmount) return;

    const receiptNo = 'SRS-' + Math.floor(100000 + Math.random() * 900000);
    const currentDate = new Date().toLocaleDateString('te-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    setGeneratedReceipt({
      receiptNo,
      date: currentDate,
      name: receiptName,
      amount: receiptAmount,
      phone: receiptPhone || '',
      city: receiptCity || 'పామినివాండ్లవూరు',
      seva: receiptSeva
    });

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}

    showToast("అధికారిక డిజిటల్ రశీదు రూపొందించబడింది!");
  };

  // Receipt Share Functions
  const getReceiptShareText = () => {
    if (!generatedReceipt) return '';
    return (
      `🚩 *శ్రీ రామా సేవా కమిటీ - పామినివాండ్లవూరు*\n` +
      `*అధికారిక ఈ-హుండి కానుక రశీదు*\n` +
      `----------------------------------------\n` +
      `🧾 *రశీదు నం:* ${generatedReceipt.receiptNo}\n` +
      `📅 *తేదీ:* ${generatedReceipt.date}\n` +
      `👤 *దాత పేరు:* ${generatedReceipt.name}\n` +
      `💰 *కానుక మొత్తం:* ₹ ${parseInt(generatedReceipt.amount).toLocaleString()}\n` +
      `🕉️ *సేవా విభాగం:* ${generatedReceipt.seva}\n` +
      `📍 *గ్రామం:* ${generatedReceipt.city}\n` +
      `----------------------------------------\n` +
      `"శ్రీ సీతా సమేత శ్రీ రామచంద్రస్వామి వారి దివ్య అనుగ్రహం మీకు ఎల్లప్పుడూ కలుగుగాక!"\n\n` +
      `🌐 వెబ్‌సైట్: https://thanerurajesh2410.github.io/sri-rama-seva-committee/`
    );
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(getReceiptShareText());
    const phoneNum = generatedReceipt.phone.replace(/\D/g, '');
    const url = phoneNum ? `https://wa.me/91${phoneNum}?text=${text}` : `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank');
    showToast("WhatsApp లో రశీదు షేర్ చేయబడుతోంది...");
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`శ్రీ రామా సేవా కమిటీ రశీదు - ${generatedReceipt.receiptNo}`);
    const body = encodeURIComponent(getReceiptShareText());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    showToast("ఇమెయిల్ క్లయింట్ తెరవబడుతోంది...");
  };

  const shareViaSMS = () => {
    const body = encodeURIComponent(getReceiptShareText());
    const phoneNum = generatedReceipt.phone.replace(/\D/g, '');
    window.location.href = `sms:${phoneNum}?body=${body}`;
    showToast("SMS యాప్ తెరవబడుతోంది...");
  };

  // Add Member
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName) return;

    const newMember = {
      name: newMemberName,
      father: newMemberFather ? `S/o ${newMemberFather}` : 'S/o Sri Rama Seva',
      role: newMemberRole,
      occ: newMemberOcc,
      address: newMemberAddress,
      icon: "User"
    };

    setCommitteeList([...committeeList, newMember]);
    setNewMemberName('');
    setNewMemberFather('');
    showToast("కమిటీ సభ్యుడు విజయవంతంగా చేర్చబడ్డారు!");
  };

  // Delete Member
  const handleDeleteMember = (idx) => {
    setCommitteeList(committeeList.filter((_, i) => i !== idx));
    showToast("కమిటీ సభ్యుడి వివరాలు తొలగించబడ్డాయి.");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content !max-w-4xl !p-6">
        <button className="modal-close" onClick={onClose} title="మూసివేయి">
          <X className="w-5 h-5" />
        </button>

        {/* 🔒 Password Protection Login View */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#5C121E] border-2 border-[#FFD700] text-[#FFD700] flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white heading-telugu mb-2">
              అడ్మిన్ లాగిన్ పోర్టల్
            </h3>
            <p className="text-xs text-gray-300 mb-6">
              శ్రీ రామా సేవా కమిటీ నిర్వహణాధికారులకు మాత్రమే అనుమతి.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  placeholder="అడ్మిన్ పాస్‌కోడ్ ఎంటర్ చేయండి (Pin)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-[#1A0306] border-2 border-[#FFD700]/60 text-white rounded-xl p-3 text-center text-lg font-mono focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              {passError && (
                <p className="text-xs text-red-400 font-bold">{passError}</p>
              )}

              <button type="submit" className="btn-gold w-full py-3 text-sm font-extrabold shadow-xl">
                <span>లాగిన్ అవ్వండి (Admin Login)</span>
              </button>
            </form>
          </div>
        ) : (
          /* 🛠️ Admin Control Dashboard View */
          <div>
            <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5C121E] text-[#FFD700] border border-[#FFD700]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white heading-telugu">
                    శ్రీ రామా సేవా కమిటీ - అడ్మిన్ డ్యాష్‌బోర్డ్
                  </h3>
                  <p className="text-xs text-amber-300 font-bold">
                    అధికారిక సమాచార నిర్వహణ & రశీదుల జారీ నిధి
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-600/30 text-red-300 hover:bg-red-600 hover:text-white border border-red-500/40 flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>లాగౌట్</span>
              </button>
            </div>

            {/* Admin Tabs Bar */}
            <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab('receipts')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeTab === 'receipts'
                    ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span>రశీదుల జారీ & షేరింగ్ (Receipts)</span>
              </button>

              <button
                onClick={() => setActiveTab('donors')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeTab === 'donors'
                    ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>దాతల జాబితా నిర్వహణ ({donorList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('committee')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeTab === 'committee'
                    ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>కమిటీ సభ్యుల మేనేజ్‌మెంట్ ({committeeList.length})</span>
              </button>
            </div>

            {/* TAB 1: Admin Receipt Generator & Multi-Platform Sharing */}
            {activeTab === 'receipts' && (
              <div className="space-y-6">
                <form onSubmit={handleGenerateReceipt} className="bg-[#1A0306] p-5 rounded-2xl border border-white/10 space-y-4">
                  <h4 className="text-base font-bold text-[#FFD700] heading-telugu flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    <span>అధికారిక భక్తుడి రశీదు సృష్టించు (Generate Official Donor Receipt)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">దాత పేరు *</label>
                      <input
                        type="text"
                        required
                        placeholder="భక్తుడి పేరు"
                        value={receiptName}
                        onChange={(e) => setReceiptName(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">విరాళం మొత్తం (₹) *</label>
                      <input
                        type="number"
                        required
                        placeholder="ఉదా: 5008"
                        value={receiptAmount}
                        onChange={(e) => setReceiptAmount(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700] font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">ఫోన్ నంబర్</label>
                      <input
                        type="tel"
                        placeholder="ఫోన్ నంబర్"
                        value={receiptPhone}
                        onChange={(e) => setReceiptPhone(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">గ్రామం / ఊరు</label>
                      <input
                        type="text"
                        placeholder="పామినివాండ్లవూరు"
                        value={receiptCity}
                        onChange={(e) => setReceiptCity(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">సేవా విభాగం</label>
                      <input
                        type="text"
                        placeholder="రాతి గోడల నిర్మాణం"
                        value={receiptSeva}
                        onChange={(e) => setReceiptSeva(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-gold w-full py-2.5 text-sm font-extrabold">
                    <span>డిజిటల్ రశీదు రూపొందించు (Create Receipt)</span>
                  </button>
                </form>

                {/* Rendered Receipt Card with WhatsApp, Email, & SMS 1-Click Sharing */}
                {generatedReceipt && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-[#FFFDF0] text-[#2D080E] p-6 rounded-2xl border-4 border-[#FFD700] shadow-2xl relative">
                      <div className="flex items-center justify-between border-b-2 border-[#5C121E]/30 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <img src="/assets/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full border border-amber-600" />
                          <div>
                            <h4 className="text-base font-black text-[#5C121E] heading-telugu">శ్రీ రామా సేవా కమిటీ</h4>
                            <p className="text-[10px] font-bold text-amber-800">పామినివాండ్లవూరు • అధికారిక రశీదు</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-gray-600 block">రశీదు నం:</span>
                          <span className="text-xs font-mono font-black text-[#5C121E]">{generatedReceipt.receiptNo}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                        <div>
                          <span className="text-gray-600 block text-[10px]">దాత పేరు:</span>
                          <span className="font-bold text-sm text-[#5C121E] heading-telugu">{generatedReceipt.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block text-[10px]">తేదీ:</span>
                          <span className="font-mono font-bold text-gray-800">{generatedReceipt.date}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block text-[10px]">గ్రామం:</span>
                          <span className="font-bold text-gray-800">{generatedReceipt.city}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block text-[10px]">సేవ:</span>
                          <span className="font-bold text-gray-800">{generatedReceipt.seva}</span>
                        </div>
                      </div>

                      <div className="bg-[#5C121E] text-white p-3 rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold">ఈ-హుండి పవిత్ర కానుక:</span>
                        <span className="text-xl font-black font-mono text-[#FFD700]">₹ {parseInt(generatedReceipt.amount).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* 🚀 Instant 1-Click Receipt Sharing Options */}
                    <div className="bg-black/60 p-4 rounded-2xl border border-white/20">
                      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-amber-300">
                        <Share2 className="w-4 h-4 text-[#FFD700]" />
                        <span>భక్తుడికి రశీదు పంపండి (Share Generated Receipt):</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* 💬 WhatsApp Share Button */}
                        <button
                          type="button"
                          onClick={shareViaWhatsApp}
                          className="px-4 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all"
                        >
                          <MessageSquare className="w-4 h-4 fill-white" />
                          <span>WhatsApp లో పంపు</span>
                        </button>

                        {/* 📧 Email Share Button */}
                        <button
                          type="button"
                          onClick={shareViaEmail}
                          className="px-4 py-2.5 rounded-xl text-xs font-black bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all"
                        >
                          <Mail className="w-4 h-4" />
                          <span>ఇమెయిల్ ద్వారా పంపు</span>
                        </button>

                        {/* 📱 SMS Share Button */}
                        <button
                          type="button"
                          onClick={shareViaSMS}
                          className="px-4 py-2.5 rounded-xl text-xs font-black bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all"
                        >
                          <Smartphone className="w-4 h-4" />
                          <span>SMS ద్వారా పంపు</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Donor Management */}
            {activeTab === 'donors' && (
              <div className="space-y-6">
                <form onSubmit={handleAddDonor} className="bg-[#1A0306] p-5 rounded-2xl border border-white/10 space-y-4">
                  <h4 className="text-base font-bold text-[#FFD700] heading-telugu flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <span>క్రొత్త దాత వివరాలు నమోదు చేయండి (Add New Donor to Website)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">దాత పేరు *</label>
                      <input
                        type="text"
                        required
                        placeholder="పేరు"
                        value={newDonorName}
                        onChange={(e) => setNewDonorName(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">మొత్తం (₹) *</label>
                      <input
                        type="number"
                        required
                        placeholder="ఉదా: 5000"
                        value={newDonorAmount}
                        onChange={(e) => setNewDonorAmount(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2 text-sm text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">తేదీ</label>
                      <input
                        type="date"
                        value={newDonorDate}
                        onChange={(e) => setNewDonorDate(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2 text-sm text-white font-mono"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full py-2 text-xs font-bold">
                    <span>+ దాతను వెబ్‌సైట్‌లో చేర్చు (Add Donor)</span>
                  </button>
                </form>

                {/* Donors List with Delete Button */}
                <div className="max-h-64 overflow-y-auto bg-black/40 rounded-xl border border-white/10 p-3">
                  <table className="w-full text-left text-xs text-gray-200">
                    <thead className="text-[#FFD700] border-b border-white/10">
                      <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">పేరు</th>
                        <th className="p-2">మొత్తం</th>
                        <th className="p-2">తేదీ</th>
                        <th className="p-2 text-right">చర్య</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {donorList.map((donor, idx) => (
                        <tr key={donor.id || idx}>
                          <td className="p-2 font-mono">{idx + 1}</td>
                          <td className="p-2 font-bold text-white">{donor.name}</td>
                          <td className="p-2 font-mono text-amber-300">{donor.amount}</td>
                          <td className="p-2 text-gray-400">{donor.date}</td>
                          <td className="p-2 text-right">
                            <button
                              onClick={() => handleDeleteDonor(donor.id)}
                              className="p-1 rounded bg-red-600/30 text-red-300 hover:bg-red-600 hover:text-white"
                              title="తొలిగించు"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Committee Management */}
            {activeTab === 'committee' && (
              <div className="space-y-6">
                <form onSubmit={handleAddMember} className="bg-[#1A0306] p-5 rounded-2xl border border-white/10 space-y-4">
                  <h4 className="text-base font-bold text-[#FFD700] heading-telugu flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>క్రొత్త కమిటీ సభ్యుడిని చేర్చండి (Add Committee Member)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">సభ్యుడి పేరు *</label>
                      <input
                        type="text"
                        required
                        placeholder="పేరు"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">తండ్రి పేరు</label>
                      <input
                        type="text"
                        placeholder="తండ్రి పేరు"
                        value={newMemberFather}
                        onChange={(e) => setNewMemberFather(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">హోదా (Role)</label>
                      <input
                        type="text"
                        value={newMemberRole}
                        onChange={(e) => setNewMemberRole(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full py-2 text-xs font-bold">
                    <span>+ కమిటీ సభ్యుడిని చేర్చు (Add Member)</span>
                  </button>
                </form>

                {/* Committee Members List */}
                <div className="max-h-64 overflow-y-auto bg-black/40 rounded-xl border border-white/10 p-3 space-y-2">
                  {committeeList.map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs">
                      <div>
                        <span className="font-black text-white">{member.name}</span>
                        <span className="text-amber-300 ml-2 font-bold">({member.role})</span>
                      </div>
                      <button
                        onClick={() => handleDeleteMember(idx)}
                        className="p-1 rounded bg-red-600/30 text-red-300 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
