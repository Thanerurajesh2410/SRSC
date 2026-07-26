import React, { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Users, Heart, DollarSign, Building2, Package, Award, ShieldCheck, FileText, Share2, Plus, Trash2, CheckCircle2, Lock, Download, Printer, Bell, AlertCircle, Eye, Phone, Mail, MapPin, Database, ChevronDown, Receipt, Sliders, Image as ImageIcon, ToggleLeft, ToggleRight, Camera, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { getDB, saveDB, validateUniqueDevotee, addAuditLog, defaultWebsiteSettings, defaultGalleryImages } from '../data/v2Database';

export default function TempleErpAdmin({ t, v2T, showToast }) {
  const [db, setDbState] = useState(getDB());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const reportRef = useRef(null);
  const receiptRef = useRef(null);

  // ERP Role State
  const [userRole, setUserRole] = useState('ADMIN / CHIEF EXECUTIVE');

  // New Donor Form State (With Unique Phone & Email Validation)
  const [newDonorName, setNewDonorName] = useState('');
  const [newDonorPhone, setNewDonorPhone] = useState('');
  const [newDonorEmail, setNewDonorEmail] = useState('');
  const [newDonorCity, setNewDonorCity] = useState('');
  const [newDonorAmount, setNewDonorAmount] = useState('');
  const [newDonorSeva, setNewDonorSeva] = useState('రాతి గోడల నిర్మాణం (Pillars & Structure)');
  const [validationError, setValidationError] = useState('');

  // Receipt Generator Form State
  const [selectedDonorId, setSelectedDonorId] = useState('');
  const [receiptName, setReceiptName] = useState('');
  const [receiptAmount, setReceiptAmount] = useState('');
  const [receiptPhone, setReceiptPhone] = useState('');
  const [receiptCity, setReceiptCity] = useState('');
  const [receiptSeva, setReceiptSeva] = useState('రాతి గోడల నిర్మాణం (Pillars & Structure)');
  const [receiptMode, setReceiptMode] = useState('Online (UPI / PhonePe / GPay)');
  const [generatedReceipt, setGeneratedReceipt] = useState(null);

  // Gallery Image Manager State
  const [newImgTitle, setNewImgTitle] = useState('');
  const [newImgTag, setNewImgTag] = useState('');
  const [newImgSrc, setNewImgSrc] = useState('');

  // New Expense Form State
  const [newExpCat, setNewExpCat] = useState('');
  const [newExpAmt, setNewExpAmt] = useState('');
  const [newExpVendor, setNewExpVendor] = useState('');

  // Material Dropdown Items List
  const materialDropdownOptions = [
    "రాతి రాళ్ళు (Carved Granite Stones)",
    "సిమెంట్ బస్తాలు (Cement Bags)",
    "స్టీల్ & ఇనుము (Steel Rods)",
    "ద్వారబంధాలు & కలప (Teak Wood Frames)",
    "ఇటుకలు & కంకర (Bricks & Gravel)",
    "విద్యుత్ సామాగ్రి (Electrical Items)",
    "ప్లంబింగ్ సామాగ్రి (Plumbing Materials)",
    "ఇతర నిర్మాణ సామాగ్రి (Other Construction Material)"
  ];

  // New Material Donation State
  const [newMatType, setNewMatType] = useState(materialDropdownOptions[0]);
  const [newMatQty, setNewMatQty] = useState('');
  const [newMatDonor, setNewMatDonor] = useState('');

  // New Volunteer Form State
  const [newVolName, setNewVolName] = useState('');
  const [newVolPhone, setNewVolPhone] = useState('');
  const [newVolTask, setNewVolTask] = useState('');

  // Active Report Type for Download/Sharing
  const [activeReportType, setActiveReportType] = useState('financial');

  useEffect(() => {
    setDbState(getDB());
  }, []);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '1252026' || passcode === 'admin123' || passcode === '9866125609') {
      setIsAuthenticated(true);
      setPassError('');
      addAuditLog(userRole, "Admin Logged Into ERP System");
      showToast("శ్రీ రామాలయం ERP కి విజయవంతంగా లాగిన్ అయ్యారు!");
    } else {
      setPassError("తప్పు పాస్‌కోడ్! దయచేసి సరైన అడ్మిన్ పిన్ ఎంటర్ చేయండి.");
    }
  };

  // 🌟 Handle Donor Dropdown Select for Receipt Generator (All V1 Classic Site Donors Supported)
  const handleSelectDonorFromDropdown = (e) => {
    const donorId = e.target.value;
    setSelectedDonorId(donorId);
    if (!donorId) return;

    const currentDB = getDB();
    const donor = currentDB.donations.find(d => String(d.id) === String(donorId));
    if (donor) {
      const cleanNumAmount = typeof donor.amount === 'number' ? donor.amount : parseInt(String(donor.amount).replace(/\D/g, '')) || 0;
      setReceiptName(donor.donorName);
      setReceiptAmount(cleanNumAmount);
      setReceiptPhone(donor.phone || '9866125609');
      setReceiptCity(donor.city || 'పామినివాండ్లవూరు');
      setReceiptSeva(donor.seva || 'రాతి గోడల నిర్మాణం (Pillars & Structure)');
      if (donor.mode) setReceiptMode(donor.mode);
      showToast(`'${donor.donorName}' వివరాలు (₹ ${cleanNumAmount.toLocaleString()}) ఆటోమేటిక్‌గా ఎంచుకోబడ్డాయి.`);
    }
  };

  // Add Donor in CRM with Unique Phone & Email Validation
  const handleAddDonorCRM = (e) => {
    e.preventDefault();
    setValidationError('');

    if (newDonorPhone || newDonorEmail) {
      const check = validateUniqueDevotee(newDonorPhone, newDonorEmail);
      if (!check.valid) {
        setValidationError(check.message);
        showToast(check.message);
        return;
      }
    }

    const currentDB = getDB();
    const newDonationId = 'SRS-2026-' + Math.floor(100 + Math.random() * 900);
    
    const newDonation = {
      id: newDonationId,
      donorName: newDonorName,
      phone: newDonorPhone || 'N/A',
      email: newDonorEmail || 'N/A',
      amount: parseInt(newDonorAmount),
      date: new Date().toLocaleDateString('te-IN'),
      seva: newDonorSeva,
      mode: 'Cash / Bank Transfer',
      city: newDonorCity || 'పామినివాండ్లవూరు'
    };

    currentDB.donations.unshift(newDonation);
    
    currentDB.devotees.unshift({
      id: 'DEV-' + Math.floor(1000 + Math.random() * 9000),
      name: newDonorName,
      phone: newDonorPhone || '9866125609',
      email: newDonorEmail || 'sriramasevacommitteepvv@gmail.com',
      city: newDonorCity || 'పామినివాండ్లవూరు',
      registeredAt: new Date().toLocaleDateString('te-IN')
    });

    saveDB(currentDB);
    setDbState({ ...currentDB, donations: [...currentDB.donations], devotees: [...currentDB.devotees] });
    addAuditLog(userRole, `Added New Donor (${newDonorName}, ₹${newDonorAmount})`);

    showToast("దాత వివరాలు విజయవంతంగా డేటాబేస్‌లో రికార్డ్ అయ్యాయి!");
    setNewDonorName('');
    setNewDonorPhone('');
    setNewDonorEmail('');
    setNewDonorCity('');
    setNewDonorAmount('');
  };

  // Delete Donation Record
  const handleDeleteDonation = (id) => {
    const currentDB = getDB();
    currentDB.donations = currentDB.donations.filter(d => d.id !== id);
    saveDB(currentDB);
    setDbState({ ...currentDB, donations: [...currentDB.donations] });
    addAuditLog(userRole, `Deleted Donation Record (${id})`);
    showToast("విరాళం రికార్డు తొలిగించబడింది.");
  };

  // Admin Portal Receipt Generation with Persistent Save
  const handleGenerateReceipt = (e) => {
    e.preventDefault();
    if (!receiptName || !receiptAmount) {
      showToast("దయచేసి దాత పేరు మరియు మొత్తం నమోదు చేయండి.");
      return;
    }

    const currentDB = getDB();
    const receiptNo = 'SRS-ERP-' + Math.floor(100000 + Math.random() * 900000);
    const currentDate = new Date().toLocaleDateString('te-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    // Save record to DB if not already present
    const existing = currentDB.donations.find(d => d.donorName.toLowerCase() === receiptName.toLowerCase() && parseInt(d.amount) === parseInt(receiptAmount));
    if (!existing) {
      currentDB.donations.unshift({
        id: receiptNo,
        donorName: receiptName,
        phone: receiptPhone || 'N/A',
        amount: parseInt(receiptAmount),
        date: currentDate,
        seva: receiptSeva,
        mode: receiptMode,
        city: receiptCity || 'పామినివాండ్లవూరు'
      });
      saveDB(currentDB);
      setDbState({ ...currentDB, donations: [...currentDB.donations] });
    }

    setGeneratedReceipt({
      receiptNo,
      date: currentDate,
      name: receiptName,
      amount: receiptAmount,
      phone: receiptPhone || 'N/A',
      city: receiptCity || 'పామినివాండ్లవూరు',
      seva: receiptSeva,
      mode: receiptMode
    });

    addAuditLog(userRole, `Generated Receipt (${receiptNo} for ${receiptName})`);
    try { confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); } catch (err) {}
    showToast("ERP డిజిటల్ రశీదు విజయవంతంగా రూపొందించబడింది!");
  };

  // Add Expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpCat || !newExpAmt) return;

    const currentDB = getDB();
    const newExp = {
      id: 'EXP-' + Math.floor(100 + Math.random() * 900),
      category: newExpCat,
      amount: parseInt(newExpAmt),
      date: new Date().toLocaleDateString('te-IN'),
      billNo: 'BILL-' + Math.floor(1000 + Math.random() * 9000),
      vendor: newExpVendor || 'General Vendor'
    };

    currentDB.expenses.unshift(newExp);
    saveDB(currentDB);
    setDbState({ ...currentDB, expenses: [...currentDB.expenses] });
    addAuditLog(userRole, `Recorded Expense: ${newExpCat} (₹${newExpAmt})`);

    setNewExpCat('');
    setNewExpAmt('');
    setNewExpVendor('');
    showToast("ఖర్చు వివరాలు రికార్డ్ అయ్యాయి.");
  };

  // Add Material Donation
  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!newMatType || !newMatQty) return;

    const currentDB = getDB();
    currentDB.materials.unshift({
      id: 'MAT-' + (currentDB.materials.length + 1),
      type: newMatType,
      qty: newMatQty,
      donor: newMatDonor || 'Anonymous Devotee'
    });

    saveDB(currentDB);
    setDbState(currentDB);
    addAuditLog(userRole, `Added Material Donation: ${newMatType} (${newMatQty})`);

    setNewMatQty('');
    setNewMatDonor('');
    showToast("సామగ్రి విరాళం నమోదైంది!");
  };

  // Add Volunteer
  const handleAddVolunteer = (e) => {
    e.preventDefault();
    if (!newVolName) return;

    const currentDB = getDB();
    currentDB.volunteers.unshift({
      id: 'VOL-' + (currentDB.volunteers.length + 1),
      name: newVolName,
      phone: newVolPhone || '9866125609',
      task: newVolTask || 'సాధారణ సేవ',
      status: 'Active'
    });

    saveDB(currentDB);
    setDbState(currentDB);
    addAuditLog(userRole, `Added Volunteer: ${newVolName}`);

    setNewVolName('');
    setNewVolPhone('');
    setNewVolTask('');
    showToast("వాలంటీర్ చేర్చబడ్డారు!");
  };

  // Toggle Public Website Visibility Settings
  const handleToggleWebsiteSetting = (settingKey) => {
    const currentDB = getDB();
    if (!currentDB.websiteSettings) currentDB.websiteSettings = { ...defaultWebsiteSettings };
    currentDB.websiteSettings[settingKey] = !currentDB.websiteSettings[settingKey];
    
    saveDB(currentDB);
    setDbState(currentDB);
    addAuditLog(userRole, `Toggled Website Visibility: ${settingKey} -> ${currentDB.websiteSettings[settingKey]}`);
    showToast(`వెబ్‌సైట్ విభాగం మార్పు నవీకరించబడింది (${settingKey}: ${currentDB.websiteSettings[settingKey] ? 'ON' : 'OFF'})`);
  };

  // Upload file converted to Base64 for Gallery Image
  const handleFileUploadForGallery = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImgSrc(reader.result);
      showToast("ఫోటో విజయవంతంగా ఎంచుకోబడింది!");
    };
    reader.readAsDataURL(file);
  };

  // Add Gallery & Slideshow Image
  const handleAddGalleryImage = (e) => {
    e.preventDefault();
    if (!newImgTitle || !newImgSrc) {
      showToast("దయచేసి ఫోటో శీర్షిక మరియు ఫోటోను నమోదు చేయండి.");
      return;
    }

    const currentDB = getDB();
    if (!currentDB.galleryImages) currentDB.galleryImages = [];

    const newPhoto = {
      id: 'IMG-' + (currentDB.galleryImages.length + 1) + '-' + Date.now().toString().slice(-4),
      src: newImgSrc,
      title: newImgTitle,
      tag: newImgTag || 'పామినివాండ్లవూరు ఆలయం'
    };

    currentDB.galleryImages.unshift(newPhoto);
    saveDB(currentDB);
    setDbState(currentDB);
    addAuditLog(userRole, `Added Gallery Image: ${newImgTitle}`);

    setNewImgTitle('');
    setNewImgTag('');
    setNewImgSrc('');
    showToast("కొత్త ఫోటో గ్యాలరీ & స్లైడ్‌షోకు జోడించబడింది!");
  };

  // Delete Gallery Image
  const handleDeleteGalleryImage = (imageId) => {
    const currentDB = getDB();
    if (!currentDB.galleryImages) return;
    currentDB.galleryImages = currentDB.galleryImages.filter(img => String(img.id) !== String(imageId));

    saveDB(currentDB);
    setDbState(currentDB);
    addAuditLog(userRole, `Deleted Gallery Image ID: ${imageId}`);
    showToast("ఫోటో తొలగించబడింది!");
  };

  // Pixel-Perfect A4 Standard PDF Generation for Reports
  const downloadReportPDF = async () => {
    if (!reportRef.current) return;
    showToast("అధికారిక ERP నివేదిక PDF సిద్ధమవుతోంది...");
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: '#FFFDF0' });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Sri_Rama_ERP_${activeReportType.toUpperCase()}_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      showToast("ERP నివేదిక PDF విజయవంతంగా డౌన్‌లోడ్ అయింది!");
    } catch (err) {
      console.error(err);
      showToast("PDF సృష్టించడంలో సమస్య వచ్చింది.");
    }
  };

  // Pixel-Perfect A4 Landscape PDF Generation for Receipts
  const downloadReceiptPDF = async () => {
    if (!receiptRef.current) return;
    showToast("రశీదు PDF సిద్ధమవుతోంది...");
    try {
      const canvas = await html2canvas(receiptRef.current, { scale: 3, useCORS: true, backgroundColor: '#FFFDF0' });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Sri_Rama_ERP_Receipt_${generatedReceipt.receiptNo}.pdf`);
      showToast("రశీదు PDF విజయవంతంగా డౌన్‌లోడ్ అయింది!");
    } catch (err) {
      console.error(err);
      showToast("PDF సృష్టించడంలో సమస్య వచ్చింది.");
    }
  };

  // Export Receipt Image (PNG)
  const downloadReceiptImage = async () => {
    if (!receiptRef.current) return;
    showToast("రశీదు ఇమేజ్ (PNG) సిద్ధమవుతోంది...");
    try {
      const canvas = await html2canvas(receiptRef.current, { scale: 3, useCORS: true, backgroundColor: '#FFFDF0' });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Sri_Rama_ERP_Receipt_${generatedReceipt.receiptNo}.png`;
      link.click();
      showToast("ఇమేజ్ (PNG) డౌన్‌లోడ్ అయింది!");
    } catch (err) {
      console.error(err);
    }
  };

  // Share Report Image via WhatsApp
  const shareReportWhatsApp = async () => {
    if (!reportRef.current) return;
    showToast("నివేదిక WhatsApp లో షేర్ చేయడానికి సిద్ధమవుతోంది...");
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: '#FFFDF0' });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `Sri_Rama_ERP_Report.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `శ్రీ రామా సేవా కమిటీ ERP నివేదిక`,
            text: `🚩 శ్రీ రామా సేవా కమిటీ పామినివాండ్లవూరు - అధికారిక ${activeReportType} నివేదిక`,
            files: [file]
          });
        } else {
          const text = encodeURIComponent(`🚩 శ్రీ రామా సేవా కమిటీ పామినివాండ్లవూరు - అధికారిక ${activeReportType} నివేదిక సారాంశం (https://thanerurajesh2410.github.io/sri-rama-seva-committee/)`);
          window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
        }
      }, 'image/png');
    } catch (err) {
      console.error(err);
    }
  };

  // Download Full Database Backup JSON
  const downloadDatabaseJSON = () => {
    const currentDB = getDB();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentDB, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sri_rama_erp_database_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("డేటాబేస్ బ్యాకప్ (JSON) ఫైల్ డౌన్‌లోడ్ చేయబడింది!");
  };

  // Total Calculations
  const totalDonationSum = db.donations.reduce((acc, curr) => {
    const num = typeof curr.amount === 'number' ? curr.amount : parseInt(String(curr.amount).replace(/\D/g, '')) || 0;
    return acc + num;
  }, 0);

  const totalExpenseSum = db.expenses.reduce((acc, curr) => {
    const num = typeof curr.amount === 'number' ? curr.amount : parseInt(String(curr.amount).replace(/\D/g, '')) || 0;
    return acc + num;
  }, 0);

  return (
    <div className="bg-[#090914] text-white min-h-screen py-6 sacred-temple-bg-masked">
      <div className="w-full px-4 md:px-8 lg:px-12 max-w-full">
        
        {!isAuthenticated ? (
          /* Enlarged Royal Divine God Login Popup Card */
          <div className="my-8 md:my-14 flex justify-center items-center">
            <div className="gold-card max-w-2xl md:max-w-3xl w-full !p-8 md:!p-12 border-4 border-[#FFD700] text-center shadow-[0_0_60px_rgba(255,215,0,0.45)] relative overflow-hidden bg-gradient-to-b from-[#4A0E17]/95 via-[#2D080E]/95 to-[#1A0306]/98 rounded-3xl">
              
              {/* Background God Photo Halo Watermark Overlay */}
              <div className="absolute inset-0 opacity-15 bg-[url('/assets/temple_bg.jpg')] bg-cover bg-center pointer-events-none" />

              {/* Divine God Photo Emblem Header */}
              <div className="relative z-10 mb-6 flex flex-col items-center">
                <div className="relative mb-3 group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#FFD700] via-[#FF9933] to-[#FFD700] rounded-full blur-md opacity-85 group-hover:opacity-100 transition duration-500 animate-pulse" />
                  <img
                    src="/assets/logo.jpg"
                    alt="Sri Rama Seva Committee Official Logo"
                    className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#FFD700] shadow-2xl object-cover bg-[#1A0306] p-0.5 ring-4 ring-[#FFD700]/60"
                  />
                  <div className="absolute -bottom-2 right-1 bg-[#5C121E] text-[#FFD700] p-2 rounded-full border-2 border-[#FFD700] shadow-lg">
                    <Lock className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>

                <span className="bg-[#FFD700] text-[#4A0E17] font-black px-4 py-1 rounded-full text-xs md:text-sm uppercase tracking-wider shadow-md mb-2">
                  🚩 శ్రీ రామా సేవా కమిటీ • పామినివాండ్లవూరు
                </span>

                <h3 className="text-2xl md:text-4xl font-black text-white heading-telugu mb-2 leading-tight text-shadow-gold">
                  శ్రీ రామాలయం ERP డేటాబేస్ పోర్టల్ లాగిన్
                </h3>
                <p className="text-xs md:text-base text-amber-300 font-bold max-w-xl mx-auto">
                  శ్రీ రామాలయ నిర్మాణ విరాళాలు, రశీదుల జారీ & రియల్-టైమ్ ఆడిటింగ్ అడ్మిన్ వ్యవస్థ
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="relative z-10 space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <label className="block text-xs md:text-sm font-black text-amber-200 uppercase tracking-widest">
                    అడ్మిన్ పాస్‌కోడ్ నమోదు చేయండి (Enter Admin PIN)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="అడ్మిన్ PIN (ఉదా: 1252026)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-[#1A0306]/90 border-3 border-[#FFD700] text-amber-300 rounded-2xl p-4 text-center text-xl md:text-2xl font-mono focus:outline-none focus:ring-4 focus:ring-[#FFD700]/50 shadow-inner placeholder-gray-500 font-bold"
                  />
                </div>

                {passError && (
                  <div className="p-3 rounded-xl bg-red-950/90 border border-red-500 text-xs md:text-sm text-red-300 font-bold animate-bounce">
                    ⚠️ {passError}
                  </div>
                )}

                <button type="submit" className="btn-gold w-full py-4 text-base md:text-xl font-black shadow-2xl tracking-wide rounded-2xl border-2 border-yellow-200 transform hover:scale-[1.02] active:scale-95 transition-all">
                  <span>✨ ERP డేటాబేస్‌లోకి ప్రవేశించండి (Login Now)</span>
                </button>
              </form>

              {/* Official Committee Footnote Badge */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/10 text-xs text-amber-200/80 font-bold flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>📍 డోర్ నం: 5-233, పామినివాండ్లవూరు, మంగళపల్లె</span>
                <span>🏛️ SBI A/C: 45274946370 • IFSC: SBIN0005691</span>
              </div>

            </div>
          </div>
        ) : (
          /* ERP Main Control Dashboard Suite */
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Bar Header */}
            <div className="gold-card border-3 border-[#FFD700] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 !p-6">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg">
                  <LayoutDashboard className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white heading-telugu">
                    శ్రీ రామాలయం ERP అడ్మిన్ పోర్టల్
                  </h2>
                  <p className="text-sm md:text-base text-amber-300 font-bold mt-0.5">
                    రోల్: <span className="text-white font-mono bg-black/60 px-2 py-0.5 rounded">{userRole}</span> • మంగళపల్లె పంచాయతీ
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="bg-[#1A0306] border-2 border-[#FFD700] text-amber-300 rounded-xl p-2.5 text-sm font-bold shadow-md focus:outline-none"
                >
                  <option value="ADMIN / CHIEF EXECUTIVE">Admin / Chief Executive</option>
                  <option value="TREASURER (కోశాధికారి)">Treasurer (కోశాధికారి)</option>
                  <option value="SECRETARY (కార్యదర్శి)">Secretary (కార్యదర్శి)</option>
                  <option value="AUDITOR (ఆడిటర్)">Auditor (ఆడిటర్)</option>
                </select>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-black bg-red-600/40 text-red-200 border-2 border-red-500/60 hover:bg-red-600 hover:text-white transition-all shadow-lg"
                >
                  లాగౌట్ (Logout)
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar - Perfectly Aligned */}
            <div className="flex flex-wrap items-center justify-start md:justify-center gap-2 md:gap-3 border-b border-white/10 pb-4 text-base md:text-lg xl:text-[19px] font-black">
              {[
                { id: 'dashboard', label: '📊 డ్యాష్‌బోర్డ్' },
                { id: 'donations', label: '🧾 రశీదుల జారీ' },
                { id: 'donors', label: '👤 దాతల CRM' },
                { id: 'expenses', label: '💸 ఖర్చులు & బిల్లులు' },
                { id: 'reports', label: '📥 నివేదికలు & షేరింగ్' },
                { id: 'materials', label: '🏗️ సామగ్రి విరాళాలు' },
                { id: 'volunteers', label: '🤝 వాలంటీర్లు' },
                { id: 'website-settings', label: '⚙️ వెబ్‌సైట్ విభాగాలు' },
                { id: 'gallery-manager', label: '🖼️ గ్యాలరీ & స్లైడ్‌షో ఫోటోలు' },
                { id: 'audit', label: '📋 ఆడిట్ & డేటాబేస్' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 xl:px-5 py-2.5 xl:py-3 rounded-xl xl:rounded-2xl transition-all shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#5C121E] text-[#FFD700] border-2 md:border-3 border-[#FFD700] shadow-2xl font-black scale-105'
                      : 'bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: EXECUTIVE DASHBOARD WIDGETS */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="gold-card text-center !p-4 md:!p-5">
                    <span className="text-xs sm:text-sm text-gray-300 font-extrabold uppercase block mb-1">మొత్తం విరాళాలు</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-300 font-mono">₹ {totalDonationSum.toLocaleString()}</span>
                  </div>
                  <div className="gold-card text-center !p-4 md:!p-5">
                    <span className="text-xs sm:text-sm text-gray-300 font-extrabold uppercase block mb-1">మొత్తం ఖర్చులు</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-sky-400 font-mono">₹ {totalExpenseSum.toLocaleString()}</span>
                  </div>
                  <div className="gold-card text-center !p-4 md:!p-5">
                    <span className="text-xs sm:text-sm text-gray-300 font-extrabold uppercase block mb-1">నిల్వ నిధి (Balance)</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-400 font-mono">₹ {(totalDonationSum - totalExpenseSum).toLocaleString()}</span>
                  </div>
                  <div className="gold-card text-center !p-4 md:!p-5">
                    <span className="text-xs sm:text-sm text-gray-300 font-extrabold uppercase block mb-1">నమోదైన భక్తులు</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-purple-300 font-mono">{db.devotees.length} భక్తులు</span>
                  </div>
                  <div className="gold-card text-center !p-4 md:!p-5">
                    <span className="text-xs sm:text-sm text-gray-300 font-extrabold uppercase block mb-1">విరాళాల రికార్డులు</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#FFD700] font-mono">{db.donations.length}</span>
                  </div>
                  <div className="gold-card text-center !p-4 md:!p-5">
                    <span className="text-xs sm:text-sm text-gray-300 font-extrabold uppercase block mb-1">ఆడిట్ లాగ్స్</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-300 font-mono">{db.auditLogs.length}</span>
                  </div>
                </div>

                {/* Database Verification Info Card */}
                <div className="gold-card border-3 border-[#FFD700] p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Database className="w-7 h-7 text-[#FFD700]" />
                      <h4 className="text-base sm:text-xl font-black text-white">డేటాబేస్ తనిఖీ వివరాలు (Database Key Info):</h4>
                    </div>
                    <button onClick={downloadDatabaseJSON} className="btn-gold text-sm sm:text-base py-2.5 px-5 flex items-center gap-2 rounded-xl font-bold">
                      <Download className="w-5 h-5" /> డేటాబేస్ JSON బ్యాకప్ డౌన్‌లోడ్
                    </button>
                  </div>
                  <p className="text-sm sm:text-base text-amber-200 mt-3 font-mono">
                    Storage Key: <span className="text-white font-bold bg-black/70 px-3 py-1 rounded-xl">sri_rama_erp_database_v2_v3</span> (Browser LocalStorage)
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: DONATION RECEIPT GENERATOR */}
            {activeTab === 'donations' && (
              <div className="space-y-6">
                <form onSubmit={handleGenerateReceipt} className="bg-[#1A0306] p-6 sm:p-8 rounded-3xl border-2 border-[#FFD700]/50 space-y-6 shadow-2xl">
                  <h4 className="text-xl sm:text-2xl font-black text-[#FFD700] heading-telugu flex items-center gap-3">
                    <Receipt className="w-7 h-7 text-amber-400" />
                    <span>విరాళాల రశీదు సృష్టించు (Generate ERP Official Donor Receipt)</span>
                  </h4>

                  {/* 1. Donor Dropdown populated from database with ALL V1 Classic Donors */}
                  <div className="bg-[#3A0A11]/80 p-4 sm:p-5 rounded-2xl border-2 border-[#FFD700]">
                    <label className="block text-sm sm:text-base font-black text-amber-200 mb-2">
                      1. దాతల డేటాబేస్ నుండి ఎంచుకోండి (Select Donor Dropdown - All 16+ V1 Donors):
                    </label>
                    <select
                      value={selectedDonorId}
                      onChange={handleSelectDonorFromDropdown}
                      className="w-full bg-[#1A0306] border-2 border-[#FFD700] rounded-xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                    >
                      <option value="">-- డేటాబేస్ నుండి దాతను ఎంచుకోండి ({db.donations.length} దాతలు) --</option>
                      {db.donations.map((d, idx) => {
                        const numAmt = typeof d.amount === 'number' ? d.amount : parseInt(String(d.amount).replace(/\D/g, '')) || 0;
                        return (
                          <option key={d.id || idx} value={d.id}>
                            #{idx + 1} • {d.donorName} — ₹ {numAmt.toLocaleString()} ({d.seva}) • {d.date} ({d.city || 'పామినివాండ్లవూరు'})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">దాత పేరు (Donor Name) *</label>
                      <input
                        type="text"
                        required
                        placeholder="దాత పేరు"
                        value={receiptName}
                        onChange={(e) => setReceiptName(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">విరాళం మొత్తం (₹) *</label>
                      <input
                        type="number"
                        required
                        placeholder="మొత్తం"
                        value={receiptAmount}
                        onChange={(e) => setReceiptAmount(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-[#FFD700] font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">విరాళం వర్గం / సేవ *</label>
                      <input
                        type="text"
                        required
                        placeholder="ఉదా: ఆలయ నిర్మాణం"
                        value={receiptSeva}
                        onChange={(e) => setReceiptSeva(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">పావతి మార్గం (Mode)</label>
                      <select
                        value={receiptMode}
                        onChange={(e) => setReceiptMode(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                      >
                        <option value="Online (UPI / PhonePe / GPay)">Online (UPI / PhonePe / GPay)</option>
                        <option value="Bank Transfer (NEFT/IMPS)">Bank Transfer (NEFT/IMPS)</option>
                        <option value="Cash (నగదు జారీ)">Cash (నగదు జారీ)</option>
                        <option value="Cheque (చెక్కు)">Cheque (చెక్కు)</option>
                        <option value="Demand Draft (DD)">Demand Draft (DD)</option>
                        <option value="In-kind (సామగ్రి కానుక)">In-kind (సామగ్రి కానుక)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">ఫోన్ నంబర్ (Phone)</label>
                      <input
                        type="tel"
                        placeholder="ఫోన్ నంబర్"
                        value={receiptPhone}
                        onChange={(e) => setReceiptPhone(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">స్థలం / ఊరు (City)</label>
                      <input
                        type="text"
                        placeholder="పామినివాండ్లవూరు"
                        value={receiptCity}
                        onChange={(e) => setReceiptCity(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-gold w-full py-4 text-base sm:text-xl font-black shadow-2xl rounded-2xl">
                    రశీదు రూపొందించు (Create ERP Official Receipt)
                  </button>
                </form>

                {/* Rendered Receipt Card */}
                {generatedReceipt && (
                  <div className="space-y-4">
                    <div ref={receiptRef} className="bg-[#FFFDF0] text-[#2D080E] p-8 rounded-3xl border-4 border-[#FFD700] shadow-2xl">
                      <div className="flex justify-between border-b-2 border-[#5C121E]/30 pb-4 mb-5">
                        <div className="flex items-center gap-3">
                          <img src="/assets/logo.jpg" alt="Logo" className="w-12 h-12 rounded-full border-2 border-amber-600" />
                          <div>
                            <h4 className="text-xl font-black text-[#5C121E] heading-telugu">శ్రీ రామా సేవా కమిటీ</h4>
                            <p className="text-xs font-bold text-amber-800">పామినివాండ్లవూరు • ERP అధికారిక రశీదు</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-gray-600 block">రశీదు నం:</span>
                          <span className="text-sm sm:text-base font-mono font-black text-[#5C121E]">{generatedReceipt.receiptNo}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-5 text-sm sm:text-base mb-6">
                        <div><span className="text-gray-600 block text-xs font-bold">దాత పేరు:</span><span className="font-black text-lg text-[#5C121E]">{generatedReceipt.name}</span></div>
                        <div><span className="text-gray-600 block text-xs font-bold">తేదీ:</span><span className="font-mono font-bold text-gray-800">{generatedReceipt.date}</span></div>
                        <div><span className="text-gray-600 block text-xs font-bold">మార్గాలు:</span><span className="font-bold text-gray-800">{generatedReceipt.mode}</span></div>
                        <div><span className="text-gray-600 block text-xs font-bold">విరాళం వర్గం / సేవ:</span><span className="font-bold text-gray-800">{generatedReceipt.seva}</span></div>
                      </div>

                      <div className="bg-[#5C121E] text-white p-4 rounded-2xl flex items-center justify-between">
                        <span className="text-sm sm:text-base font-bold">పవిత్ర విరాళం కానుక:</span>
                        <span className="text-2xl sm:text-3xl font-black font-mono text-[#FFD700]">₹ {parseInt(generatedReceipt.amount).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button onClick={downloadReceiptImage} className="btn-gold text-sm sm:text-base py-3 px-6 flex-1 rounded-2xl font-bold">
                        🖼️ ఇమేజ్ (PNG) డౌన్‌లోడ్
                      </button>
                      <button onClick={downloadReceiptPDF} className="btn-primary text-sm sm:text-base py-3 px-6 flex-1 rounded-2xl font-bold">
                        📄 PDF డౌన్‌లోడ్
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: DONOR CRM & UNIQUE REGISTRATION */}
            {activeTab === 'donors' && (
              <div className="space-y-6">
                
                {/* Form to Add Donor with Unique Phone & Email Validation */}
                <form onSubmit={handleAddDonorCRM} className="bg-[#1A0306] p-6 sm:p-8 rounded-3xl border-2 border-[#FFD700]/50 space-y-6 shadow-2xl">
                  <h4 className="text-xl sm:text-2xl font-black text-[#FFD700] heading-telugu flex items-center gap-3">
                    <Plus className="w-7 h-7 text-amber-400" />
                    <span>క్రొత్త దాత నమోదు (Add Donor with Category Dropdown)</span>
                  </h4>

                  {validationError && (
                    <div className="p-4 rounded-2xl bg-red-950/90 border-2 border-red-500 text-sm sm:text-base font-bold text-red-300 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">దాత పేరు (Full Name) *</label>
                      <input
                        type="text"
                        required
                        placeholder="పేరు నమోదు చేయండి"
                        value={newDonorName}
                        onChange={(e) => setNewDonorName(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">ఫోన్ నంబర్ (Unique Phone)</label>
                      <input
                        type="tel"
                        placeholder="ఫోన్ నంబర్"
                        value={newDonorPhone}
                        onChange={(e) => setNewDonorPhone(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">ఇమెయిల్ ఐడీ (Unique Email)</label>
                      <input
                        type="email"
                        placeholder="ఇమెయిల్ ఐడీ"
                        value={newDonorEmail}
                        onChange={(e) => setNewDonorEmail(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">విరాళం మొత్తం (₹) *</label>
                      <input
                        type="number"
                        required
                        placeholder="ఉదా: 5000"
                        value={newDonorAmount}
                        onChange={(e) => setNewDonorAmount(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-[#FFD700] font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">విరాళం వర్గం / సేవా రకం (Category Dropdown) *</label>
                      <select
                        value={newDonorSeva}
                        onChange={(e) => setNewDonorSeva(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-[#FFD700]/70 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold focus:outline-none"
                      >
                        {v2T.donationCategories.map(cat => (
                          <optgroup key={cat.id} label={cat.name} className="bg-[#1A0306] text-amber-300 font-bold">
                            {cat.subTypes.map((sub, idx) => (
                              <option key={idx} value={sub} className="bg-[#2A060B] text-white">
                                {sub}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">గ్రామం / స్థలం</label>
                      <input
                        type="text"
                        placeholder="పామినివాండ్లవూరు"
                        value={newDonorCity}
                        onChange={(e) => setNewDonorCity(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full py-4 text-base sm:text-xl font-black shadow-2xl rounded-2xl">
                    + దాత వివరాలను డేటాబేస్‌లో చేర్చు (Save Donor Record)
                  </button>
                </form>

                {/* Donors List with Delete Button - Large & Clear Table */}
                <div className="gold-card space-y-4 !p-6 sm:!p-8">
                  <h3 className="text-xl sm:text-2xl font-black text-[#FFD700]">నమోదైన దాతల రికార్డులు ({db.donations.length})</h3>
                  <div className="max-h-[550px] overflow-y-auto bg-black/60 rounded-2xl border-2 border-white/20 p-4 text-sm sm:text-base">
                    <table className="w-full text-left border-collapse">
                      <thead className="text-[#FFD700] border-b-2 border-[#FFD700]/50 sticky top-0 bg-[#2D080E] z-10">
                        <tr>
                          <th className="p-3.5 font-black">#</th>
                          <th className="p-3.5 font-black">దాత పేరు</th>
                          <th className="p-3.5 font-black">ఫోన్</th>
                          <th className="p-3.5 font-black">మొత్తం</th>
                          <th className="p-3.5 font-black">వర్గం / సేవ</th>
                          <th className="p-3.5 font-black">తేదీ</th>
                          <th className="p-3.5 text-right font-black">చర్య</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/15">
                        {db.donations.map((d, idx) => {
                          const numAmt = typeof d.amount === 'number' ? d.amount : parseInt(String(d.amount).replace(/\D/g, '')) || 0;
                          return (
                            <tr key={d.id || idx} className="hover:bg-white/5 transition-colors">
                              <td className="p-3.5 font-mono font-bold text-gray-300">{idx + 1}</td>
                              <td className="p-3.5 font-extrabold text-white text-base sm:text-lg">{d.donorName}</td>
                              <td className="p-3.5 font-mono text-gray-200 font-bold">{d.phone}</td>
                              <td className="p-3.5 font-mono text-amber-300 font-black text-base sm:text-lg">₹ {numAmt.toLocaleString()}</td>
                              <td className="p-3.5 text-amber-100 font-bold">{d.seva}</td>
                              <td className="p-3.5 text-gray-300 font-mono font-bold">{d.date}</td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => handleDeleteDonation(d.id)}
                                  className="p-2 rounded-xl bg-red-600/30 text-red-300 hover:bg-red-600 hover:text-white transition-colors"
                                  title="Delete Donor Record"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: EXPENSES MANAGEMENT */}
            {activeTab === 'expenses' && (
              <div className="space-y-6">
                <form onSubmit={handleAddExpense} className="gold-card space-y-5 !p-6 sm:!p-8">
                  <h4 className="text-xl sm:text-2xl font-black text-[#FFD700]">క్రొత్త ఖర్చు నమోదు (Record New Expense)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <input
                      type="text"
                      required
                      placeholder="ఖర్చు విభాగం"
                      value={newExpCat}
                      onChange={(e) => setNewExpCat(e.target.value)}
                      className="bg-[#1A0306] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                    />
                    <input
                      type="number"
                      required
                      placeholder="మొత్తం (₹)"
                      value={newExpAmt}
                      onChange={(e) => setNewExpAmt(e.target.value)}
                      className="bg-[#1A0306] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-[#FFD700] font-mono font-bold"
                    />
                    <input
                      type="text"
                      placeholder="వెండర్ / సంస్థ పేరు"
                      value={newExpVendor}
                      onChange={(e) => setNewExpVendor(e.target.value)}
                      className="bg-[#1A0306] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                    />
                  </div>
                  <button type="submit" className="btn-primary text-base sm:text-xl py-4 w-full rounded-2xl font-black shadow-2xl">
                    + ఖర్చు రికార్డ్ చేయి
                  </button>
                </form>

                <div className="gold-card space-y-4 !p-6 sm:!p-8">
                  <h4 className="text-xl sm:text-2xl font-black text-[#FFD700] mb-4">నమోదైన ఖర్చులు:</h4>
                  {db.expenses.map((e, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-black/60 border border-white/15">
                      <div>
                        <span className="font-black text-white text-base sm:text-lg block">{e.category}</span>
                        <span className="text-gray-300 block text-xs sm:text-sm font-bold mt-0.5">{e.date} • Vendor: {e.vendor}</span>
                      </div>
                      <span className="font-mono text-sky-300 font-black text-lg sm:text-xl">₹ {parseInt(e.amount).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: REPORTS & 1-CLICK SHARING SUITE */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                
                {/* Select Report Type Bar */}
                <div className="flex flex-wrap items-center gap-3 bg-[#1A0306] p-4 rounded-2xl border-2 border-[#FFD700]/40 text-sm sm:text-base font-bold">
                  <span className="text-amber-300 font-black">నివేదిక రకం ఎంచుకోండి (Select Report Type):</span>
                  {[
                    { id: 'financial', label: '📊 ఆర్థిక నివేదిక (Financial Summary)' },
                    { id: 'donors', label: '👥 దాతల నివేదిక (Donors Ledger)' },
                    { id: 'construction', label: '🏗️ నిర్మాణ నివేదిక (Construction Audit)' },
                    { id: 'audit', label: '📋 ఆడిట్ లాగ్ నివేదిక (Audit Logs)' }
                  ].map(r => (
                    <button
                      key={r.id}
                      onClick={() => setActiveReportType(r.id)}
                      className={`px-4 py-2.5 rounded-xl transition-all font-black text-sm sm:text-base ${
                        activeReportType === r.id ? 'bg-[#5C121E] text-[#FFD700] border-2 border-[#FFD700] shadow-lg scale-105' : 'bg-white/10 text-gray-200 hover:bg-white/20'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                {/* 📄 Printable Report Render Container */}
                <div ref={reportRef} className="bg-[#FFFDF0] text-[#2D080E] p-8 sm:p-10 rounded-3xl border-4 border-[#FFD700] shadow-2xl relative max-w-full overflow-hidden">
                  <div className="flex justify-between border-b-2 border-[#5C121E]/30 pb-5 mb-5">
                    <div className="flex items-center gap-4">
                      <img src="/assets/logo.jpg" alt="Logo" className="w-14 h-14 rounded-full border-2 border-amber-600" />
                      <div>
                        <h3 className="text-2xl font-black text-[#5C121E] heading-telugu">శ్రీ రామా సేవా కమిటీ పామినివాండ్లవూరు</h3>
                        <p className="text-sm font-bold text-amber-900">అధికారిక ERP {activeReportType.toUpperCase()} నివేదిక • {new Date().toLocaleDateString('te-IN')}</p>
                      </div>
                    </div>
                  </div>

                  {activeReportType === 'financial' && (
                    <div className="space-y-5 text-base sm:text-lg">
                      <div className="grid grid-cols-3 gap-5 text-center font-bold">
                        <div className="bg-amber-100 p-5 rounded-2xl border-2 border-amber-400">
                          <span className="block text-sm font-black text-gray-700">మొత్తం ఆదాయం</span>
                          <span className="text-2xl text-emerald-800 block font-mono font-black mt-1">₹ {totalDonationSum.toLocaleString()}</span>
                        </div>
                        <div className="bg-amber-100 p-5 rounded-2xl border-2 border-amber-400">
                          <span className="block text-sm font-black text-gray-700">మొత్తం వ్యయం</span>
                          <span className="text-2xl text-red-800 block font-mono font-black mt-1">₹ {totalExpenseSum.toLocaleString()}</span>
                        </div>
                        <div className="bg-amber-100 p-5 rounded-2xl border-2 border-amber-400">
                          <span className="block text-sm font-black text-gray-700">నిల్వ నిధి</span>
                          <span className="text-2xl text-sky-900 block font-mono font-black mt-1">₹ {(totalDonationSum - totalExpenseSum).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportType === 'donors' && (
                    <div className="text-sm sm:text-base">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#5C121E] text-white">
                            <th className="p-3 font-black">#</th>
                            <th className="p-3 font-black">దాత పేరు</th>
                            <th className="p-3 font-black">మొత్తం</th>
                            <th className="p-3 font-black">వర్గం / సేవ</th>
                            <th className="p-3 font-black">తేదీ</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-200">
                          {db.donations.map((d, idx) => {
                            const numAmt = typeof d.amount === 'number' ? d.amount : parseInt(String(d.amount).replace(/\D/g, '')) || 0;
                            return (
                              <tr key={idx}>
                                <td className="p-3 font-mono font-bold">{idx + 1}</td>
                                <td className="p-3 font-black">{d.donorName}</td>
                                <td className="p-3 font-mono font-black text-amber-900">₹ {numAmt.toLocaleString()}</td>
                                <td className="p-3 font-bold">{d.seva}</td>
                                <td className="p-3 font-mono font-bold">{d.date}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* 🚀 Download & Share Controls */}
                <div className="bg-black/60 p-5 rounded-2xl border-2 border-white/20 flex flex-wrap items-center gap-4 text-base font-bold">
                  <button onClick={downloadReportPDF} className="btn-primary py-3.5 px-6 flex-1 flex justify-center items-center gap-2 rounded-2xl text-base sm:text-lg">
                    <Download className="w-5 h-5" /> PDF డౌన్‌లోడ్
                  </button>
                  <button onClick={shareReportWhatsApp} className="btn-gold py-3.5 px-6 flex-1 flex justify-center items-center gap-2 rounded-2xl text-base sm:text-lg">
                    <Share2 className="w-5 h-5" /> WhatsApp ద్వారా నివేదిక షేర్ చేయి
                  </button>
                </div>

              </div>
            )}

            {/* TAB 6: MATERIALS DONATIONS */}
            {activeTab === 'materials' && (
              <div className="space-y-6">
                <form onSubmit={handleAddMaterial} className="gold-card space-y-5 !p-6 sm:!p-8">
                  <h4 className="text-xl sm:text-2xl font-black text-[#FFD700]">సామగ్రి విరాళం నమోదు (Material Donations Entry)</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">సామగ్రి పేరు (Item Name Dropdown) *</label>
                      <select
                        value={newMatType}
                        onChange={(e) => setNewMatType(e.target.value)}
                        className="w-full bg-[#1A0306] border-2 border-[#FFD700] rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold focus:outline-none"
                      >
                        {materialDropdownOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">పరిమాణం (Quantity) *</label>
                      <input
                        type="text"
                        required
                        placeholder="ఉదా: 10 లోడ్లు / 50 బస్తాలు"
                        value={newMatQty}
                        onChange={(e) => setNewMatQty(e.target.value)}
                        className="w-full bg-[#1A0306] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-extrabold text-amber-200 mb-1.5">దాత పేరు (Donor Name)</label>
                      <input
                        type="text"
                        placeholder="దాత పేరు నమోదు చేయండి"
                        value={newMatDonor}
                        onChange={(e) => setNewMatDonor(e.target.value)}
                        className="w-full bg-[#3A0A11] border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 text-base sm:text-lg text-white font-bold"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary text-base sm:text-xl py-4 w-full font-black rounded-2xl shadow-2xl">
                    + సామగ్రి రికార్డ్ చేయి (Save Material Donation)
                  </button>
                </form>

                <div className="gold-card space-y-2">
                  <h4 className="text-sm font-bold text-[#FFD700]">సామగ్రి రికార్డులు (Material Ledger):</h4>
                  {db.materials.map((m, idx) => (
                    <div key={idx} className="flex justify-between p-3 rounded-lg bg-black/40 border border-white/10">
                      <span className="font-bold text-white text-sm">{m.type} ({m.qty})</span>
                      <span className="text-amber-300 font-bold">Donor: {m.donor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: VOLUNTEERS */}
            {activeTab === 'volunteers' && (
              <div className="gold-card space-y-4 text-xs">
                <h3 className="text-lg font-bold text-[#FFD700]">వాలంటీర్ల రికార్డులు ({db.volunteers.length})</h3>
                <form onSubmit={handleAddVolunteer} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="వాలంటీర్ పేరు"
                    value={newVolName}
                    onChange={(e) => setNewVolName(e.target.value)}
                    className="flex-1 bg-[#1A0306] border border-white/20 rounded-xl p-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="బాధ్యత"
                    value={newVolTask}
                    onChange={(e) => setNewVolTask(e.target.value)}
                    className="flex-1 bg-[#1A0306] border border-white/20 rounded-xl p-2 text-xs text-white"
                  />
                  <button type="submit" className="btn-gold text-xs px-4">చేర్చు</button>
                </form>

                <div className="space-y-2 pt-2">
                  {db.volunteers.map((v, idx) => (
                    <div key={idx} className="flex justify-between p-2.5 rounded-lg bg-black/40 border border-white/10">
                      <span className="font-bold text-white">{v.name} ({v.phone})</span>
                      <span className="text-amber-300">{v.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: PUBLIC WEBSITE DISPLAY VISIBILITY CONTROLLER */}
            {activeTab === 'website-settings' && (() => {
              const settings = db.websiteSettings || defaultWebsiteSettings;

              const toggleItems = [
                { key: 'showSlideshow', label: 'హోమ్ స్లైడ్‌షో బానర్ (Home Banner Slideshow)', desc: 'ప్రధాన హోమ్ పేజీలో ఫుల్ స్క్రీన్ ఫోటో స్లైడ్‌షో ప్రదర్శన' },
                { key: 'showAbout', label: 'ఆలయ విశేషాలు (About Temple)', desc: 'ఆలయ చరిత్ర & ట్రస్ట్ రిజిస్ట్రేషన్ వివరాలు' },
                { key: 'showDonations', label: 'ఈ-హుండి & విరాళాల వర్గాలు (Donations & E-Hundi)', desc: 'PhonePe QR స్కేనర్, బ్యాంక్ ఖాతా & విరాళాల డ్రాప్‌డౌన్' },
                { key: 'showCommittee', label: 'కమిటీ సభ్యులు (Committee Members)', desc: 'పాలక మండలి సభ్యులు, అధ్యక్షులు & హోదాలు' },
                { key: 'showTerms', label: 'ఆలయ నిబంధనలు (Terms & Conditions)', desc: 'విరాళాల పారదర్శకత & నిబంధనలు' },
                { key: 'showEvents', label: 'వార్షిక ఉత్సవాలు (Events & Festivals)', desc: 'శ్రీరామనవమి & ధార్మిక కార్యక్రమాలు' },
                { key: 'showGallery', label: 'ఫోటో గ్యాలరీ (Photo Gallery)', desc: 'శ్రీ రామాలయ నిర్మాణ ప్రగతి ఫోటోలు' },
                { key: 'showNews', label: 'వార్తలు & ప్రకటనలు (News & Press Releases)', desc: 'తాజా పత్రికా ప్రకటనలు' },
                { key: 'showReports', label: 'పారదర్శకత నివేదికలు (Financial Audit Reports)', desc: 'డబ్బుల జమ ఖర్చులు & లేడ్జర్' },
                { key: 'showContact', label: 'అధికారిక చిరునామా & WhatsApp ఫారం (Contact & WhatsApp Form)', desc: 'చిరునామా, ఇమెయిల్ & WhatsApp డైరెక్ట్ మెసేజ్ ఫారం' }
              ];

              return (
                <div className="space-y-6">
                  <div className="gold-card border-3 border-[#FFD700] p-6 rounded-3xl bg-gradient-to-r from-[#5C121E] via-[#3A0A11] to-[#5C121E]">
                    <div className="flex items-center gap-3 mb-2">
                      <Sliders className="w-8 h-8 text-[#FFD700]" />
                      <h3 className="text-xl sm:text-2xl font-black text-[#FFD700] heading-telugu">
                        పబ్లిక్ వెబ్‌సైట్ డిస్‌ప్లే కంట్రోలర్ (Public Website Visibility Manager)
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-200 font-bold">
                      ఇక్కడి టోగుల్ (Switch) ద్వారా పబ్లిక్ వెబ్‌సైట్‌లో ఏయే విభాగాలు లేదా పేజీలు కనిపించాలో అడ్మిన్ నేరుగా నియంత్రించవచ్చు.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {toggleItems.map(item => {
                      const isON = settings[item.key] !== false;
                      return (
                        <div
                          key={item.key}
                          className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 ${
                            isON
                              ? 'bg-gradient-to-r from-[#5C121E] to-[#2D080E] border-[#FFD700] shadow-xl'
                              : 'bg-black/60 border-white/10 opacity-70'
                          }`}
                        >
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-white heading-telugu flex items-center gap-2">
                              <span>{item.label}</span>
                            </h4>
                            <p className="text-xs text-gray-300 font-semibold mt-1">{item.desc}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleToggleWebsiteSetting(item.key)}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 border ${
                              isON
                                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                                : 'bg-gray-800 text-gray-400 border-gray-600'
                            }`}
                          >
                            {isON ? <ToggleRight className="w-6 h-6 text-black fill-emerald-950" /> : <ToggleLeft className="w-6 h-6" />}
                            <span>{isON ? 'ప్రదర్శించు (VISIBLE)' : 'దాచు (HIDDEN)'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* TAB 10: GALLERY & SLIDESHOW IMAGES MANAGER */}
            {activeTab === 'gallery-manager' && (() => {
              const galleryList = db.galleryImages || defaultGalleryImages;

              return (
                <div className="space-y-8">
                  {/* Upload Form */}
                  <form onSubmit={handleAddGalleryImage} className="gold-card bg-gradient-to-r from-[#5C121E] via-[#3A0A11] to-[#5C121E] border-3 border-[#FFD700] p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/20">
                      <Camera className="w-8 h-8 text-[#FFD700]" />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-[#FFD700] heading-telugu">కొత్త ఫోటో జోడించండి (Upload New Image to Gallery & Slideshow)</h3>
                        <p className="text-xs sm:text-sm text-gray-200 font-bold">ఇక్కడ జోడించిన ఫోటోలు పబ్లిక్ వెబ్‌సైట్ స్లైడ్‌షో బానర్ మరియు గ్యాలరీలో ప్రదర్శించబడతాయి.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-black text-amber-200 mb-1">1. ఫోటో శీర్షిక (Image Title) *</label>
                        <input
                          type="text"
                          required
                          placeholder="ఉదా: శ్రీ రామాలయ గర్భగుడి పూజ"
                          value={newImgTitle}
                          onChange={(e) => setNewImgTitle(e.target.value)}
                          className="w-full bg-[#1A0306] border-2 border-white/20 rounded-xl p-3.5 text-sm sm:text-base text-white font-extrabold focus:border-[#FFD700]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-black text-amber-200 mb-1">2. విభాగం టాగ్ (Category Tag)</label>
                        <input
                          type="text"
                          placeholder="ఉదా: రాతి గోడల నిర్మాణం"
                          value={newImgTag}
                          onChange={(e) => setNewImgTag(e.target.value)}
                          className="w-full bg-[#1A0306] border-2 border-white/20 rounded-xl p-3.5 text-sm sm:text-base text-white font-extrabold focus:border-[#FFD700]"
                        />
                      </div>
                    </div>

                    {/* Image Input Options */}
                    <div className="space-y-4 bg-black/60 p-5 rounded-2xl border border-white/15">
                      <label className="block text-xs sm:text-sm font-black text-amber-200">
                        3. ఫోటో ఎంచుకోండి (Select Image via File Upload or URL) *
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Option A: File Upload */}
                        <div className="p-4 rounded-xl border-2 border-dashed border-[#FFD700]/70 bg-[#1A0306] text-center flex flex-col items-center justify-center">
                          <Upload className="w-8 h-8 text-amber-300 mb-2 animate-bounce" />
                          <span className="text-xs sm:text-sm font-bold text-white mb-2">మీ కంప్యూటర్ నుండి ఫోటో అప్‌లోడ్ చేయండి</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUploadForGallery}
                            className="text-xs text-amber-200 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#FFD700] file:text-black cursor-pointer"
                          />
                        </div>

                        {/* Option B: Image URL */}
                        <div className="p-4 rounded-xl border-2 border-white/20 bg-[#1A0306] flex flex-col justify-center space-y-2">
                          <span className="text-xs font-bold text-gray-300">లేదా ఇమేజ్ URL నమోదు చేయండి:</span>
                          <input
                            type="text"
                            placeholder="https://... లేదా /assets/temple_photo_1.png"
                            value={newImgSrc}
                            onChange={(e) => setNewImgSrc(e.target.value)}
                            className="w-full bg-black border border-white/20 rounded-xl p-3 text-xs sm:text-sm text-white font-mono"
                          />
                        </div>
                      </div>

                      {/* Image Preview Box */}
                      {newImgSrc && (
                        <div className="mt-3 p-3 rounded-xl bg-black border border-emerald-400 flex items-center gap-4">
                          <img src={newImgSrc} alt="Preview" className="w-24 h-16 object-cover rounded-lg border border-amber-300" />
                          <div>
                            <span className="text-xs font-black text-emerald-400 block">✓ ఫోటో ప్రివ్యూ సిద్ధంగా ఉంది</span>
                            <span className="text-xs text-gray-300 font-mono">{newImgTitle || 'శీర్షిక నమోదు చేయబడలేదు'}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn-gold w-full py-4 text-base font-black rounded-2xl shadow-xl flex items-center justify-center gap-2">
                      <Plus className="w-6 h-6" />
                      <span>కొత్త ఫోటోను స్లైడ్‌షో & గ్యాలరీకి జోడించండి</span>
                    </button>
                  </form>

                  {/* Existing Photos Grid */}
                  <div className="gold-card bg-[#5C121E]/95 border-3 border-amber-400/80 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
                    <div className="flex justify-between items-center pb-3 border-b border-white/20">
                      <h3 className="text-xl sm:text-2xl font-black text-[#FFD700] heading-telugu flex items-center gap-3">
                        <ImageIcon className="w-7 h-7 text-amber-400" />
                        <span>ప్రస్తుత ఫోటోల జాబితా (Active Images - {galleryList.length})</span>
                      </h3>
                      <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-400/50">
                        {galleryList.length} Images
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {galleryList.map((img) => (
                        <div key={img.id} className="gold-card !p-4 bg-black/60 border-2 border-white/20 rounded-2xl flex flex-col justify-between space-y-3">
                          <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/20">
                            <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="text-[11px] font-black text-amber-300 bg-[#5C121E] px-2.5 py-0.5 rounded-full border border-amber-400/40 inline-block mb-1">
                              {img.tag}
                            </span>
                            <h4 className="text-sm font-black text-white heading-telugu line-clamp-2">{img.title}</h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteGalleryImage(img.id)}
                            className="btn-outline text-xs !py-2 !px-3 text-red-400 border-red-500/50 hover:bg-red-600 hover:text-white rounded-xl w-full flex items-center justify-center gap-1.5 font-bold"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>తొలగించండి (Delete)</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* TAB 8: AUDIT & DATABASE VERIFICATION */}
            {activeTab === 'audit' && (
              <div className="space-y-4 text-xs">
                
                {/* Database Info & Download Card */}
                <div className="gold-card border-2 border-[#FFD700] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-base font-bold text-[#FFD700] flex items-center gap-2">
                      <Database className="w-5 h-5 text-amber-300" />
                      <span>డేటాబేస్ తనిఖీ & బ్యాకప్ (Database Verification Suite)</span>
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">
                      బ్రౌజర్ లోకల్ స్టోరేజ్ కీ: <span className="font-mono text-amber-300 font-bold bg-black/60 px-2 py-0.5 rounded">sri_rama_erp_database_v2_v3</span>
                    </p>
                  </div>

                  <button onClick={downloadDatabaseJSON} className="btn-gold text-xs py-2 px-4 whitespace-nowrap">
                    <Download className="w-4 h-4" /> పూర్తి డేటాబేస్ JSON డౌన్‌లోడ్
                  </button>
                </div>

                <div className="gold-card space-y-4">
                  <h3 className="text-lg font-bold text-[#FFD700]">రియల్-టైమ్ ఆడిట్ లాగ్ రికార్డులు ({db.auditLogs.length})</h3>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {db.auditLogs.map((log, idx) => (
                      <div key={idx} className="flex justify-between p-2.5 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-white font-bold">{log.action}</span>
                        <span className="text-amber-300 font-mono">{log.timestamp} ({log.user})</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
