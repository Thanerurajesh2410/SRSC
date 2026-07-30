import api from "../../../services/api";

export type MaterialType =
  | "CEMENT"
  | "BRICKS"
  | "STEEL"
  | "SAND"
  | "GRANITE"
  | "WOOD"
  | "ELECTRICAL"
  | "LABOUR"
  | "OTHER";

export type MaterialStatus = "RECEIVED" | "UTILIZED" | "PARTIALLY_USED";

export interface MaterialDonation {
  id: string;
  receiptNo: string;
  donorName: string;
  mobile?: string;
  email?: string;
  address?: string;
  materialType: MaterialType;
  itemDescription: string;
  quantity: number;
  unit: string;
  estimatedValue?: number;
  status: MaterialStatus;
  purpose?: string;
  donationDate: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialSummaryItem {
  materialType: MaterialType;
  totalQuantity: number;
  totalEstimatedValue: number;
  count: number;
}

export async function getMaterialDonations(search?: string, type?: string): Promise<MaterialDonation[]> {
  const response = await api.get("/materials", { params: { search, type: type !== "ALL" ? type : undefined } });
  return response.data.data;
}

export async function getMaterialSummary(): Promise<MaterialSummaryItem[]> {
  const response = await api.get("/materials/summary");
  return response.data.data;
}

export async function createMaterialDonation(data: Partial<MaterialDonation>): Promise<MaterialDonation> {
  const response = await api.post("/materials", data);
  return response.data.data;
}

export async function updateMaterialDonation(id: string, data: Partial<MaterialDonation>): Promise<MaterialDonation> {
  const response = await api.put(`/materials/${id}`, data);
  return response.data.data;
}

export async function deleteMaterialDonation(id: string): Promise<void> {
  await api.delete(`/materials/${id}`);
}
