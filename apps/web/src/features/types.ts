export interface DashboardSummary {
    totalDonations: number;
    totalExpenses: number;
    currentBalance: number;
    totalDonors: number;
}

export interface MonthlyDonation {
    month: string;
    amount: number;
}

export interface RecentDonation {
    id: string;
    donorName: string;
    amount: number;
    paymentMode: string;
    donationDate: string;
}

export interface DashboardResponse {
    summary: DashboardSummary;
    monthlyDonations: MonthlyDonation[];
    recentDonations: RecentDonation[];
}

export type ExpenseCategory =
    | "Construction"
    | "Festival"
    | "Maintenance"
    | "Electricity"
    | "Water"
    | "Salary"
    | "Donation Utilization"
    | "Miscellaneous";

export type PaymentMode =
    | "Cash"
    | "UPI"
    | "Bank Transfer"
    | "Cheque";

export interface Expense {
    id: string;
    expenseNo: string;
    title: string;
    category: ExpenseCategory;
    amount: number;
    paymentMode: PaymentMode;
    expenseDate: string;
    paidTo: string;
    remarks?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ExpenseFormData {
    title: string;
    category: ExpenseCategory;
    amount: number;
    paymentMode: PaymentMode;
    expenseDate: string;
    paidTo: string;
    remarks?: string;
}

export interface ExpenseSummary {
    totalExpenses: number;
    monthlyExpenses: number;
    totalTransactions: number;
}

export interface ExpenseResponse {
    expenses: Expense[];
    summary: ExpenseSummary;
}