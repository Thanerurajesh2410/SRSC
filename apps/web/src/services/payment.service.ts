import api from "./api";

export interface CreateOrderParams {
  amount: number;
  category?: string;
  donorName?: string;
  mobile?: string;
  email?: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  receipt: string;
  keyId: string;
  isDevFallback?: boolean;
}

export interface VerifyPaymentParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  donorName: string;
  mobile?: string;
  email?: string;
  address?: string;
  amount: number;
  category: string;
  purpose?: string;
  remarks?: string;
}

export interface PaymentConfigResponse {
  keyId: string;
  currency: string;
  merchantName: string;
  description: string;
}

class PaymentService {
  async getConfig(): Promise<PaymentConfigResponse> {
    const response = await api.get("/payments/config");
    return response.data.data;
  }

  async createOrder(params: CreateOrderParams): Promise<RazorpayOrderResponse> {
    const response = await api.post("/payments/create-order", params);
    return response.data.data;
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<any> {
    const response = await api.post("/payments/verify-payment", params);
    return response.data;
  }
}

export const paymentService = new PaymentService();
