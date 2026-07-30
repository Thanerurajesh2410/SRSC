export interface Donation {
  id: string;
  receiptNo: string;

  donorName: string;

  mobile?: string;

  email?: string;

  address?: string;

  amount: string;

  category:
    | "GENERAL"
    | "TEMPLE_CONSTRUCTION"
    | "ANNADANAM"
    | "FESTIVAL"
    | "GOSHALA"
    | "SPECIAL_POOJA"
    | "CORPUS";

  paymentMode:
    | "CASH"
    | "UPI"
    | "BANK_TRANSFER"
    | "CHEQUE";

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

  category: Donation["category"];

  paymentMode: Donation["paymentMode"];

  purpose?: string;

  transactionId?: string;

  donationDate: string;

  remarks?: string;
}