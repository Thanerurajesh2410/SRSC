import materialRepository from "./material.repository";
import { AppError } from "../../errors/AppError";

class MaterialService {
  async getAllMaterialDonations(search?: string, type?: any) {
    return materialRepository.findAll(search, type);
  }

  async getMaterialDonationById(id: string) {
    const item = await materialRepository.findById(id);
    if (!item) {
      throw new AppError("Material donation record not found", 404);
    }
    return item;
  }

  async createMaterialDonation(data: {
    donorName: string;
    mobile?: string;
    email?: string;
    address?: string;
    materialType: any;
    itemDescription: string;
    quantity: number;
    unit: string;
    estimatedValue?: number;
    status?: any;
    purpose?: string;
    donationDate: Date;
    remarks?: string;
  }) {
    const year = new Date(data.donationDate || Date.now()).getFullYear();
    const count = await materialRepository.getCount();
    const receiptNo = `MAT-${year}-${String(count + 1).padStart(6, "0")}`;

    const createData: any = {
      receiptNo,
      donorName: data.donorName,
      mobile: data.mobile,
      email: data.email,
      address: data.address,
      materialType: data.materialType,
      itemDescription: data.itemDescription,
      quantity: data.quantity,
      unit: data.unit,
      estimatedValue: data.estimatedValue,
      status: data.status || "RECEIVED",
      purpose: data.purpose,
      donationDate: new Date(data.donationDate),
      remarks: data.remarks,
    };

    return materialRepository.create(createData);
  }

  async updateMaterialDonation(
    id: string,
    data: Partial<{
      donorName: string;
      mobile?: string;
      email?: string;
      address?: string;
      materialType: any;
      itemDescription: string;
      quantity: number;
      unit: string;
      estimatedValue?: number;
      status?: any;
      purpose?: string;
      donationDate: Date;
      remarks?: string;
    }>
  ) {
    await this.getMaterialDonationById(id);

    const updateData: any = {
      ...data,
      ...(data.donationDate && { donationDate: new Date(data.donationDate) }),
    };

    return materialRepository.update(id, updateData);
  }

  async deleteMaterialDonation(id: string) {
    await this.getMaterialDonationById(id);
    return materialRepository.delete(id);
  }

  async getMaterialSummary() {
    return materialRepository.getSummaryByType();
  }
}

export default new MaterialService();
