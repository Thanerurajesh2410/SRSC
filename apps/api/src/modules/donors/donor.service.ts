import donorRepository from "./donor.repository";
import { AppError } from "../../errors/AppError";

class DonorService {
  async getAllDonors(search?: string) {
    return donorRepository.findAll(search);
  }

  async getDonorById(id: string) {
    const donor = await donorRepository.findById(id);
    if (!donor) {
      throw new AppError("Donor not found", 404);
    }
    return donor;
  }

  async createDonor(data: {
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    gotram?: string;
    star?: string;
    notes?: string;
    familyMembers?: Array<{ name: string; relationship?: string; phone?: string; star?: string }>;
  }) {
    const count = await donorRepository.getCount();
    const donorCode = `DNR-${String(count + 1).padStart(6, "0")}`;

    const createData: any = {
      donorCode,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      gotram: data.gotram,
      star: data.star,
      notes: data.notes,
    };

    if (data.familyMembers && data.familyMembers.length > 0) {
      createData.familyMembers = {
        create: data.familyMembers,
      };
    }

    return donorRepository.create(createData);
  }

  async updateDonor(
    id: string,
    data: Partial<{
      name: string;
      phone?: string;
      email?: string;
      address?: string;
      city?: string;
      state?: string;
      pincode?: string;
      gotram?: string;
      star?: string;
      notes?: string;
    }>
  ) {
    await this.getDonorById(id);
    return donorRepository.update(id, data);
  }

  async deleteDonor(id: string) {
    await this.getDonorById(id);
    return donorRepository.delete(id);
  }

  async addFamilyMember(donorId: string, memberData: { name: string; relationship?: string; phone?: string; star?: string }) {
    await this.getDonorById(donorId);
    return donorRepository.addFamilyMember(donorId, memberData);
  }

  async deleteFamilyMember(memberId: string) {
    return donorRepository.deleteFamilyMember(memberId);
  }
}

export default new DonorService();
