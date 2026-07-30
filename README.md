# 🚩 Sri Rama Seva Committee ERP & Public Portal (SRTMP)

Official Management ERP & Public Digital Web Portal for **Sri Rama Seva Committee**, Paminivandla Vooru, Bangarupalem Mandal, Chittoor District, Andhra Pradesh (Regd No: 125 of 2026).

---

## 🌟 Key Features

### 🛕 Public Web Portal
- **Reference-Aligned Aesthetics & Typography**: Built with Google Fonts (`Cinzel` for royal headings, `Noto Sans Telugu` for Telugu typography, and `Outfit` for body text).
- **Multi-Theme Engine**: 4 customizable themes:
  - 🚩 *Royal Saffron & Radiant Gold*
  - 🌙 *Modern Glassmorphic Dark & Amber*
  - 🏛️ *Ivory Marble & Saffron Accent*
  - 🌌 *Deep Midnight Sky & Constellation*
- **Block-Wise Customization**: Customize background colors and upload background images for each homepage block individually (Header, Hero, Gallery, Sevas, About, Construction, Donate, Contact, Footer, Card).
- **Devotee Self-Service Portal**:
  - Devotees log in using their registered **Mobile Number**.
  - **Automated Donation History**: Fetches all past donations associated with the mobile number directly from the PostgreSQL database.
  - **Booked Sevas Tracker**: Displays all online Seva bookings.
  - Devotee Profile Management (Name, Gotram, Star/Nakshatram, Address, Email).
- **Live Construction Progress Tracker**: Real-time progress bar, estimated budget, funds raised, and required appeals.
- **Online Seva Booking**: Direct booking for *Nitya Abhishekam*, *Sahasra Nama Archana*, *Nitya Annadanam*, and *Sitarama Kalyanam*.
- **Instant Receipt Verification**: Lookup tool verifying receipt authenticity against live database records.

### 💼 Comprehensive Temple ERP Admin System
- **Secured Authentication**: Protected ERP Admin Login with strict credential verification.
- **Donor Management**: Complete registry of donors, gotram, nakshatram, and family members.
- **Financial & Material Management**: Cash donations, material donations (cement, steel, bricks), expenses, and financial analytics.
- **Committee Management**: Executive board member listings with designations and contact info.
- **Construction & Volunteer Management**: Project progress logs and volunteer duty allocations.
- **System Settings**: High-capacity image upload (50MB limit) for Temple Logo, UPI QR Codes, bank transfer details, and homepage slideshow carousel.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, Material-UI (MUI v5), Recharts |
| **Backend** | Node.js, Express.js, TypeScript, Prisma ORM 6 |
| **Database** | PostgreSQL (`temple_erp`) |
| **Authentication** | JWT (JSON Web Tokens) with auto-invalidation on logout |
| **Design Tokens** | Modern CSS Variables, High-Contrast Glassmorphism & Solid Presets |

---

## 📁 Repository Structure

```
SRTMP/
├── apps/
│   ├── api/                          # Express.js Backend API
│   │   ├── prisma/
│   │   │   └── schema.prisma         # PostgreSQL Prisma Schema
│   │   ├── src/
│   │   │   ├── config/               # Database & Environment Setup
│   │   │   ├── middleware/           # Auth & Error Handlers
│   │   │   ├── modules/              # Feature Modules (Auth, Devotee, Donations, Sevas, Settings, etc.)
│   │   │   └── routes/               # API Route Index
│   │   └── .env                      # API Configuration & Database URL
│   └── web/                          # React + Vite Frontend App
│       ├── src/
│       │   ├── components/           # Common Layout & Theme Switcher
│       │   ├── context/              # Theme & App Context
│       │   ├── features/             # ERP Feature Pages (Dashboard, Settings, Donors, etc.)
│       │   ├── public-site/          # Public Website & Devotee Portal Modal
│       │   ├── theme/                # Theme Presets & Config
│       │   └── services/             # Axios API Service
│       └── index.html                # Google Fonts & HTML Root
└── README.md                         # Project Documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **PostgreSQL**: v14 or higher (Running on `127.0.0.1:5432`)

### 2. Environment Setup
Configure `apps/api/.env`:
```env
PORT=3000
JWT_SECRET=TempleERP@2026$SuperSecretKey
JWT_EXPIRES_IN=1d
DATABASE_URL="postgresql://postgres:12345@127.0.0.1:5432/temple_erp"
```

### 3. Database Migration & Prisma Generation
```bash
cd apps/api
npx prisma db push
npx prisma generate
```

### 4. Running the Development Servers

#### Start Backend API:
```bash
cd apps/api
npm run dev
```
*(Runs on `http://localhost:3000`)*

#### Start Frontend Web App:
```bash
cd apps/web
npm run dev
```
*(Runs on `http://localhost:5173`)*

---

## 📡 Key API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/v1/auth/login` | `POST` | Admin ERP Login |
| `/api/v1/devotee/login-or-register` | `POST` | Devotee Mobile Login & Registration |
| `/api/v1/devotee/portal-data` | `GET` | Fetch Devotee Donations & Booked Sevas |
| `/api/v1/donations` | `GET / POST` | Query and record donations |
| `/api/v1/sevas` | `GET / POST` | Book online daily Sevas |
| `/api/v1/settings` | `GET / PUT` | Fetch & update logo, QR, block colors & background images |
| `/api/v1/slides` | `GET / POST` | Manage homepage slideshow photos |
| `/api/v1/committees` | `GET / POST` | Executive committee board members |

---

## 📄 License & Attribution
© 2026 **Sri Rama Seva Committee**, Paminivandla Vooru, Bangarupalem Mandal, Chittoor District, Andhra Pradesh (Regd No: 125/2026). All Rights Reserved.
