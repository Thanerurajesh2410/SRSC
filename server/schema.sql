-- ============================================================================
-- SRI RAMA SEVA COMMITTEE, PAMINIVANDLAVOORU - TEMPLE ERP DATABASE SCHEMA
-- Target Database Systems: MySQL / PostgreSQL / SQLite 3
-- Generated Automatically for Temple Construction & Audit System
-- ============================================================================

-- Disable Foreign Key checks temporarily for clean initialization
SET FOREIGN_KEY_CHECKS = 0;

-- 1. DEVOTEES TABLE (భక్తుల వివరాల పట్టిక)
CREATE TABLE IF NOT EXISTS devotees (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE,
    city VARCHAR(100) DEFAULT 'పామినివాండ్లవూరు',
    address TEXT,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone (phone),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. DONATIONS TABLE (విరాళాల రశీదుల పట్టిక)
CREATE TABLE IF NOT EXISTS donations (
    id VARCHAR(50) PRIMARY KEY,
    donor_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    amount DECIMAL(12,2) NOT NULL,
    date VARCHAR(20) NOT NULL,
    seva VARCHAR(255) NOT NULL,
    mode VARCHAR(100) NOT NULL DEFAULT 'Online (UPI / PhonePe / GPay)',
    city VARCHAR(100) DEFAULT 'పామినివాండ్లవూరు',
    category VARCHAR(100) DEFAULT 'ఆలయ రాతి గోడల నిర్మాణం',
    subcategory VARCHAR(100) DEFAULT 'నగదు / హుండి కానుక',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_donor (donor_name),
    INDEX idx_seva (seva),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. SEVA BOOKINGS TABLE (ఆర్జిత సేవల బుకింగ్స్ పట్టిక)
CREATE TABLE IF NOT EXISTS seva_bookings (
    id VARCHAR(50) PRIMARY KEY,
    devotee_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    seva_name VARCHAR(255) NOT NULL,
    date VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Confirmed',
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. EXPENSES TABLE (ఆలయ నిర్మాణ ఖర్చుల పట్టిక)
CREATE TABLE IF NOT EXISTS expenses (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    vendor VARCHAR(255) NOT NULL,
    date VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'Approved',
    bill_no VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. MATERIALS TABLE (ఆలయ నిర్మాణ సామగ్రి ఇన్వెంటరీ)
CREATE TABLE IF NOT EXISTS materials (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    qty VARCHAR(100) NOT NULL,
    donor VARCHAR(255) NOT NULL,
    received_date VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. VOLUNTEERS TABLE (స్వచ్ఛంద సేవకుల జాబితా)
CREATE TABLE IF NOT EXISTS volunteers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    task VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. GALLERY IMAGES TABLE (గ్యాలరీ చిత్రాల పట్టిక)
CREATE TABLE IF NOT EXISTS gallery_images (
    id VARCHAR(50) PRIMARY KEY,
    src TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    tag VARCHAR(100) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. AUDIT LOGS TABLE (ఆడిట్ లాగ్ ట్రాకింగ్)
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(50) PRIMARY KEY,
    timestamp VARCHAR(50) NOT NULL,
    user VARCHAR(100) NOT NULL,
    action TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Re-enable Foreign Key checks
SET FOREIGN_KEY_CHECKS = 1;
