export interface DashboardSummary {
    totalDonations: number;
    todayDonations?: number;
    totalExpenses: number;
    todayExpenses?: number;
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

export interface RecentExpense {
    id: string;
    title: string;
    category: string;
    amount: number;
    paidTo: string;
    expenseDate: string;
}

export interface TopDonor {
    donorName: string;
    totalAmount: number;
}

export interface DashboardResponse {
    summary: DashboardSummary;
    monthlyDonations: MonthlyDonation[];
    recentDonations: RecentDonation[];
    recentExpenses?: RecentExpense[];
    topDonors: TopDonor[];
}