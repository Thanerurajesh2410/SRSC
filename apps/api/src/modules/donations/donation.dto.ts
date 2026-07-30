export interface CreateDonationDto {
  donorName: string;
  phone?: string;
  email?: string;
 address?: string;

  amount: number;

  paymentMethod: string;

  donationType: string;

  receiptNumber: string;

  referenceNo?: string;

  remarks?: string;

  isAnonymous?: boolean;
}

export interface UpdateDonationDto
  extends Partial<CreateDonationDto> {}