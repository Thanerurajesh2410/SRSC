import { Router } from "express";
import {
  getPaymentConfig,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "./payment.controller";

const router = Router();

router.get("/config", getPaymentConfig);
router.post("/create-order", createRazorpayOrder);
router.post("/verify-payment", verifyRazorpayPayment);

export default router;
