import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { receiptService } from "./receipt.service";

class ReceiptController {
    /**
     * Generate Donation Receipt
     */
    generateReceipt = asyncHandler(async (req: Request, res: Response) => {
        const { donationId } = req.params;

        const pdf = await receiptService.generateReceipt(
            donationId as string
        );
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `inline; filename="Receipt-${donationId}.pdf"`
        );

        pdf.pipe(res);
    });

    /**
     * Download Donation Receipt
     */
    downloadReceipt = asyncHandler(async (req: Request, res: Response) => {
        const { donationId } = req.params;

        const pdf = await receiptService.generateReceipt(
            donationId as string
        );
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="Receipt-${donationId}.pdf"`
        );

        pdf.pipe(res);
    });
}

export const receiptController = new ReceiptController();