import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { donationService } from "../api/donation.service";

import type {
    CreateDonationRequest,
    Donation,
    UpdateDonationRequest,
} from "../types";

const DONATION_QUERY_KEY = ["donations"];

export function useDonations() {
    return useQuery<Donation[]>({
        queryKey: DONATION_QUERY_KEY,
        queryFn: () => donationService.getAll(),
    });
}

export function useDonation(id: string) {
    return useQuery<Donation>({
        queryKey: [...DONATION_QUERY_KEY, id],
        queryFn: () => donationService.getById(id),
        enabled: !!id,
    });
}

export function useDonationStats() {
    return useQuery({
        queryKey: ["donation-stats"],
        queryFn: () => donationService.getStats(),
    });
}

export function useCreateDonation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateDonationRequest) =>
            donationService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: DONATION_QUERY_KEY,
            });

            queryClient.invalidateQueries({
                queryKey: ["donation-stats"],
            });
        },
    });
}

export function useUpdateDonation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateDonationRequest;
        }) => donationService.update(id, data),

        onSuccess: (_, variables) => {
            // Refresh donation list
            queryClient.invalidateQueries({
                queryKey: DONATION_QUERY_KEY,
            });

            // Refresh donation statistics
            queryClient.invalidateQueries({
                queryKey: ["donation-stats"],
            });

            // Refresh the updated donation
            queryClient.invalidateQueries({
                queryKey: [...DONATION_QUERY_KEY, variables.id],
            });
        },
    });
}

export function useDeleteDonation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            donationService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: DONATION_QUERY_KEY,
            });

            queryClient.invalidateQueries({
                queryKey: ["donation-stats"],
            });
        },
    });
}