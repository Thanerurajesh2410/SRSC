import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
    Alert,
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";

import DashboardStats from "../components/DashboardStats";
import MonthlyDonationChart from "../components/DonationChart";
import TopDonors from "../components/TopDonors";
import RecentDonations from "../components/RecentDonations";
import QuickActions from "../components/QuickActions";

import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isError,
    } = useDashboard();

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "70vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !data) {
        return (
            <Alert severity="error">
                Failed to load dashboard.
            </Alert>
        );
    }

    return (
        <Box>
            <Typography
                variant="h4"
                sx={{
                    mb: 3,
                    fontWeight: 700,
                }}
            >
                Temple Dashboard
            </Typography>

            <DashboardStats
                totalDonations={data.summary.totalDonations}
                totalExpenses={data.summary.totalExpenses}
                currentBalance={data.summary.currentBalance}
                totalDonors={data.summary.totalDonors}
            />

            <Grid
                container
                spacing={3}
                sx={{ mt: 1 }}
            >
                <Grid size={{ xs: 12, lg: 8 }}>
                    <MonthlyDonationChart
                        data={data.monthlyDonations}
                    />
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <TopDonors
                        donors={data.topDonors}
                    />
                </Grid>

                <Grid size={12}>
                    <RecentDonations
                        donations={data.recentDonations}
                    />
                </Grid>

                <Grid size={12}>
                    <QuickActions
                        onAddDonation={() => navigate("/donations")}
                        onAddExpense={() => navigate("/expenses")}
                        onGenerateReceipt={() => navigate("/receipts")}
                        onViewReports={() => navigate("/reports")}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}