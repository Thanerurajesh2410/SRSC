import api from "../../../services/api";

import type {
    CreateDonationRequest,
    Donation,
    DonationStats,
} from "../types";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

class DonationService {
    async getAll(): Promise<Donation[]> {
        const response = await api.get("/donations");

        console.log("API Response:", response.data);

        return response.data.data;
    }

    async getById(id: string): Promise<Donation> {
        const response =
            await api.get<ApiResponse<Donation>>(
                `/donations/${id}`
            );

        return response.data.data;
    }

    async create(
        data: CreateDonationRequest
    ): Promise<Donation> {
        const response =
            await api.post<ApiResponse<Donation>>(
                "/donations",
                data
            );

        return response.data.data;
    }

    async update(
        id: string,
        data: Partial<CreateDonationRequest>
    ): Promise<Donation> {
        const response =
            await api.put<ApiResponse<Donation>>(
                `/donations/${id}`,
                data
            );

        return response.data.data;
    }

    async delete(id: string): Promise<void> {
        await api.delete(`/donations/${id}`);
    }

    async getStats(): Promise<DonationStats> {
        const response =
            await api.get<ApiResponse<DonationStats>>(
                "/donations/stats"
            );

        return response.data.data;
    }
}

export const donationService = new DonationService();