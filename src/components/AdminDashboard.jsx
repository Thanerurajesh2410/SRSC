import React, { useState, useRef } from 'react';
import { Lock, LogOut, Plus, Trash2, Receipt, Users, ShieldCheck, Download, Share2, UserCheck, FileText, Image as ImageIcon, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function AdminDashboard({ t, showToast, donorList, setDonorList, committeeList, setCommitteeList, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');
  const [activeTab, setActiveTab] = useState('receipts');
  const receiptRef = useRef(null);

  // Receipt Generator Dropdown & Form State
  const [selectedDonorId, setSelectedDonorId] = useState('');
  const [receiptName, setReceiptName] = useState('');
  const [receiptAmount, setReceiptAmount] = useState('');
  const [receiptPhone, setReceiptPhone] = useState('');
  const [receiptCity, setReceiptCity] = useState('');
  const [receiptSeva, setReceiptSeva] = useState('రాతి గోడల నిర్మాణం');
  const [generatedReceipt, setGeneratedReceipt] = useState(null);
  const [isGeneratingMedia, setIsGeneratingMedia] = useState(false);

  // Seva Categories List for Dropdown
  const sevaCategories = [
    "రాతి గోడల నిర్మాణం",
    "గర్భగుడి రాతి గోడల సేవ",
    "శిఖర గోపురం & కలశ సేవ",
    "ఈ-హుండి పవిత్ర కానుక",
    "మహిళా మండలి విరాళం",
    "ఆలయ నిర్మాణ నిధి",
    "స్వామివారి సేవ"
  ];

  // Preset Amounts List for Dropdown
  const presetAmounts = [
    { label: "₹ 501", val: 501 },
    { label: "₹ 1,008", val: 1008 },
    { label: "₹ 2,101", val: 2101 },
    { label: "₹ 5,000", val: 5000 },
    { label: "₹ 10,000", val: 10000 },
    { label: "₹ 25,000", val: 25000 },
    { label: "₹ 50,000", val: 50000 }
  ];

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

  // Handle Dropdown Selection from Donors List
  const handleSelectDonorFromDropdown = (e) => {
    const donorId = e.target.value;
    setSelectedDonorId(donorId);

    if (!donorId) {
      setReceiptName('');
      setReceiptAmount('');
      setReceiptCity('పామినివాండ్లవూరు');
      setReceiptSeva('రాతి గోడల నిర్మాణం');
      return;
    }

    const donor = donorList.find(d => String(d.id) === String(donorId));
    if (donor) {
      setReceiptName(donor.name);
      const numericAmt = donor.amount ? donor.amount.replace(/[^0-9]/g, '') : '';
      setReceiptAmount(numericAmt);
      setReceiptCity(donor.city || 'పామినివాండ్లవూరు');
      setReceiptSeva(donor.seva || 'రాతి గోడల నిర్మాణం');
      showToast(`${donor.name} వివరాలు ఆటోమేటిక్‌గా నమోదు కాబడ్డాయి.`);
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

  // 🖼️ Export Receipt as Image (PNG)
  const downloadReceiptImage = async () => {
    if (!receiptRef.current) return;
    setIsGeneratingMedia(true);
    showToast("రశీదు ఇమేజ్ (PNG) సిద్ధమవుతోంది...");

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#FFFDF0'
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Sri_Rama_Temple_Receipt_${generatedReceipt.receiptNo}.png`;
      link.click();

      showToast("రశీదు ఇమేజ్ (PNG) విజయవంతంగా డౌన్‌లోడ్ అయింది!");
    } catch (err) {
      console.error(err);
      showToast("ఇమేజ్ జనరేట్ చేయడంలో పొరపాటు జరిగింది.");
    } finally {
      setIsGeneratingMedia(false);
    }
  };

  // 📄 Export Receipt as PDF Document
  const downloadReceiptPDF = async () => {
    if (!receiptRef.current) return;
    setIsGeneratingMedia(true);
    showToast("రశీదు PDF డాక్యుమెంట్ సిద్ధమవుతోంది...");

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#FFFDF0'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Sri_Rama_Temple_Receipt_${generatedReceipt.receiptNo}.pdf`);

      showToast("రశీదు PDF విజయవంతంగా డౌన్‌లోడ్ అయింది!");
    } catch (err) {
      console.error(err);
      showToast("PDF జనరేట్ చేయడంలో పొరపాటు జరిగింది.");
    } finally {
      setIsGeneratingMedia(false);
    }
  };

  // 💬 Share Receipt Image File directly via Native Share / WhatsApp
  const shareReceiptImage = async () => {
    if (!receiptRef.current) return;
    setIsGeneratingMedia(true);
    showToast("రశీదు ఇమేజ్ షేర్ చేయడానికి సిద్ధమవుతోంది...");

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#FFFDF0'
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          showToast("ఇమేజ్ ఫైల్ రూపకల్పనలో సమస్య జరిగింది.");
          return;
        }

        const file = new File([blob], `Sri_Rama_Receipt_${generatedReceipt.receiptNo}.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `శ్రీ రామా సేవా కమిటీ రశీదు - ${generatedReceipt.receiptNo}`,
            text: `🚩 శ్రీ రామా సేవా కమిటీ పామినివాండ్లవూరు - పవిత్ర ఈ-హుండి రశీదు (${generatedReceipt.name})`,
            files: [file]
          });
          showToast("రశీదు ఇమేజ్ విజయవంతంగా షేర్ చేయబడింది!");
        } else {
          // Fallback if direct file sharing is unsupported on browser: auto-download and prompt user
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `Sri_Rama_Receipt_${generatedReceipt.receiptNo}.png`;
          link.click();

          const shareText = encodeURIComponent(
            `🚩 శ్రీ రామా సేవా కమిటీ - పామినివాండ్లవూరు రశీదు (${generatedReceipt.name} - ₹ ${parseInt(generatedReceipt.amount).toLocaleString()})`
          );
          const phoneNum = generatedReceipt.phone.replace(/\D/g, '');
          const waUrl = phoneNum ? `https://wa.me/91${phoneNum}?text=${shareText}` : `https://api.whatsapp.com/send?text=${shareText}`;
          
          window.open(waUrl, '_blank');
          showToast("రశీదు ఇమేజ్ డౌన్‌లోడ్ అయింది. వాట్సాప్‌లో షేర్ చేయగలరు!");
        }
      }, 'image/png');

    } catch (err) {
      console.error(err);
      showToast("ఇమేజ్ షేర్ చేయడంలో సమస్య జరిగింది.");
    } finally {
      setIsGeneratingMedia(false);
    }
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
                <span>రశీదుల జారీ & ఇమేజ్ / PDF షేరింగ్</span>
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

            {/* TAB 1: Admin Receipt Generator with Dropdowns & Image/PDF Export */}
            {activeTab === 'receipts' && (
              <div className="space-y-6">
                <form onSubmit={handleGenerateReceipt} className="bg-[#1A0306] p-5 rounded-2xl border border-white/10 space-y-4">
                  <h4 className="text-base font-bold text-[#FFD700] heading-telugu flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    <span>అధికారిక భక్తుడి రశీదు సృష్టించు (Generate Official Donor Receipt)</span>
                  </h4>

                  {/* 🌟 1. Donor Dropdown Selector from Donation List */}
                  <div className="bg-[#3A0A11]/60 p-3 rounded-xl border border-[#FFD700]/40">
                    <label className="block text-xs font-black text-amber-300 mb-1 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-[#FFD700]" />
                      <span>1. దాతల జాబితా నుండి ఎంచుకోండి (Select Donor from Donation List):</span>
                    </label>

                    <select
                      value={selectedDonorId}
                      onChange={handleSelectDonorFromDropdown}
                      className="w-full bg-[#1A0306] border border-[#FFD700] rounded-xl p-2.5 text-sm text-white focus:outline-none font-bold"
                    >
                      <option value="">-- క్రొత్త దాత / డ్రాప్‌డౌన్ నుండి ఎంచుకోండి (Choose Donor) --</option>
                      {donorList.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} — {d.amount} ({d.seva || 'విరాళం'}) • {d.date}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">దాత పేరు (Donor Name) *</label>
                      <input
                        type="text"
                        required
                        placeholder="భక్తుడి పేరు నమోదు చేయండి"
                        value={receiptName}
                        onChange={(e) => setReceiptName(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>

                    {/* 🌟 2. Amount Dropdown & Custom Input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">2. విరాళం మొత్తం (Select Amount ₹) *</label>
                      <div className="flex gap-2">
                        <select
                          onChange={(e) => setReceiptAmount(e.target.value)}
                          className="bg-[#3A0A11] border border-white/20 rounded-xl p-2 text-xs text-amber-300 font-bold focus:outline-none"
                        >
                          <option value="">మొత్తం డ్రాప్‌డౌన్</option>
                          {presetAmounts.map((amt) => (
                            <option key={amt.val} value={amt.val}>{amt.label}</option>
                          ))}
                        </select>

                        <input
                          type="number"
                          required
                          placeholder="మొత్తం (₹)"
                          value={receiptAmount}
                          onChange={(e) => setReceiptAmount(e.target.value)}
                          className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700] font-mono"
                        />
                      </div>
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

                    {/* 🌟 3. Seva Dropdown Selector */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">3. సేవా విభాగం (Select Seva Dropdown)</label>
                      <select
                        value={receiptSeva}
                        onChange={(e) => setReceiptSeva(e.target.value)}
                        className="w-full bg-[#3A0A11] border border-white/20 rounded-xl p-2.5 text-sm text-amber-300 font-bold focus:outline-none focus:border-[#FFD700]"
                      >
                        {sevaCategories.map((s, idx) => (
                          <option key={idx} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn-gold w-full py-2.5 text-sm font-extrabold shadow-xl">
                    <span>డిజిటల్ రశీదు రూపొందించు (Create Digital Receipt)</span>
                  </button>
                </form>

                {/* 🌟 Rendered Official Receipt Card (Targeted for HTML2Canvas Image/PDF Export) */}
                {generatedReceipt && (
                  <div className="space-y-4 animate-fadeIn">
                    
                    {/* Visual Receipt DOM Element */}
                    <div
                      ref={receiptRef}
                      id="receipt-card-node"
                      className="bg-[#FFFDF0] text-[#2D080E] p-6 sm:p-8 rounded-2xl border-4 border-[#FFD700] shadow-2xl relative overflow-hidden"
                    >
                      {/* Watermark Background */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <img src="/assets/logo.jpg" alt="Watermark" className="w-96 h-96 object-contain" />
                      </div>

                      <div className="flex items-center justify-between border-b-2 border-[#5C121E]/30 pb-4 mb-5 relative z-10">
                        <div className="flex items-center gap-3">
                          <img src="/assets/logo.jpg" alt="Logo" className="w-14 h-14 rounded-full border-2 border-amber-600 shadow-md" />
                          <div>
                            <h4 className="text-lg md:text-xl font-black text-[#5C121E] heading-telugu">శ్రీ రామా సేవా కమిటీ</h4>
                            <p className="text-xs font-bold text-amber-900">పామినివాండ్లవూరు, బంగారుపాళెం మండలం, చిత్తూరు జిల్లా</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-[#5C121E] bg-amber-200 px-3 py-1 rounded-full border border-amber-400 block mb-1">
                            అధికారిక ఈ-హుండి రశీదు
                          </span>
                          <span className="text-xs font-mono font-black text-[#5C121E]">రశీదు నం: {generatedReceipt.receiptNo}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs md:text-sm mb-5 relative z-10">
                        <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300/60">
                          <span className="text-gray-700 block text-[11px] font-bold">దాత పేరు (Devotee Name):</span>
                          <span className="font-extrabold text-base text-[#5C121E] heading-telugu">{generatedReceipt.name}</span>
                        </div>

                        <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300/60">
                          <span className="text-gray-700 block text-[11px] font-bold">నమోదు తేదీ (Date):</span>
                          <span className="font-mono font-bold text-gray-900 text-sm">{generatedReceipt.date}</span>
                        </div>

                        <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300/60">
                          <span className="text-gray-700 block text-[11px] font-bold">గ్రామం / స్థలం (City):</span>
                          <span className="font-bold text-gray-900 text-sm">{generatedReceipt.city}</span>
                        </div>

                        <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300/60">
                          <span className="text-gray-700 block text-[11px] font-bold">పవిత్ర సేవా విభాగం (Seva):</span>
                          <span className="font-bold text-amber-900 text-sm">{generatedReceipt.seva}</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#5C121E] to-[#3A0A11] text-white p-4 rounded-xl flex items-center justify-between shadow-xl relative z-10">
                        <span className="text-xs md:text-sm font-black text-amber-200">ఈ-హుండి పవిత్ర కానుక మొత్తం:</span>
                        <span className="text-2xl md:text-3xl font-black font-mono text-[#FFD700]">₹ {parseInt(generatedReceipt.amount).toLocaleString()}</span>
                      </div>

                      <div className="mt-4 text-center text-xs font-extrabold text-[#5C121E] italic border-t border-amber-300 pt-3 relative z-10">
                        "శ్రీ సీతా సమేత లక్ష్మణ హనుమత్ సమేత శ్రీ రామచంద్రస్వామి వారి దివ్య అనుగ్రహం మీకు ఎల్లప్పుడూ కలుగుగాక!"
                      </div>
                    </div>

                    {/* 🚀 Image (PNG), PDF, and Direct Image Sharing Action Controls */}
                    <div className="bg-black/60 p-4 rounded-2xl border border-white/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <Share2 className="w-4 h-4 text-[#FFD700]" />
                          <span>రశీదును ఇమేజ్ (PNG) లేదా PDF రూపంలో షేర్ చేయండి:</span>
                        </span>
                        {isGeneratingMedia && (
                          <span className="text-xs font-bold text-amber-400 animate-pulse">జనరేట్ అవుతోంది...</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* 🖼️ Share Image (PNG File) */}
                        <button
                          type="button"
                          disabled={isGeneratingMedia}
                          onClick={shareReceiptImage}
                          className="px-4 py-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all border border-emerald-300/40"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>రశీదు ఇమేజ్‌గా షేర్ చేయి (WhatsApp Image)</span>
                        </button>

                        {/* 📥 Download Image (PNG) */}
                        <button
                          type="button"
                          disabled={isGeneratingMedia}
                          onClick={downloadReceiptImage}
                          className="px-4 py-3 rounded-xl text-xs font-black bg-[#5C121E] hover:bg-amber-600 text-[#FFD700] flex items-center justify-center gap-2 shadow-lg transition-all border border-[#FFD700]/40"
                        >
                          <ImageIcon className="w-4 h-4" />
                          <span>ఇమేజ్ (PNG) డౌన్‌లోడ్</span>
                        </button>

                        {/* 📄 Download PDF */}
                        <button
                          type="button"
                          disabled={isGeneratingMedia}
                          onClick={downloadReceiptPDF}
                          className="px-4 py-3 rounded-xl text-xs font-black bg-purple-700 hover:bg-purple-600 text-white flex items-center justify-center gap-2 shadow-lg transition-all border border-purple-300/40"
                        >
                          <FileText className="w-4 h-4" />
                          <span>PDF డౌన్‌లోడ్</span>
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
