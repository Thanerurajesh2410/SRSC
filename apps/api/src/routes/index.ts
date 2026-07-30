import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import committeeRoutes from "../modules/committee/committee.routes";
import constructionRoutes from "../modules/construction/construction.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.routes";
import devoteeRoutes from "../modules/devotee/devotee.routes";
import donationRoutes from "../modules/donations/donation.routes";
import donorRoutes from "../modules/donors/donor.routes";
import expenseRoutes from "../modules/expenses/routes/expense.routes";
import festivalRoutes from "../modules/festivals/festival.routes";
import materialRoutes from "../modules/materials/material.routes";
import paymentRoutes from "../modules/payments/payment.routes";
import receiptRoutes from "../modules/receipts/receipt.routes";
import reportRoutes from "../modules/reports/report.routes";
import settingsRoutes from "../modules/settings/settings.routes";
import sevaRoutes from "../modules/sevas/seva.routes";
import slideRoutes from "../modules/slides/slides.routes";
import userRoutes from "../modules/users/user.routes";
import volunteerRoutes from "../modules/volunteers/volunteer.routes";

const router = Router();

// Mount all module routes
router.use("/auth", authRoutes);
router.use("/committees", committeeRoutes);
router.use("/construction", constructionRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/devotee", devoteeRoutes);
router.use("/donations", donationRoutes);
router.use("/donors", donorRoutes);
router.use("/expenses", expenseRoutes);
router.use("/festivals", festivalRoutes);
router.use("/materials", materialRoutes);
router.use("/payments", paymentRoutes);
router.use("/receipts", receiptRoutes);
router.use("/reports", reportRoutes);
router.use("/settings", settingsRoutes);
router.use("/sevas", sevaRoutes);
router.use("/slides", slideRoutes);
router.use("/users", userRoutes);
router.use("/volunteers", volunteerRoutes);

// Support both /api/... and /api/v1/...
const v1Router = Router();
v1Router.use("/", router);
router.use("/v1", v1Router);

export default router;