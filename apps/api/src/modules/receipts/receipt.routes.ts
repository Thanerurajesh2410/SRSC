import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

import { receiptController } from "./receipt.controller";

const router = Router();

/**
 * Preview Receipt
 */
router.get(
  "/:donationId",
  authenticate,
  authorize("receipt.view"),
  receiptController.generateReceipt
);

/**
 * Download Receipt
 */
router.get(
  "/download/:donationId",
  authenticate,
  authorize("receipt.download"),
  receiptController.downloadReceipt
);

export default router;