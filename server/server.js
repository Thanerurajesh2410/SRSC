// Express & JSON Node.js Database REST API Server for Sri Rama Seva Committee ERP
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));

// CORS Header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Helper: Read DB
const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) return {};
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Read DB Error:", err);
    return {};
  }
};

// Helper: Write DB
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Write DB Error:", err);
    return false;
  }
};

// 1. GET Database Health & Summary Status
app.get('/api/health', (req, res) => {
  const db = readDB();
  const devoteeCount = db.devotees ? db.devotees.length : 0;
  const donationCount = db.donations ? db.donations.length : 0;
  const totalAmount = db.donations ? db.donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0) : 0;
  
  res.json({
    status: 'ONLINE',
    database: 'Sri Rama Temple ERP Database Engine',
    devotees: devoteeCount,
    donations: donationCount,
    totalCollected: totalAmount,
    timestamp: new Date().toISOString()
  });
});

// 2. GET Full Database Object
app.get('/api/database', (req, res) => {
  res.json(readDB());
});

// 3. POST Save / Sync Database
app.post('/api/database/save', (req, res) => {
  const newDB = req.body;
  if (!newDB || typeof newDB !== 'object') {
    return res.status(400).json({ error: 'Invalid database payload' });
  }
  const success = writeDB(newDB);
  if (success) {
    res.json({ message: 'Database saved successfully', timestamp: new Date().toISOString() });
  } else {
    res.status(500).json({ error: 'Failed to write to database storage' });
  }
});

// 4. GET Donations List
app.get('/api/donations', (req, res) => {
  const db = readDB();
  res.json(db.donations || []);
});

// 5. POST Create Donation Record
app.post('/api/donations', (req, res) => {
  const db = readDB();
  if (!db.donations) db.donations = [];

  const newDonation = {
    id: `SRS-2026-${String(db.donations.length + 1).padStart(3, '0')}`,
    donorName: req.body.donorName || 'Anonymous',
    phone: req.body.phone || '',
    email: req.body.email || '',
    amount: Number(req.body.amount) || 0,
    date: req.body.date || new Date().toLocaleDateString('te-IN'),
    seva: req.body.seva || 'ఆలయ విరాళం',
    mode: req.body.mode || 'Online (UPI / PhonePe)',
    city: req.body.city || 'పామినివాండ్లవూరు'
  };

  db.donations.unshift(newDonation);
  writeDB(db);
  res.status(201).json({ message: 'Donation recorded successfully', donation: newDonation });
});

// 6. GET Devotees List
app.get('/api/devotees', (req, res) => {
  const db = readDB();
  res.json(db.devotees || []);
});

// 7. POST Register Devotee
app.post('/api/devotees', (req, res) => {
  const db = readDB();
  if (!db.devotees) db.devotees = [];

  const phone = (req.body.phone || '').trim();
  const email = (req.body.email || '').trim().toLowerCase();

  // Check unique phone/email
  if (phone && db.devotees.some(d => d.phone.replace(/\D/g, '') === phone.replace(/\D/g, ''))) {
    return res.status(400).json({ error: 'Devotee with this phone number already exists' });
  }

  const newDevotee = {
    id: `DEV-${1001 + db.devotees.length}`,
    name: req.body.name,
    phone: phone,
    email: email,
    city: req.body.city || 'పామినివాండ్లవూరు',
    registeredAt: new Date().toLocaleDateString('te-IN')
  };

  db.devotees.push(newDevotee);
  writeDB(db);
  res.status(201).json({ message: 'Devotee registered successfully', devotee: newDevotee });
});

app.listen(PORT, () => {
  console.log(`Sri Rama Temple Database REST API running at http://localhost:${PORT}`);
});
