import axios from "axios";
import { authService } from "./auth.service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Full mock dataset for all ERP features in static deployment mode (GitHub Pages)
const mockData: Record<string, any> = {
  "/dashboard": {
    summary: {
      totalDonations: 2548000,
      todayDonations: 45000,
      totalExpenses: 850000,
      todayExpenses: 12000,
      currentBalance: 1698000,
      totalDonors: 580,
    },
    monthlyDonations: [
      { month: "Jan", amount: 150000 },
      { month: "Feb", amount: 220000 },
      { month: "Mar", amount: 310000 },
      { month: "Apr", amount: 480000 },
      { month: "May", amount: 390000 },
      { month: "Jun", amount: 520000 },
      { month: "Jul", amount: 478000 },
    ],
    recentDonations: [
      { id: "1", donorName: "K. Rama Rao", amount: 10000, paymentMode: "UPI", donationDate: "2026-07-30" },
      { id: "2", donorName: "M. Lakshmi Devi", amount: 25000, paymentMode: "BANK_TRANSFER", donationDate: "2026-07-29" },
      { id: "3", donorName: "V. Suresh Kumar", amount: 5000, paymentMode: "CASH", donationDate: "2026-07-28" },
    ],
    recentExpenses: [
      { id: "1", title: "Temple Cement & Steel Supply", category: "CONSTRUCTION", amount: 45000, paidTo: "Bangarupalem Hardware", expenseDate: "2026-07-28" },
      { id: "2", title: "Annadanam Grocery Purchase", category: "ANNADANAM", amount: 12500, paidTo: "Sri Rama Traders", expenseDate: "2026-07-27" },
    ],
    topDonors: [
      { donorName: "M. Lakshmi Devi", totalAmount: 150000 },
      { donorName: "K. Rama Rao", totalAmount: 100000 },
      { donorName: "P. Venkata Subbaiah", totalAmount: 75000 },
    ],
  },
  "/settings": {
    logoUrl: "",
    upiQrUrl: "",
    upiId: "sriramasevatrust@sbi",
    bankAccountName: "SRI RAMA SEVA COMMITTEE",
    bankName: "State Bank of India (SBI)",
    accountNumber: "40982374619",
    ifscCode: "SBIN0004521",
    branch: "Bangarupalem Branch",
    bgHeader: "#7c2d12",
    bgHero: "#180a04",
    bgGallery: "#120803",
    bgSevas: "#1c0e06",
    bgAbout: "#180a04",
    bgConstruction: "#120803",
    bgDonate: "#1c0e06",
    bgContact: "#180a04",
    bgFooter: "#090502",
    bgCard: "#231107",
  },
  "/slides": [
    { id: "1", title: "Sri Rama Temple Construction", caption: "Bangarupalem Mandal", imageUrl: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=1200&q=80", displayOrder: 1, isActive: true },
    { id: "2", title: "Divine Seva & Pujas", caption: "Daily Abhishekam & Archana", imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80", displayOrder: 2, isActive: true },
  ],
  "/committees": [
    { id: "1", name: "K. Ramaiah", designation: "President", phone: "+91 9876543210", email: "president@sriramasevatrust.org", address: "Paminivandla Vooru", isActive: true },
    { id: "2", name: "P. Subbaramaiah", designation: "Vice President", phone: "+91 9876543211", email: "vicepresident@sriramasevatrust.org", address: "Bangarupalem", isActive: true },
    { id: "3", name: "V. Govindarajulu", designation: "Secretary", phone: "+91 9876543212", email: "secretary@sriramasevatrust.org", address: "Paminivandla Vooru", isActive: true },
  ],
  "/donations/stats": {
    totalDonations: 2548000,
    totalCount: 580,
    todayDonations: 45000,
    thisMonthDonations: 478000,
  },
  "/donations": [
    { id: "1", receiptNo: "DON-2026-0001", donorName: "K. Rama Rao", mobile: "9876543210", email: "ramarao@gmail.com", amount: 10000, category: "TEMPLE_CONSTRUCTION", paymentMode: "UPI", purpose: "Garbhagriha Construction", transactionId: "TXN98237461", donationDate: "2026-07-30", createdAt: "2026-07-30T10:00:00Z" },
    { id: "2", receiptNo: "DON-2026-0002", donorName: "M. Lakshmi Devi", mobile: "9876543211", email: "lakshmi@gmail.com", amount: 25000, category: "ANNADANAM", paymentMode: "BANK_TRANSFER", purpose: "Daily Annadanam Seva", transactionId: "TXN98237462", donationDate: "2026-07-29", createdAt: "2026-07-29T11:30:00Z" },
    { id: "3", receiptNo: "DON-2026-0003", donorName: "V. Suresh Kumar", mobile: "9876543212", email: "suresh@gmail.com", amount: 5000, category: "PUJA_SEVA", paymentMode: "CASH", purpose: "Special Abhishekam", transactionId: "CASH-102", donationDate: "2026-07-28", createdAt: "2026-07-28T09:15:00Z" },
  ],
  "/donors": [
    { id: "1", donorCode: "DNR-0001", name: "K. Rama Rao", phone: "9876543210", email: "ramarao@gmail.com", gotram: "Kashyapa", star: "Rohini", address: "Paminivandla Vooru, Bangarupalem", city: "Chittoor", state: "Andhra Pradesh", pincode: "517416", createdAt: "2026-01-15T10:00:00Z", updatedAt: "2026-07-30T10:00:00Z", familyMembers: [{ id: "f1", name: "K. Sita Devi", relationship: "Spouse", star: "Uttara" }], donations: [{ id: "1", receiptNo: "DON-2026-0001", amount: 10000, category: "TEMPLE_CONSTRUCTION", donationDate: "2026-07-30" }] },
    { id: "2", donorCode: "DNR-0002", name: "M. Lakshmi Devi", phone: "9876543211", email: "lakshmi@gmail.com", gotram: "Bharadwaja", star: "Swati", address: "Bangarupalem Town", city: "Chittoor", state: "Andhra Pradesh", pincode: "517416", createdAt: "2026-02-10T11:00:00Z", updatedAt: "2026-07-29T11:30:00Z", familyMembers: [], donations: [{ id: "2", receiptNo: "DON-2026-0002", amount: 25000, category: "ANNADANAM", donationDate: "2026-07-29" }] },
  ],
  "/materials/summary": [
    { materialType: "CEMENT", totalQuantity: 500, totalEstimatedValue: 175000, count: 12 },
    { materialType: "STEEL", totalQuantity: 5, totalEstimatedValue: 320000, count: 8 },
    { materialType: "BRICKS", totalQuantity: 10000, totalEstimatedValue: 90000, count: 5 },
  ],
  "/materials": [
    { id: "1", receiptNo: "MAT-2026-001", donorName: "P. Subbaiah", mobile: "9876543215", materialType: "CEMENT", itemDescription: "UltraTech 53 Grade Cement Bags", quantity: 100, unit: "Bags", estimatedValue: 38000, status: "UTILIZED", donationDate: "2026-07-25", createdAt: "2026-07-25T10:00:00Z", updatedAt: "2026-07-25T10:00:00Z" },
    { id: "2", receiptNo: "MAT-2026-002", donorName: "T. Rajasekhar", mobile: "9876543216", materialType: "STEEL", itemDescription: "TMT 12mm Rebar Steel Rods", quantity: 2, unit: "Tons", estimatedValue: 120000, status: "RECEIVED", donationDate: "2026-07-28", createdAt: "2026-07-28T11:00:00Z", updatedAt: "2026-07-28T11:00:00Z" },
  ],
  "/construction": [
    { id: "1", name: "Main Sanctum Sanctorum (Garbhagriha)", description: "Stone Carving and Garbhagriha Structure Construction", estimatedCost: 5000000, actualCost: 3200000, overallProgress: 68, status: "IN_PROGRESS", targetCompletionDate: "2026-12-31", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-07-30T00:00:00Z", progressLogs: [{ id: "l1", title: "Pillar Base Carving Completed", updateDate: "2026-07-28", completedWork: "Foundation & 8 Carved Pillars Erected", upcomingWork: "Roof Slab Beams", progressPercent: 68 }] },
    { id: "2", name: "Rajagopuram Tower & Entrance Gate", description: "5-Tier Dravidian Style Gopuram Tower", estimatedCost: 3500000, actualCost: 800000, overallProgress: 25, status: "IN_PROGRESS", targetCompletionDate: "2027-03-31", createdAt: "2026-03-01T00:00:00Z", updatedAt: "2026-07-25T00:00:00Z", progressLogs: [] },
  ],
  "/volunteers": [
    { id: "1", volunteerCode: "VOL-001", name: "V. Govindarajulu", phone: "9876543220", email: "govind@gmail.com", skills: "Annadanam Seva, Crowd Control", dutyStatus: "AVAILABLE", assignedDuty: "Main Hall Security & Prasadam Distribution" },
    { id: "2", volunteerCode: "VOL-002", name: "B. Venkatesh", phone: "9876543221", email: "venky@gmail.com", skills: "Electrical, Audio & Sound System", dutyStatus: "ASSIGNED", assignedDuty: "Temple Sound & Lighting Management" },
  ],
  "/festivals": [
    { id: "1", title: "Sri Rama Navami Utsavam & Sitarama Kalyanam", description: "Annual 9-day Navami Brahmotsavams with Kalyanam & Ratha Yatra", startDate: "2026-04-15", endDate: "2026-04-24", budget: 500000, totalExpenses: 420000, sponsorsCount: 45, status: "COMPLETED" },
    { id: "2", title: "Hanuman Jayanti Special Abhishekam", description: "Grand 108 Kalasa Abhishekam & Vadamala Puja", startDate: "2026-08-15", endDate: "2026-08-15", budget: 150000, totalExpenses: 0, sponsorsCount: 18, status: "UPCOMING" },
  ],
  "/sevas": [
    { id: "1", bookingNo: "SEVA-2026-0001", sevaType: "SPECIAL_ABHISHEKAM", devoteeName: "K. Rama Rao", phone: "9876543210", email: "ramarao@gmail.com", gotram: "Kashyapa", star: "Rohini", sevaDate: "2026-08-05", amount: 1116, paymentMode: "UPI", status: "CONFIRMED" },
    { id: "2", bookingNo: "SEVA-2026-0002", sevaType: "SITARAMA_KALYANAM", devoteeName: "M. Lakshmi Devi", phone: "9876543211", email: "lakshmi@gmail.com", gotram: "Bharadwaja", star: "Swati", sevaDate: "2026-08-10", amount: 2516, paymentMode: "BANK_TRANSFER", status: "CONFIRMED" },
  ],
  "/users": [
    { id: "1", username: "admin", name: "Admin User", email: "admin@sriramasevatrust.org", role: "ADMIN", isActive: true, phone: "9876543200", createdAt: "2026-01-01T00:00:00Z" },
    { id: "2", username: "treasurer", name: "P. Subbaramaiah", email: "treasurer@sriramasevatrust.org", role: "TREASURER", isActive: true, phone: "9876543201", createdAt: "2026-01-15T00:00:00Z" },
    { id: "3", username: "operator", name: "Operator Staff", email: "operator@sriramasevatrust.org", role: "OPERATOR", isActive: true, phone: "9876543202", createdAt: "2026-02-01T00:00:00Z" },
  ],
  "/expenses": [
    { id: "1", expenseNo: "EXP-2026-001", title: "Garbhagriha Stone Carving Charges", category: "CONSTRUCTION", amount: 150000, paidTo: "Master Sculptor Sthapathi", paymentMode: "BANK_TRANSFER", expenseDate: "2026-07-28", remarks: "Phase 2 Carving Work Advance" },
    { id: "2", expenseNo: "EXP-2026-002", title: "Temple Annadanam Grocery Provisions", category: "ANNADANAM", amount: 24500, paidTo: "Sri Rama Super Market", paymentMode: "UPI", expenseDate: "2026-07-25", remarks: "Monthly Rice & Pulse Inventory" },
  ],
  "/reports/cashbook": {
    totalIncome: 2548000,
    totalExpense: 850000,
    netBalance: 1698000,
    donations: [
      { id: "1", receiptNo: "DON-2026-0001", donorName: "K. Rama Rao", amount: 10000, category: "TEMPLE_CONSTRUCTION", paymentMode: "UPI", donationDate: "2026-07-30" },
      { id: "2", receiptNo: "DON-2026-0002", donorName: "M. Lakshmi Devi", amount: 25000, category: "ANNADANAM", paymentMode: "BANK_TRANSFER", donationDate: "2026-07-29" },
    ],
    expenses: [
      { id: "1", expenseNo: "EXP-2026-001", title: "Garbhagriha Stone Carving Charges", amount: 150000, category: "CONSTRUCTION", paymentMode: "BANK_TRANSFER", expenseDate: "2026-07-28", paidTo: "Master Sculptor" },
      { id: "2", expenseNo: "EXP-2026-002", title: "Temple Annadanam Grocery Provisions", amount: 24500, category: "ANNADANAM", paymentMode: "UPI", expenseDate: "2026-07-25", paidTo: "Sri Rama Super Market" },
    ],
  },
  "/reports/donations": {
    donations: [
      { id: "1", receiptNo: "DON-2026-0001", donorName: "K. Rama Rao", amount: 10000, category: "TEMPLE_CONSTRUCTION", paymentMode: "UPI", donationDate: "2026-07-30" },
      { id: "2", receiptNo: "DON-2026-0002", donorName: "M. Lakshmi Devi", amount: 25000, category: "ANNADANAM", paymentMode: "BANK_TRANSFER", donationDate: "2026-07-29" },
    ],
    count: 2,
    totalAmount: 35000,
  },
  "/reports/expenses": {
    expenses: [
      { id: "1", expenseNo: "EXP-2026-001", title: "Garbhagriha Stone Carving Charges", amount: 150000, category: "CONSTRUCTION", paymentMode: "BANK_TRANSFER", expenseDate: "2026-07-28", paidTo: "Master Sculptor" },
      { id: "2", expenseNo: "EXP-2026-002", title: "Temple Annadanam Grocery Provisions", amount: 24500, category: "ANNADANAM", paymentMode: "UPI", expenseDate: "2026-07-25", paidTo: "Sri Rama Super Market" },
    ],
    count: 2,
    totalAmount: 174500,
  },
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If hosted on GitHub Pages or static host where GET/POST returns 404/405 or no backend is connected
    const status = error?.response?.status;
    const isNetworkOr404Or405 = status === 404 || status === 405 || !error?.response || error?.code === "ERR_NETWORK";

    if (isNetworkOr404Or405) {
      const url: string = error?.config?.url || "";
      // Find matching mock key sorting by length to match specific paths like /reports/cashbook before /reports
      const sortedKeys = Object.keys(mockData).sort((a, b) => b.length - a.length);
      const pathKey = sortedKeys.find((key) => url.includes(key));
      const payload = pathKey ? mockData[pathKey] : [];

      return Promise.resolve({
        data: {
          success: true,
          data: payload,
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: error.config,
      });
    }

    return Promise.reject(error);
  }
);

export default api;