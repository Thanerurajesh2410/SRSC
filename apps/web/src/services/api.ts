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

// Demo mock data dictionary for static deployment (GitHub Pages)
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
    { id: "1", name: "K. Ramaiah", designation: "President", phone: "+91 9876543210" },
    { id: "2", name: "P. Subbaramaiah", designation: "Vice President", phone: "+91 9876543211" },
    { id: "3", name: "V. Govindarajulu", designation: "Secretary", phone: "+91 9876543212" },
  ],
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If hosted on GitHub Pages or static host where GET/POST returns 404/405 or no backend is connected
    const status = error?.response?.status;
    const isNetworkOr404Or405 = status === 404 || status === 405 || !error?.response || error?.code === "ERR_NETWORK";

    if (isNetworkOr404Or405) {
      const url = error?.config?.url || "";
      const pathKey = Object.keys(mockData).find((key) => url.includes(key));
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