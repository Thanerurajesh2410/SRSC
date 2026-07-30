import apiClient from "../../../services/api";

import type { DashboardResponse } from "../types";

class DashboardService {
    async getDashboard(): Promise<DashboardResponse> {
        const response = await apiClient.get("/dashboard");

        return response.data.data;
    }
}

export default new DashboardService();