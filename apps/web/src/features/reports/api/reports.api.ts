import api from "../../../services/api";

export interface CashBookData {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  donations: Array<{
    id: string;
    receiptNo: string;
    donorName: string;
    amount: number;
    category: string;
    paymentMode: string;
    donationDate: string;
  }>;
  expenses: Array<{
    id: string;
    expenseNo: string;
    title: string;
    amount: number;
    category: string;
    paymentMode: string;
    expenseDate: string;
    paidTo: string;
  }>;
}

export interface DonationReportData {
  donations: Array<any>;
  count: number;
  totalAmount: number;
}

export interface ExpenseReportData {
  expenses: Array<any>;
  count: number;
  totalAmount: number;
}

export async function getCashBook(params?: { startDate?: string; endDate?: string }): Promise<CashBookData> {
  const response = await api.get("/reports/cashbook", { params });
  return response.data.data;
}

export async function getDonationReport(params?: { startDate?: string; endDate?: string; category?: string; paymentMode?: string }): Promise<DonationReportData> {
  const response = await api.get("/reports/donations", { params });
  return response.data.data;
}

export async function getExpenseReport(params?: { startDate?: string; endDate?: string; category?: string; paymentMode?: string }): Promise<ExpenseReportData> {
  const response = await api.get("/reports/expenses", { params });
  return response.data.data;
}
