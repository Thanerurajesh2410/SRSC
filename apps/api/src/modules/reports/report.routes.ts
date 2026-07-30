import { Router } from "express";
import reportController from "./report.controller";

const router = Router();

router.get("/donations", reportController.getDonationReport);
router.get("/expenses", reportController.getExpenseReport);
router.get("/cashbook", reportController.getCashBook);
router.get("/summary", reportController.getFinancialSummary);

export default router;
