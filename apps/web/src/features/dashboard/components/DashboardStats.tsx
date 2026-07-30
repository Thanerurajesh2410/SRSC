import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupsIcon from "@mui/icons-material/Groups";
import PaymentsIcon from "@mui/icons-material/Payments";

import Grid from "@mui/material/Grid";

import DashboardCard from "./DashboardCard";

interface DashboardStatsProps {
    totalDonations: number;
    totalExpenses: number;
    currentBalance: number;
    totalDonors: number;
}

export default function DashboardStats({
    totalDonations,
    totalExpenses,
    currentBalance,
    totalDonors,
}: DashboardStatsProps) {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <DashboardCard
                    title="Total Donations"
                    value={`₹${Number(totalDonations).toLocaleString("en-IN")}`}
                    icon={<FavoriteIcon />}
                    iconBackgroundColor="#E8F5E9"
                    iconColor="#2E7D32"
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <DashboardCard
                    title="Total Expenses"
                    value={`₹${Number(totalExpenses).toLocaleString("en-IN")}`}
                    icon={<PaymentsIcon />}
                    iconBackgroundColor="#FDECEA"
                    iconColor="#D32F2F"
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <DashboardCard
                    title="Current Balance"
                    value={`₹${Number(currentBalance).toLocaleString("en-IN")}`}
                    icon={<AccountBalanceWalletIcon />}
                    iconBackgroundColor="#E3F2FD"
                    iconColor="#1565C0"
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <DashboardCard
                    title="Total Donors"
                    value={totalDonors.toLocaleString("en-IN")}
                    icon={<GroupsIcon />}
                    iconBackgroundColor="#F3E5F5"
                    iconColor="#6A1B9A"
                />
            </Grid>
        </Grid>
    );
}