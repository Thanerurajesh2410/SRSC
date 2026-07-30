import { useQuery } from "@tanstack/react-query";

import DashboardService from "../services/dashboard.service";

export const dashboardKeys = {
    all: ["dashboard"] as const,
};

export function useDashboard() {
    return useQuery({
        queryKey: dashboardKeys.all,
        queryFn: () => DashboardService.getDashboard(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}