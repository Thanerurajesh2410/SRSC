// Persistent Database Engine for Version 2 Sri Ramalayam ERP & Devotee Portal
const DB_STORAGE_KEY = 'sri_rama_erp_database_v2_v3';

// 🌟 Full 16 Authentic Donors List from V1 Classic Site
const v1ClassicDonors = [
  { id: 'SRS-2026-001', donorName: 'Cash Deposit Self', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 1116, date: '12-06-2026', seva: 'నగదు జమ', mode: 'Cash Deposit', city: 'ఆలయ నిధి' },
  { id: 'SRS-2026-002', donorName: 'Thaneru (T. Haneru)', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 5000, date: '12-06-2026', seva: 'రాతి గోడల నిర్మాణం', mode: 'Cash Deposit', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-003', donorName: 'T. Chandra', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 51, date: '12-06-2026', seva: 'విరాళం', mode: 'Cash Deposit', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-004', donorName: 'T. Chandr', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 50, date: '12-06-2026', seva: 'విరాళం', mode: 'Cash Deposit', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-005', donorName: 'T. Karthi', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 30, date: '14-06-2026', seva: 'విరాళం', mode: 'Cash Deposit', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-006', donorName: 'T. Murali', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 116, date: '14-06-2026', seva: 'విరాళం', mode: 'Cash Deposit', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-007', donorName: 'P. Sandeep', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 116, date: '17-06-2026', seva: 'విరాళం', mode: 'Cash Deposit', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-008', donorName: 'Thaneru (T. Hanneru)', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 505, date: '18-06-2026', seva: 'విరాళం', mode: 'Cash Deposit', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-009', donorName: 'P. Naveen', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 11, date: '25-06-2026', seva: 'విరాళం', mode: 'Cash Deposit', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-010', donorName: 'P. Rishi', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 2101, date: '04-07-2026', seva: 'ఈ-హుండి కానుక', mode: 'UPI / PhonePe', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-011', donorName: 'Sri Sai Mahila Mandali', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 10000, date: '06-07-2026', seva: 'మహిళా మండలి విరాళం', mode: 'SBI Direct Transfer', city: 'మంగళపల్లె' },
  { id: 'SRS-2026-012', donorName: 'SHG Rajeshwari Mahila Mandali', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 10000, date: '06-07-2026', seva: 'మహిళా మండలి విరాళం', mode: 'SBI Direct Transfer', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-013', donorName: 'Sri Ganesh Mahila Mandali', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 10000, date: '06-07-2026', seva: 'మహిళా మండలి విరాళం', mode: 'SBI Direct Transfer', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-014', donorName: 'SHG Mahila Mandali Group', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 10000, date: '06-07-2026', seva: 'మహిళా మండలి విరాళం', mode: 'SBI Direct Transfer', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-015', donorName: 'Jyoshna / Vanama', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 5000, date: '06-07-2026', seva: 'స్వామివారి సేవ', mode: 'Cash Deposit', city: 'పామినివాండ్లవూరు' },
  { id: 'SRS-2026-016', donorName: 'Thaneru Munirathnam & Neelamma family', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', amount: 50000, date: '06-07-2026', seva: 'ఆలయ నిర్మాణ నిధి', mode: 'SBI Direct Transfer', city: 'పామినివాండ్లవూరు' }
];

const initialDB = {
  devotees: [
    { id: 'DEV-1001', name: 'Thaneru Rajesh', phone: '9866125609', email: 'sriramasevacommitteepvv@gmail.com', city: 'పామినివాండ్లవూరు', registeredAt: '12-05-2026' },
    { id: 'DEV-1002', name: 'Prathap T', phone: '8431806098', email: 'prathap@gmail.com', city: 'పామినివాండ్లవూరు', registeredAt: '15-05-2026' }
  ],
  donations: [...v1ClassicDonors],
  sevaBookings: [
    { id: 'SEVA-101', devoteeName: 'Thaneru Rajesh', phone: '9866125609', sevaName: 'నిత్య పంచామృత అభిషేకం', date: '2026-08-01', amount: 501, status: 'Confirmed' }
  ],
  expenses: [],
  materials: [
    { id: 'MAT-1', type: 'రాతి రాళ్ళు (Carved Granite Stones)', qty: '38 Loads', donor: 'Thaneru Family' },
    { id: 'MAT-2', type: 'సిమెంట్ బస్తాలు (Cement Bags)', qty: '1120 Bags', donor: 'Ganesh Group' }
  ],
  volunteers: [
    { id: 'VOL-1', name: 'Ramu T', phone: '9866125609', email: 'ramu@gmail.com', task: 'అన్నదానం పర్యవేక్షణ', status: 'Active' },
    { id: 'VOL-2', name: 'Siva K', phone: '8431806098', email: 'siva@gmail.com', task: 'నిర్మాణ పర్యవేక్షణ', status: 'Active' }
  ],
  auditLogs: [
    { id: 'LOG-1', timestamp: '2026-07-26 09:30:00', user: 'Admin', action: 'System Database Initialized with V1 Classic Donors' }
  ]
};

export const getDB = () => {
  try {
    const data = localStorage.getItem(DB_STORAGE_KEY);
    if (!data) return initialDB;

    const parsed = JSON.parse(data);
    // Filter out initial development mock expenses if present
    if (parsed.expenses && parsed.expenses.some(e => e.id === 'EXP-101' || e.id === 'EXP-102')) {
      parsed.expenses = parsed.expenses.filter(e => e.id !== 'EXP-101' && e.id !== 'EXP-102');
    }
    if (!parsed.expenses) parsed.expenses = [];

    // Ensure all V1 classic donors exist in donations list
    if (!parsed.donations || parsed.donations.length < 16) {
      if (!parsed.donations) parsed.donations = [];
      v1ClassicDonors.forEach(donor => {
        if (!parsed.donations.some(d => d.donorName.toLowerCase() === donor.donorName.toLowerCase())) {
          parsed.donations.push(donor);
        }
      });
    }
    return parsed;
  } catch (e) {
    return initialDB;
  }
};

export const saveDB = (db) => {
  try {
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};

// Unique Validation Helpers
export const validateUniqueDevotee = (phone, email, currentId = null) => {
  const db = getDB();
  const cleanPhone = phone ? phone.trim().replace(/\D/g, '') : '';
  const cleanEmail = email ? email.trim().toLowerCase() : '';

  const phoneMatch = db.devotees.find(d => d.id !== currentId && d.phone.replace(/\D/g, '') === cleanPhone);
  if (phoneMatch) {
    return { valid: false, message: `ఈ ఫోన్ నంబర్ (${phone})తో ఇదివరకే ఒక భక్తుడు నమోదు కాబడి ఉన్నారు.` };
  }

  const emailMatch = db.devotees.find(d => d.id !== currentId && d.email.toLowerCase() === cleanEmail);
  if (emailMatch) {
    return { valid: false, message: `ఈ ఇమెయిల్ ఐడీ (${email})తో ఇదివరకే ఒక భక్తుడు నమోదు కాబడి ఉన్నారు.` };
  }

  return { valid: true };
};

// Record Audit Log
export const addAuditLog = (user, action) => {
  const db = getDB();
  const newLog = {
    id: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
    timestamp: new Date().toLocaleString('te-IN'),
    user,
    action
  };
  db.auditLogs.unshift(newLog);
  saveDB(db);
};
