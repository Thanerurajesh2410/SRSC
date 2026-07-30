import { DonationCategory, PaymentMode } from "@prisma/client";

export interface CreateDonationDto {
  donorName: string;
  mobile?: string;
  email?: string;
  address?: string;

  amount: number;

  category: DonationCategory;

  paymentMode: PaymentMode;

  purpose?: string;

  transactionId?: string;

  donationDate: Date;

  remarks?: string;
}

export interface UpdateDonationDto
  extends Partial<CreateDonationDto> {}