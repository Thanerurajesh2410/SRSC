import { Request, Response, NextFunction } from "express";
import { PaymentService } from "./payment.service";
import { DonationService } from "../donations/donation.service";
import { AppError } from "../../errors/AppError";
import { PaymentMode } from "@prisma/client";

const paymentService = new PaymentService();
const donationService = new DonationService();

export const getPaymentConfig = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const config = paymentService.getPublicConfig();
    return res.json({
      success: true,
      data: config,
    });
  } catch (error) {
    next(error);
  }
};

export const createRazorpayOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, category, donorName, mobile, email, notes } = req.body;

    if (!amount || Number(amount) <= 0) {
      throw new AppError("A valid donation amount is required.", 400);
    }

    const orderData = await paymentService.createOrder({
      amount: Number(amount),
      category,
      donorName,
      mobile,
      email,
      notes,
    });

    return res.status(201).json({
      success: true,
      data: orderData,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyRazorpayPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donorName,
      mobile,
      email,
      address,
      amount,
      category,
      purpose,
      remarks,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new AppError("Missing Razorpay payment verification details", 400);
    }

    const isValid = paymentService.verifySignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!isValid) {
      throw new AppError("Payment verification failed. Invalid signature.", 400);
    }

    // Create Official Donation Record upon verified payment
    const donation = await donationService.create({
      donorName: donorName || "Devotee",
      mobile: mobile || null,
      email: email || null,
      address: address || null,
      amount: Number(amount),
      category: category || "GENERAL",
      paymentMode: "ONLINE_RAZORPAY" as PaymentMode,
      purpose: purpose || "Online Donation via Razorpay",
      transactionId: razorpay_payment_id,
      donationDate: new Date(),
      remarks: remarks || `Razorpay Order: ${razorpay_order_id}`,
    });

    return res.status(201).json({
      success: true,
      message: "Payment verified and donation recorded successfully!",
      data: {
        donation,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
      },
    });
  } catch (error) {
    next(error);
  }
};
