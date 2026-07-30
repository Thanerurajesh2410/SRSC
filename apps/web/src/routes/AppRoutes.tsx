import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import DonationListPage from "../features/donations/pages/DonationListPage";
import ExpensesPage from "../features/expenses/pages/ExpensesPage";
import ReportsPage from "../features/reports/pages/ReportsPage";
import DonorsPage from "../features/donors/pages/DonorsPage";
import MaterialsPage from "../features/materials/pages/MaterialsPage";
import ConstructionPage from "../features/construction/pages/ConstructionPage";
import CommitteePage from "../features/committee/pages/CommitteePage";
import VolunteersPage from "../features/volunteers/pages/VolunteersPage";
import FestivalsPage from "../features/festivals/pages/FestivalsPage";
import SevaBookingPage from "../features/sevas/pages/SevaBookingPage";
import UsersPage from "../features/users/pages/UsersPage";
import SettingsPage from "../features/settings/pages/SettingsPage";
import PrintableTemplatesPage from "../features/printing/pages/PrintableTemplatesPage";
import PublicWebsite from "../public-site/PublicWebsite";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Portal Website */}
        <Route path="/" element={<PublicWebsite />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/donations" element={<DonationListPage />} />
            <Route path="/receipts" element={<DonationListPage />} />
            <Route path="/donors" element={<DonorsPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/construction" element={<ConstructionPage />} />
            <Route path="/committee" element={<CommitteePage />} />
            <Route path="/volunteers" element={<VolunteersPage />} />
            <Route path="/festivals" element={<FestivalsPage />} />
            <Route path="/sevas" element={<SevaBookingPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/templates" element={<PrintableTemplatesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}