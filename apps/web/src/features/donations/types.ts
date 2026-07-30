export type DonationCategory =
  | "GENERAL"
  | "TEMPLE_CONSTRUCTION"
  | "ANNADANAM"
  | "FESTIVAL"
  | "GOSHALA"
  | "SPECIAL_POOJA"
  | "CORPUS";

export type PaymentMode =
  | "CASH"
  | "UPI"
  | "BANK_TRANSFER"
  | "CHEQUE";

export interface Donation {
  id: string;
  receiptNo: string;

  donorName: string;

  mobile?: string;
  email?: string;
  address?: string;

  amount: string;

  category: DonationCategory;

  paymentMode: PaymentMode;

  purpose?: string;

  transactionId?: string;

  donationDate: string;

  remarks?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateDonationRequest {
  donorName: string;

  mobile?: string;
  email?: string;
  address?: string;

  amount: number;

  category: DonationCategory;

  paymentMode: PaymentMode;

  purpose?: string;

  transactionId?: string;

  donationDate: string;

  remarks?: string;
}

export interface UpdateDonationRequest
  extends Partial<CreateDonationRequest> {}

export interface DonationStats {
  totalDonation: number;
  donationCount: number;
}