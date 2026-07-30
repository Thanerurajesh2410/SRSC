import api from "../../../services/api";

export interface FamilyMember {
  id?: string;
  name: string;
  relationship?: string;
  phone?: string;
  star?: string;
}

export interface Donor {
  id: string;
  donorCode: string;
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
  familyMembers?: FamilyMember[];
  donations?: Array<{
    id: string;
    receiptNo: string;
    amount: number;
    category: string;
    donationDate: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export async function getDonors(search?: string): Promise<Donor[]> {
  const response = await api.get("/donors", { params: { search } });
  return response.data.data;
}

export async function getDonorById(id: string): Promise<Donor> {
  const response = await api.get(`/donors/${id}`);
  return response.data.data;
}

export async function createDonor(data: Partial<Donor>): Promise<Donor> {
  const response = await api.post("/donors", data);
  return response.data.data;
}

export async function updateDonor(id: string, data: Partial<Donor>): Promise<Donor> {
  const response = await api.put(`/donors/${id}`, data);
  return response.data.data;
}

export async function deleteDonor(id: string): Promise<void> {
  await api.delete(`/donors/${id}`);
}

export async function addFamilyMember(donorId: string, member: FamilyMember): Promise<FamilyMember> {
  const response = await api.post(`/donors/${donorId}/family`, member);
  return response.data.data;
}

export async function deleteFamilyMember(memberId: string): Promise<void> {
  await api.delete(`/donors/family/${memberId}`);
}
