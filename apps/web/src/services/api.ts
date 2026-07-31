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
      totalDonations: 0,
      todayDonations: 0,
      totalExpenses: 0,
      todayExpenses: 0,
      currentBalance: 0,
      totalDonors: 0,
    },
    monthlyDonations: [],
    recentDonations: [],
    recentExpenses: [],
    topDonors: [],
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
  "/slides": [],
  "/committees": [],
  "/donations/stats": {
    totalDonations: 0,
    totalCount: 0,
    todayDonations: 0,
    thisMonthDonations: 0,
  },
  "/donations": [],
  "/donors": [],
  "/materials/summary": [],
  "/materials": [],
  "/construction": [],
  "/volunteers": [],
  "/festivals": [],
  "/sevas": [],
  "/users": [
    { id: "1", username: "admin", name: "Admin User", email: "admin@sriramasevatrust.org", role: "ADMIN", isActive: true, phone: "9876543200", createdAt: "2026-01-01T00:00:00Z" },
  ],
  "/expenses": [],
  "/reports/cashbook": {
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
    donations: [],
    expenses: [],
  },
  "/reports/donations": {
    donations: [],
    count: 0,
    totalAmount: 0,
  },
  "/reports/expenses": {
    expenses: [],
    count: 0,
    totalAmount: 0,
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