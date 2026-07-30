import { Request, Response } from "express";
import reportService from "./report.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

class ReportController {
  getDonationReport = asyncHandler(async (req: Request, res: Response) => {
    const report = await reportService.getDonationReport(req.query as any);
    sendResponse(res, 200, "Donation report generated", report);
  });

  getExpenseReport = asyncHandler(async (req: Request, res: Response) => {
    const report = await reportService.getExpenseReport(req.query as any);
    sendResponse(res, 200, "Expense report generated", report);
  });

  getCashBook = asyncHandler(async (req: Request, res: Response) => {
    const cashbook = await reportService.getCashBook(req.query as any);
    sendResponse(res, 200, "Cash book generated", cashbook);
  });

  getFinancialSummary = asyncHandler(async (_req: Request, res: Response) => {
    const summary = await reportService.getFinancialSummary();
    sendResponse(res, 200, "Financial summary generated", summary);
  });
}

export default new ReportController();
